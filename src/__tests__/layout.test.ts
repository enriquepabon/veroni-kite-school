import { describe, it, before } from "node:test";
import assert from "node:assert";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");

describe("US-002: Root Layout with SEO Metadata", () => {
  let layoutContent: string;

  before(() => {
    const layoutPath = path.join(projectRoot, "src/app/layout.tsx");
    layoutContent = fs.readFileSync(layoutPath, "utf-8");
  });

  describe("HTML Language Configuration", () => {
    it("should have html lang='es' for Spanish", () => {
      assert.match(
        layoutContent,
        /<html\s+lang=["']es["']/,
        "Layout should have html lang='es' for Spanish language"
      );
    });
  });

  describe("Metadata Title", () => {
    it("should have correct title with Veroni Kite School", () => {
      assert.match(
        layoutContent,
        /title:\s*["']Veroni Kite School/,
        "Metadata title should start with 'Veroni Kite School'"
      );
    });

    it("should include Salinas del Rey in title", () => {
      assert.match(
        layoutContent,
        /Salinas del Rey/,
        "Metadata title should include 'Salinas del Rey'"
      );
    });

    it("should include Colombia in title", () => {
      assert.match(
        layoutContent,
        /Colombia/,
        "Metadata title should include 'Colombia'"
      );
    });
  });

  describe("Metadata Description", () => {
    it("should have description containing kitesurf keyword", () => {
      assert.match(
        layoutContent,
        /description:\s*["'][^"']*kitesurf/i,
        "Metadata description should contain 'kitesurf'"
      );
    });

    it("should have description containing Salinas del Rey", () => {
      assert.match(
        layoutContent,
        /description:\s*["'][^"']*Salinas del Rey/,
        "Metadata description should contain 'Salinas del Rey'"
      );
    });

    it("should have description containing Colombia", () => {
      assert.match(
        layoutContent,
        /description:\s*["'][^"']*Colombia/,
        "Metadata description should contain 'Colombia'"
      );
    });
  });

  describe("Keywords", () => {
    it("should have keywords array with kitesurf Colombia", () => {
      assert.match(
        layoutContent,
        /keywords:\s*\[[\s\S]*["']kitesurf Colombia["']/,
        "Keywords should include 'kitesurf Colombia'"
      );
    });

    it("should have keywords array with Salinas del Rey", () => {
      assert.match(
        layoutContent,
        /keywords:\s*\[[\s\S]*["']Salinas del Rey["']/,
        "Keywords should include 'Salinas del Rey'"
      );
    });

    it("should have keywords array with escuela kitesurf", () => {
      assert.match(
        layoutContent,
        /keywords:\s*\[[\s\S]*["']escuela kitesurf["']/,
        "Keywords should include 'escuela kitesurf'"
      );
    });
  });

  describe("Open Graph Metadata", () => {
    it("should have openGraph configuration", () => {
      assert.match(
        layoutContent,
        /openGraph:\s*\{/,
        "Layout should have openGraph configuration"
      );
    });

    it("should have openGraph type", () => {
      assert.match(
        layoutContent,
        /type:\s*["']website["']/,
        "OpenGraph should have type 'website'"
      );
    });

    it("should have openGraph title", () => {
      assert.match(
        layoutContent,
        /openGraph:[\s\S]*title:\s*["']/,
        "OpenGraph should have title"
      );
    });

    it("should have openGraph description", () => {
      assert.match(
        layoutContent,
        /openGraph:[\s\S]*description:\s*["']/,
        "OpenGraph should have description"
      );
    });
  });

  describe("Twitter Card Metadata", () => {
    it("should have twitter card configuration", () => {
      assert.match(
        layoutContent,
        /twitter:\s*\{/,
        "Layout should have twitter card configuration"
      );
    });

    it("should have twitter card type", () => {
      assert.match(
        layoutContent,
        /card:\s*["']summary_large_image["']/,
        "Twitter card should be 'summary_large_image'"
      );
    });
  });

  describe("Google Font Configuration", () => {
    it("should import Inter font from next/font/google", () => {
      assert.match(
        layoutContent,
        /import\s*\{\s*Inter\s*\}\s*from\s*["']next\/font\/google["']/,
        "Should import Inter font from next/font/google"
      );
    });

    it("should configure Inter font with variable", () => {
      assert.match(
        layoutContent,
        /const\s+inter\s*=\s*Inter\s*\(/,
        "Should create inter font instance"
      );
    });

    it("should apply font variable to body", () => {
      assert.match(
        layoutContent,
        /\$\{inter\.variable\}/,
        "Should apply inter.variable to body className"
      );
    });
  });

  describe("Viewport Configuration", () => {
    it("should export viewport configuration", () => {
      assert.match(
        layoutContent,
        /export\s+const\s+viewport:\s*Viewport/,
        "Should export viewport configuration"
      );
    });

    it("should have themeColor set", () => {
      assert.match(
        layoutContent,
        /themeColor:\s*["']#/,
        "Should have themeColor set"
      );
    });
  });
});
