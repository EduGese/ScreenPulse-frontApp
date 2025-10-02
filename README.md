# ScreenPulse 🎬🎮


ScreenPulse is the frontend part of a full stack application built with Angular, integrating with a custom [backend API](https://github.com/EduGese/ScreenPulse-backend-Api) built with Node.js and Express, and MongoDB Atlas for database storage. The frontend allows users to search for movies, series, or video games in the OMDB API, view detailed information, and save favorites to collections after registering and logging in.

## System Requirements📋
- **Operating System:** Windows 10/11, macOS 10.15+, or Linux
- **Node.js:** v18.19.1 (LTS)  
  ⚠️ **Do NOT use** Node.js v22.x.x with Angular 16 (unsupported)
- **npm:** v8.0.0 or higher  
- **Angular CLI:** v16.2.16
- **Git:** For cloning the repository
- **Browser:** Chrome, Firefox, or Edge (latest versions)



## Installation 🚀

1.  **Clone the repository**  

```bash
git clone https://github.com/EduGese/ScreenPulse-frontApp.git
```
```bash
cd ScreenPulse-frontApp
```

2. **Install dependencies**
```bash
npm install
```

3. **Serve in development mode**  
```bash
npm start
```
The app will be available at `http://localhost:4200/` and reload automatically on changes.

## 📜 Available Scripts

- `npm start`  
  Alias for `ng serve`. Starts the development server with live reload.

- `npm run build`  
  Runs `ng build`. Compiles the application into the `dist/` directory for production.

- `npm run watch`  
  Runs `ng build --watch --configuration development`. Rebuilds on file changes.

- `npm test`  
  Runs `ng test` via Karma. Executes unit tests and watches for changes.

- `npm run lint`  
  Runs `ng lint`. Lints the codebase with ESLint.

- `npm run deploy`  
  Builds the project and deploys to Firebase Hosting (`ng build && firebase deploy --only hosting`).

- `npm run ng`  
  Shortcut for running Angular CLI commands (e.g., `npm run ng generate component x`).

 ## 🧪 Testing

### Unit Tests
- **Framework:** Jasmine & Karma (configured by Angular CLI)  
- **Specs Location:** `src/**/*.spec.ts`  
- **Run Tests:**  
```bash
npm test
```
This runs `ng test`, launches Karma, and executes all unit tests in watch mode. Ensure it completes without errors.

### Configuration Files
- **angular.json** – Contains the `"test"` target configuration (Karma settings).  
- **karma.conf.js** – Karma runner settings.  
- **src/test.ts** – Test entry point loading Angular testing modules.

## Features ✨
- **Search:** Search for movies, series, or video games
- **Sort:** Sort results by title, year, or type
- **Details:** Get detailed information such as director, actors, year, plot, etc.
- **Authentication:** User registration and login for authentication and authorization
- **Favorites:** Save items to your favorites collection
- **Favorites Page:** Allows you to:
  - View all items, movies, series, or video games collections
  - Filter by title and sort by title or year
  - Add your own reviews/notes

## Technologies & Libraries 🛠️
- **[Angular](https://angular.io/) 16.2.12:** Frontend framework
- **[Angular Material](https://material.angular.io/) 16.2.12:** UI component library
- **[ng-bootstrap](https://ng-bootstrap.github.io/#/home) 15.1.2:** UI component library
- **[Firebase](https://firebase.google.com/):** Hosting service
- **[NPM](https://www.npmjs.com/) 9.8.0:** Packege manager

## API Integration 🌐
- **[ScreenPulse Backend API](https://github.com/EduGese/ScreenPulse-backend-Api):** This API server manages user authentication, connections to the MongoDB database, and requests to external APIs such as the OMDB API. It provides endpoints for user registration, login, saving favorites, and retrieving data from the database.
- **[OMDB API](https://www.omdbapi.com/):** Provides the data source for movie, series, and video game information.

## Angular Architecture 🏗️

ScreenPulse front app is organized for **modularity**, **scalability** and **performance**, leveraging Angular’s module system and lazy loading.

- **App Module & Routing**  
  - `app.module.ts` and `app-routing.module.ts` bootstrap the app and define top-level routes.  
  - Feature modules are loaded via `loadChildren` to minimize initial bundle size.

- **Core Module (`/src/app/core`)**  
  - **Services:** Authentication (`auth.service.ts`), user management (`user.service.ts`), dialog management (`dialog.service.ts`).  
  - **Guards:** `AuthGuard` protects routes.  
  - **Interceptors:** `auth.interceptor.ts` attaches tokens; `error.interceptor.ts` handles HTTP errors.  
  - Eagerly loaded to provide singletons across the app.

- **Feature Modules (`/src/app/pages`)**  
  Each feature under `/pages` has its own module, routing, and page component:
  - **Favorites** (`favorites.module.ts`)  
    - `/page/favorites.component.*` handles display and management of favorites.  
  - **Login** (`login.module.ts`)  
  - **Register** (`register.module.ts`)  
  - **Search** (`search.module.ts`)  
  All are lazily loaded to improve startup performance.

- **Shared Module (`/src/app/shared`)**  
  Central registry of reusable UI building blocks and utilities:
  - **Components:** Carousel, empty state, favorites card, footer, loading spinner, login/register forms, movie dialog, results table, navbar, search bar/cover, sorting controls.  
  - **Models:** TypeScript interfaces (e.g., `MediaItem`, `FavoritesResponse`, `User`).  
  - **Pipes & Directives:** If needed, placed here for cross-module use.  
  Imported by feature modules to avoid duplication.

- **Environments (`/src/environments`)**  
  - `environment.ts`, `environment.development.ts`, `environment.production.ts` store API URLs and flags per build configuration.

- **Testing**  
  - Unit tests alongside each component/service (`*.spec.ts`) using Jasmine & Karma with `HttpClientTestingModule`.  
  - No E2E tests by default; Cypress is recommended for future end-to-end coverage.

This structure ensures a **clean separation of concerns**, **singleton services** for core functionality, **on-demand loading** for features, and **shared reusable assets** for maintainability and team collaboration.


````

app-routing.module.ts
│   app.component.html
│   app.component.scss
│   app.component.spec.ts
│   app.component.ts
│   app.module.ts
│   
├───core
│   │   core.module.ts
│   │
│   ├───constants
│   │       featured-media.const.ts
│   │
│   ├───guards
│   │       auth.guard.spec.ts
│   │       auth.guard.ts
│   │
│   ├───interceptors
│   │       auth.interceptor.ts
│   │       error.interceptor.ts
│   │
│   └───services
│           auth.service.spec.ts
│           auth.service.ts
│           user.service.spec.ts
│           user.service.ts
│
├───pages
│   ├───favorites
│   │   │   favorites-routing.module.ts
│   │   │   favorites.module.ts
│   │   │
│   │   └───page
│   │           favorites.component.html
│   │           favorites.component.scss
│   │           favorites.component.spec.ts
│   │           favorites.component.ts
│   │
│   ├───login
│   │   │   login-routing.module.ts
│   │   │   login.module.ts
│   │   │
│   │   └───page
│   │           login.component.html
│   │           login.component.scss
│   │           login.component.spec.ts
│   │           login.component.ts
│   │
│   ├───register
│   │   │   register-routing.module.ts
│   │   │   register.module.ts
│   │   │
│   │   └───page
│   │           register.component.html
│   │           register.component.scss
│   │           register.component.spec.ts
│   │           register.component.ts
│   │
│   └───search
│       │   search-routing.module.ts
│       │   search.module.ts
│       │
│       └───page
│               search.component.html
│               search.component.scss
│               search.component.spec.ts
│               search.component.ts
│
└───shared
    │   shared.module.ts
    │
    ├───components
    │   ├───carousel
    │   │       carousel.component.html
    │   │       carousel.component.scss
    │   │       carousel.component.spec.ts
    │   │       carousel.component.ts
    │   │
    │   ├───empty-state
    │   │       empty-state.component.html
    │   │       empty-state.component.scss
    │   │       empty-state.component.spec.ts
    │   │       empty-state.component.ts
    │   │
    │   ├───favorites-card
    │   │       favorites-card.component.html
    │   │       favorites-card.component.scss
    │   │       favorites-card.component.spec.ts
    │   │       favorites-card.component.ts
    │   │
    │   ├───footer
    │   │       footer.component.html
    │   │       footer.component.scss
    │   │       footer.component.spec.ts
    │   │       footer.component.ts
    │   │
    │   ├───loading-spinner
    │   │       loading-spinner.component.html
    │   │       loading-spinner.component.scss
    │   │       loading-spinner.component.spec.ts
    │   │       loading-spinner.component.ts
    │   │
    │   ├───login-form
    │   │       login-form.component.html
    │   │       login-form.component.scss
    │   │       login-form.component.spec.ts
    │   │       login-form.component.ts
    │   │
    │   ├───movie-dialog
    │   │       movie-dialog.component.html
    │   │       movie-dialog.component.scss
    │   │       movie-dialog.component.spec.ts
    │   │       movie-dialog.component.ts
    │   │
    │   ├───movie-results-table
    │   │       movie-results-table.component.html
    │   │       movie-results-table.component.scss
    │   │       movie-results-table.component.spec.ts
    │   │       movie-results-table.component.ts
    │   │
    │   ├───navbar
    │   │       navbar.component.html
    │   │       navbar.component.scss
    │   │       navbar.component.spec.ts
    │   │       navbar.component.ts
    │   │
    │   ├───register-form
    │   │       register-form.component.html
    │   │       register-form.component.scss
    │   │       register-form.component.spec.ts
    │   │       register-form.component.ts
    │   │
    │   ├───search-bar
    │   │       search-bar.component.html
    │   │       search-bar.component.scss
    │   │       search-bar.component.spec.ts
    │   │       search-bar.component.ts
    │   │
    │   ├───search-cover
    │   │       search-cover.component.html
    │   │       search-cover.component.scss
    │   │       search-cover.component.spec.ts
    │   │       search-cover.component.ts
    │   │
    │   └───sorting-controls
    │           sorting-controls.component.html
    │           sorting-controls.component.scss
    │           sorting-controls.component.spec.ts
    │           sorting-controls.component.ts
    │
    ├───models
    │       deleteResponse.model.ts
    │       favoritesResponse.model.ts
    │       favoritesSearchParams.model.ts
    │       movie.model.ts
    │       movieDialogData.model.ts
    │       ombdDetails.ts
    │       omdbResponse.model.ts
    │       search.model.ts
    │       tableColumn.model.ts
    │       user.model.ts
    │
    └───services
        ├───dialog
        │       dialog.service.spec.ts
        │       dialog.service.ts
        │       dialog.service.ts
        │
        ├───favorites
        │       favorites.service.spec.ts
        │       favorites.service.ts
        │
        └───omdb
                omdb.service.spec.ts
                omdb.service.ts
				
````

## UX/UI Design 🎨
ScreenPulse combines ng-bootstrap, Angular Material, and custom components to create an engaging user experience. These libraries also speed up the development process and ensure consistency in page design.

## Responsive 📱💻
ScreenPulse is designed to be responsive, ensuring a seamless user experience across all devices, including desktop computers, tablets, and mobile phones.

### Desktop Devices 💻
ScreenPulse offers a rich and immersive experience on desktop devices, with a spacious layout that maximizes screen real estate and enhances usability.

<div style="display: flex;">
    <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/e5ce912a-9c6a-4f76-9eac-dea620fac265" alt="Macbook-Air-localhost" width="400">
    <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/0dc76920-2f60-4bdc-92c4-64ed803548fb" alt="Macbook-Air-localhost (5)" width="400">
    <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/79fc80d3-f792-405a-8c87-a6c871019008" alt="Macbook-Air-localhost (2)" width="400">
    <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/bc62f85c-8062-47a8-b230-bd3c9c83df7a" alt="Macbook-Air-localhost (3)" width="400">
    <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/09341d53-e69e-431c-a711-8e626996e8f9" alt="Macbook-Air-localhost (4)" width="400">
</div>

### Mobile Devices 📱
ScreenPulse offers a rich and immersive experience on desktop devices, with a spacious layout that maximizes screen real estate and enhances usability.

<div style="display: flex;">
    <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/9e5e617c-adba-4c59-a5b6-ab5b75a5ffc4" alt="iPhone-12-PRO-localhost" width="200">
     <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/f1d80231-34a1-40ad-a3fd-a480cc43c5cf" alt="iPhone-12-PRO-localhost (5)" width="200">
    <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/22fca39b-b408-4fc4-ae75-2a4ed891c5fe" alt="iPhone-12-PRO-localhost (2)" width="200">
    <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/afdbd421-cb1d-45c3-83a5-781e8500f68c" alt="iPhone-12-PRO-localhost (3)" width="200">
    <img src="https://github.com/EduGese/ScreenPulse-frontApp/assets/122921699/7d3a99b1-68f2-49fb-a6ad-84f8c04ba3f8" alt="iPhone-12-PRO-localhost (4)" width="200">

</div>

## Demo

https://sreenpulse.web.app/


https://youtu.be/e1ZbcnbUI2E
## Development Server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code Scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests
Run `ng test` to execute the unit tests via Karma.

## Running End-to-End Tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further Help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference page](https://angular.io/cli).
## License
This project is licensed under the [MIT License](#).
