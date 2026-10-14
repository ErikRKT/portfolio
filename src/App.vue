<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { content, links, skills } from './content'
import type { Language } from './content'
import Icon from './Icon.vue'

const props = defineProps<{ initialLang: Language }>()
const lang = ref<Language>(props.initialLang)
const t = computed(() => content[lang.value])
const menuOpen = ref(false)
const darkTheme = ref(false)
let systemTheme: MediaQueryList
let themeChosen = false
function applyTheme(dark: boolean) {
  darkTheme.value = dark
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#191c1b' : '#f2efe7')
}
function toggleTheme() {
  themeChosen = true
  applyTheme(!darkTheme.value)
  try { localStorage.setItem('portfolio-theme', darkTheme.value ? 'dark' : 'light') } catch { /* Keep the theme usable when storage is blocked. */ }
}
function syncTheme(event: MediaQueryListEvent) {
  if (!themeChosen) applyTheme(event.matches)
}
const announcement = ref('')
const sections = ['sobre', 'experiencia', 'projetos', 'contato']
const contactLinks = computed(() => [
  { label: t.value.email, url: links.email ? `mailto:${links.email}` : '', detail: links.email },
  { label: 'LinkedIn', url: links.linkedin, detail: '' },
  { label: 'GitHub', url: links.github, detail: '' },
  { label: t.value.resumePt, url: links.resumePt, detail: '' },
  { label: t.value.resumeEn, url: links.resumeEn, detail: '' },
])

