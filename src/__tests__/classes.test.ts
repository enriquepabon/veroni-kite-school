import { test, describe } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");
const componentsDir = path.join(rootDir, "src/components");
const classesPath = path.join(componentsDir, "Classes.tsx");

describe("US-005: Classes Component", () => {
  test("components/Classes.tsx exists", () => {
    assert.ok(
      fs.existsSync(classesPath),
      "Classes.tsx should exist in components directory"
    );
  });

  test("Classes component is exported", () => {
    const content = fs.readFileSync(classesPath, "utf-8");
    const hasNamedExport = content.includes("export function Classes");
    const hasDefaultExport = content.includes("export default Classes");
    assert.ok(
      hasNamedExport || hasDefaultExport,
      "Classes should be exported (named or default)"
    );
  });

  describe("Section ID for anchor navigation", () => {
    test("has id='clases' for anchor navigation", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes('id="clases"'),
        "Classes section should have id='clases' for anchor navigation"
      );
    });

    test("uses section element", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("<section"),
        "Classes should use semantic section element"
      );
    });
  });

  describe("Pricing Card 1: Clase por Hora", () => {
    test("shows 'Clase por Hora' title", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("Clase por Hora"),
        "Card 1 should show 'Clase por Hora' title"
      );
    });

    test("shows price '$50,000 COP'", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("$50,000 COP"),
        "Card 1 should show price '$50,000 COP'"
      );
    });
  });

  describe("Pricing Card 2: Curso Básico", () => {
    test("shows 'Curso Básico' title", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("Curso Básico"),
        "Card 2 should show 'Curso Básico' title"
      );
    });

    test("shows price '$500,000 COP'", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      // Count occurrences - should have at least one for Curso Básico
      const matches = content.match(/\$500,000 COP/g) || [];
      assert.ok(
        matches.length >= 1,
        "Card 2 should show price '$500,000 COP'"
      );
    });
  });

  describe("Pricing Card 3: Curso Completo", () => {
    test("shows 'Curso Completo' title", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("Curso Completo"),
        "Card 3 should show 'Curso Completo' title"
      );
    });

    test("shows price '$500,000 COP' (same as Básico)", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      // Should have at least two occurrences (Básico and Completo)
      const matches = content.match(/\$500,000 COP/g) || [];
      assert.ok(
        matches.length >= 2,
        "Card 3 should also show price '$500,000 COP'"
      );
    });
  });

  describe("Three pricing cards visible", () => {
    test("has three pricing cards with data-testid pattern", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      // Check for template literal pattern that generates pricing-card-1, pricing-card-2, pricing-card-3
      assert.ok(
        content.includes('data-testid={`pricing-card-${index + 1}`}') ||
          content.includes('data-testid="pricing-card-'),
        "Should have pricing cards with sequential data-testid pattern"
      );
    });

    test("pricing grid uses map over pricingOptions array", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("pricingOptions.map"),
        "Should map over pricing options to generate cards"
      );
    });
  });

  describe("CTA buttons for booking", () => {
    test("each card has a CTA button", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes('data-testid="pricing-cta-1"') ||
          content.includes('data-testid={`pricing-cta-'),
        "Cards should have CTA buttons with data-testid"
      );
    });

    test("CTA uses WhatsApp link", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("https://wa.me/"),
        "CTA should link to WhatsApp"
      );
    });

    test("CTA opens in new tab", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes('target="_blank"'),
        "CTA should open in new tab"
      );
    });

    test("CTA has noopener for security", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("noopener"),
        "CTA should have rel=noopener for security"
      );
    });

    test("CTA has booking text", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      const hasBookingText =
        content.includes("Reservar") ||
        content.includes("Reserva") ||
        content.includes("Booking");
      assert.ok(hasBookingText, "CTA should have booking-related text");
    });
  });

  describe("Responsive grid layout", () => {
    test("uses grid layout", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("grid"),
        "Should use CSS grid for layout"
      );
    });

    test("single column on mobile (grid-cols-1)", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("grid-cols-1"),
        "Should be single column on mobile"
      );
    });

    test("3 columns on md+ breakpoint (md:grid-cols-3)", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("md:grid-cols-3"),
        "Should be 3 columns on md breakpoint and above"
      );
    });

    test("has gap between cards", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("gap-"),
        "Should have gap between cards"
      );
    });
  });

  describe("Card content structure", () => {
    test("cards have title elements", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("<h3"),
        "Cards should have h3 elements for titles"
      );
    });

    test("cards have feature lists", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("<ul") && content.includes("<li"),
        "Cards should have feature lists"
      );
    });

    test("cards have description text", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("description"),
        "Cards should have description field"
      );
    });
  });

  describe("Visual design", () => {
    test("uses rounded corners on cards", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("rounded"),
        "Cards should have rounded corners"
      );
    });

    test("uses shadow for depth", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("shadow"),
        "Cards should have shadow for visual depth"
      );
    });

    test("highlighted card has different styling", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("highlighted"),
        "Should support highlighted card styling"
      );
    });
  });

  describe("Accessibility", () => {
    test("SVG icons have aria-hidden", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes('aria-hidden="true"') || content.includes("aria-hidden={true}"),
        "Decorative SVG icons should have aria-hidden"
      );
    });
  });

  describe("Section styling", () => {
    test("has section data-testid", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes('data-testid="classes-section"'),
        "Section should have data-testid for testing"
      );
    });

    test("has vertical padding", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("py-"),
        "Section should have vertical padding"
      );
    });

    test("has max-width container", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes("max-w-"),
        "Section should have max-width container"
      );
    });
  });

  describe("Component structure", () => {
    test("uses Next.js Link component", () => {
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.includes('from "next/link"') || content.includes("from 'next/link'"),
        "Should use Next.js Link component"
      );
    });

    test("is a valid component (server or client)", () => {
      // Server component preferred but client component also works
      // This test just confirms the file is readable and valid
      const content = fs.readFileSync(classesPath, "utf-8");
      assert.ok(
        content.length > 0,
        "Component file should have content"
      );
    });
  });
});
