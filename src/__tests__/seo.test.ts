import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "../../");
const publicDir = path.join(projectRoot, "public");
const srcDir = path.join(projectRoot, "src");
const appDir = path.join(srcDir, "app");
const componentsDir = path.join(srcDir, "components");

describe("SEO - robots.txt", () => {
  it("should have robots.txt in public folder", () => {
    const robotsPath = path.join(publicDir, "robots.txt");
    assert.strictEqual(fs.existsSync(robotsPath), true, "robots.txt should exist");
  });

  it("should allow all crawlers", () => {
    const robotsPath = path.join(publicDir, "robots.txt");
    const content = fs.readFileSync(robotsPath, "utf-8");
    assert.ok(
      content.includes("User-agent: *") || content.includes("User-Agent: *"),
      "robots.txt should have User-agent: *"
    );
    assert.ok(
      content.includes("Allow: /"),
      "robots.txt should allow all crawlers"
    );
  });

  it("should reference sitemap.xml", () => {
    const robotsPath = path.join(publicDir, "robots.txt");
    const content = fs.readFileSync(robotsPath, "utf-8");
    assert.ok(
      content.includes("Sitemap:"),
      "robots.txt should reference sitemap"
    );
    assert.ok(
      content.includes("sitemap.xml"),
      "robots.txt should reference sitemap.xml"
    );
  });

  it("should disallow admin paths", () => {
    const robotsPath = path.join(publicDir, "robots.txt");
    const content = fs.readFileSync(robotsPath, "utf-8");
    assert.ok(
      content.includes("Disallow: /admin"),
      "robots.txt should disallow /admin"
    );
  });
});

describe("SEO - sitemap.xml", () => {
  it("should have sitemap.xml in public folder", () => {
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    assert.strictEqual(fs.existsSync(sitemapPath), true, "sitemap.xml should exist");
  });

  it("should have valid XML structure", () => {
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    const content = fs.readFileSync(sitemapPath, "utf-8");
    assert.ok(content.includes('<?xml version="1.0"'), "Should have XML declaration");
    assert.ok(content.includes("<urlset"), "Should have urlset element");
    assert.ok(content.includes("</urlset>"), "Should close urlset element");
  });

  it("should include homepage URL", () => {
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    const content = fs.readFileSync(sitemapPath, "utf-8");
    assert.ok(
      content.includes("https://veronikiteschool.com/"),
      "Sitemap should include homepage URL"
    );
  });

  it("should include all page sections", () => {
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    const content = fs.readFileSync(sitemapPath, "utf-8");
    assert.ok(content.includes("#clases"), "Sitemap should include clases section");
    assert.ok(content.includes("#nosotros"), "Sitemap should include nosotros section");
    assert.ok(content.includes("#testimonios"), "Sitemap should include testimonios section");
    assert.ok(content.includes("#faq"), "Sitemap should include FAQ section");
    assert.ok(content.includes("#contacto"), "Sitemap should include contacto section");
  });

  it("should have priority and changefreq for URLs", () => {
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    const content = fs.readFileSync(sitemapPath, "utf-8");
    assert.ok(content.includes("<priority>"), "Sitemap should have priority tags");
    assert.ok(content.includes("<changefreq>"), "Sitemap should have changefreq tags");
  });
});

describe("SEO - Structured Data (JSON-LD)", () => {
  it("should have JSON-LD structured data in layout.tsx", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      content.includes('type="application/ld+json"'),
      "Layout should have JSON-LD script"
    );
  });

  it("should include LocalBusiness schema type", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      content.includes('"@type": "LocalBusiness"') || content.includes('"@type":"LocalBusiness"'),
      "Schema should include LocalBusiness type"
    );
  });

  it("should include business name", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      content.includes("Veroni Kite School"),
      "Schema should include business name"
    );
  });

  it("should include address information", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      content.includes("PostalAddress") || content.includes("addressLocality"),
      "Schema should include address"
    );
    assert.ok(
      content.includes("Salinas del Rey"),
      "Schema should include location"
    );
  });

  it("should include telephone number", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(content.includes("telephone"), "Schema should include telephone");
  });

  it("should include service offerings", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      content.includes("OfferCatalog") || content.includes("hasOfferCatalog"),
      "Schema should include service offerings"
    );
  });

  it("should include aggregate rating", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      content.includes("AggregateRating") || content.includes("aggregateRating"),
      "Schema should include aggregate rating"
    );
  });

  it("should have valid JSON structure for schema", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(content.includes('"@context"'), "Schema should have @context");
    assert.ok(
      content.includes("https://schema.org"),
      "Schema should reference schema.org"
    );
  });
});

