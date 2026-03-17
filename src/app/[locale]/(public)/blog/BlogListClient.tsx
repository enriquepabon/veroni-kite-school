'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import type { BlogArticle } from '@/lib/blog/articles';

interface Props {
    articles: BlogArticle[];
    locale: string;
}

export default function BlogListClient({ articles, locale }: Props) {
    const isEn = locale === 'en';

    return (
        <div className="pt-24 pb-16">
            {/* Header */}
            <section className="bg-gradient-dark py-16 md:py-24">
                <div className="container-main text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Blog
                    </motion.h1>
                    <motion.p
                        className="text-lg text-caribbean-aqua max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        {isEn
                            ? 'Guides, tips and everything about kitesurfing in Colombia'
                            : 'Guías, consejos y todo sobre el kitesurf en Colombia'}
                    </motion.p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="container-main py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, idx) => (
                        <motion.article
                            key={article.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                        >
                            <Link href={`/blog/${article.slug}`}>
                                <div className="h-2 bg-gradient-to-r from-ocean-teal to-caribbean-aqua" />
                                <div className="p-6">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {article.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-salt-white text-deep-marine-600 px-2.5 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="font-heading font-bold text-night-tide text-lg mb-2 group-hover:text-ocean-teal transition-colors">
                                        {isEn ? article.title.en : article.title.es}
                                    </h2>

                                    <p className="text-sm text-deep-marine-600 leading-relaxed mb-4 line-clamp-3">
                                        {isEn ? article.description.en : article.description.es}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-caribbean-aqua">
                                        <span>{new Date(article.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span>{article.readTime} min {isEn ? 'read' : 'lectura'}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
}
