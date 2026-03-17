'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import type { BlogArticle } from '@/lib/blog/articles';

interface Props {
    article: BlogArticle;
    locale: string;
}

export default function BlogArticleClient({ article, locale }: Props) {
    const isEn = locale === 'en';
    const title = isEn ? article.title.en : article.title.es;
    const content = isEn ? article.content.en : article.content.es;

    return (
        <div className="pt-24 pb-16">
            {/* Header */}
            <section className="bg-gradient-dark py-16 md:py-24">
                <div className="container-main text-center max-w-3xl mx-auto">
                    <motion.div
                        className="flex flex-wrap justify-center gap-2 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs bg-white/10 text-caribbean-aqua px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </motion.div>
                    <motion.h1
                        className="text-3xl md:text-5xl font-heading font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.div
                        className="flex items-center justify-center gap-4 text-sm text-caribbean-aqua"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span>{article.author}</span>
                        <span>·</span>
                        <span>{new Date(article.date).toLocaleDateString(isEn ? 'en-US' : 'es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>·</span>
                        <span>{article.readTime} min {isEn ? 'read' : 'lectura'}</span>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="container-main py-16">
                <motion.article
                    className="max-w-3xl mx-auto prose prose-lg prose-headings:font-heading prose-headings:text-night-tide prose-p:text-deep-marine-600 prose-a:text-ocean-teal prose-a:no-underline hover:prose-a:underline prose-strong:text-night-tide prose-table:text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
                />

                {/* Back to blog */}
                <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-salt-white">
                    <Link href="/blog" className="text-ocean-teal hover:underline flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {isEn ? 'Back to Blog' : 'Volver al Blog'}
                    </Link>
                </div>
            </section>
        </div>
    );
}

function markdownToHtml(md: string): string {
    let html = md
        // Headers
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Links
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
        // Unordered lists
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        // Ordered lists
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        // Tables
        .replace(/\|(.+)\|/g, (match) => {
            const cells = match.split('|').filter(Boolean).map(c => c.trim());
            if (cells.every(c => /^[-:]+$/.test(c))) return '';
            const tag = 'td';
            return `<tr>${cells.map(c => `<${tag}>${c}</${tag}>`).join('')}</tr>`;
        })
        // Paragraphs
        .replace(/\n\n/g, '</p><p>')
        // Line breaks within paragraphs
        .replace(/\n/g, '<br/>');

    // Wrap in paragraphs
    html = `<p>${html}</p>`;

    // Clean up list items into lists
    html = html.replace(/(<li>.+?<\/li>(<br\/>)?)+/g, (match) => {
        const cleaned = match.replace(/<br\/>/g, '');
        return `<ul>${cleaned}</ul>`;
    });

    // Clean up table rows
    html = html.replace(/(<tr>.+?<\/tr>(<br\/>)?)+/g, (match) => {
        const cleaned = match.replace(/<br\/>/g, '');
        return `<table>${cleaned}</table>`;
    });

    // Clean up empty elements
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p><br\/><\/p>/g, '');
    html = html.replace(/<br\/><h/g, '<h');
    html = html.replace(/<\/h(\d)><br\/>/g, '</h$1>');

    return html;
}
