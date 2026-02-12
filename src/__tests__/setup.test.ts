import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';

const rootDir = path.resolve(__dirname, '../..');

describe('Project Setup', () => {
  it('should have Next.js 14 installed', () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8')
    );
    assert.ok(
      packageJson.dependencies.next.includes('14'),
      'Next.js version should be 14.x'
    );
  });

  it('should have Tailwind CSS configured', () => {
    const tailwindConfig = fs.existsSync(
      path.join(rootDir, 'tailwind.config.ts')
    );
    assert.ok(tailwindConfig, 'tailwind.config.ts should exist');
  });

  it('should have static export configured', () => {
    const nextConfig = fs.readFileSync(
      path.join(rootDir, 'next.config.mjs'),
      'utf-8'
    );
    assert.ok(
      nextConfig.includes("output: 'export'"),
      "next.config.mjs should have output: 'export'"
    );
  });

  it('should have App Router structure (app directory)', () => {
    const appDir = fs.existsSync(path.join(rootDir, 'src/app'));
    assert.ok(appDir, 'src/app directory should exist');
  });

  it('should have layout.tsx in app directory', () => {
    const layoutFile = fs.existsSync(path.join(rootDir, 'src/app/layout.tsx'));
    assert.ok(layoutFile, 'src/app/layout.tsx should exist');
  });

  it('should have page.tsx in app directory', () => {
    const pageFile = fs.existsSync(path.join(rootDir, 'src/app/page.tsx'));
    assert.ok(pageFile, 'src/app/page.tsx should exist');
  });

  it('should have unoptimized images for static export', () => {
    const nextConfig = fs.readFileSync(
      path.join(rootDir, 'next.config.mjs'),
      'utf-8'
    );
    assert.ok(
      nextConfig.includes('unoptimized: true'),
      'images should be unoptimized for static export'
    );
  });
});
