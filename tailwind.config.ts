import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
				'serif': ['Cinzel', 'ui-serif', 'Georgia'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				saffron: {
					DEFAULT: 'hsl(var(--saffron))',
					light: 'hsl(var(--saffron-light))',
					foreground: 'hsl(var(--saffron-foreground))'
				},
				emerald: {
					DEFAULT: 'hsl(var(--emerald))',
					light: 'hsl(var(--emerald-light))',
					foreground: 'hsl(var(--emerald-foreground))'
				},
				gold: {
					DEFAULT: 'hsl(var(--gold))',
					light: 'hsl(var(--gold-light))',
					foreground: 'hsl(var(--gold-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-emerald': 'var(--gradient-emerald)'
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'card': 'var(--shadow-card)',
				'float': 'var(--shadow-float)'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0' },
					'50%': { transform: 'translateY(-100px) rotate(180deg)', opacity: '1' }
				},
				'slideUp': {
					from: { transform: 'translateY(100px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'fadeInScale': {
					from: { transform: 'scale(0.8)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--gold) / 0.5)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--gold) / 0.8)' }
				},
				'parallax': {
					from: { transform: 'translateY(0px)' },
					to: { transform: 'translateY(-50px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'slideUp': 'slideUp 0.8s ease-out',
				'fadeInScale': 'fadeInScale 0.6s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'parallax': 'parallax 1s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
