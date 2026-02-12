import { describe, it } from "node:test";
import assert from "node:assert";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the FAQ component source for testing
const faqPath = path.join(__dirname, "../components/FAQ.tsx");
const faqSource = fs.readFileSync(faqPath, "utf-8");

describe("US-008: FAQ Component", () => {
  describe("Component existence and exports", () => {
    it("should have FAQ.tsx file in components directory", () => {
      assert.ok(
        fs.existsSync(faqPath),
        "FAQ.tsx file should exist in src/components/"
      );
    });

    it("should export FAQ as named export", () => {
      assert.ok(
        faqSource.includes("export function FAQ"),
        "Should export FAQ as named function"
      );
    });

    it("should export FAQ as default export", () => {
      assert.ok(
        faqSource.includes("export default FAQ"),
        "Should have default export for FAQ"
      );
    });

    it("should be a client component", () => {
      assert.ok(
        faqSource.includes('"use client"'),
        "Should be a client component for interactivity"
      );
    });
  });

  describe("Section ID for anchor navigation", () => {
    it("should have section with id='faq'", () => {
      assert.ok(
        faqSource.includes('id="faq"'),
        "Section should have id='faq' for anchor navigation"
      );
    });

    it("should have data-testid for section", () => {
      assert.ok(
        faqSource.includes('data-testid="faq-section"'),
        "Should have data-testid for FAQ section"
      );
    });
  });

  describe("FAQ items", () => {
    it("should have at least 5 FAQ items in the faqItems array", () => {
      const faqItemsMatch = faqSource.match(
        /const faqItems = \[([\s\S]*?)\];/
      );
      assert.ok(faqItemsMatch, "Should have faqItems array defined");

      const itemCount = (faqItemsMatch[1].match(/\{[\s\S]*?id:\s*\d+/g) || [])
        .length;
      assert.ok(itemCount >= 5, `Should have at least 5 FAQ items, found ${itemCount}`);
    });

    it("should render FAQ items with data-testid", () => {
      assert.ok(
        faqSource.includes("data-testid={`faq-item-${item.id}`}"),
        "Each FAQ item should have a data-testid"
      );
    });

    it("should render questions with data-testid", () => {
      assert.ok(
        faqSource.includes("data-testid={`faq-question-${item.id}`}"),
        "Each question button should have a data-testid"
      );
    });

    it("should render answers with data-testid", () => {
      assert.ok(
        faqSource.includes("data-testid={`faq-answer-${item.id}`}"),
        "Each answer section should have a data-testid"
      );
    });
  });

  describe("Accordion functionality", () => {
    it("should use useState for expandedId state", () => {
      assert.ok(
        faqSource.includes("useState"),
        "Should use useState for state management"
      );
      assert.ok(
        faqSource.includes("expandedId"),
        "Should have expandedId state variable"
      );
    });

    it("should have handleToggle function for toggling", () => {
      assert.ok(
        faqSource.includes("handleToggle"),
        "Should have handleToggle function"
      );
    });

    it("should toggle between open and closed state", () => {
      // Check that toggle logic closes if same item clicked
      assert.ok(
        faqSource.includes("prevId === id ? null : id"),
        "Should close item if clicking the same one, open new one if different"
      );
    });

    it("should have onClick handler on question buttons", () => {
      assert.ok(
        faqSource.includes("onClick={onToggle}") ||
          faqSource.includes("onClick={() => handleToggle("),
        "Question buttons should have onClick handlers"
      );
    });

    it("should use aria-expanded attribute", () => {
      assert.ok(
        faqSource.includes("aria-expanded={isExpanded}"),
        "Should use aria-expanded for accessibility"
      );
    });

    it("should use aria-controls to link button to answer", () => {
      assert.ok(
        faqSource.includes("aria-controls={`faq-answer-${item.id}`}"),
        "Should use aria-controls to link button to answer panel"
      );
    });

    it("should use aria-hidden on answer panels", () => {
      assert.ok(
        faqSource.includes("aria-hidden={!isExpanded}"),
        "Should use aria-hidden on collapsed answer panels"
      );
    });

    it("should have conditional styling for expanded state", () => {
      assert.ok(
        faqSource.includes("isExpanded ?"),
        "Should have conditional styling based on expanded state"
      );
    });

    it("should animate expand/collapse with CSS transitions", () => {
      assert.ok(
        faqSource.includes("transition-") && faqSource.includes("max-h-"),
        "Should use CSS transitions for smooth expand/collapse animation"
      );
    });
  });

  describe("Experience/beginners FAQ", () => {
    it("should have a question about experience needed", () => {
      const hasExperienceQuestion =
        faqSource.includes("experiencia") &&
        (faqSource.includes("principiante") ||
          faqSource.includes("necesit") ||
          faqSource.includes("previa"));
      assert.ok(
        hasExperienceQuestion,
        "Should have a FAQ about experience/beginners"
      );
    });

    it("should mention beginners are welcome", () => {
      const mentionsBeginners =
        faqSource.includes("principiantes") ||
        faqSource.includes("No necesitas experiencia") ||
        faqSource.includes("diseñados especialmente");
      assert.ok(
        mentionsBeginners,
        "Should indicate that beginners are welcome"
      );
    });
  });

  describe("Safety/IKO FAQ", () => {
    it("should have a question about safety", () => {
      const hasSafetyQuestion =
        faqSource.includes("segur") &&
        (faqSource.includes("question") || faqSource.includes("?"));
      assert.ok(hasSafetyQuestion, "Should have a FAQ about safety");
    });

    it("should mention IKO certification in safety answer", () => {
      assert.ok(
        faqSource.includes("IKO") &&
          faqSource.includes("International Kiteboarding Organization"),
        "Should mention IKO certification as part of safety standards"
      );
    });

    it("should mention safety equipment", () => {
      const hasSafetyEquipment =
        faqSource.includes("casco") ||
        faqSource.includes("chaleco") ||
        faqSource.includes("liberación rápida");
      assert.ok(
        hasSafetyEquipment,
        "Should mention safety equipment (helmets, vests, quick release)"
      );
    });
  });

  describe("Other recommended FAQ topics", () => {
    it("should have a question about what to bring", () => {
      assert.ok(
        faqSource.includes("traer") || faqSource.includes("llevar"),
        "Should have a FAQ about what to bring to classes"
      );
    });

    it("should have a question about weather/climate", () => {
      assert.ok(
        faqSource.includes("clima") ||
          faqSource.includes("viento") ||
          faqSource.includes("tiempo"),
        "Should have a FAQ about weather conditions"
      );
    });

    it("should have a question about duration", () => {
      assert.ok(
        faqSource.includes("dura") ||
          faqSource.includes("tiempo") ||
          faqSource.includes("horas"),
        "Should have a FAQ about class duration"
      );
    });
  });

  describe("Accessibility", () => {
    it("should use button elements for questions", () => {
      assert.ok(
        faqSource.includes("<button") && faqSource.includes("type=\"button\""),
        "Should use button elements for FAQ questions"
      );
    });

    it("should have focus styles", () => {
      assert.ok(
        faqSource.includes("focus:") || faqSource.includes("focus-"),
        "Should have focus styles for keyboard navigation"
      );
    });

    it("should have hover styles for interactivity feedback", () => {
      assert.ok(
        faqSource.includes("hover:"),
        "Should have hover styles for mouse interaction feedback"
      );
    });

    it("should have descriptive headline", () => {
      assert.ok(
        faqSource.includes("Preguntas Frecuentes") ||
          faqSource.includes("FAQ") ||
          faqSource.includes("Dudas"),
        "Should have a descriptive headline for the FAQ section"
      );
    });
  });

  describe("Responsive design", () => {
    it("should have responsive padding", () => {
      assert.ok(
        faqSource.includes("sm:px-") || faqSource.includes("lg:px-"),
        "Should have responsive padding for different screen sizes"
      );
    });

    it("should have responsive text sizes", () => {
      assert.ok(
        faqSource.includes("sm:text-") || faqSource.includes("md:text-"),
        "Should have responsive text sizes"
      );
    });

    it("should have max-width container", () => {
      assert.ok(
        faqSource.includes("max-w-"),
        "Should have max-width container for readable width"
      );
    });
  });

  describe("Visual design", () => {
    it("should have expand/collapse icon", () => {
      assert.ok(
        faqSource.includes("<svg") && faqSource.includes("chevron") ||
          faqSource.includes("rotate-"),
        "Should have visual indicator for expand/collapse state"
      );
    });

    it("should have card-like container", () => {
      assert.ok(
        faqSource.includes("shadow-") && faqSource.includes("rounded-"),
        "Should have shadow and rounded corners for card-like appearance"
      );
    });

    it("should have border separators between items", () => {
      assert.ok(
        faqSource.includes("border-"),
        "Should have borders separating FAQ items"
      );
    });
  });

  describe("Contact CTA", () => {
    it("should have WhatsApp CTA at bottom", () => {
      assert.ok(
        faqSource.includes("wa.me") || faqSource.includes("WhatsApp"),
        "Should have WhatsApp contact option"
      );
    });

    it("should have data-testid for WhatsApp CTA", () => {
      assert.ok(
        faqSource.includes('data-testid="faq-whatsapp-cta"'),
        "Should have data-testid for WhatsApp CTA"
      );
    });
  });
});
