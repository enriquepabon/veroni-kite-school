'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const locale = useLocale();
    const isEn = locale === 'en';

    // Mock profile data
    const [profile] = useState({
        name: 'Student Demo',
        email: 'student@veroni.co',
        phone: '+57 300 123 4567',
        weight: 75,
        language: locale,
        level: 3,
    });

    return (
        <div className="p-4 md:p-8 max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-night-tide">
                    {isEn ? 'My Profile' : 'Mi Perfil'}
                </h1>
                <p className="text-deep-marine-600 mt-1">
                    {isEn ? 'Manage your personal info and preferences' : 'Administra tu información personal y preferencias'}
                </p>
            </motion.div>

            {/* Avatar + name */}
            <motion.div
                className="bg-white rounded-2xl shadow-card p-6 mb-6 flex items-center gap-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
            >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-teal flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                    {profile.name.charAt(0)}
                </div>
                <div>
                    <h2 className="text-xl font-heading font-bold text-night-tide">{profile.name}</h2>
                    <p className="text-deep-marine-500 text-sm">{profile.email}</p>
                    <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-ocean-teal-100 text-turquoise-700 text-xs font-bold">
                        {isEn ? 'Level' : 'Nivel'} {profile.level}
                    </span>
                </div>
            </motion.div>

            {/* Info form */}
            <motion.div
                className="bg-white rounded-2xl shadow-card p-6 mb-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h3 className="font-heading font-bold text-night-tide mb-4">
                    {isEn ? 'Personal Information' : 'Información Personal'}
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                            {isEn ? 'Full Name' : 'Nombre Completo'}
                        </label>
                        <input
                            type="text"
                            defaultValue={profile.name}
                            className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua focus:border-ocean-400 transition-all text-night-tide"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-deep-marine-500 mb-1">Email</label>
                        <input
                            type="email"
                            defaultValue={profile.email}
                            disabled
                            className="w-full px-4 py-2.5 rounded-xl border border-salt-white bg-salt-white text-caribbean-aqua"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                            {isEn ? 'Phone' : 'Teléfono'}
                        </label>
                        <input
                            type="tel"
                            defaultValue={profile.phone}
                            className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua focus:border-ocean-400 transition-all text-night-tide"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                            {isEn ? 'Weight (kg)' : 'Peso (kg)'}
                            <span className="text-xs text-caribbean-aqua ml-1">
                                ({isEn ? 'for kite size recommendation' : 'para recomendación de tamaño de kite'})
                            </span>
                        </label>
                        <input
                            type="number"
                            defaultValue={profile.weight}
                            className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua focus:border-ocean-400 transition-all text-night-tide"
                        />
                    </div>
                </div>

                <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-deep-marine-500 to-ocean-teal text-white font-bold hover:shadow-lg transition-all">
                    {isEn ? 'Save Changes' : 'Guardar Cambios'}
                </button>
            </motion.div>

            {/* Preferences */}
            <motion.div
                className="bg-white rounded-2xl shadow-card p-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
            >
                <h3 className="font-heading font-bold text-night-tide mb-4">
                    {isEn ? 'Preferences' : 'Preferencias'}
                </h3>
                <div>
                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                        {isEn ? 'Language' : 'Idioma'}
                    </label>
                    <select
                        defaultValue={profile.language}
                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua focus:border-ocean-400 transition-all text-night-tide"
                    >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </motion.div>
        </div>
    );
}
