import { test, describe } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");
const componentsDir = path.join(rootDir, "src/components");
const heroPath = path.join(componentsDir, "Hero.tsx");

describe("US-004: Hero Component", () => {
  test("components/Hero.tsx exists", () => {
    assert.ok(
      fs.existsSync(heroPath),
      "Hero.tsx should exist in components directory"
    );
  });

  test("Hero component is exported", () => {
    const content = fs.readFileSync(heroPath, "utf-8");
    const hasNamedExport = content.includes("export function Hero");
    const hasDefaultExport = content.includes("export default Hero");
    assert.ok(
      hasNamedExport || hasDefaultExport,
      "Hero should be exported (named or default)"
    );
  });

  describe("Section ID for anchor navigation", () => {
    test("has id='inicio' for anchor navigation", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes('id="inicio"'),
        "Hero section should have id='inicio' for anchor navigation"
      );
    });

    test("uses section element", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("<section"),
        "Hero should use semantic section element"
      );
    });
  });

  describe("Headline", () => {
    test("contains headline with 'Aprende Kitesurf'", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("Aprende Kitesurf"),
        "Hero should have headline containing 'Aprende Kitesurf'"
      );
    });

    test("headline mentions Paraíso Colombiano", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("Paraíso Colombiano") || content.includes("Colombiano"),
        "Hero should mention Colombia in headline"
      );
    });

    test("has h1 element for main headline", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("<h1"),
        "Hero should have h1 element for SEO and accessibility"
      );
    });

    test("has data-testid for headline", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes('data-testid="hero-headline"'),
        "Headline should have data-testid for testing"
      );
    });
  });

  describe("Subheadline", () => {
    test("mentions Salinas del Rey location", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("Salinas del Rey"),
        "Hero should mention Salinas del Rey location"
      );
    });

    test("has subheadline element", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes('data-testid="hero-subheadline"'),
        "Should have subheadline element with data-testid"
      );
    });
  });

  describe("WhatsApp CTA", () => {
    test("has WhatsApp CTA button", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes('data-testid="whatsapp-cta"'),
        "Hero should have WhatsApp CTA button with data-testid"
      );
    });

    test("WhatsApp link uses wa.me format", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("https://wa.me/"),
        "WhatsApp link should use wa.me format"
      );
    });

    test("WhatsApp button opens in new tab", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes('target="_blank"'),
        "WhatsApp link should open in new tab"
      );
    });

    test("WhatsApp button has rel=noopener for security", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("noopener"),
        "WhatsApp link should have rel=noopener for security"
      );
    });

    test("WhatsApp button has call-to-action text", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      // Should have some CTA text like "Reserva" or "Contacta"
      const hasCTA =
        content.includes("Reserva") ||
        content.includes("Contacta") ||
        content.includes("WhatsApp");
      assert.ok(hasCTA, "WhatsApp button should have call-to-action text");
    });

    test("uses Link component from next/link", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes('from "next/link"') || content.includes("from 'next/link'"),
        "Should use Next.js Link component for navigation"
      );
    });
  });

  describe("Full viewport height", () => {
    test("has min-h-screen for full viewport height", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("min-h-screen"),
        "Hero should have min-h-screen for full viewport height"
      );
    });
  });

  describe("Background", () => {
    test("has placeholder background element", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes('data-testid="hero-background"'),
        "Hero should have background element with data-testid"
      );
    });

    test("uses gradient for placeholder background", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      const hasGradient =
        content.includes("bg-gradient") ||
        content.includes("linear-gradient") ||
        content.includes("from-");
      assert.ok(
        hasGradient,
        "Hero should use gradient for placeholder background"
      );
    });

    test("background is absolutely positioned", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      // Check for absolute positioning on background
      assert.ok(
        content.includes("absolute") && content.includes("inset-0"),
        "Background should be absolutely positioned to cover hero"
      );
    });
  });

  describe("Responsive design", () => {
    test("uses responsive text sizes", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      // Should have responsive classes like sm: md: lg:
      const hasResponsive =
        content.includes("sm:") ||
        content.includes("md:") ||
        content.includes("lg:");
      assert.ok(
        hasResponsive,
        "Hero should use responsive Tailwind classes"
      );
    });

    test("uses responsive padding", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      // Check for responsive spacing
      const hasResponsivePadding =
        content.includes("px-4") || content.includes("sm:px-6") || content.includes("lg:px-8");
      assert.ok(
        hasResponsivePadding,
        "Hero should have responsive padding for mobile-first design"
      );
    });

    test("CTA buttons stack on mobile", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      // flex-col for mobile, sm:flex-row for larger screens
      const hasResponsiveLayout =
        content.includes("flex-col") && content.includes("sm:flex-row");
      assert.ok(
        hasResponsiveLayout,
        "CTA buttons should stack vertically on mobile and horizontally on larger screens"
      );
    });
  });

  describe("Content structure", () => {
    test("has hero section with data-testid", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes('data-testid="hero-section"'),
        "Hero should have data-testid for section"
      );
    });

    test("content is centered", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("text-center"),
        "Hero content should be centered"
      );
    });

    test("has proper z-index layering for content over background", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("z-10") || content.includes("z-20"),
        "Content should have z-index to appear above background"
      );
    });
  });

  describe("Accessibility", () => {
    test("decorative elements have aria-hidden", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes('aria-hidden="true"') || content.includes("aria-hidden={true}"),
        "Decorative elements should have aria-hidden"
      );
    });

    test("SVG icons are decorative (aria-hidden)", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      // Ensure SVGs have aria-hidden attributes
      const ariaHiddenCount = (content.match(/aria-hidden/g) || []).length;
      assert.ok(
        ariaHiddenCount >= 1,
        "SVG icons should be marked as decorative with aria-hidden"
      );
    });
  });

  describe("Trust indicators", () => {
    test("mentions IKO certification", () => {
      const content = fs.readFileSync(heroPath, "utf-8");
      assert.ok(
        content.includes("IKO") || content.includes("Certificación"),
        "Hero should mention IKO certification as a trust indicator"
      );
    });
  });
});
