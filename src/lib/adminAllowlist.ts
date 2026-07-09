// The Supabase project is shared with other sites (MooreItems et al.), so its
// auth user pool contains non-Tiki accounts — including bot signups from when
// registration was open. Admin access is therefore restricted to this list
// rather than "any authenticated user".
//
// Keep in sync with ADMIN_EMAILS in netlify/functions/analytics.js.
export const ADMIN_EMAILS = [
  'tikitacocruises@gmail.com', // Luiz Perez (owner)
  'contact.aigenda@gmail.com', // Ai-genda
];

export const isAdminEmail = (email: string | undefined | null): boolean =>
  !!email && ADMIN_EMAILS.includes(email.toLowerCase());
