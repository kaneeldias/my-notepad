import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                accent: "var(--accent)",
                textAccent: "var(--textAccent)",
            },
            spacing: {
                small: "5px",
                normal: "10px",
                large: "20px",
            },
            fontSize: {
                xxs: "0.5rem",
            }
        },
    },
    plugins: [],
} satisfies Config;