describe("SEO - Meta Tags and Metadata", () => {
  it("should have metadata export in layout.tsx", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      content.includes("export const metadata"),
      "Layout should export metadata"
    );
  });

  it("should have keywords defined", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(content.includes("keywords:"), "Metadata should include keywords");
    assert.ok(
      content.includes("kitesurf") || content.includes("kitesurf Colombia"),
      "Keywords should include kitesurf"
    );
  });

  it("should have Open Graph metadata", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(content.includes("openGraph:"), "Metadata should include openGraph");
    assert.ok(
      content.includes("og:image") || content.includes("images:"),
      "Open Graph should include images"
    );
  });

  it("should have Twitter card metadata", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(content.includes("twitter:"), "Metadata should include twitter");
  });

  it("should have canonical URL", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      content.includes("alternates:") || content.includes("canonical:"),
      "Metadata should include canonical URL"
    );
  });

  it("should have robots meta configuration", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      content.includes("robots:") && content.includes("index: true"),
      "Metadata should allow indexing"
    );
  });
});

describe("SEO - Accessibility (Alt Text)", () => {
  it("should verify all images in Hero have alt text or aria-hidden", () => {
    const heroPath = path.join(componentsDir, "Hero.tsx");
    const content = fs.readFileSync(heroPath, "utf-8");
    // Hero uses SVGs and gradients - check for aria-hidden on decorative elements
    assert.ok(
      content.includes("aria-hidden"),
      "Decorative elements should have aria-hidden"
    );
  });

  it("should verify all images in AboutUs have alt text or aria-hidden", () => {
    const aboutPath = path.join(componentsDir, "AboutUs.tsx");
    const content = fs.readFileSync(aboutPath, "utf-8");
    assert.ok(
      content.includes("aria-hidden"),
      "Decorative SVGs should have aria-hidden"
    );
  });

  it("should verify Testimonials has accessible star ratings", () => {
    const testimonialsPath = path.join(componentsDir, "Testimonials.tsx");
    const content = fs.readFileSync(testimonialsPath, "utf-8");
    assert.ok(
      content.includes("aria-label") && content.includes("estrellas"),
      "Star rating should have aria-label for accessibility"
    );
  });

  it("should have lang attribute on html element", () => {
    const layoutPath = path.join(appDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    assert.ok(
      content.includes('<html lang="es">'),
      "HTML element should have lang='es' attribute"
    );
  });
});

describe("SEO - Semantic HTML", () => {
  it("should have h1 in Hero component", () => {
    const heroPath = path.join(componentsDir, "Hero.tsx");
    const content = fs.readFileSync(heroPath, "utf-8");
    assert.ok(content.includes("<h1"), "Hero should have h1 element");
  });

  it("should have section IDs for anchor navigation", () => {
    const heroPath = path.join(componentsDir, "Hero.tsx");
    const heroContent = fs.readFileSync(heroPath, "utf-8");
    assert.ok(
      heroContent.includes('id="inicio"'),
      "Hero should have id='inicio'"
    );

    const components = ["Classes.tsx", "AboutUs.tsx", "Testimonials.tsx", "FAQ.tsx", "Footer.tsx"];
    const expectedIds = ["clases", "nosotros", "testimonios", "faq", "contacto"];

    components.forEach((file, index) => {
      const filePath = path.join(componentsDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        assert.ok(
          content.includes(`id="${expectedIds[index]}"`),
          `${file} should have id='${expectedIds[index]}'`
        );
      }
    });
  });
});
