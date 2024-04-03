# ScreenPulse 🎬🎮

This project was generated with Angular CLI version 16.2.9.

ScreenPulse is the frontend part of a full stack application built with Angular, integrating with a custom backend API built with Node.js and Express, and MongoDB Atlas for database storage. The frontend allows users to search for movies, series, or video games in the OMDB API, view detailed information, and save favorites to collections after registering and logging in.

## Table of Contents
- [Features](#features)
- [Technologies & Libraries](#technologies--libraries)
- [API Integration](#api-integration)
- [Angular Architecture](#angular-architecture)
- [UX/UI Design](#uxui-design)
- [UX/UI Design](#demo)
- [Development Server](#development-server)
- [Code Scaffolding](#code-scaffolding)
- [Build](#build)
- [Running Unit Tests](#running-unit-tests)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [Further Help](#further-help)



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
- **Angular:** Frontend framework
- **Angular Material:** UI component library
- **ng-bootstrap:** UI component library
- **Firebase:** Hosting service

## API Integration 🌐
- **ScreenPulse Backend API (Separate Repository):** This API server manages user authentication, connections to the MongoDB database, and requests to external APIs such as the OMDB API. It provides endpoints for user registration, login, saving favorites, and retrieving data from the database.
- **[OMDB API](https://www.omdbapi.com/):** Provides the data source for movie, series, and video game information.

## Angular Architecture 🏗️
ScreenPulse is optimized for modularity and scalability, using lazy loading for performance:
- **Core Module:** Houses core functionalities like guards and services, eagerly loaded for application-wide availability.
- **Feature Modules:** Each page or feature has its module with components, services, and routing configurations, lazily loaded to minimize initial load time.
- **Shared Module:** Centralizes reusable components, services, and models for easy access across feature modules, fostering code reusability.
- **App Module and Routing:** The main AppModule handles bootstrapping and imports the AppRoutingModule for application-level routing. Lazy loading improves performance by loading feature modules on-demand.

Lazy loading ensures swift load times, resource efficiency, and a seamless user experience while maintaining a modular codebase.

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
