import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminNavProps {
  title: string;
  actions?: React.ReactNode;
}

export default function AdminNav({ title, actions }: AdminNavProps) {
  const { signOut } = useAuth();

  const tabClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-navy text-white'
        : 'text-navy border border-navy/20 hover:border-coral hover:text-coral'
    }`;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy">{title}</h1>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <NavLink to="/admin/gallery" className={tabClass}>
            Gallery
          </NavLink>
          <NavLink to="/admin/blog" className={tabClass}>
            Blog
          </NavLink>
          <NavLink to="/admin/analytics" className={tabClass}>
            Analytics
          </NavLink>
          <NavLink to="/admin/account" className={tabClass}>
            Account
          </NavLink>
          <Link to="/" className="text-teal hover:text-coral transition-colors text-sm ml-2">
            Back to Website
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {actions}
        <button
          onClick={signOut}
          className="border border-navy/20 text-navy px-5 py-2.5 rounded-full font-semibold hover:border-coral hover:text-coral transition-all duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
