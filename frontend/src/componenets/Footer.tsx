export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <p className="text-sm text-slate-500">
          © 2026 TaskFlow. All rights reserved.
        </p>

        <p className="text-sm text-slate-500">
          Built with Next.js, Flask & Supabase
        </p>
      </div>
    </footer>
  );
}