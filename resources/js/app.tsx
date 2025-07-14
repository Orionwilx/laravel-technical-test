import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.{jsx,tsx}', { eager: true });

        // Normalize the name to handle different cases
        const normalizedName = name.replace(/\\/g, '/');

        // Try different variations of the page name
        const possiblePaths = [
            // Exact match
            `./pages/${normalizedName}.jsx`,
            `./pages/${normalizedName}.tsx`,

            // Lowercase version
            `./pages/${normalizedName.toLowerCase()}.jsx`,
            `./pages/${normalizedName.toLowerCase()}.tsx`,

            // With index files
            `./pages/${normalizedName}/index.jsx`,
            `./pages/${normalizedName}/index.tsx`,
            `./pages/${normalizedName}/Index.jsx`,
            `./pages/${normalizedName}/Index.tsx`,

            // Lowercase with index files
            `./pages/${normalizedName.toLowerCase()}/index.jsx`,
            `./pages/${normalizedName.toLowerCase()}/index.tsx`,
            `./pages/${normalizedName.toLowerCase()}/Index.jsx`,
            `./pages/${normalizedName.toLowerCase()}/Index.tsx`,

            // Special case mappings for common patterns
            `./pages/auth/${normalizedName.toLowerCase().replace('auth/', '')}.jsx`,
            `./pages/auth/${normalizedName.toLowerCase().replace('auth/', '')}.tsx`,

            // Handle Auth/ prefix specifically
            ...(normalizedName.startsWith('Auth/')
                ? [`./pages/auth/${normalizedName.substring(5).toLowerCase()}.jsx`, `./pages/auth/${normalizedName.substring(5).toLowerCase()}.tsx`]
                : []),
        ];

        for (const path of possiblePaths) {
            if (pages[path]) {
                return pages[path];
            }
        }

        // If no exact match found, throw an error with helpful information
        console.error(`Page not found: ${name}`);
        console.error('Available pages:', Object.keys(pages));
        throw new Error(`Page not found: ${name}`);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
