'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MagicCard } from '@/components/ui/magic-card';
import { ShineBorder } from '@/components/ui/shine-border';

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
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-salt-white">
                    {isEn ? 'My Profile' : 'Mi Perfil'}
                </h1>
                <p className="text-caribbean-aqua/60 mt-1">
                    {isEn ? 'Manage your personal info and preferences' : 'Administra tu información personal y preferencias'}
                </p>
            </motion.div>

            {/* Avatar + name */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mb-6"
            >
                <MagicCard className="dark-card p-6 flex items-center gap-5">
                    <div className="relative flex-shrink-0 w-20 h-20 rounded-full">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center text-white text-3xl font-bold">
                            {profile.name.charAt(0)}
                        </div>
                        <ShineBorder
                            shineColor={['#2A9D8F', '#E9C46A']}
                            duration={8}
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-heading font-bold text-salt-white">{profile.name}</h2>
                        <p className="text-caribbean-aqua/60 text-sm">{profile.email}</p>
                        <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-ocean-teal/20 text-ocean-teal text-xs font-bold">
                            {isEn ? 'Level' : 'Nivel'} {profile.level}
                        </span>
                    </div>
                </MagicCard>
            </motion.div>

            {/* Info form */}
            <motion.div
                className="dark-card p-6 mb-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h3 className="font-heading font-bold text-salt-white mb-4">
                    {isEn ? 'Personal Information' : 'Información Personal'}
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-caribbean-aqua/60 mb-1">
                            {isEn ? 'Full Name' : 'Nombre Completo'}
                        </label>
                        <input
                            type="text"
                            defaultValue={profile.name}
                            className="dark-input w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-caribbean-aqua/60 mb-1">Email</label>
                        <input
                            type="email"
                            defaultValue={profile.email}
                            disabled
                            className="dark-input w-full opacity-50 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-caribbean-aqua/60 mb-1">
                            {isEn ? 'Phone' : 'Teléfono'}
                        </label>
                        <input
                            type="tel"
                            defaultValue={profile.phone}
                            className="dark-input w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-caribbean-aqua/60 mb-1">
                            {isEn ? 'Weight (kg)' : 'Peso (kg)'}
                            <span className="text-xs text-caribbean-aqua/40 ml-1">
                                ({isEn ? 'for kite size recommendation' : 'para recomendación de tamaño de kite'})
                            </span>
                        </label>
                        <input
                            type="number"
                            defaultValue={profile.weight}
                            className="dark-input w-full"
                        />
                    </div>
                </div>

                <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-ocean-teal to-caribbean-aqua text-white font-bold hover:shadow-glow-ocean-teal transition-all">
                    {isEn ? 'Save Changes' : 'Guardar Cambios'}
                </button>
            </motion.div>

            {/* Preferences */}
            <motion.div
                className="dark-card p-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
            >
                <h3 className="font-heading font-bold text-salt-white mb-4">
                    {isEn ? 'Preferences' : 'Preferencias'}
                </h3>
                <div>
                    <label className="block text-sm font-medium text-caribbean-aqua/60 mb-1">
                        {isEn ? 'Language' : 'Idioma'}
                    </label>
                    <select
                        defaultValue={profile.language}
                        className="dark-input w-full"
                    >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </motion.div>
        </div>
    );
}
