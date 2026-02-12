import { test, describe } from 'node:test';
import assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

describe('US-012: GitHub Pages Deployment', () => {
  describe('Build Output', () => {
    test('out/ directory exists after build', () => {
      const outDir = path.join(projectRoot, 'out');
      assert.ok(fs.existsSync(outDir), 'out/ directory should exist');
    });

    test('out/index.html exists', () => {
      const indexPath = path.join(projectRoot, 'out', 'index.html');
      assert.ok(fs.existsSync(indexPath), 'out/index.html should exist');
    });

    test('out/404.html exists', () => {
      const notFoundPath = path.join(projectRoot, 'out', '404.html');
      assert.ok(fs.existsSync(notFoundPath), 'out/404.html should exist');
    });

    test('out/_next/static directory exists', () => {
      const staticDir = path.join(projectRoot, 'out', '_next', 'static');
      assert.ok(fs.existsSync(staticDir), 'out/_next/static should exist');
    });

    test('out/_next/static/css contains CSS files', () => {
      const cssDir = path.join(projectRoot, 'out', '_next', 'static', 'css');
      assert.ok(fs.existsSync(cssDir), 'CSS directory should exist');
      const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
      assert.ok(cssFiles.length > 0, 'Should have at least one CSS file');
    });

    test('out/_next/static/chunks contains JS files', () => {
      const chunksDir = path.join(projectRoot, 'out', '_next', 'static', 'chunks');
      assert.ok(fs.existsSync(chunksDir), 'chunks directory should exist');
      const jsFiles = fs.readdirSync(chunksDir).filter(f => f.endsWith('.js'));
      assert.ok(jsFiles.length > 0, 'Should have at least one JS file');
    });

    test('robots.txt is copied to out/', () => {
      const robotsPath = path.join(projectRoot, 'out', 'robots.txt');
      assert.ok(fs.existsSync(robotsPath), 'robots.txt should be in out/');
    });

    test('sitemap.xml is copied to out/', () => {
      const sitemapPath = path.join(projectRoot, 'out', 'sitemap.xml');
      assert.ok(fs.existsSync(sitemapPath), 'sitemap.xml should be in out/');
    });

    test('favicon.ico is copied to out/', () => {
      const faviconPath = path.join(projectRoot, 'out', 'favicon.ico');
      assert.ok(fs.existsSync(faviconPath), 'favicon.ico should be in out/');
    });
  });

  describe('Asset Paths in Built HTML', () => {
    test('CSS paths use relative paths with /_next/', () => {
      const indexPath = path.join(projectRoot, 'out', 'index.html');
      const html = fs.readFileSync(indexPath, 'utf-8');
      // CSS should reference /_next/static/css/
      assert.ok(
        html.includes('href="/_next/static/css/'),
        'CSS should use /_next/static/css/ path'
      );
    });

    test('JS paths use relative paths with /_next/', () => {
      const indexPath = path.join(projectRoot, 'out', 'index.html');
      const html = fs.readFileSync(indexPath, 'utf-8');
      // JS should reference /_next/static/chunks/
      assert.ok(
        html.includes('src="/_next/static/chunks/'),
        'JS should use /_next/static/chunks/ path'
      );
    });

    test('Font paths use relative paths', () => {
      const indexPath = path.join(projectRoot, 'out', 'index.html');
      const html = fs.readFileSync(indexPath, 'utf-8');
      // Font preload should use /_next/static/media/
      assert.ok(
        html.includes('href="/_next/static/media/'),
        'Font should use /_next/static/media/ path'
      );
    });

    test('No absolute localhost URLs in built HTML', () => {
      const indexPath = path.join(projectRoot, 'out', 'index.html');
      const html = fs.readFileSync(indexPath, 'utf-8');
      assert.ok(
        !html.includes('http://localhost'),
        'Should not contain localhost URLs'
      );
    });
  });

  describe('HTML Structure', () => {
    test('index.html has correct lang attribute', () => {
      const indexPath = path.join(projectRoot, 'out', 'index.html');
      const html = fs.readFileSync(indexPath, 'utf-8');
      assert.ok(html.includes('lang="es"'), 'HTML should have lang="es"');
    });

    test('index.html has DOCTYPE', () => {
      const indexPath = path.join(projectRoot, 'out', 'index.html');
      const html = fs.readFileSync(indexPath, 'utf-8');
      assert.ok(html.startsWith('<!DOCTYPE html>'), 'Should start with DOCTYPE');
    });

    test('index.html has all major sections', () => {
      const indexPath = path.join(projectRoot, 'out', 'index.html');
      const html = fs.readFileSync(indexPath, 'utf-8');
      
      // Check for section IDs
      assert.ok(html.includes('id="inicio"'), 'Should have inicio section');
      assert.ok(html.includes('id="clases"'), 'Should have clases section');
      assert.ok(html.includes('id="nosotros"'), 'Should have nosotros section');
      assert.ok(html.includes('id="testimonios"'), 'Should have testimonios section');
      assert.ok(html.includes('id="faq"'), 'Should have faq section');
      assert.ok(html.includes('id="contacto"'), 'Should have contacto section');
    });
  });

  describe('README.md', () => {
    test('README.md exists', () => {
      const readmePath = path.join(projectRoot, 'README.md');
      assert.ok(fs.existsSync(readmePath), 'README.md should exist');
    });

    test('README.md contains deployment instructions', () => {
      const readmePath = path.join(projectRoot, 'README.md');
      const content = fs.readFileSync(readmePath, 'utf-8');
      assert.ok(
        content.includes('GitHub Pages'),
        'Should mention GitHub Pages'
      );
    });

    test('README.md contains basePath instructions', () => {
      const readmePath = path.join(projectRoot, 'README.md');
      const content = fs.readFileSync(readmePath, 'utf-8');
      assert.ok(
        content.includes('basePath'),
        'Should mention basePath configuration'
      );
    });

    test('README.md contains npm scripts documentation', () => {
      const readmePath = path.join(projectRoot, 'README.md');
      const content = fs.readFileSync(readmePath, 'utf-8');
      assert.ok(content.includes('npm run build'), 'Should document build script');
      assert.ok(content.includes('npm run dev'), 'Should document dev script');
    });
  });

  describe('GitHub Actions Workflow', () => {
    test('.github/workflows/deploy.yml exists', () => {
      const workflowPath = path.join(projectRoot, '.github', 'workflows', 'deploy.yml');
      assert.ok(fs.existsSync(workflowPath), 'deploy.yml should exist');
    });

    test('Workflow uses upload-pages-artifact action', () => {
      const workflowPath = path.join(projectRoot, '.github', 'workflows', 'deploy.yml');
      const content = fs.readFileSync(workflowPath, 'utf-8');
      assert.ok(
        content.includes('upload-pages-artifact'),
        'Should use upload-pages-artifact'
      );
    });

    test('Workflow uses deploy-pages action', () => {
      const workflowPath = path.join(projectRoot, '.github', 'workflows', 'deploy.yml');
      const content = fs.readFileSync(workflowPath, 'utf-8');
      assert.ok(
        content.includes('deploy-pages'),
        'Should use deploy-pages action'
      );
    });

    test('Workflow deploys out/ directory', () => {
      const workflowPath = path.join(projectRoot, '.github', 'workflows', 'deploy.yml');
      const content = fs.readFileSync(workflowPath, 'utf-8');
      assert.ok(
        content.includes('./out'),
        'Should deploy out/ directory'
      );
    });

    test('Workflow runs on push to main', () => {
      const workflowPath = path.join(projectRoot, '.github', 'workflows', 'deploy.yml');
      const content = fs.readFileSync(workflowPath, 'utf-8');
      assert.ok(
        content.includes('branches: [main]'),
        'Should trigger on push to main'
      );
    });
  });

  describe('Next.js Config', () => {
    test('next.config.mjs has static export configured', () => {
      const configPath = path.join(projectRoot, 'next.config.mjs');
      const content = fs.readFileSync(configPath, 'utf-8');
      assert.ok(
        content.includes("output: 'export'"),
        'Should have static export configured'
      );
    });

    test('next.config.mjs has images.unoptimized for static export', () => {
      const configPath = path.join(projectRoot, 'next.config.mjs');
      const content = fs.readFileSync(configPath, 'utf-8');
      assert.ok(
        content.includes('unoptimized: true'),
        'Should have unoptimized images for static export'
      );
    });

    test('next.config.mjs mentions basePath for GitHub Pages', () => {
      const configPath = path.join(projectRoot, 'next.config.mjs');
      const content = fs.readFileSync(configPath, 'utf-8');
      assert.ok(
        content.includes('basePath'),
        'Should have basePath comment or config for GitHub Pages'
      );
    });
  });
});
