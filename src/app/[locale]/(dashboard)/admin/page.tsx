'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
    const locale = useLocale();
    const isEn = locale === 'en';

    const stats = [
        { label: isEn ? 'Bookings This Month' : 'Reservas Este Mes', value: '24', change: '+12%', icon: '📅', gradient: 'from-deep-marine-500 to-ocean-teal' },
        { label: isEn ? 'Revenue (COP)' : 'Ingresos (COP)', value: '$15.6M', change: '+8%', icon: '💰', gradient: 'from-green-500 to-emerald-500' },
        { label: isEn ? 'Active Students' : 'Estudiantes Activos', value: '42', change: '+5', icon: '🎓', gradient: 'from-sand-gold to-red-500' },
        { label: isEn ? 'New Registrations' : 'Nuevos Registros', value: '7', change: isEn ? 'this week' : 'esta semana', icon: '✨', gradient: 'from-purple-500 to-indigo-500' },
    ];

    const recentBookings = [
        { student: 'María López', course: 'Discovery Kite', date: '2025-02-15', status: 'confirmed' },
        { student: 'Juan Pérez', course: 'Waterstart Intensive', date: '2025-02-14', status: 'pending' },
        { student: 'Ana García', course: 'Kite Control', date: '2025-02-14', status: 'confirmed' },
        { student: 'Carlos Ruiz', course: 'Discovery Kite', date: '2025-02-13', status: 'cancelled' },
    ];

    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
        confirmed: { bg: 'bg-green-100', text: 'text-green-700', label: isEn ? 'Confirmed' : 'Confirmada' },
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: isEn ? 'Pending' : 'Pendiente' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: isEn ? 'Cancelled' : 'Cancelada' },
    };

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-night-tide">
                    {isEn ? 'Admin Dashboard' : 'Panel de Administración'}
                </h1>
                <p className="text-deep-marine-600 mt-1">
                    {isEn ? 'School overview and management' : 'Resumen y gestión de la escuela'}
                </p>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        className="bg-white rounded-2xl shadow-card p-5 relative overflow-hidden"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 -translate-y-6 translate-x-6`} />
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">{stat.icon}</span>
                            <p className="text-xs text-caribbean-aqua font-medium">{stat.label}</p>
                        </div>
                        <p className="text-2xl lg:text-3xl font-bold text-night-tide">{stat.value}</p>
                        <p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent bookings table */}
            <motion.div
                className="bg-white rounded-2xl shadow-card overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
                <div className="p-5 border-b border-salt-white">
                    <h2 className="font-heading font-bold text-night-tide">
                        {isEn ? 'Recent Bookings' : 'Reservas Recientes'}
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-salt-white">
                            <tr>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">
                                    {isEn ? 'Student' : 'Estudiante'}
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">
                                    {isEn ? 'Course' : 'Curso'}
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">
                                    {isEn ? 'Date' : 'Fecha'}
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">
                                    {isEn ? 'Status' : 'Estado'}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map((b, idx) => {
                                const s = statusConfig[b.status];
                                return (
                                    <tr key={idx} className="border-t border-sand-100 hover:bg-salt-white transition-colors">
                                        <td className="px-5 py-3 text-night-tide font-medium">{b.student}</td>
                                        <td className="px-5 py-3 text-deep-marine-500">{b.course}</td>
                                        <td className="px-5 py-3 text-deep-marine-500">{b.date}</td>
                                        <td className="px-5 py-3">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${s.bg} ${s.text}`}>
                                                {s.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
