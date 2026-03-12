export default function AdminInnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: Check admin role from profile table
    // The auth check is now handled by the parent (dashboard) group layout
    return <>{children}</>;
}
