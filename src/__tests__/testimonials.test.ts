import { test, describe } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");
const componentsDir = path.join(rootDir, "src/components");
const testimonialsPath = path.join(componentsDir, "Testimonials.tsx");

describe("US-007: Testimonials Component", () => {
  test("components/Testimonials.tsx exists", () => {
    assert.ok(
      fs.existsSync(testimonialsPath),
      "Testimonials.tsx should exist in components directory"
    );
  });

  test("Testimonials component is exported", () => {
    const content = fs.readFileSync(testimonialsPath, "utf-8");
    const hasNamedExport = content.includes("export function Testimonials");
    const hasDefaultExport = content.includes("export default Testimonials");
    assert.ok(
      hasNamedExport || hasDefaultExport,
      "Testimonials should be exported (named or default)"
    );
  });

  describe("Section ID for anchor navigation", () => {
    test("has id='testimonios' for anchor navigation", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes('id="testimonios"'),
        "Testimonials section should have id='testimonios' for anchor navigation"
      );
    });

    test("uses section element", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("<section"),
        "Testimonials should use semantic section element"
      );
    });
  });

  describe("Testimonial cards structure", () => {
    test("has at least 3 testimonial cards", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      // Check for the template literal pattern used to create card testids
      const hasCardTestIdPattern = content.includes("data-testid={`testimonial-card-");
      // Also verify 3 testimonials are defined
      const idMatches = content.match(/id:\s*\d/g);
      assert.ok(
        hasCardTestIdPattern && idMatches && idMatches.length >= 3,
        "Should have at least 3 testimonial cards with data-testid pattern"
      );
    });

    test("defines testimonials array with 3 entries", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("const testimonials = ["),
        "Should define testimonials array"
      );
      // Check for 3 id entries
      const idMatches = content.match(/id:\s*\d/g);
      assert.ok(
        idMatches && idMatches.length >= 3,
        "Should have at least 3 testimonials in the array"
      );
    });

    test("maps over testimonials to render cards", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("testimonials.map"),
        "Should use map to render testimonial cards"
      );
    });
  });

  describe("Testimonial card contents", () => {
    test("each card has placeholder avatar with initials", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes('data-testid={`testimonial-avatar-'),
        "Each card should have a testimonial avatar"
      );
      assert.ok(
        content.includes("avatar:"),
        "Each testimonial should have avatar initials"
      );
    });

    test("each card has name field", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes('data-testid={`testimonial-name-'),
        "Each card should have a name element"
      );
      assert.ok(
        content.includes("name:"),
        "Each testimonial should have a name field"
      );
    });

    test("each card has review text/quote", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes('data-testid={`testimonial-quote-'),
        "Each card should have a quote element"
      );
      assert.ok(
        content.includes("quote:"),
        "Each testimonial should have a quote field"
      );
    });

    test("uses blockquote for review text", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("<blockquote"),
        "Should use blockquote element for review text"
      );
    });
  });

  describe("Star rating visual indicator", () => {
    test("has StarRating component or star rendering", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      const hasStarRating =
        content.includes("StarRating") || content.includes("star-rating");
      assert.ok(hasStarRating, "Should have star rating component or element");
    });

    test("has star-rating data-testid", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="star-rating"'),
        "Should have star-rating test id"
      );
    });

    test("has rating field in testimonials", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("rating:"),
        "Each testimonial should have a rating field"
      );
    });

    test("renders 5 star icons", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("[1, 2, 3, 4, 5]") ||
          content.includes("Array(5)") ||
          content.includes(".map((star)"),
        "Should render 5 stars"
      );
    });

    test("uses yellow color for filled stars", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("yellow-400") || content.includes("yellow-500"),
        "Should use yellow color for filled stars"
      );
    });
  });

  describe("Responsive layout", () => {
    test("uses grid layout", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("grid") && content.includes("grid-cols"),
        "Should use CSS grid for layout"
      );
    });

    test("stacks on mobile (grid-cols-1)", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("grid-cols-1"),
        "Should stack cards on mobile with grid-cols-1"
      );
    });

    test("expands to grid on desktop (md: or lg: breakpoint)", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      const hasResponsiveGrid =
        content.includes("md:grid-cols-") || content.includes("lg:grid-cols-");
      assert.ok(hasResponsiveGrid, "Should have responsive grid columns");
    });

    test("has responsive padding", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      const hasResponsivePadding =
        content.includes("px-4 sm:px-6") ||
        content.includes("p-6 sm:p-8") ||
        (content.includes("px-4") && content.includes("lg:px-8"));
      assert.ok(
        hasResponsivePadding,
        "Should have responsive padding for mobile-first design"
      );
    });
  });

  describe("Mobile-friendly card design", () => {
    test("cards have rounded corners", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("rounded-2xl") || content.includes("rounded-xl"),
        "Cards should have rounded corners"
      );
    });

    test("cards have shadow", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("shadow-lg") || content.includes("shadow-md"),
        "Cards should have shadow"
      );
    });

    test("cards have padding", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("p-6") || content.includes("p-8"),
        "Cards should have padding"
      );
    });

    test("uses bg-white for cards", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("bg-white"),
        "Cards should have white background"
      );
    });
  });

  describe("Accessibility", () => {
    test("has proper heading hierarchy (h2)", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("<h2"),
        "Should have h2 for section heading"
      );
    });

    test("uses aria-hidden for decorative elements", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes('aria-hidden="true"'),
        "Should use aria-hidden for decorative SVG elements"
      );
    });

    test("has aria-label for star rating", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes("aria-label") && content.includes("estrellas"),
        "Star rating should have aria-label describing the rating"
      );
    });
  });

  describe("Data testids for testing", () => {
    test("has testimonials-section testid", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="testimonials-section"'),
        "Section should have testimonials-section testid"
      );
    });

    test("has testimonials-grid testid", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="testimonials-grid"'),
        "Grid container should have testimonials-grid testid"
      );
    });

    test("has testimonials-headline testid", () => {
      const content = fs.readFileSync(testimonialsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="testimonials-headline"'),
        "Headline should have testimonials-headline testid"
      );
    });
  });
});
