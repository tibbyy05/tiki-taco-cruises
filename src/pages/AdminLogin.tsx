import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { isAdminEmail } from '../lib/adminAllowlist';

export default function AdminLogin() {
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user && isAdminEmail(user.email)) {
    return <Navigate to="/admin/analytics" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const { error } = await signIn(email, password);
    if (error) {
      setErrorMessage(error.message ?? 'Unable to sign in. Please try again.');
    } else if (!isAdminEmail(email)) {
      // Valid Supabase account, but not a Tiki admin (shared auth pool).
      await signOut();
      setErrorMessage('This account does not have admin access.');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <SEO
        title="Admin Login | Tiki Taco Cruises"
        description="Admin login for Tiki Taco Cruises."
        noindex={true}
      />
      <div className="min-h-screen bg-sand flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-navy/10">
          <h1 className="text-3xl font-bold text-navy text-center mb-2">Admin Login</h1>
          <p className="text-gray-700 text-center mb-6">
            Sign in to manage your website
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-navy/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2" htmlFor="admin-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-lg border border-navy/20 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/50 hover:text-navy p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="text-sm text-coral bg-coral/10 border border-coral/30 rounded-lg px-4 py-3">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-coral hover:bg-coral/90 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-teal hover:text-coral transition-colors">
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
