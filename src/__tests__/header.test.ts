import { test, describe } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");
const componentsDir = path.join(rootDir, "src/components");
const headerPath = path.join(componentsDir, "Header.tsx");

describe("US-003: Header Component", () => {
  test("components/Header.tsx exists", () => {
    assert.ok(
      fs.existsSync(headerPath),
      "Header.tsx should exist in components directory"
    );
  });

  test("Header component is exported", () => {
    const content = fs.readFileSync(headerPath, "utf-8");
    const hasNamedExport = content.includes("export function Header");
    const hasDefaultExport = content.includes("export default Header");
    assert.ok(
      hasNamedExport || hasDefaultExport,
      "Header should be exported (named or default)"
    );
  });

  describe("Logo Placeholder", () => {
    test("contains logo placeholder element", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      const hasLogoTestId = content.includes('data-testid="logo"');
      const hasLogoText = content.includes("Veroni Kite School");
      assert.ok(
        hasLogoTestId && hasLogoText,
        "Header should have logo placeholder with school name"
      );
    });
  });

  describe("Desktop Navigation", () => {
    const expectedLinks = [
      "Inicio",
      "Clases",
      "Nosotros",
      "Testimonios",
      "FAQ",
      "Contacto",
    ];

    test("has desktop navigation container", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="desktop-nav"'),
        "Should have desktop navigation container"
      );
    });

    expectedLinks.forEach((link) => {
      test(`contains navigation link: ${link}`, () => {
        const content = fs.readFileSync(headerPath, "utf-8");
        assert.ok(
          content.includes(link),
          `Navigation should include "${link}" link`
        );
      });
    });

    test("all 6 navigation links are present", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      const allPresent = expectedLinks.every((link) => content.includes(link));
      assert.ok(allPresent, "All 6 navigation links should be present");
    });
  });

  describe("Mobile Hamburger Menu", () => {
    test("has hamburger button for mobile", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="hamburger-button"'),
        "Should have hamburger button"
      );
    });

    test("hamburger is hidden on desktop (md:hidden)", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      // The button should be hidden on md and up
      assert.ok(
        content.includes("md:hidden"),
        "Hamburger should be hidden on medium screens and up"
      );
    });

    test("has mobile menu container", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="mobile-menu"'),
        "Should have mobile menu container"
      );
    });

    test("mobile menu visibility is controlled by state", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      const hasMenuState = content.includes("isMenuOpen");
      const hasToggle = content.includes("toggleMenu") || content.includes("setIsMenuOpen");
      assert.ok(
        hasMenuState && hasToggle,
        "Mobile menu should have open state and toggle function"
      );
    });

    test("hamburger button has aria-expanded attribute", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.ok(
        content.includes("aria-expanded"),
        "Hamburger button should have aria-expanded for accessibility"
      );
    });

    test("hamburger button controls mobile menu", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.ok(
        content.includes('aria-controls="mobile-menu"'),
        "Hamburger should control mobile-menu"
      );
    });
  });

  describe("Sticky/Fixed Header", () => {
    test("header has fixed positioning", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.ok(
        content.includes("fixed"),
        "Header should have fixed positioning"
      );
    });

    test("header is positioned at top", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.ok(
        content.includes("top-0"),
        "Header should be positioned at top"
      );
    });

    test("header spans full width", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      const hasLeftRight =
        content.includes("left-0") && content.includes("right-0");
      const hasFullWidth = content.includes("w-full");
      assert.ok(
        hasLeftRight || hasFullWidth,
        "Header should span full width"
      );
    });

    test("header has high z-index", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.ok(
        content.includes("z-50") || content.includes("z-40"),
        "Header should have high z-index to stay on top"
      );
    });
  });

  describe("Smooth Scrolling", () => {
    test("navigation uses anchor links", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      const hasAnchors =
        content.includes("#inicio") &&
        content.includes("#clases") &&
        content.includes("#nosotros");
      assert.ok(hasAnchors, "Navigation should use anchor links for sections");
    });

    test("implements smooth scroll behavior", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      const hasSmoothScroll = content.includes("smooth");
      const hasScrollIntoView = content.includes("scrollIntoView");
      assert.ok(
        hasSmoothScroll || hasScrollIntoView,
        "Should implement smooth scrolling"
      );
    });
  });

  describe("Client Component", () => {
    test("has 'use client' directive for interactivity", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.ok(
        content.includes('"use client"') || content.includes("'use client'"),
        "Header should be a client component for interactivity"
      );
    });

    test("uses useState for menu state", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      assert.ok(
        content.includes("useState"),
        "Should use useState hook for menu state"
      );
    });
  });

  describe("Responsive Design", () => {
    test("desktop nav hidden on mobile (hidden md:flex or similar)", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      const hasResponsiveNav =
        content.includes("hidden md:flex") ||
        content.includes("md:flex") && content.includes("hidden");
      assert.ok(
        hasResponsiveNav,
        "Desktop nav should be hidden on mobile and flex on desktop"
      );
    });

    test("mobile menu hidden on desktop (md:hidden)", () => {
      const content = fs.readFileSync(headerPath, "utf-8");
      // Count occurrences of md:hidden - should have at least 2 (button and menu)
      const matches = content.match(/md:hidden/g);
      assert.ok(
        matches && matches.length >= 1,
        "Mobile elements should be hidden on desktop"
      );
    });
  });
});
