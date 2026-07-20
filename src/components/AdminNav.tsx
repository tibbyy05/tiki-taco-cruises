import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowLeft, BarChart3, FileText, Image as ImageIcon, LogOut, Menu, UserCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminNavProps {
  title: string;
  actions?: React.ReactNode;
}

const NAV_ITEMS = [
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { to: '/admin/blog', label: 'Blog', icon: FileText },
  { to: '/admin/account', label: 'Account', icon: UserCircle },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-5 py-4 rounded-xl text-lg font-bold transition-colors ${
    isActive ? 'bg-coral text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'
  }`;

export default function AdminNav({ title, actions }: AdminNavProps) {
  const { signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menu = (
    <>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>
            <Icon className="w-6 h-6" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-1 border-t border-white/10 pt-4">
        <Link
          to="/"
          className="flex items-center gap-3 px-5 py-4 rounded-xl text-lg font-bold text-white/90 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Website
        </Link>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-5 py-4 rounded-xl text-lg font-bold text-white/90 hover:bg-white/10 hover:text-white transition-colors text-left"
        >
          <LogOut className="w-6 h-6" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-navy flex-col p-4 z-40">
        <Link to="/admin/analytics" className="flex items-center justify-center px-2 pt-2 pb-6">
          <img src="/tiki-logo-white.png" alt="Tiki Taco Cruises" className="h-[70px] w-auto" />
        </Link>
        {menu}
      </aside>

      {/* Mobile top bar with collapsible menu */}
      <div className="lg:hidden mb-6 rounded-2xl bg-navy p-3">
        <div className="flex items-center justify-between">
          <Link to="/admin/analytics" className="px-1">
            <img src="/tiki-logo-white.png" alt="Tiki Taco Cruises" className="h-10 w-auto" />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Close admin menu' : 'Open admin menu'}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isMobileMenuOpen && <div className="mt-3 flex flex-col gap-4">{menu}</div>}
      </div>

      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy">{title}</h1>
        {actions && <div className="flex flex-wrap items-center gap-3 sm:gap-4">{actions}</div>}
      </div>
    </>
  );
}
