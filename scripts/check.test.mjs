import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('both production languages contain real, prerendered content and functional section targets', async () => {
  for (const [path, language, phrase] of [
    ['dist/index.html', 'pt-BR', 'Experiência em contexto'],
    ['dist/en/index.html', 'en', 'Experience in context'],
  ]) {
    const html = await readFile(path, 'utf8')
    assert.ok(html.includes(`<html lang="${language}">`))
    assert.ok(html.includes(phrase))
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1)
    assert.ok(!html.includes('<!--app-html-->'))
    for (const id of ['main', 'sobre', 'experiencia', 'projetos', 'competencias', 'formacao', 'contato', 'curriculos']) {
      assert.ok(html.includes(`id="${id}"`), `${language}: missing ${id}`)
    }
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]))
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(id), `broken anchor ${id}`)
    assert.ok(!/href="(?:#|javascript:[^"]*)"/.test(html), 'no inert placeholder links')
    assert.equal((html.match(/<details>/g) ?? []).length, 3)
  }
})
