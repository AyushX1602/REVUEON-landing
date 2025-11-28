# 🚀 Revueon - AI-Powered Shopify Review Analytics

![Revueon Banner](./dashboard_hero_preview.png)

<div align="center">

**Turn Shopify Reviews into Revenue with AI-Powered Sentiment Analysis**

[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

</div>

---

## ✨ Features

### 🎨 Premium User Experience
- **Smooth Scrolling** - Lenis-powered butter-smooth scroll
- **Advanced Animations** - GSAP ScrollTrigger & Framer Motion
- **Magnetic Buttons** - Interactive cursor-following elements
- **Responsive Navbar** - Instant morphing with scroll detection
- **Loading States** - NProgress integration for navigation

### ⚡ Performance & Optimization
- **Code Splitting** - Lazy loading for optimal bundles
- **Image Optimization** - Lazy-loaded with blur effects
- **SEO Ready** - Dynamic meta tags with React Helmet
- **Error Boundaries** - Graceful error handling
- **PWA Support** - Progressive Web App ready

---

## 🛠️ Tech Stack

- **React 18.3** + **TypeScript 5.6**
- **Vite 6.0** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first styling
- **GSAP 3.12** - Professional animations
- **Framer Motion 11** - React animations
- **React Hook Form** + **Zod** - Form validation
- **Radix UI** - Accessible components

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/AyushX1602/REVUEON-landing.git

# Install dependencies
cd REVUEON-landing && npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📦 Environment Variables

Create a `.env` file (use `.env.example` as template):

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_ENABLE_ANALYTICS=false
VITE_ENV=development
```

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── landing/        # Landing page sections
│   ├── shared/         # Reusable components
│   └── ui/             # UI primitives (Radix)
├── services/           # API integration layer
├── hooks/              # Custom React hooks
└── contexts/           # React contexts
```

---

## 🎯 Key Features

### Smart Navbar
- Morphs from full-width to compact pill on scroll
- Theme switches (transparent → black)
- Logo animation (full brand → icon only)

### Form Validation
- React Hook Form + Zod schemas
- Real-time validation
- Password visibility toggle
- Loading states

### API Service Layer
Ready-to-use API client in `src/services/api.js`:

```javascript
import { authAPI } from '@/services/api';

await authAPI.login(email, password);
await authAPI.signup(userData);
```

---

## 📈 Performance

- ✅ Code splitting with React.lazy()
- ✅ Image lazy loading
- ✅ Manual chunk splitting
- ✅ Terser minification
- ✅ CSS purging via Tailwind

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file

---

## 📞 Contact

**GitHub**: [@AyushX1602](https://github.com/AyushX1602)

---

<div align="center">

**Built with ❤️ using React, Vite, and GSAP**

</div>
