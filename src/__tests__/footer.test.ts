import { test, describe } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");
const componentsDir = path.join(rootDir, "src/components");
const footerPath = path.join(componentsDir, "Footer.tsx");

describe("US-009: Footer Component", () => {
  test("components/Footer.tsx exists", () => {
    assert.ok(
      fs.existsSync(footerPath),
      "Footer.tsx should exist in components directory"
    );
  });

  test("Footer component is exported", () => {
    const content = fs.readFileSync(footerPath, "utf-8");
    const hasNamedExport = content.includes("export function Footer");
    const hasDefaultExport = content.includes("export default Footer");
    assert.ok(
      hasNamedExport || hasDefaultExport,
      "Footer should be exported (named or default)"
    );
  });

  describe("Section ID for Anchor Navigation", () => {
    test("has id='contacto' for anchor navigation", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('id="contacto"'),
        "Footer should have id='contacto' for anchor navigation"
      );
    });

    test("has footer data-testid attribute", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="footer"'),
        "Footer should have data-testid='footer'"
      );
    });
  });

  describe("WhatsApp Contact", () => {
    test("WhatsApp contact link is present", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasWhatsAppLink = content.includes("wa.me") || content.includes("whatsapp");
      assert.ok(
        hasWhatsAppLink,
        "Footer should have WhatsApp contact link"
      );
    });

    test("contact-whatsapp data-testid exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="contact-whatsapp"'),
        "Should have data-testid for WhatsApp contact"
      );
    });
  });

  describe("Email Address", () => {
    test("email address is displayed", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasEmailLink = content.includes("mailto:") || content.includes("@");
      assert.ok(
        hasEmailLink,
        "Footer should display email address"
      );
    });

    test("contact-email data-testid exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="contact-email"'),
        "Should have data-testid for email contact"
      );
    });
  });

  describe("Location Information", () => {
    test("location 'Salinas del Rey, Colombia' is mentioned", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasLocation = 
        content.includes("Salinas del Rey") && content.includes("Colombia");
      assert.ok(
        hasLocation,
        "Footer should mention location 'Salinas del Rey, Colombia'"
      );
    });

    test("contact-location data-testid exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="contact-location"'),
        "Should have data-testid for location"
      );
    });

    test("location-text data-testid exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="location-text"'),
        "Should have data-testid for location text"
      );
    });
  });

  describe("Social Media Links", () => {
    test("at least 2 social media icon links present", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const socialLinkMatches = content.match(/social-link-/g);
      const count = socialLinkMatches ? socialLinkMatches.length : 0;
      assert.ok(
        count >= 2,
        `Should have at least 2 social media links (found ${count})`
      );
    });

    test("social-links container exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="social-links"'),
        "Should have social-links container"
      );
    });

    test("Instagram social link exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="social-link-instagram"'),
        "Should have Instagram social link"
      );
    });

    test("Facebook social link exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="social-link-facebook"'),
        "Should have Facebook social link"
      );
    });
  });

  describe("Copyright Notice", () => {
    test("copyright notice is present", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasCopyright = 
        content.toLowerCase().includes("copyright") || 
        content.includes("©");
      assert.ok(
        hasCopyright,
        "Footer should have copyright notice"
      );
    });

    test("copyright includes dynamic year using new Date().getFullYear()", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasDynamicYear = 
        content.includes("new Date().getFullYear()") ||
        content.includes("getFullYear()");
      assert.ok(
        hasDynamicYear,
        "Copyright should use dynamic year with new Date().getFullYear()"
      );
    });

    test("copyright-bar data-testid exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="copyright-bar"'),
        "Should have copyright-bar data-testid"
      );
    });

    test("copyright-text data-testid exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="copyright-text"'),
        "Should have copyright-text data-testid"
      );
    });
  });

  describe("Quick Navigation Links", () => {
    test("navigation links section exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="footer-navigation"'),
        "Should have footer navigation section"
      );
    });

    test("contains key navigation links", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasInicio = content.includes('nav-link-inicio');
      const hasClases = content.includes('nav-link-clases');
      const hasContacto = content.includes('nav-link-contacto');
      assert.ok(
        hasInicio && hasClases && hasContacto,
        "Footer should have key navigation links"
      );
    });
  });

  describe("Google Maps Integration", () => {
    test("map section exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="footer-map"'),
        "Should have footer map section"
      );
    });

    test("has Google Maps link", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasMapLink = 
        content.includes("maps.google.com") || 
        content.includes("google.com/maps");
      assert.ok(
        hasMapLink,
        "Should have link to Google Maps"
      );
    });
  });

  describe("Brand Section", () => {
    test("footer-brand data-testid exists", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes('data-testid="footer-brand"'),
        "Should have footer-brand section"
      );
    });

    test("contains school name", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes("Veroni Kite School"),
        "Footer should contain school name"
      );
    });
  });

  describe("Accessibility", () => {
    test("social links have aria-label", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes("aria-label="),
        "Social links should have aria-label for accessibility"
      );
    });

    test("map link has aria-label", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      assert.ok(
        content.includes("Ver ubicación en Google Maps") ||
        content.includes("aria-label="),
        "Map link should have aria-label"
      );
    });
  });

  describe("Responsive Design", () => {
    test("uses responsive grid layout", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasGrid = content.includes("grid");
      const hasResponsiveCols = 
        content.includes("md:grid-cols") || 
        content.includes("lg:grid-cols");
      assert.ok(
        hasGrid && hasResponsiveCols,
        "Should use responsive grid layout"
      );
    });

    test("copyright bar is responsive (flex-col on mobile, flex-row on desktop)", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasResponsiveFlex = 
        content.includes("flex-col") && content.includes("md:flex-row");
      assert.ok(
        hasResponsiveFlex,
        "Copyright bar should be responsive"
      );
    });
  });

  describe("Visual Design", () => {
    test("uses dark background (bg-gray-900 or similar)", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasDarkBg = 
        content.includes("bg-gray-900") || 
        content.includes("bg-gray-800") ||
        content.includes("bg-slate-900");
      assert.ok(
        hasDarkBg,
        "Footer should have dark background"
      );
    });

    test("uses cyan accent color", () => {
      const content = fs.readFileSync(footerPath, "utf-8");
      const hasCyan = content.includes("cyan-");
      assert.ok(
        hasCyan,
        "Footer should use cyan accent color"
      );
    });
  });
});
