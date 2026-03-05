/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'landlord-accent': '#E67E22',
        'tenant-accent': '#2980B9',
        'bg-dark': '#0F172A',
        'bg-mid': '#1E293B',
        'bg-light': '#F8FAFC',
        'surface': '#FFFFFF',
        'border-default': '#E2E8F0',
        'text-primary': '#1E293B',
        'text-secondary': '#64748B',
        'text-muted': '#94A3B8',
        'legal-red': '#C0392B',
        'legal-red-bg': '#FDF2F2',
        'suggested-blue': '#2471A3',
        'suggested-blue-bg': '#F0F6FC',
        'success': '#22C55E',
        'success-bg': '#F0FDF4',
        'warning': '#F59E0B',
        'warning-bg': '#FFFBEB',
        'vault-purple': '#7C3AED',
        'vault-purple-bg': '#F5F3FF',
        'comms-green': '#15803D',
        'comms-green-bg': '#F0FDF4',
      },
      maxWidth: {
        'app': '480px',
      },
      borderRadius: {
        'card': '12px',
        'btn': '12px',
        'badge': '4px',
      },
    },
  },
  plugins: [],
}
