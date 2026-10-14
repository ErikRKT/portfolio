import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { render } from '../.build-ssr/entry-server.js'

const template = await readFile('dist/index.html', 'utf8')
try {
  process.loadEnvFile('.env')
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
const site = process.env.VITE_SITE_URL?.replace(/\/$/, '')
if (site && (!URL.canParse(site) || new URL(site).protocol !== 'https:')) {
  throw new Error('VITE_SITE_URL must be an absolute HTTPS URL.')
}
if (site && (new URL(site).pathname !== '/' || new URL(site).search || new URL(site).hash)) {
  throw new Error('VITE_SITE_URL must contain only the site origin, without a path, query or fragment.')
}
const descriptions = {
  pt: ['Desenvolvedor Full Stack', 'Portfólio de Erik Freitas Fontinele. Experiência com Vue, TypeScript, Java e Spring Boot em aplicações web e sistemas governamentais.'],
  en: ['Full Stack Developer', 'Erik Freitas Fontinele’s portfolio. Experience with Vue, TypeScript, Java and Spring Boot in web applications and government systems.'],
}
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
for (const lang of ['pt', 'en']) {
  const title = `Erik Freitas Fontinele — ${descriptions[lang][0]}`
  const description = descriptions[lang][1]
  let html = template.replace('<!--app-html-->', await render(lang))
    .replace('<html lang="pt-BR">', `<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}">`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(description)}`)
    .replace(/(<meta property="og:locale" content=")[^"]*/, `$1${lang === 'pt' ? 'pt_BR' : 'en_US'}`)
  if (site) {
    const pageUrl = `${site}/${lang === 'en' ? 'en/' : ''}`
    const extra = `<link rel="canonical" href="${escape(pageUrl)}"><link rel="alternate" hreflang="pt-BR" href="${escape(site)}/"><link rel="alternate" hreflang="en" href="${escape(site)}/en/"><link rel="alternate" hreflang="x-default" href="${escape(site)}/"><meta property="og:url" content="${escape(pageUrl)}">`
    html = html.replace('</head>', `${extra}</head>`).replace('content="/social.png"', `content="${escape(site)}/social.png"`)
  }
  if (!html.includes('<h1')) throw new Error(`Prerender failed for ${lang}`)
  await mkdir(`dist/${lang === 'en' ? 'en' : ''}`, { recursive: true })
  await writeFile(`dist/${lang === 'en' ? 'en/' : ''}index.html`, html)
}
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${site ? `Sitemap: ${site}/sitemap.xml\n` : ''}`)
if (site) {
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(site)}/</loc></url><url><loc>${escape(site)}/en/</loc></url></urlset>`)
}
await rm('.build-ssr', { recursive: true, force: true })
console.log('Prerendered Portuguese and English pages.')
