import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/admin/gallery" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const { error } = await signIn(email, password);
    if (error) {
      setErrorMessage(error.message ?? 'Unable to sign in. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Tiki Taco Cruises</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-sand flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-navy/10">
          <h1 className="text-3xl font-bold text-navy text-center mb-2">Admin Login</h1>
          <p className="text-gray-700 text-center mb-6">
            Sign in to manage the gallery
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
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-navy/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal"
                placeholder="Enter your password"
              />
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