function updateMetadata() {
  document.documentElement.lang = lang.value === 'pt' ? 'pt-BR' : 'en'
  document.title = t.value.metaTitle
  document.querySelector('meta[name="description"]')?.setAttribute('content', t.value.metaDescription)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.value.metaTitle)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.value.metaDescription)
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang.value === 'pt' ? 'pt_BR' : 'en_US')
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) {
    canonical.href = new URL(lang.value === 'en' ? '/en/' : '/', canonical.href).href
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical.href)
  }
}
function changeLanguage(value: Language) {
  if (lang.value === value) return
  lang.value = value
  menuOpen.value = false
  history.pushState({}, '', `${value === 'en' ? '/en/' : '/'}${location.hash}`)
  updateMetadata()
  announcement.value = t.value.localeAnnouncement
}
function syncPath() {
  lang.value = location.pathname.startsWith('/en') ? 'en' : 'pt'
  updateMetadata()
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
    document.getElementById('menu-toggle')?.focus()
  }
}
onMounted(() => {
  systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  try { themeChosen = ['light', 'dark'].includes(localStorage.getItem('portfolio-theme') ?? '') } catch { /* System preference remains the fallback. */ }
  applyTheme(document.documentElement.dataset.theme === 'dark')
  systemTheme.addEventListener('change', syncTheme)
  updateMetadata()
  window.addEventListener('popstate', syncPath)
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  systemTheme?.removeEventListener('change', syncTheme)
  window.removeEventListener('popstate', syncPath)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <a class="skip-link" href="#main">{{ t.skip }}</a>
  <div class="site-shell" id="inicio">
    <header class="header">
      <a class="brand" href="#inicio" aria-label="Erik Freitas Fontinele"><span class="monogram">EFF</span><span class="brand-name">Erik Freitas Fontinele</span></a>
      <button id="menu-toggle" class="menu-toggle" :aria-expanded="menuOpen" aria-controls="navigation" :aria-label="menuOpen ? t.closeMenu : t.menu" @click="menuOpen = !menuOpen"><Icon :name="menuOpen ? 'close' : 'menu'" /></button>
      <nav id="navigation" class="navigation" :class="{ 'is-open': menuOpen }" :aria-label="lang === 'pt' ? 'Navegação principal' : 'Main navigation'">
        <a v-for="(section, index) in sections" :key="section" :href="`#${section}`" @click="menuOpen = false">{{ t.nav[index] }}</a>
      </nav>
      <button class="theme-toggle" :aria-pressed="darkTheme" :aria-label="lang === 'pt' ? 'Modo escuro' : 'Dark mode'" :title="lang === 'pt' ? 'Alternar tema' : 'Toggle theme'" @click="toggleTheme"><Icon :name="darkTheme ? 'sun' : 'moon'" /></button>
      <div class="languages" :aria-label="t.langLabel" role="group">
        <a href="/" lang="pt-BR" aria-label="Português" :aria-current="lang === 'pt' ? 'true' : undefined" @click.prevent="changeLanguage('pt')">PT</a>
        <span aria-hidden="true">/</span>
        <a href="/en/" lang="en" aria-label="English" :aria-current="lang === 'en' ? 'true' : undefined" @click.prevent="changeLanguage('en')">EN</a>
      </div>
    </header>
    <main id="main" tabindex="-1">
      <section class="hero" aria-labelledby="name">
        <div class="hero-main">
          <h1 id="name"><span>Erik</span><span>Freitas</span><span>Fontinele</span></h1>
          <p class="role">{{ t.role }}</p>
          <p class="statement"><span v-for="line in t.statement" :key="line">{{ line }}</span></p>
          <p class="hero-intro">{{ t.intro }}</p>
        </div>
        <aside class="hero-aside" :aria-label="lang === 'pt' ? 'Perfil e currículo' : 'Profile and résumé'">
          <div class="education-intro"><p>{{ t.student }}</p><p class="school-name">UESPI</p><p>{{ t.university }}</p></div>
          <div class="core-stack"><h2>{{ t.core }}</h2><p>Vue 3 · TypeScript<br />Java · Spring Boot · Angular</p></div>
          <div class="hero-actions"><a class="button primary" href="#experiencia">{{ t.explore }}<Icon /></a><a class="button secondary" href="#curriculos"><span>{{ t.cv }}<small v-if="!links.resumePt && !links.resumeEn">{{ t.cvPending }}</small></span><Icon name="external" /></a></div>
        </aside>
      </section>
      <section id="sobre" class="about section" aria-labelledby="about-heading">
        <h2 id="about-heading">{{ t.aboutTitle }}</h2>
        <div class="about-copy"><p>{{ t.about }}</p><p>{{ t.aboutSecond }}</p></div>
      </section>
      <section id="experiencia" class="section experience" aria-labelledby="experience-heading">
        <div class="section-intro"><h2 id="experience-heading">{{ t.experienceTitle }}</h2><p>{{ t.experienceLead }}</p></div>
        <article v-for="(experience, index) in t.experiences" :key="experience.company" class="experience-article">
          <div class="article-margin"><span class="article-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span><p>{{ experience.company }}</p><span class="confidential-note">{{ t.confidential }}</span></div>
          <div class="article-body"><h3>{{ experience.title }}</h3><p class="article-summary">{{ experience.summary }}</p><dl class="case-columns"><div><dt>{{ t.problem }}</dt><dd>{{ experience.problem }}</dd></div><div><dt>{{ t.contribution }}</dt><dd>{{ experience.contribution }}</dd></div><div><dt>{{ t.tech }}</dt><dd>{{ experience.stack }}</dd></div></dl></div>
        </article>
      </section>
      <section id="projetos" class="section projects" aria-labelledby="projects-heading">
        <div class="section-intro"><h2 id="projects-heading">{{ t.projectsTitle }}</h2><p>{{ t.projectsLead }}</p></div>
        <article v-for="project in t.projects" :key="project.title" class="project-article">
          <div class="project-heading"><h3>{{ project.title }}</h3><p>{{ project.company }}<span>{{ t.professional }}</span></p></div>
          <p class="project-contribution">{{ project.contribution }}</p>
          <ul class="tech-list" :aria-label="t.tech"><li v-for="item in project.stack" :key="item">{{ item }}</li></ul>
          <details><summary><span>{{ t.details }}</span><Icon name="plus" /></summary><div class="project-details"><div><h4>{{ t.problem }}</h4><p>{{ project.problem }}</p></div><div><h4>{{ t.decisions }}</h4><ul><li v-for="decision in project.decisions" :key="decision">{{ decision }}</li></ul></div></div></details>
          <p class="project-note">{{ t.projectNote }}</p>
        </article>
      </section>
      <section id="competencias" class="section skills" aria-labelledby="skills-heading">
        <div class="section-intro"><h2 id="skills-heading">{{ t.skillsTitle }}</h2><p>{{ t.skillsLead }}</p></div>
        <div class="skills-columns"><div v-for="(group, index) in skills" :key="index"><h3>{{ t.skillGroups[index] }}</h3><ul><li v-for="skill in group" :key="skill">{{ lang === 'en' && skill === 'Geolocalização' ? 'Geolocation' : lang === 'en' && skill === 'APIs REST' ? 'REST APIs' : skill }}</li></ul></div></div>
      </section>
      <section id="formacao" class="section education" aria-labelledby="education-heading"><h2 id="education-heading">{{ t.educationTitle }}</h2><div><h3>{{ t.educationCourse }}</h3><p>UESPI · {{ t.university }}</p><p class="education-status">{{ t.educationStatus }}</p></div></section>
      <section id="contato" class="section contact" aria-labelledby="contact-heading">
        <div class="contact-main"><h2 id="contact-heading"><span v-for="line in t.contactTitle" :key="line">{{ line }}</span></h2><p>{{ t.contactLead }}</p></div>
        <div class="contact-list" id="curriculos"><div v-for="item in contactLinks" :key="item.label" class="contact-row"><a v-if="item.url" :href="item.url" :target="item.url.startsWith('mailto:') ? undefined : '_blank'" rel="noopener noreferrer"><span>{{ item.label }}<small v-if="item.detail">{{ item.detail }}</small></span><Icon name="external" /></a><div v-else class="pending-link"><span>{{ item.label }}</span><small>{{ t.pending }}</small></div></div><p v-if="contactLinks.every(item => !item.url)" class="contact-notice">{{ t.contactPending }}</p></div>
      </section>
    </main>
    <footer><p>{{ t.footer }}</p><a href="#inicio">{{ t.top }}<Icon /></a></footer>
  </div>
  <p class="sr-only" role="status" aria-live="polite">{{ announcement }}</p>
</template>
