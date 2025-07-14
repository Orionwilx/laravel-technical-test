import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.{jsx,tsx}', { eager: true });

        // Try different variations of the page name
        const possiblePaths = [
            `./pages/${name}.jsx`,
            `./pages/${name}.tsx`,
            `./pages/${name.toLowerCase()}.jsx`,
            `./pages/${name.toLowerCase()}.tsx`,
        ];

        for (const path of possiblePaths) {
            if (pages[path]) {
                return pages[path];
            }
        }

        // If no exact match found, throw an error
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
