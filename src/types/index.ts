// ============================================
// Veroni Kite — TypeScript Type Definitions
// ============================================

// --- User & Auth ---
export type UserRole = 'student' | 'instructor' | 'admin';

export interface Profile {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
    phone: string | null;
    role: UserRole;
    current_level: number; // 1-6 roadmap level
    created_at: string;
    updated_at: string;
}

// --- Courses ---
export type CourseLevel = 'discovery' | 'kite_control' | 'waterstart' | 'independent' | 'advanced' | 'pro';

export interface Course {
    id: string;
    name_es: string;
    name_en: string;
    description_es: string;
    description_en: string;
    level: CourseLevel;
    duration_hours: number;
    price_cop: number;
    includes: string[];
    image_url: string | null;
    is_active: boolean;
    created_at: string;
}

// --- Roadmap (UI-enriched types for components) ---
export interface RoadMapSkill {
    id: string;
    name_es: string;
    name_en: string;
    description_es: string;
    description_en: string;
}

export interface RoadMapLevel {
    id: string;
    level: number;
    name_es: string;
    name_en: string;
    description_es: string;
    description_en: string;
    icon: string;
    color: string;
    gradient: string;
    skills: RoadMapSkill[];
}

// --- Roadmap (Supabase row types) ---
export interface RoadmapLevel {
    id: string;
    level_number: number;
    name_es: string;
    name_en: string;
    description_es: string;
    description_en: string;
    skills: RoadmapSkill[];
}

export interface RoadmapSkill {
    id: string;
    level_id: string;
    name_es: string;
    name_en: string;
    description_es: string;
    description_en: string;
    order: number;
}

export interface StudentProgress {
    id: string;
    student_id: string;
    skill_id: string;
    status: 'locked' | 'in_progress' | 'completed';
    completed_at: string | null;
    validated_by: string | null; // instructor ID
    notes: string | null;
}

// --- Booking ---
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'approved' | 'declined' | 'voided' | 'error';

export interface TimeSlot {
    id: string;
    course_id: string;
    instructor_id: string;
    date: string; // YYYY-MM-DD
    start_time: string; // HH:mm
    end_time: string; // HH:mm
    max_students: number;
    booked_count: number;
    is_active: boolean;
}

export interface Booking {
    id: string;
    student_id: string;
    slot_id: string;
    course_id: string;
    status: BookingStatus;
    payment_status: PaymentStatus;
    payment_reference: string | null; // Wompi transaction ID
    amount_cop: number;
    created_at: string;
    updated_at: string;
}

// --- Payments (Wompi) ---
export interface WompiTransaction {
    id: string;
    reference: string;
    amount_in_cents: number;
    currency: 'COP';
    status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';
    payment_method_type: string;
    created_at: string;
}

export interface WompiWebhookEvent {
    event: string;
    data: {
        transaction: WompiTransaction;
    };
    sent_at: string;
    timestamp: number;
    signature: {
        properties: string[];
        checksum: string;
    };
}

// --- Weather (Windy) ---
export interface WindConditions {
    timestamp: string;
    wind_speed_knots: number;
    wind_gust_knots: number;
    wind_direction_deg: number;
    temperature_c: number;
    wave_height_m: number | null;
}

export interface WeatherForecast {
    location: {
        lat: number;
        lng: number;
        name: string;
    };
    current: WindConditions;
    hourly: WindConditions[];
    kiteability: 'optimal' | 'moderate' | 'not_recommended';
}

// --- Resources ---
export type ResourceType = 'video' | 'article' | 'news';

export interface Resource {
    id: string;
    title_es: string;
    title_en: string;
    description_es: string;
    description_en: string;
    type: ResourceType;
    url: string;
    thumbnail_url: string | null;
    level: CourseLevel | null; // null = all levels
    is_published: boolean;
    created_at: string;
}

// --- API Responses ---
export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    status: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}
