[![Storybook](https://img.shields.io/badge/📖_Storybook-Components-FF69B4?logo=storybook&logoColor=white&labelColor=1a1a1a)](https://edugese.github.io/ScreenPulse-frontApp/)
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Firebase-FFCA28?logo=firebase&logoColor=white)](https://sreenpulse.web.app/)
[![Angular](https://img.shields.io/badge/Angular-16.2.12-DD0031?logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Angular Material](https://img.shields.io/badge/Angular_Material-16.2.12-E91E63?logo=angular&logoColor=white)](https://material.angular.io/)
[![ng-bootstrap](https://img.shields.io/badge/ng--bootstrap-15.1.2-7952B3?logo=bootstrap&logoColor=white)](https://ng-bootstrap.github.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A modern web application for discovering and managing movies, series, and games. Built with Angular 16, powered by OMDB API, with full authentication and favorites management.

[🚀 Live Demo](https://sreenpulse.web.app/) • [📖 Component Docs](https://edugese.github.io/ScreenPulse-frontApp/) • [🎬 Video Demo](https://youtu.be/e1ZbcnbUI2E) • [🔗 Backend API](https://github.com/EduGese/ScreenPulse-backend-Api)

---

## ✨ Features

- **Smart Search** - Find movies, series, and games by title, type, and year
- **User Authentication** - Secure registration and login system
- **Favorites Management** - Save and organize your favorite media
- **Detailed Information** - View ratings, cast, trailers, and more
- **Personal Reviews** - Add notes and reviews to your favorites
- **Responsive Design** - Optimized for desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend:** Angular 16.2.12, TypeScript 5.1
- **UI:** Angular Material, ng-bootstrap
- **State:** RxJS
- **API:** OMDB API + Custom Node.js/Express Backend
- **Database:** MongoDB Atlas
- **Hosting:** Firebase (Frontend) + Render (Backend)
- **Documentation:** Storybook 8.3.x

## 🚀 Quick Start

### Prerequisites
- Node.js v18.19.1 (LTS)
- npm v8.0.0+
- Angular CLI v16.2.16

### Installation

```bash
# Clone repository
git clone https://github.com/EduGese/ScreenPulse-frontApp.git
cd ScreenPulse-frontApp

# Install dependencies
npm install

# Start development server
npm start
```

App runs at `http://localhost:4200/`

### Available Scripts

```bash
npm start          # Development server with live reload
npm run build      # Production build
npm test           # Run unit tests (Jasmine/Karma)
npm run lint       # Lint with ESLint
npm run storybook  # Launch Storybook docs
```

## 📖 Documentation

**Component library and architecture** is fully documented in Storybook:

👉 **[View Component Documentation](https://edugese.github.io/ScreenPulse-frontApp/)**

Includes:
- Component library (Smart + Presentational)
- Angular Material usage guidelines
- Project architecture overview
- Interactive component playground

## 🏗️ Architecture Highlights

- **Feature modules** with lazy loading (Search, Favorites, Auth)
- **Smart/Presentational** component separation
- **RxJS** for reactive state management
- **Guards & Interceptors** for auth and error handling
- **Shared module** for reusable components
- **Storybook** for component-driven development

📚 Full architecture details → [Storybook Introduction](https://edugese.github.io/ScreenPulse-frontApp/?path=/docs/introduction--docs)

## 🧪 Testing

```bash
# Unit tests
npm test
```

Tests use **Jasmine** + **Karma** with `HttpClientTestingModule` for HTTP mocking.

## 🌐 API Integration

- **[ScreenPulse Backend API](https://github.com/EduGese/ScreenPulse-backend-Api)** - Node.js + Express + MongoDB
- **[OMDB API](https://www.omdbapi.com/)** - Movie/series/game data source

Backend handles:
- User authentication (JWT)
- Favorites CRUD operations
- OMDB API proxy requests

## 📱 Responsive Design

<div align="center">
  <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/e5ce912a-9c6a-4f76-9eac-dea620fac265" width="45%">
  <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/9e5e617c-adba-4c59-a5b6-ab5b75a5ffc4" width="20%">
</div>

Optimized for all devices from 320px (mobile) to 1920px+ (desktop).

## 🔧 Environment Configuration

Environment files are located in `src/environments/`:

```typescript
// environment.ts (development)
export const environment = {
  serverFavoritesURL: 'http://localhost:9000/api/favorites',
  serverSearchURL: 'http://localhost:9000/api/omdb',
  serverUserURL: 'http://localhost:9000/api/user'
};

// environment.production.ts (production)
export const environment = {
  serverFavoritesURL: 'https://screenpulse-api.onrender.com/api/favorites',
  serverSearchURL: 'https://screenpulse-api.onrender.com/api/omdb',
  serverUserURL: 'https://screenpulse-api.onrender.com/api/user'
};
```

Angular automatically uses `environment.production.ts` when building with:
```bash
ng build --configuration production
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Developed by** [Eduardo Gese](https://github.com/edugese)  
⭐ Star this repo if you find it useful!
"""
