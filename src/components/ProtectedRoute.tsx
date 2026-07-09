import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isAdminEmail } from '../lib/adminAllowlist';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand text-navy">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  // The Supabase auth pool is shared with other sites — being logged in is
  // not enough; the account must be on the Tiki admin allowlist.
  if (!isAdminEmail(user.email)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sand text-navy px-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Not authorized</h1>
        <p className="text-gray-700 mb-6">
          This account ({user.email}) does not have admin access to Tiki Taco Cruises.
        </p>
        <button
          onClick={signOut}
          className="bg-coral hover:bg-coral/90 text-white px-6 py-2.5 rounded-full font-semibold transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
