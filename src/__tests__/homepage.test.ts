import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

describe('Homepage (page.tsx)', () => {
  const pageFile = fs.readFileSync(
    path.join(rootDir, 'src/app/page.tsx'),
    'utf-8'
  );
  const globalsCss = fs.readFileSync(
    path.join(rootDir, 'src/app/globals.css'),
    'utf-8'
  );

  describe('Component Imports', () => {
    it('should import Header component', () => {
      assert.ok(
        pageFile.includes('import { Header }'),
        'Header should be imported'
      );
      assert.ok(
        pageFile.includes("from \"@/components/Header\""),
        'Header import should be from @/components/Header'
      );
    });

    it('should import Hero component', () => {
      assert.ok(
        pageFile.includes('import { Hero }'),
        'Hero should be imported'
      );
      assert.ok(
        pageFile.includes("from \"@/components/Hero\""),
        'Hero import should be from @/components/Hero'
      );
    });

    it('should import Classes component', () => {
      assert.ok(
        pageFile.includes('import { Classes }'),
        'Classes should be imported'
      );
      assert.ok(
        pageFile.includes("from \"@/components/Classes\""),
        'Classes import should be from @/components/Classes'
      );
    });

    it('should import AboutUs component', () => {
      assert.ok(
        pageFile.includes('import { AboutUs }'),
        'AboutUs should be imported'
      );
      assert.ok(
        pageFile.includes("from \"@/components/AboutUs\""),
        'AboutUs import should be from @/components/AboutUs'
      );
    });

    it('should import Testimonials component', () => {
      assert.ok(
        pageFile.includes('import { Testimonials }'),
        'Testimonials should be imported'
      );
      assert.ok(
        pageFile.includes("from \"@/components/Testimonials\""),
        'Testimonials import should be from @/components/Testimonials'
      );
    });

    it('should import FAQ component', () => {
      assert.ok(
        pageFile.includes('import { FAQ }'),
        'FAQ should be imported'
      );
      assert.ok(
        pageFile.includes("from \"@/components/FAQ\""),
        'FAQ import should be from @/components/FAQ'
      );
    });

    it('should import Footer component', () => {
      assert.ok(
        pageFile.includes('import { Footer }'),
        'Footer should be imported'
      );
      assert.ok(
        pageFile.includes("from \"@/components/Footer\""),
        'Footer import should be from @/components/Footer'
      );
    });
  });

  describe('Component Rendering Order', () => {
    it('should render all 7 components', () => {
      assert.ok(pageFile.includes('<Header'), 'Header should be rendered');
      assert.ok(pageFile.includes('<Hero'), 'Hero should be rendered');
      assert.ok(pageFile.includes('<Classes'), 'Classes should be rendered');
      assert.ok(pageFile.includes('<AboutUs'), 'AboutUs should be rendered');
      assert.ok(pageFile.includes('<Testimonials'), 'Testimonials should be rendered');
      assert.ok(pageFile.includes('<FAQ'), 'FAQ should be rendered');
      assert.ok(pageFile.includes('<Footer'), 'Footer should be rendered');
    });

    it('should render components in correct order: Header, Hero, Classes, AboutUs, Testimonials, FAQ, Footer', () => {
      const headerIndex = pageFile.indexOf('<Header');
      const heroIndex = pageFile.indexOf('<Hero');
      const classesIndex = pageFile.indexOf('<Classes');
      const aboutUsIndex = pageFile.indexOf('<AboutUs');
      const testimonialsIndex = pageFile.indexOf('<Testimonials');
      const faqIndex = pageFile.indexOf('<FAQ');
      const footerIndex = pageFile.indexOf('<Footer');

      assert.ok(headerIndex > -1, 'Header should be in page');
      assert.ok(heroIndex > -1, 'Hero should be in page');
      assert.ok(classesIndex > -1, 'Classes should be in page');
      assert.ok(aboutUsIndex > -1, 'AboutUs should be in page');
      assert.ok(testimonialsIndex > -1, 'Testimonials should be in page');
      assert.ok(faqIndex > -1, 'FAQ should be in page');
      assert.ok(footerIndex > -1, 'Footer should be in page');

      // Verify order
      assert.ok(headerIndex < heroIndex, 'Header should come before Hero');
      assert.ok(heroIndex < classesIndex, 'Hero should come before Classes');
      assert.ok(classesIndex < aboutUsIndex, 'Classes should come before AboutUs');
      assert.ok(aboutUsIndex < testimonialsIndex, 'AboutUs should come before Testimonials');
      assert.ok(testimonialsIndex < faqIndex, 'Testimonials should come before FAQ');
      assert.ok(faqIndex < footerIndex, 'FAQ should come before Footer');
    });
  });

  describe('HTML Structure', () => {
    it('should wrap content sections in main element', () => {
      assert.ok(
        pageFile.includes('<main>'),
        'Page should have a main element for content'
      );
      assert.ok(
        pageFile.includes('</main>'),
        'Page should close the main element'
      );
    });

    it('should have Header outside main element', () => {
      const mainStart = pageFile.indexOf('<main>');
      const headerIndex = pageFile.indexOf('<Header');
      
      assert.ok(headerIndex < mainStart, 'Header should be outside main element');
    });

    it('should have Footer outside main element', () => {
      const mainEnd = pageFile.indexOf('</main>');
      const footerIndex = pageFile.indexOf('<Footer');
      
      assert.ok(footerIndex > mainEnd, 'Footer should be outside main element');
    });

    it('should have main sections inside main element', () => {
      const mainStart = pageFile.indexOf('<main>');
      const mainEnd = pageFile.indexOf('</main>');
      
      const heroIndex = pageFile.indexOf('<Hero');
      const classesIndex = pageFile.indexOf('<Classes');
      const aboutUsIndex = pageFile.indexOf('<AboutUs');
      const testimonialsIndex = pageFile.indexOf('<Testimonials');
      const faqIndex = pageFile.indexOf('<FAQ');

      assert.ok(heroIndex > mainStart && heroIndex < mainEnd, 'Hero should be inside main');
      assert.ok(classesIndex > mainStart && classesIndex < mainEnd, 'Classes should be inside main');
      assert.ok(aboutUsIndex > mainStart && aboutUsIndex < mainEnd, 'AboutUs should be inside main');
      assert.ok(testimonialsIndex > mainStart && testimonialsIndex < mainEnd, 'Testimonials should be inside main');
      assert.ok(faqIndex > mainStart && faqIndex < mainEnd, 'FAQ should be inside main');
    });
  });

  describe('Smooth Scroll Behavior', () => {
    it('should have scroll-behavior: smooth on html element', () => {
      assert.ok(
        globalsCss.includes('scroll-behavior: smooth'),
        'globals.css should have scroll-behavior: smooth'
      );
      
      const htmlRule = globalsCss.match(/html\s*{[\s\S]*?}/);
      assert.ok(htmlRule, 'Should have html CSS rule');
      assert.ok(
        htmlRule[0].includes('scroll-behavior: smooth'),
        'html rule should contain scroll-behavior: smooth'
      );
    });

    it('should have section[id] scroll-margin-top for header offset', () => {
      assert.ok(
        globalsCss.includes('section[id]'),
        'globals.css should have section[id] selector'
      );
      assert.ok(
        globalsCss.includes('scroll-margin-top'),
        'globals.css should have scroll-margin-top for sections'
      );
    });

    it('should have responsive scroll-margin-top values', () => {
      // Check for mobile scroll-margin-top
      assert.ok(
        globalsCss.match(/section\[id\]\s*{[\s\S]*?scroll-margin-top[\s\S]*?}/),
        'Should have base scroll-margin-top for sections'
      );

      // Check for md breakpoint
      assert.ok(
        globalsCss.includes('@media (min-width: 768px)'),
        'Should have md breakpoint for scroll-margin-top'
      );
    });
  });

  describe('Consistent Spacing', () => {
    it('Hero section should have consistent vertical spacing (min-h-screen)', () => {
      const heroFile = fs.readFileSync(
        path.join(rootDir, 'src/components/Hero.tsx'),
        'utf-8'
      );
      assert.ok(
        heroFile.includes('min-h-screen'),
        'Hero should have min-h-screen for consistent height'
      );
    });

    it('Classes section should have consistent vertical padding (py-20)', () => {
      const classesFile = fs.readFileSync(
        path.join(rootDir, 'src/components/Classes.tsx'),
        'utf-8'
      );
      assert.ok(
        classesFile.includes('py-20'),
        'Classes should have py-20 for consistent vertical padding'
      );
    });

    it('AboutUs section should have consistent vertical padding (py-20)', () => {
      const aboutUsFile = fs.readFileSync(
        path.join(rootDir, 'src/components/AboutUs.tsx'),
        'utf-8'
      );
      assert.ok(
        aboutUsFile.includes('py-20'),
        'AboutUs should have py-20 for consistent vertical padding'
      );
    });

    it('Testimonials section should have consistent vertical padding (py-20)', () => {
      const testimonialsFile = fs.readFileSync(
        path.join(rootDir, 'src/components/Testimonials.tsx'),
        'utf-8'
      );
      assert.ok(
        testimonialsFile.includes('py-20'),
        'Testimonials should have py-20 for consistent vertical padding'
      );
    });

    it('FAQ section should have consistent vertical padding (py-20)', () => {
      const faqFile = fs.readFileSync(
        path.join(rootDir, 'src/components/FAQ.tsx'),
        'utf-8'
      );
      assert.ok(
        faqFile.includes('py-20'),
        'FAQ should have py-20 for consistent vertical padding'
      );
    });
  });

  describe('Section IDs for Navigation', () => {
    it('Hero should have id="inicio" for anchor navigation', () => {
      const heroFile = fs.readFileSync(
        path.join(rootDir, 'src/components/Hero.tsx'),
        'utf-8'
      );
      assert.ok(
        heroFile.includes('id="inicio"'),
        'Hero should have id="inicio"'
      );
    });

    it('Classes should have id="clases" for anchor navigation', () => {
      const classesFile = fs.readFileSync(
        path.join(rootDir, 'src/components/Classes.tsx'),
        'utf-8'
      );
      assert.ok(
        classesFile.includes('id="clases"'),
        'Classes should have id="clases"'
      );
    });

    it('AboutUs should have id="nosotros" for anchor navigation', () => {
      const aboutUsFile = fs.readFileSync(
        path.join(rootDir, 'src/components/AboutUs.tsx'),
        'utf-8'
      );
      assert.ok(
        aboutUsFile.includes('id="nosotros"'),
        'AboutUs should have id="nosotros"'
      );
    });

    it('Testimonials should have id="testimonios" for anchor navigation', () => {
      const testimonialsFile = fs.readFileSync(
        path.join(rootDir, 'src/components/Testimonials.tsx'),
        'utf-8'
      );
      assert.ok(
        testimonialsFile.includes('id="testimonios"'),
        'Testimonials should have id="testimonios"'
      );
    });

    it('FAQ should have id="faq" for anchor navigation', () => {
      const faqFile = fs.readFileSync(
        path.join(rootDir, 'src/components/FAQ.tsx'),
        'utf-8'
      );
      assert.ok(
        faqFile.includes('id="faq"'),
        'FAQ should have id="faq"'
      );
    });

    it('Footer should have id="contacto" for anchor navigation', () => {
      const footerFile = fs.readFileSync(
        path.join(rootDir, 'src/components/Footer.tsx'),
        'utf-8'
      );
      assert.ok(
        footerFile.includes('id="contacto"'),
        'Footer should have id="contacto"'
      );
    });
  });

  describe('Export and TypeScript', () => {
    it('should export default Home function', () => {
      assert.ok(
        pageFile.includes('export default function Home'),
        'page.tsx should export default Home function'
      );
    });

    it('should have valid TypeScript/TSX syntax', () => {
      // Check for proper JSX return
      assert.ok(
        pageFile.includes('return ('),
        'Should have a return statement with JSX'
      );

      // Check for fragment usage
      assert.ok(
        pageFile.includes('<>') && pageFile.includes('</>'),
        'Should use React Fragment (<>...</>)'
      );
    });
  });
});
