'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

type ContentType = 'blog' | 'news';

interface ContentItem {
    id: string;
    type: ContentType;
    title_es: string;
    title_en: string;
    status: 'published' | 'draft';
    created: string;
    author: string;
}

const mockContent: ContentItem[] = [
    { id: 'p1', type: 'blog', title_es: 'Cómo Elegir Tu Primer Kite', title_en: 'How to Choose Your First Kite', status: 'published', created: '2025-01-10', author: 'Carlos Veroni' },
    { id: 'p2', type: 'blog', title_es: 'Body Drag: La Habilidad Que Salva Vidas', title_en: 'Body Drag: The Life-Saving Skill', status: 'published', created: '2024-12-15', author: 'Carlos Veroni' },
    { id: 'p3', type: 'news', title_es: 'Temporada de Vientos 2025', title_en: '2025 Wind Season', status: 'draft', created: '2024-12-20', author: 'Admin' },
];

export default function AdminContentPage() {
    const locale = useLocale();
    const isEn = locale === 'en';
    const [content] = useState(mockContent);
    const [showEditor, setShowEditor] = useState(false);
    const [editItem, setEditItem] = useState<ContentItem | null>(null);

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl md:text-3xl font-heading font-bold text-night-tide">
                        {isEn ? 'Content Management' : 'Gestión de Contenido'}
                    </h1>
                    <p className="text-deep-marine-600 mt-1">
                        {isEn ? 'Blog posts, news, and resource management' : 'Posts de blog, noticias y gestión de recursos'}
                    </p>
                </motion.div>

                <button
                    onClick={() => { setEditItem(null); setShowEditor(true); }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-deep-marine-500 to-ocean-teal text-white font-bold text-sm hover:shadow-lg transition-all"
                >
                    + {isEn ? 'New Post' : 'Nuevo Post'}
                </button>
            </div>

            {/* Content table */}
            <motion.div
                className="bg-white rounded-2xl shadow-card overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-salt-white">
                            <tr>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Title' : 'Título'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Type' : 'Tipo'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Status' : 'Estado'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Date' : 'Fecha'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Actions' : 'Acciones'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((item) => (
                                <tr key={item.id} className="border-t border-sand-100 hover:bg-salt-white transition-colors">
                                    <td className="px-5 py-3">
                                        <p className="font-medium text-night-tide">{isEn ? item.title_en : item.title_es}</p>
                                        <p className="text-xs text-caribbean-aqua">{item.author}</p>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.type === 'blog' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                            {item.type === 'blog' ? 'Blog' : (isEn ? 'News' : 'Noticias')}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.status === 'published'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {item.status === 'published'
                                                ? (isEn ? 'Published' : 'Publicado')
                                                : (isEn ? 'Draft' : 'Borrador')}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-deep-marine-500 text-xs">
                                        {new Date(item.created).toLocaleDateString(locale)}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => { setEditItem(item); setShowEditor(true); }}
                                                className="text-xs text-deep-marine-500 hover:text-deep-marine-700 font-medium"
                                            >
                                                {isEn ? 'Edit' : 'Editar'}
                                            </button>
                                            <button className="text-xs text-red-500 hover:text-red-700 font-medium">
                                                {isEn ? 'Delete' : 'Eliminar'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Content Editor Modal */}
            <AnimatePresence>
                {showEditor && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowEditor(false)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-heading font-bold text-night-tide mb-6">
                                {editItem
                                    ? (isEn ? 'Edit Post' : 'Editar Post')
                                    : (isEn ? 'Create New Post' : 'Crear Nuevo Post')}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                                        {isEn ? 'Type' : 'Tipo'}
                                    </label>
                                    <select
                                        defaultValue={editItem?.type ?? 'blog'}
                                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide"
                                    >
                                        <option value="blog">Blog</option>
                                        <option value="news">{isEn ? 'News' : 'Noticias'}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                                        {isEn ? 'Title (Spanish)' : 'Título (Español)'}
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={editItem?.title_es ?? ''}
                                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                                        {isEn ? 'Title (English)' : 'Título (Inglés)'}
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={editItem?.title_en ?? ''}
                                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                                        {isEn ? 'Content (Spanish)' : 'Contenido (Español)'}
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder={isEn ? 'Write your content in Spanish...' : 'Escribe tu contenido en español...'}
                                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                                        {isEn ? 'Content (English)' : 'Contenido (Inglés)'}
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder={isEn ? 'Write your content in English...' : 'Escribe tu contenido en inglés...'}
                                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                                        {isEn ? 'Visibility' : 'Visibilidad'}
                                    </label>
                                    <select
                                        defaultValue={editItem?.status ?? 'draft'}
                                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide"
                                    >
                                        <option value="published">{isEn ? 'Published' : 'Publicado'}</option>
                                        <option value="draft">{isEn ? 'Draft' : 'Borrador'}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowEditor(false)}
                                    className="flex-1 py-3 px-4 rounded-xl border border-salt-white text-deep-marine-600 font-medium"
                                >
                                    {isEn ? 'Cancel' : 'Cancelar'}
                                </button>
                                <button
                                    onClick={() => setShowEditor(false)}
                                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-deep-marine-500 to-ocean-teal text-white font-bold"
                                >
                                    {editItem ? (isEn ? 'Update' : 'Actualizar') : (isEn ? 'Publish' : 'Publicar')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
