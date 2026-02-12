import { test, describe } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");
const componentsDir = path.join(rootDir, "src/components");
const aboutUsPath = path.join(componentsDir, "AboutUs.tsx");

describe("US-006: AboutUs Component", () => {
  test("components/AboutUs.tsx exists", () => {
    assert.ok(
      fs.existsSync(aboutUsPath),
      "AboutUs.tsx should exist in components directory"
    );
  });

  test("AboutUs component is exported", () => {
    const content = fs.readFileSync(aboutUsPath, "utf-8");
    const hasNamedExport = content.includes("export function AboutUs");
    const hasDefaultExport = content.includes("export default AboutUs");
    assert.ok(
      hasNamedExport || hasDefaultExport,
      "AboutUs should be exported (named or default)"
    );
  });

  describe("Section ID for anchor navigation", () => {
    test("has id='nosotros' for anchor navigation", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes('id="nosotros"'),
        "AboutUs section should have id='nosotros' for anchor navigation"
      );
    });

    test("uses section element", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("<section"),
        "AboutUs should use semantic section element"
      );
    });
  });

  describe("IKO Certification mentions", () => {
    test("mentions 'IKO' in the content", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("IKO"),
        "AboutUs should mention 'IKO' certification"
      );
    });

    test("mentions 'International Kiteboarding Organization'", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("International Kiteboarding Organization"),
        "AboutUs should mention 'International Kiteboarding Organization'"
      );
    });

    test("has IKO badge element", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="iko-badge"'),
        "AboutUs should have IKO badge with data-testid"
      );
    });

    test("mentions IKO certification prominently", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("Certificación IKO"),
        "AboutUs should prominently display 'Certificación IKO'"
      );
    });
  });

  describe("Salinas del Rey location", () => {
    test("mentions 'Salinas del Rey' location", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("Salinas del Rey"),
        "AboutUs should mention 'Salinas del Rey' location"
      );
    });

    test("has location highlight section", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="location-highlight"'),
        "AboutUs should have location highlight section"
      );
    });

    test("mentions Colombia", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("Colombia"),
        "AboutUs should mention Colombia"
      );
    });

    test("describes location benefits", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      // Check for description of location benefits
      const hasConditions = content.includes("condiciones") || 
                           content.includes("vientos") ||
                           content.includes("aguas");
      assert.ok(
        hasConditions,
        "AboutUs should describe location benefits (conditions, wind, water)"
      );
    });
  });

  describe("Placeholder image", () => {
    test("has image placeholder element", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="about-image-placeholder"'),
        "AboutUs should have a placeholder image element"
      );
    });

    test("image column exists", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="about-image-column"'),
        "AboutUs should have an image column"
      );
    });

    test("placeholder has visual styling (gradient)", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      // Check for gradient or background color to indicate visual placeholder
      const hasGradient = content.includes("bg-gradient") || 
                         content.includes("from-cyan") ||
                         content.includes("bg-cyan");
      assert.ok(
        hasGradient,
        "Placeholder image should have visual styling (gradient or background)"
      );
    });
  });

  describe("Two-column layout", () => {
    test("has grid layout", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("grid"),
        "AboutUs should use grid layout"
      );
    });

    test("has single column on mobile (grid-cols-1)", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("grid-cols-1"),
        "AboutUs should have grid-cols-1 for mobile"
      );
    });

    test("has two columns on desktop (md:grid-cols-2)", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("md:grid-cols-2"),
        "AboutUs should have md:grid-cols-2 for desktop"
      );
    });

    test("has image column and text column", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      const hasImageColumn = content.includes('data-testid="about-image-column"');
      const hasTextColumn = content.includes('data-testid="about-text-column"');
      assert.ok(
        hasImageColumn && hasTextColumn,
        "AboutUs should have both image and text columns"
      );
    });

    test("grid container has data-testid", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="about-grid"'),
        "Grid container should have data-testid='about-grid'"
      );
    });
  });

  describe("Content structure", () => {
    test("has section headline with h2", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      // Check for h2 element in headline
      const hasH2 = content.includes("<h2") && content.includes("</h2>");
      assert.ok(
        hasH2,
        "AboutUs should have h2 headline"
      );
    });

    test("has description about the school", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="about-description"'),
        "AboutUs should have description with data-testid"
      );
    });

    test("mentions instructors", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      const hasInstructors = content.toLowerCase().includes("instructor");
      assert.ok(
        hasInstructors,
        "AboutUs should mention instructors"
      );
    });

    test("has section data-testid", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes('data-testid="about-section"'),
        "AboutUs section should have data-testid='about-section'"
      );
    });
  });

  describe("Accessibility", () => {
    test("uses semantic HTML elements", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      const hasSection = content.includes("<section");
      const hasHeadings = content.includes("<h2") || content.includes("<h3");
      assert.ok(
        hasSection && hasHeadings,
        "AboutUs should use semantic HTML (section, headings)"
      );
    });

    test("decorative SVGs have aria-hidden", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      // If SVGs are present, they should have aria-hidden
      if (content.includes("<svg")) {
        assert.ok(
          content.includes('aria-hidden="true"'),
          "Decorative SVGs should have aria-hidden='true'"
        );
      }
    });
  });

  describe("Responsive design", () => {
    test("has responsive padding", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      // Check for responsive padding classes
      const hasResponsivePadding = content.includes("px-4") && 
                                   (content.includes("sm:px-") || content.includes("lg:px-"));
      assert.ok(
        hasResponsivePadding,
        "AboutUs should have responsive padding"
      );
    });

    test("has max-width container", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("max-w-"),
        "AboutUs should have max-width container"
      );
    });

    test("has proper vertical spacing", () => {
      const content = fs.readFileSync(aboutUsPath, "utf-8");
      assert.ok(
        content.includes("py-"),
        "AboutUs should have vertical padding"
      );
    });
  });
});
