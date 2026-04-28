# 🏗️ TN-PVC Connect

**TN-PVC Connect** is a premium, professional B2B platform designed for the PVC industry ecosystem in Tamil Nadu. It facilitates seamless networking between contractors, laborers, clients, and suppliers, leveraging modern web technologies and WhatsApp integration.

---

## ✨ Key Features

-   **🌐 Multi-Language Support**: Fully localized in **English** and **Tamil** for broader accessibility across the region.
-   **💎 Premium Design**: A modern, high-end "dark-mode" aesthetic featuring glassmorphism, fluid animations, and a professional B2B layout.
-   **🤝 Community Ecosystem**: Dedicated spaces for:
    -   **Contractors**: Find leads and manage projects.
    -   **Labour**: Connect with workforce opportunities.
    -   **Clients**: Discover reliable PVC service providers.
-   **🗺️ Interactive TN Map**: A custom-built map component of Tamil Nadu for regional data visualization and selection.
-   **🤖 AI PVC Groups**: Intelligent WhatsApp group integration for real-time lead generation and industry updates.
-   **📝 Advanced Registration**: Robust form validation using React Hook Form and Zod to ensure data integrity.
-   **📱 Mobile First**: Fully responsive design optimized for all devices.
-   **🔍 SEO Optimized**: Implemented best practices for search engine visibility.

---

## 🛠️ Technology Stack

-   **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
-   **State Management**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
-   **Localization**: [i18next](https://www.i18next.com/)
-   **Routing**: [React Router DOM v6](https://reactrouter.com/)
-   **Build Tool**: [Bun](https://bun.sh/) / [NPM](https://www.npmjs.com/)

---

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher) or [Bun](https://bun.sh/)
-   npm, yarn, or bun

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd tn-pvc-connect-main
    ```

2.  **Install dependencies**:
    ```bash
    bun install
    # or
    npm install
    ```

3.  **Run the development server**:
    ```bash
    bun dev
    # or
    npm run dev
    ```

4.  **Open the application**:
    Navigate to `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── site/      # Project-specific components (Map, Hero, Forms)
│   ├── ui/        # Reusable Shadcn UI components
│   └── seo/       # SEO and meta-tag components
├── context/       # React Context providers (WhatsApp, etc.)
├── pages/         # Route-level components (Home, Register, Network)
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── i18n.ts        # Localization configuration
└── App.tsx        # Main application routing and providers
```

---

## 🛡️ Branding & Security

-   **Branding**: Powered by **Dexaz Group**.
-   **Integrity**: Secured by modern web standards and responsive layout architectures.

---

## 📄 License

Internal use only for Dexaz Group.

---

*Built with ❤️ for the PVC Industry Ecosystem.*
