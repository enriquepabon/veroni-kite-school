'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MagicCard } from '@/components/ui/magic-card';
import { ShineBorder } from '@/components/ui/shine-border';

interface ProfileData {
    id: string;
    email: string;
    full_name: string;
    phone: string | null;
    weight_kg: number | null;
    language_preference: string;
    role: string;
    is_approved: boolean;
    avatar_url: string | null;
}

export default function ProfilePage() {
    const locale = useLocale();
    const isEn = locale === 'en';

    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [weightKg, setWeightKg] = useState('');
    const [language, setLanguage] = useState('es');

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                    setFullName(data.full_name || '');
                    setPhone(data.phone || '');
                    setWeightKg(data.weight_kg?.toString() || '');
                    setLanguage(data.language_preference || 'es');
                }
            } catch {
                // silently fail, will show empty state
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    async function handleSave() {
        setSaving(true);
        setSaveStatus('idle');

        try {
            const res = await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: fullName,
                    phone: phone || null,
                    weight_kg: weightKg ? Number(weightKg) : null,
                    language_preference: language,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setProfile(data);
                setSaveStatus('success');
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                setSaveStatus('error');
            }
        } catch {
            setSaveStatus('error');
        } finally {
            setSaving(false);
        }
    }

    const displayName = profile?.full_name || profile?.email?.split('@')[0] || '';
    const avatarInitial = displayName.charAt(0).toUpperCase() || '?';

    if (loading) {
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="dark-card p-6 animate-pulse">
                        <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
                        <div className="h-10 bg-white/5 rounded w-full" />
                    </div>
                ))}
            </div>
        );
    }

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
                        {profile?.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt={displayName}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center text-white text-3xl font-bold">
                                {avatarInitial}
                            </div>
                        )}
                        <ShineBorder
                            shineColor={['#2A9D8F', '#E9C46A']}
                            duration={8}
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-heading font-bold text-salt-white">{displayName}</h2>
                        <p className="text-caribbean-aqua/60 text-sm">{profile?.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                            {profile?.is_approved ? (
                                <span className="inline-block px-3 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                                    {isEn ? 'Approved' : 'Aprobado'}
                                </span>
                            ) : (
                                <span className="inline-block px-3 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">
                                    {isEn ? 'Pending Approval' : 'Pendiente de Aprobación'}
                                </span>
                            )}
                        </div>
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
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="dark-input w-full"
                            placeholder={isEn ? 'Your full name' : 'Tu nombre completo'}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-caribbean-aqua/60 mb-1">Email</label>
                        <input
                            type="email"
                            value={profile?.email || ''}
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="dark-input w-full"
                            placeholder="+57 300 123 4567"
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
                            value={weightKg}
                            onChange={(e) => setWeightKg(e.target.value)}
                            className="dark-input w-full"
                            placeholder="75"
                        />
                    </div>
                </div>

                {/* Save feedback */}
                {saveStatus === 'success' && (
                    <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                        {isEn ? 'Profile updated successfully!' : '¡Perfil actualizado exitosamente!'}
                    </div>
                )}
                {saveStatus === 'error' && (
                    <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                        {isEn ? 'Error saving profile. Please try again.' : 'Error al guardar. Intenta de nuevo.'}
                    </div>
                )}

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-ocean-teal to-caribbean-aqua text-white font-bold hover:shadow-glow-ocean-teal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {isEn ? 'Saving...' : 'Guardando...'}
                        </span>
                    ) : (
                        isEn ? 'Save Changes' : 'Guardar Cambios'
                    )}
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
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
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
