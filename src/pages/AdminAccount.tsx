import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import SEO from '../components/SEO';
import AdminNav from '../components/AdminNav';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

function PasswordReveal({ shown, onToggle }: { shown: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? 'Hide password' : 'Show password'}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/50 hover:text-navy p-1"
    >
      {shown ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  );
}

export default function AdminAccount() {
  const { user } = useAuth();
  const [showPasswords, setShowPasswords] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }
    if (newPassword === currentPassword) {
      setErrorMessage('New password must be different from your current password.');
      return;
    }

    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email ?? '',
      password: currentPassword,
    });

    if (signInError) {
      setErrorMessage('Current password is incorrect.');
      setIsSubmitting(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setErrorMessage(updateError.message ?? 'Unable to update password.');
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage('Password updated. Use your new password next time you sign in.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsSubmitting(false);
  };

  return (
    <>
      <SEO
        title="Account Settings | Tiki Taco Cruises"
        description="Admin account settings for Tiki Taco Cruises."
        noindex={true}
      />
      <div className="min-h-screen bg-sand px-4 py-6 sm:py-10 lg:pl-72 lg:pr-8">
        <div className="max-w-6xl mx-auto lg:mx-0 lg:max-w-[1400px]">
          <AdminNav title="Account Settings" />

          <div className="max-w-xl bg-white shadow-xl rounded-2xl p-8 border border-navy/10">
            <h2 className="text-2xl font-bold text-navy mb-2">Change Password</h2>
            <p className="text-gray-700 mb-6 text-sm">
              Signed in as <span className="font-semibold">{user.email}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2" htmlFor="current-password">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="current-password"
                    type={showPasswords ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    className="w-full rounded-lg border border-navy/20 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <PasswordReveal shown={showPasswords} onToggle={() => setShowPasswords((v) => !v)} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2" htmlFor="new-password">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showPasswords ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    minLength={8}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="w-full rounded-lg border border-navy/20 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal"
                    placeholder="At least 8 characters"
                  />
                  <PasswordReveal shown={showPasswords} onToggle={() => setShowPasswords((v) => !v)} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy mb-2" htmlFor="confirm-password">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showPasswords ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    minLength={8}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-lg border border-navy/20 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <PasswordReveal shown={showPasswords} onToggle={() => setShowPasswords((v) => !v)} />
                </div>
              </div>

              {errorMessage && (
                <div className="text-sm text-coral bg-coral/10 border border-coral/30 rounded-lg px-4 py-3">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="text-sm text-navy bg-teal/10 border border-teal/40 rounded-lg px-4 py-3">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-coral hover:bg-coral/90 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
