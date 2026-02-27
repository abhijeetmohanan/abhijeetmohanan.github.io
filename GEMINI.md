## Project Overview

This project is an interactive portfolio website built with Next.js, React, and TypeScript. It showcases the developer's skills and experience through a creative and engaging user interface. The application features a "boot" sequence, a "deployment" animation, a 3D scene, a terminal interface, and a monitoring dashboard.

**Key Technologies:**

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **UI:** React
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand
*   **3D/Animation:** Three.js, GSAP
*   **Terminal:** Xterm.js

**Architecture:**

The application is structured as a single-page application (SPA) with different "modes" that control which component is displayed. The state is managed by Zustand, which allows for a clean and simple way to switch between modes. The modes include:

*   `boot`: An initial loading or boot-up sequence.
*   `deploying`: An animation that simulates a deployment process.
*   `scene`: A 3D interactive scene, likely built with Three.js.
*   `terminal`: A command-line interface that provides information about the developer.
*   `dashboard`: A monitoring dashboard.

## Building and Running

To build and run this project locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the application on `http://localhost:3000`.

3.  **Build for production:**
    ```bash
    npm run build
    ```

4.  **Start the production server:**
    ```bash
    npm run start
    ```

5.  **Lint the code:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. Utility classes should be used whenever possible to maintain a consistent design system.
*   **State Management:** Zustand is used for global state management. The store is defined in `app/store/index.ts`.
*   **Components:** Components are organized by feature in the `app/components` directory.
*   **Terminal Commands:** The terminal commands and their content are defined in `app/components/terminal/commands.ts`.
*   **Git:** The project is under version control with Git. A `deploy.yml` file in `.github/workflows` suggests that the project is deployed using GitHub Actions.
