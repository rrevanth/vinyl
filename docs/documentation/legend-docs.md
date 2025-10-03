Directory structure:
└── legendapp-legend-docs/
    ├── README.md
    ├── bunfig.toml
    ├── package.json
    ├── prettier.config.cjs
    ├── .prettierignore
    └── packages/
        ├── list/
        │   ├── astro.config.mjs
        │   ├── package.json
        │   ├── tailwind.config.cjs
        │   ├── tsconfig.json
        │   ├── public/
        │   │   └── fonts/
        │   │       ├── inter-v13-latin-300.woff2
        │   │       ├── inter-v13-latin-500.woff2
        │   │       ├── inter-v13-latin-600.woff2
        │   │       ├── inter-v13-latin-700.woff2
        │   │       ├── inter-v13-latin-800.woff2
        │   │       ├── inter-v13-latin-900.woff2
        │   │       └── inter-v13-latin-regular.woff2
        │   └── src/
        │       ├── editor.css
        │       ├── env.d.ts
        │       ├── overrides.css
        │       ├── tailwind.css
        │       ├── Components/
        │       │   ├── FlashingDiv/
        │       │   │   └── FlashingDiv.tsx
        │       │   ├── Home/
        │       │   │   ├── AnimatedBackground.tsx
        │       │   │   ├── BackgroundGradients.tsx
        │       │   │   ├── Components.tsx
        │       │   │   ├── CurvedArrowCallout.tsx
        │       │   │   ├── Footer.tsx
        │       │   │   ├── GradientBorder.tsx
        │       │   │   ├── Header.tsx
        │       │   │   ├── Home.tsx
        │       │   │   ├── List.tsx
        │       │   │   ├── ListOfBoxes.tsx
        │       │   │   ├── Preorder.tsx
        │       │   │   ├── PreorderButton.tsx
        │       │   │   ├── SectionBadges.tsx
        │       │   │   ├── SectionEasy.tsx
        │       │   │   ├── SectionFullSync.tsx
        │       │   │   ├── SectionKitComponents.tsx
        │       │   │   ├── SectionKitDevTools.tsx
        │       │   │   ├── SectionKitExamples.tsx
        │       │   │   ├── SectionKitExtension.tsx
        │       │   │   ├── SectionKitHeader.tsx
        │       │   │   ├── SectionKitWrappers.tsx
        │       │   │   ├── SectionLocalFirst.tsx
        │       │   │   ├── SectionPerfChart.tsx
        │       │   │   ├── SectionReact.tsx
        │       │   │   ├── SectionReactivityComponents.tsx
        │       │   │   ├── SectionReactivityPerf.tsx
        │       │   │   ├── SectionSync.tsx
        │       │   │   ├── SectionTop.tsx
        │       │   │   └── Text.tsx
        │       │   ├── Introduction/
        │       │   │   ├── GettingStarted.astro
        │       │   │   ├── GettingStarted.tsx
        │       │   │   ├── Intro.astro
        │       │   │   ├── Intro.tsx
        │       │   │   ├── MemoArrayExample.astro
        │       │   │   ├── MemoArrayExample.tsx
        │       │   │   ├── Primitives.astro
        │       │   │   └── Primitives.tsx
        │       │   ├── Kit/
        │       │   │   ├── TabsRounded.tsx
        │       │   │   ├── TabsUnderlined.tsx
        │       │   │   └── usePosition.ts
        │       │   ├── Overrides/
        │       │   │   ├── Header.astro
        │       │   │   ├── MobileMenuFooter.astro
        │       │   │   └── ThemeProvider.astro
        │       │   ├── Performance/
        │       │   │   ├── TodosExample.astro
        │       │   │   └── TodosExample.tsx
        │       │   ├── PersistSync/
        │       │   │   ├── PersistSync.astro
        │       │   │   └── PersistSync.tsx
        │       │   └── React/
        │       │       ├── AnimatedSwitchExample.astro
        │       │       ├── AnimatedSwitchExample.tsx
        │       │       ├── AutoSavingFormExample.astro
        │       │       ├── AutoSavingFormExample.tsx
        │       │       ├── ComputedExample.astro
        │       │       ├── ComputedExample.tsx
        │       │       ├── EasyExample.astro
        │       │       ├── EasyExample.tsx
        │       │       ├── FormValidationExample.astro
        │       │       ├── FormValidationExample.tsx
        │       │       ├── MemoExample.astro
        │       │       ├── MemoExample.tsx
        │       │       ├── MessageListExample.astro
        │       │       ├── MessageListExample.tsx
        │       │       ├── ModalExample.astro
        │       │       ├── ModalExample.tsx
        │       │       ├── PauseExample.astro
        │       │       ├── PauseExample.tsx
        │       │       ├── Persistence.astro
        │       │       ├── Persistence.tsx
        │       │       ├── RouterExample.astro
        │       │       ├── RouterExample.tsx
        │       │       ├── ShowExample.astro
        │       │       ├── ShowExample.tsx
        │       │       ├── SwitchExample.astro
        │       │       └── SwitchExample.tsx
        │       ├── content/
        │       │   ├── config.ts
        │       │   └── docs/
        │       │       ├── index.mdx
        │       │       ├── api/
        │       │       │   ├── animated.mdx
        │       │       │   ├── gettingStarted.mdx
        │       │       │   ├── performance.mdx
        │       │       │   └── props.mdx
        │       │       ├── benchmarks/
        │       │       │   └── placeholder.mdx
        │       │       ├── examples/
        │       │       │   ├── chatInterfaces.mdx
        │       │       │   └── infiniteScrolling.mdx
        │       │       └── plugins/
        │       │           └── placeholder.mdx
        │       └── pages/
        │           ├── llms-full.txt.ts
        │           └── llms.txt.ts
        ├── motion/
        │   ├── astro.config.mjs
        │   ├── package.json
        │   ├── tsconfig.json
        │   └── src/
        │       ├── env.d.ts
        │       ├── Components/
        │       │   ├── ExampleAnim/
        │       │   │   └── ExampleAnimComponent.tsx
        │       │   └── Introduction/
        │       │       ├── Intro.astro
        │       │       ├── Intro.tsx
        │       │       ├── IntroUsage.astro
        │       │       └── IntroUsage.tsx
        │       └── content/
        │           ├── config.ts
        │           └── docs/
        │               ├── index.mdx
        │               ├── 2-usage/
        │               │   ├── 1-overview.mdx
        │               │   ├── 2-svg.mdx
        │               │   ├── 3-linear-gradient.mdx
        │               │   ├── 4-custom-components.mdx
        │               │   ├── 5-transform-origin.mdx
        │               │   ├── 6-animate-props.mdx
        │               │   ├── 7-configuration.mdx
        │               │   ├── 8-tailwind-CSS.mdx
        │               │   └── 9-animate-presence.mdx
        │               ├── 3-resources/
        │               │   ├── 1-caveats.mdx
        │               │   ├── 2-typescript.mdx
        │               │   └── 3-next.js.mdx
        │               ├── getting-started/
        │               │   └── introduction.mdx
        │               ├── guides/
        │               │   └── example.md
        │               └── reference/
        │                   └── example.md
        ├── shared/
        │   ├── config.ts
        │   ├── package.json
        │   ├── tsconfig.json
        │   └── src/
        │       ├── docSorting.ts
        │       ├── state.ts
        │       └── Components/
        │           ├── Box.tsx
        │           ├── Button.tsx
        │           ├── Checkbox.tsx
        │           ├── CodeSample.tsx
        │           ├── Tabs.tsx
        │           ├── ThemeButton.tsx
        │           ├── Editor/
        │           │   ├── Editor.astro
        │           │   └── Editor.tsx
        │           ├── Install/
        │           │   ├── Install.astro
        │           │   └── Install.tsx
        │           ├── InstallFrameworks/
        │           │   ├── InstallFrameworks.astro
        │           │   └── InstallFrameworks.tsx
        │           ├── ReactOrNativeCode/
        │           │   ├── ReactOrNativeCode.astro
        │           │   └── ReactOrNativeCode.tsx
        │           └── SelectFramework/
        │               ├── SelectFramework.astro
        │               └── SelectFramework.tsx
        ├── state/
        │   ├── astro.config.mjs
        │   ├── package.json
        │   ├── tailwind.config.cjs
        │   ├── tsconfig.json
        │   ├── public/
        │   │   └── fonts/
        │   │       ├── inter-v13-latin-300.woff2
        │   │       ├── inter-v13-latin-500.woff2
        │   │       ├── inter-v13-latin-600.woff2
        │   │       ├── inter-v13-latin-700.woff2
        │   │       ├── inter-v13-latin-800.woff2
        │   │       ├── inter-v13-latin-900.woff2
        │   │       └── inter-v13-latin-regular.woff2
        │   └── src/
        │       ├── editor.css
        │       ├── env.d.ts
        │       ├── overrides.css
        │       ├── tailwind.css
        │       ├── Components/
        │       │   ├── FlashingDiv/
        │       │   │   └── FlashingDiv.tsx
        │       │   ├── Home/
        │       │   │   ├── AnimatedBackground.tsx
        │       │   │   ├── BackgroundGradients.tsx
        │       │   │   ├── Components.tsx
        │       │   │   ├── CurvedArrowCallout.tsx
        │       │   │   ├── Footer.tsx
        │       │   │   ├── GradientBorder.tsx
        │       │   │   ├── Header.tsx
        │       │   │   ├── Home.tsx
        │       │   │   ├── List.tsx
        │       │   │   ├── ListOfBoxes.tsx
        │       │   │   ├── Preorder.tsx
        │       │   │   ├── PreorderButton.tsx
        │       │   │   ├── SectionBadges.tsx
        │       │   │   ├── SectionEasy.tsx
        │       │   │   ├── SectionFullSync.tsx
        │       │   │   ├── SectionKitCLI.tsx
        │       │   │   ├── SectionKitComponents.tsx
        │       │   │   ├── SectionKitDevTools.tsx
        │       │   │   ├── SectionKitExamples.tsx
        │       │   │   ├── SectionKitExtension.tsx
        │       │   │   ├── SectionKitHeader.tsx
        │       │   │   ├── SectionKitWrappers.tsx
        │       │   │   ├── SectionLocalFirst.tsx
        │       │   │   ├── SectionPerfChart.tsx
        │       │   │   ├── SectionReact.tsx
        │       │   │   ├── SectionReactivityComponents.tsx
        │       │   │   ├── SectionReactivityPerf.tsx
        │       │   │   ├── SectionSync.tsx
        │       │   │   ├── SectionTop.tsx
        │       │   │   └── Text.tsx
        │       │   ├── Introduction/
        │       │   │   ├── GettingStarted.astro
        │       │   │   ├── GettingStarted.tsx
        │       │   │   ├── Intro.astro
        │       │   │   ├── Intro.tsx
        │       │   │   ├── MemoArrayExample.astro
        │       │   │   ├── MemoArrayExample.tsx
        │       │   │   ├── Primitives.astro
        │       │   │   └── Primitives.tsx
        │       │   ├── Kit/
        │       │   │   ├── TabsRounded.tsx
        │       │   │   ├── TabsUnderlined.tsx
        │       │   │   └── usePosition.ts
        │       │   ├── Overrides/
        │       │   │   ├── Header.astro
        │       │   │   ├── MobileMenuFooter.astro
        │       │   │   └── ThemeProvider.astro
        │       │   ├── Performance/
        │       │   │   ├── TodosExample.astro
        │       │   │   └── TodosExample.tsx
        │       │   ├── PersistSync/
        │       │   │   ├── PersistSync.astro
        │       │   │   └── PersistSync.tsx
        │       │   └── React/
        │       │       ├── AnimatedSwitchExample.astro
        │       │       ├── AnimatedSwitchExample.tsx
        │       │       ├── AutoSavingFormExample.astro
        │       │       ├── AutoSavingFormExample.tsx
        │       │       ├── ComputedExample.astro
        │       │       ├── ComputedExample.tsx
        │       │       ├── EasyExample.astro
        │       │       ├── EasyExample.tsx
        │       │       ├── FormValidationExample.astro
        │       │       ├── FormValidationExample.tsx
        │       │       ├── MemoExample.astro
        │       │       ├── MemoExample.tsx
        │       │       ├── MessageListExample.astro
        │       │       ├── MessageListExample.tsx
        │       │       ├── ModalExample.astro
        │       │       ├── ModalExample.tsx
        │       │       ├── PauseExample.astro
        │       │       ├── PauseExample.tsx
        │       │       ├── Persistence.astro
        │       │       ├── Persistence.tsx
        │       │       ├── RouterExample.astro
        │       │       ├── RouterExample.tsx
        │       │       ├── ShowExample.astro
        │       │       ├── ShowExample.tsx
        │       │       ├── SwitchExample.astro
        │       │       └── SwitchExample.tsx
        │       ├── content/
        │       │   ├── config.ts
        │       │   └── docs/
        │       │       ├── guides/
        │       │       │   ├── patterns.mdx
        │       │       │   └── performance.mdx
        │       │       ├── intro/
        │       │       │   ├── fast.mdx
        │       │       │   ├── getting-started.mdx
        │       │       │   ├── introduction.mdx
        │       │       │   └── why.mdx
        │       │       ├── other/
        │       │       │   ├── migrating.mdx
        │       │       │   └── other-frameworks.mdx
        │       │       ├── react/
        │       │       │   ├── fine-grained-reactivity.mdx
        │       │       │   ├── helpers-and-hooks.mdx
        │       │       │   ├── react-API.mdx
        │       │       │   ├── react-examples.mdx
        │       │       │   └── tracing.mdx
        │       │       ├── sync/
        │       │       │   ├── crud.mdx
        │       │       │   ├── fetch.mdx
        │       │       │   ├── keel.mdx
        │       │       │   ├── persist-sync.mdx
        │       │       │   ├── supabase.mdx
        │       │       │   └── tanstack-query.mdx
        │       │       └── usage/
        │       │           ├── configuring.mdx
        │       │           ├── helper-functions.mdx
        │       │           ├── observable.mdx
        │       │           └── reactivity.mdx
        │       └── pages/
        │           ├── index.astro
        │           ├── llms-full.txt.ts
        │           └── llms.txt.ts
        └── state-v2/
            ├── astro.config.mjs
            ├── package.json
            ├── tailwind.config.cjs
            ├── tsconfig.json
            └── src/
                ├── editor.css
                ├── env.d.ts
                ├── overrides.css
                ├── tailwind.css
                ├── Components/
                │   ├── FlashingDiv/
                │   │   └── FlashingDiv.tsx
                │   ├── Introduction/
                │   │   ├── Intro.astro
                │   │   ├── Intro.tsx
                │   │   ├── MemoArrayExample.astro
                │   │   ├── MemoArrayExample.tsx
                │   │   ├── Primitives.astro
                │   │   └── Primitives.tsx
                │   ├── Overrides/
                │   │   └── Header.astro
                │   ├── Performance/
                │   │   ├── TodosExample.astro
                │   │   └── TodosExample.tsx
                │   └── React/
                │       ├── AnimatedSwitchExample.astro
                │       ├── AnimatedSwitchExample.tsx
                │       ├── AutoSavingFormExample.astro
                │       ├── AutoSavingFormExample.tsx
                │       ├── ComputedExample.astro
                │       ├── ComputedExample.tsx
                │       ├── EasyExample.astro
                │       ├── EasyExample.tsx
                │       ├── FormValidationExample.astro
                │       ├── FormValidationExample.tsx
                │       ├── MemoExample.astro
                │       ├── MemoExample.tsx
                │       ├── MessageListExample.astro
                │       ├── MessageListExample.tsx
                │       ├── ModalExample.astro
                │       ├── ModalExample.tsx
                │       ├── PauseExample.astro
                │       ├── PauseExample.tsx
                │       ├── Persistence.astro
                │       ├── Persistence.tsx
                │       ├── RouterExample.astro
                │       ├── RouterExample.tsx
                │       ├── ShowExample.astro
                │       ├── ShowExample.tsx
                │       ├── SwitchExample.astro
                │       └── SwitchExample.tsx
                └── content/
                    ├── config.ts
                    └── docs/
                        ├── index.mdx
                        ├── guides/
                        │   ├── patterns.mdx
                        │   ├── performance.mdx
                        │   └── persistence.mdx
                        ├── intro/
                        │   ├── fast.mdx
                        │   ├── getting-started.mdx
                        │   ├── introduction.mdx
                        │   └── why.mdx
                        ├── other/
                        │   ├── experiments.mdx
                        │   ├── migrating.mdx
                        │   └── other-frameworks.mdx
                        ├── react/
                        │   ├── fine-grained-reactivity.mdx
                        │   ├── helpers-and-hooks.mdx
                        │   ├── react-API.mdx
                        │   ├── react-examples.mdx
                        │   ├── react-introduction.mdx
                        │   └── tracing.mdx
                        └── usage/
                            ├── configuring.mdx
                            ├── helper-functions.mdx
                            ├── observable.mdx
                            └── reactivity.mdx


Files Content:

(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
# Legend open-source docs

This is the documentation for all of [Legend's](https://legendapp.com) open-source projects. Currently the Legend-State docs are here and we're in the process of migrating over the Legend-Motion docs.

The documentation uses [Starlight by Astro](https://starlight.astro.build/), with live editing using [React-Live](https://github.com/FormidableLabs/react-live), and example components built in React.

## Running

You can run everything locally with Astro to edit the examples yourself. It uses [bun](https://bun.sh/), though it would probably work with a different package manager.

```bash
cd packages/state
bun i
bun dev
```

## Contributing

We welcome any contributions you'd like to make! If there are any typos or mistakes, additional explanation needed, or you'd like to add more examples, we would love your help.

If you want to make a larger change like adding a page or restructuring, it would be good to have a discussion about that first, so please [post an issue](https://github.com/LegendApp/legend-docs/issues/new).



================================================
FILE: bunfig.toml
================================================
[install]
saveTextLockfile = true


================================================
FILE: package.json
================================================
{
  "name": "legend-docs",
  "type": "module",
  "version": "0.0.1",
  "workspaces": [
    "packages/*"
  ]
}



================================================
FILE: prettier.config.cjs
================================================
// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
    tabWidth: 4,
    printWidth: 120,
    singleQuote: true,
};

module.exports = config;



================================================
FILE: .prettierignore
================================================
# Ignore artifacts:
node_modules
.vscode

# Ignore files
*.mdx
*.md


================================================
FILE: packages/list/astro.config.mjs
================================================
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const isPublish = process.argv[process.argv.length - 1] === '--publishlegend';

// https://astro.build/config
export default defineConfig({
    site: 'https://legendapp.com/open-source/list',
    integrations: [
        starlight({
            title: 'Legend List',
            customCss: ['./src/tailwind.css', './src/editor.css', './src/overrides.css'],
            favicon: '/favicon.ico',
            social: {
                github: 'https://github.com/LegendApp/legend-list',
            },
            editLink: {
                baseUrl: 'https://github.com/LegendApp/legend-docs/edit/main/packages/list/',
            },
            sidebar: [
                {
                    label: 'Documentation',
                    autogenerate: { directory: 'api' },
                },
                {
                    label: 'Examples',
                    autogenerate: { directory: 'examples' },
                },
                // {
                //     label: 'Plugins',
                //     autogenerate: { directory: 'plugins' },
                // },
                // {
                //     label: 'Benchmarks',
                //     autogenerate: { directory: 'benchmarks' },
                // },
            ],
            components: {
                ThemeProvider: './src/Components/Overrides/ThemeProvider.astro',
                ...(isPublish
                    ? {
                          // Override the default `SocialLinks` component.
                          Header: './src/Components/Overrides/Header.astro',
                      }
                    : {}),
            },
        }),
        react(),
        tailwind({ applyBaseStyles: false }),
        sitemap(),
    ],
    // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
    image: {
        service: passthroughImageService(),
    },
    vite: { ssr: { noExternal: ['usehooks-ts', 'react-icons'] } },
});



================================================
FILE: packages/list/package.json
================================================
{
    "name": "list-docs",
    "type": "module",
    "version": "0.0.1",
    "scripts": {
        "dev": "astro dev",
        "devlegend": "astro dev --publishlegend",
        "start": "astro dev",
        "build": "astro build",
        "publish": "astro build --base /open-source/list --publishlegend",
        "preview": "astro preview",
        "astro": "astro"
    },
    "dependencies": {
        "@astrojs/react": "3.1.0",
        "@astrojs/starlight": "0.21.2",
        "@astrojs/starlight-tailwind": "2.0.1",
        "@astrojs/tailwind": "5.1.0",
        "@legendapp/state": "3.0.0-beta.20",
        "@tanstack/react-query": "^4",
        "@types/react": "^18.2.69",
        "@types/react-dom": "^18.2.22",
        "astro": "4.5.9",
        "axios": "^1.6.8",
        "classnames": "^2.5.1",
        "framer-motion": "^11.0.20",
        "prettier": "^3.3.3",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-icons": "^5.0.1",
        "shared": "workspace:*",
        "tailwindcss": "^3.4.1",
        "usehooks-ts": "^3.0.2"
    }
}


================================================
FILE: packages/list/tailwind.config.cjs
================================================
const colors = require("tailwindcss/colors");
const starlightPlugin = require("@astrojs/starlight-tailwind");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}', '../shared/src/**/*.{astro,html,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            opacity: {
                2: '0.02',
                3: '0.03',
                4: '0.04',
            },
            fontSize: {
                h1: '3.5rem',
            },
            colors: {
                tBorder: '#31353e',
                tBg: '#141820',
                tBgDark: 'rgba(0,0,0,0.2)',
                tBgLight: '#1d232f',
                tShadowDark: 'rgba(0, 0, 0, 0.5)',
            },
        },
        colors: {
            gray: {
                50: '#fafafa',
                100: '#f4f4f5',
                200: '#e4e4e7',
                300: '#d4d4d8',
                350: '#cececf',
                400: '#a1a1a4',
                500: '#71717a',
                600: '#52525b',
                700: '#3f3f46',
                750: '#2D2E2F',
                800: '#27272a',
                850: '#1F2025',
                900: '#18181b',
                950: '#131317',
            },
            // coolgray: colors.coolGray,
            black: colors.black,
            white: colors.white,
            red: colors.red,
            blue: colors.sky,
            violet: colors.violet,
            'blue-accent': '#25A2E8',
        },
        screens: {
            '2xs': '400px',
            xs: '480px',
            ...defaultTheme.screens,
        },
    },
    plugins: [starlightPlugin()],
};


================================================
FILE: packages/list/tsconfig.json
================================================
{
    "extends": "astro/tsconfigs/strict",
    "compilerOptions": {
        "jsx": "react-jsx",
        "jsxImportSource": "react",
        "paths": {
            "shared/*": [
                "../shared/*"
            ]
        }
    }
}


================================================
FILE: packages/list/public/fonts/inter-v13-latin-300.woff2
================================================
[Binary file]


================================================
FILE: packages/list/public/fonts/inter-v13-latin-500.woff2
================================================
[Binary file]


================================================
FILE: packages/list/public/fonts/inter-v13-latin-600.woff2
================================================
[Binary file]


================================================
FILE: packages/list/public/fonts/inter-v13-latin-700.woff2
================================================
[Binary file]


================================================
FILE: packages/list/public/fonts/inter-v13-latin-800.woff2
================================================
[Binary file]


================================================
FILE: packages/list/public/fonts/inter-v13-latin-900.woff2
================================================
[Binary file]


================================================
FILE: packages/list/public/fonts/inter-v13-latin-regular.woff2
================================================
[Binary file]


================================================
FILE: packages/list/src/editor.css
================================================
:root {
    --sl-text-code: var(--sl-text-xs);
    --sl-sidebar-width: 16rem;
    --color-fg-default: #c9d1d9;
    --color-bg-code-block: #0e1218;
    --color-border-code-block: #2e3238;
    --color-bg-inline-code-block: rgb(110 118 129 / 40%);
    --color-gray: #8b949e;
    --color-red: #ff7b72;
    --color-green: #7ee787;
    --color-blue: #79c0ff;
    --color-light-blue: #a5d6ff;
    --color-indigo: #a5d6ff;
    --color-purple: #d2a8ff;
    --color-brown: #ffa657;
    --code-border-radius: 0.5em;
    --code-background: var(--astro-code-color-background) !important;
    --astro-code-color-text: var(--color-fg-default);
    --astro-code-color-background: var(--color-bg-code-block);
    --astro-code-token-constant: var(--color-green);
    --astro-code-token-string: var(--color-light-blue);
    --astro-code-token-comment: var(--color-gray);
    --astro-code-token-keyword: var(--color-red);
    --astro-code-token-parameter: var(--color-purple);
    --astro-code-token-function: var(--color-purple);
    --astro-code-token-string-expression: var(--color-blue);
    --astro-code-token-punctuation: var(--color-gray);
    --astro-code-token-link: var(--color-indigo);
}

.mt-section {
    @apply mt-24 md:mt-32 !important;
}

.mt-subsection {
    @apply mt-16 md:mt-24 !important;
}

.astro-code {
    border-radius: var(--code-border-radius);
    border-color: var(--color-border-code-block) !important;
}

.shadow-dark {
    @apply shadow-md shadow-tShadowDark;
}

.home-editor {
    @apply max-w-full;
}

.home-editor .prism-code {
    padding: 16px !important;
    @apply border border-tBorder shadow-dark bg-[#161b22] whitespace-pre !important;
}

code {
    border-radius: 0.25rem;
}

/**
 * GitHub's theme skeleton for prism.js
 * @author Jongwoo Han (@jongwooo)
 * https: //github.com/jongwooo/prism-theme-github/blob/main/themes/prism-github-default-dark.css
 */

code[class*='language-'],
pre[class*='language-'],
.expressive-code pre {
    background-color: var(--color-bg-code-block) !important;
    color: var(--color-fg-default) !important;
    border-color: var(--color-border-code-block) !important;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    tab-size: 2;
    hyphens: none;
    border-radius: var(--code-border-radius) !important;
}

/* Code blocks */

pre[class*='language-'] {
    font-family: 'Fira Code', 'Fira Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace !important;
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: var(--code-border-radius);
}

/* Inline code */

:not(pre) > code[class*='language-'] {
    background-color: var(--color-bg-inline-code-block);
    padding: 0.2em 0.3em;
    border-radius: var(--code-border-radius);
    white-space: normal;
}

@media (width <=700px) {
    :not(pre) > code[class*='language-'] {
        font-size: 0.875rem;
    }
}

.token.comment,
.token.prolog,
.token.cdata {
    color: var(--color-gray);
}

.token.doctype,
.token.punctuation,
.token.entity {
    color: var(--color-fg-default);
}

.token.attr-name,
.token.class-name,
.token.boolean,
.token.constant,
.token.number,
.token.atrule {
    color: var(--color-blue);
}

.token.keyword {
    color: var(--color-indigo);
}

.token.property,
.token.tag,
.token.symbol,
.token.deleted,
.token.important {
    color: var(--color-green);
}

.token.selector,
.token.string,
.token.char,
.token.builtin,
.token.inserted,
.token.regex,
.token.attr-value,
.token.attr-value > .token.punctuation {
    color: var(--color-light-blue);
}

.token.variable,
.token.operator,
.token.function {
    color: var(--color-indigo);
}

.token.url {
    color: var(--color-green);
}

/* HTML overrides */

.token.attr-value > .token.punctuation.attr-equals,
.token.special-attr > .token.attr-value > .token.value.css {
    color: var(--color-fg-default);
}

/* CSS overrides */

.language-css .token.selector {
    color: var(--color-green);
}

.language-css .token.property {
    color: var(--color-blue);
}

.language-css .token.important,
.language-css .token.atrule .token.rule {
    color: var(--color-red);
}

/* JS overrides */

.language-js .token.keyword,
.language-javascript .token.keyword {
    color: var(--color-red);
}

.language-js .token.operator,
.language-js .token.constant,
.language-js .token.boolean,
.language-js .token.number,
.language-js .token.atrule,
.language-javascript .token.operator,
.language-javascript .token.constant,
.language-javascript .token.boolean,
.language-javascript .token.number,
.language-javascript .token.atrule {
    color: var(--color-blue);
}

.language-js .token.function,
.language-javascript .token.function {
    color: var(--color-purple);
}

.language-js .token.attr-name,
.language-js .token.class-name,
.language-js .token.function-variable,
.language-javascript .token.attr-name,
.language-javascript .token.class-name,
.language-javascript .token.function-variable {
    color: var(--color-brown);
}

/* JSX overrides */

.language-jsx .token.keyword,
.language-tsx .token.keyword {
    color: var(--color-red);
}

.language-jsx .token.function,
.language-tsx .token.function {
    color: var(--color-purple);
}

.language-jsx .token.function-variable,
.language-tsx .token.function-variable {
    color: var(--color-brown);
}

.language-jsx .token.punctuation,
.language-tsx .token.punctuation {
    color: var(--color-blue);
}

.language-jsx .token.class-name,
.language-tsx .token.class-name {
    color: var(--color-green);
}

.language-jsx .token.attr-name,
.language-tsx .token.attr-name {
    color: var(--color-blue);
}

.language-jsx .token.string,
.language-tsx .token.string {
    color: var(--color-indigo);
}

/* JSON overrides */

.language-json .token.operator {
    color: var(--color-fg-default);
}

.language-json .token.null.keyword {
    color: var(--color-blue);
}

/* Java overrides */

.language-java .token.keyword {
    color: var(--color-red);
}

.language-java .token.operator,
.language-java .token.constant,
.language-java .token.boolean,
.language-java .token.number,
.language-java .token.atrule {
    color: var(--color-blue);
}

.language-java .token.function {
    color: var(--color-purple);
}

.language-java .token.attr-name,
.language-java .token.function-variable {
    color: var(--color-green);
}

/* Kotlin overrides */

.language-kotlin .token.keyword {
    color: var(--color-red);
}

.language-kotlin .token.operator,
.language-kotlin .token.constant,
.language-kotlin .token.boolean,
.language-kotlin .token.number,
.language-kotlin .token.atrule {
    color: var(--color-blue);
}

.language-kotlin .token.function {
    color: var(--color-purple);
}

.language-kotlin .token.attr-name,
.language-kotlin .token.function-variable {
    color: var(--color-green);
}

/* Go overrides */

.language-go .token.keyword {
    color: var(--color-red);
}

.language-go .token.operator,
.language-go .token.constant,
.language-go .token.boolean,
.language-go .token.number,
.language-go .token.atrule {
    color: var(--color-blue);
}

.language-go .token.function {
    color: var(--color-purple);
}

.language-go .token.attr-name,
.language-go .token.function-variable {
    color: var(--color-green);
}

/* YAML overrides */

.language-yml .token.atrule,
.language-yaml .token.atrule {
    color: var(--color-green);
}

/* Dockerfile overrides */

.language-dockerfile .token.keyword {
    color: var(--color-red);
}

.language-dockerfile .token.function {
    color: var(--color-purple);
}

.language-dockerfile .token.punctuation {
    color: var(--color-blue);
}

.language-dockerfile .token.attr-name,
.language-dockerfile .token.class-name {
    color: var(--color-green);
}

.language-dockerfile .token.string {
    color: var(--color-indigo);
}

/* General */

.token.bold {
    font-weight: bold;
}

.token.italic {
    font-style: italic;
}

.token.entity {
    cursor: help;
}

.token.namespace {
    opacity: 0.8;
}



================================================
FILE: packages/list/src/env.d.ts
================================================
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />



================================================
FILE: packages/list/src/overrides.css
================================================
:root {
    --sl-color-accent-high: #09d;
    --sl-color-bg-nav: rgba(13, 14, 15, 0.8);
    --sl-color-bg-sidebar: #0d0e0f;
    --sl-font: 'Inter', ui-sans-serif, system-ui, sans-serif;
    @media (min-width: 80rem) {
        --sl-content-width: 48rem;
    }
    @media (min-width: 85rem) {
        --sl-content-width: 52rem;
    }
    .starlight-aside__title {
        font-size: var(--sl-text-h6);
    }
    .starlight-aside__content {
        @apply text-base;
    }
}

.content a:hover {
    color: #0ae !important;
}

aside {
    @apply rounded;
}

/* inter-300 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    src: url('fonts/inter-v13-latin-300.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-regular - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('fonts/inter-v13-latin-regular.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-500 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    src: url('fonts/inter-v13-latin-500.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-600 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    src: url('fonts/inter-v13-latin-600.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-700 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('fonts/inter-v13-latin-700.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-800 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    src: url('fonts/inter-v13-latin-800.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-900 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    src: url('fonts/inter-v13-latin-900.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}



================================================
FILE: packages/list/src/tailwind.css
================================================
@tailwind base;
@tailwind components;
@tailwind utilities;
.bold-consistent-width:after {
    @apply block font-bold h-[1px] opacity-0 overflow-hidden invisible;
    content: attr(data-text);
}

.flex-2 {
    flex: 2 1 0%;
}

.shadow-bold {
    text-shadow: 0px 0px 1px white;
}


================================================
FILE: packages/list/src/Components/FlashingDiv/FlashingDiv.tsx
================================================
import classNames from "classnames";
import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { type ReactNode } from "react";

export function FlashingDiv({
  span,
  className,
  classNameOuter,
  bg,
  pad,
  children,
}: {
  span?: boolean;
  className?: string;
  classNameOuter?: string;
  bg?: boolean;
  pad?: boolean;
  children: ReactNode;
}) {
  const controls = useAnimation();

  useEffect(() => {
    controls
      .start({
        opacity: 0.2,
        transition: {
          duration: 0.1,
        },
      })
      .then(() => {
        controls.start({
          opacity: 0,
          transition: {
            duration: 0.2,
          },
        });
      });
  });

  return (
    <span
      className={classNames(
        "relative",
        span ? "p-1" : "block p-1",
        classNameOuter
      )}
    >
      <motion.div
        animate={controls}
        className="absolute inset-0 rounded-lg opacity-0 bg-blue-500"
      />
      <span
        className={classNames(
          "relative z-10 rounded-lg",
          bg || "bg-gray-800",
          pad && 'p-4',
          span ? "px-2" : "block",
          className
        )}
      >
        {children}
      </span>
    </span>
  );
}



================================================
FILE: packages/list/src/Components/Home/AnimatedBackground.tsx
================================================
import type { Observable } from "@legendapp/state";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
}

interface Props {
  state$: Observable<{ speed: number }>;
}

export const AnimatedBackground: React.FC<Props> = ({ state$ }) => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null);
  const refBg = useRef<HTMLDivElement | null>(null);
  const NumParticles = 50;

  useEffect(() => {
    const canvas = refCanvas.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    let oldWidth = canvas.width;
    let oldHeight = canvas.height;

    const particles: Particle[] = [];

    const resizeCanvas = () => {
      const container = document.getElementById("background-container");
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }

      particles.forEach((particle) => {
        particle.x = (particle.x / oldWidth) * canvas.width;
        particle.y = (particle.y / oldHeight) * canvas.height;
      });

      oldWidth = canvas.width;
      oldHeight = canvas.height;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const createParticle = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    };

    for (let i = 0; i < NumParticles; i++) {
      createParticle();
    }

    const opacityLevels = Array.from(
      { length: 101 },
      (_, i) => 0.4 * (1 - i / 100)
    );

    const strokeStyles = opacityLevels.map(
      (opacity) => `rgba(100, 149, 237, ${opacity})`
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    //   ctx.fillStyle = "rgba(0, 0, 50, 0.05)";
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);

      const state = state$.get();
      const stateSpeed = +state.speed;
      const speed = (stateSpeed - 1) * 10 + 1;
      const num = NumParticles + speed * 5;
      const opacityRaw = (0.3 + (stateSpeed / 30))
      const opacity = Math.round(opacityRaw * 100) / 100;

      if (num < particles.length) {
        particles.length = num;
      }
      while (num > particles.length) {
        createParticle();
      }

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.dx * speed;
        particle.y += particle.dy * speed;

        if (particle.x < 0 || particle.x >= canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y >= canvas.height - particle.radius) particle.dy *= -1;

        const x = particle.x;
        const y = particle.y;

        ctx.beginPath();
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 171, 245, ${opacity})`;
        ctx.fill();

        for (let j = i; j < particles.length; j++) {
          const particle2 = particles[j];
          const x2 = particle2.x;
          const y2 = particle2.y;
          const dx = x - x2;
          const dy = y - y2;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = strokeStyles[Math.floor(distance)];
            ctx.lineWidth = 0.5;
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div
        ref={refBg}
        className="absolute inset-0 bg-gradient-to-b from-[#112c53] to-[#0d1117] -z-10"
        // style={{ height: '800%'}}
      />
      <canvas ref={refCanvas} className="!mt-0" />
    </div>
  );
};



================================================
FILE: packages/list/src/Components/Home/BackgroundGradients.tsx
================================================
import classNames from "classnames";

export function BackgroundGradients() {
    const light = '1b1b27';
    const dark = "0d1117";
  return (
      <div
          className="absolute inset-0 background-gradients -z-10"
          style={{
              background: `linear-gradient(
            to bottom,
            #${dark} 0%,
            #${light} 31%,
            #${light} 35%,
            #${dark} 66%,
            #${light} 90%
          )`,
          }}
      />
  );
}


================================================
FILE: packages/list/src/Components/Home/Components.tsx
================================================
import classNames from "classnames";

export const SectionTitle = ({
  text,
  description,
}: {
  text: string;
  description: string;
}) => {
  return (
    <div className="mx-auto grid grid-cols-2 gap-16">
      <h2 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
        {text}
      </h2>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-400">
        {description}
      </p>
    </div>
  );
};

export const DemoBox = ({
  children,
  width,
  height,
  blur,
}: {
  children: any;
  width?: number;
  height?: number;
  blur?: boolean;
}) => {
  return (
    <div
      className={classNames(
        "rounded-lg p-4 relative text-gray-200 border border-tBorder shadow-tShadowDark",
        blur && "backdrop-blur-sm bg-black/20"
      )}
      style={{ width, height }}
    >
      {children}
    </div>
  );
};



================================================
FILE: packages/list/src/Components/Home/CurvedArrowCallout.tsx
================================================
import React from "react";

const CurvedArrowCallout = ({
  width = 200,
  height = 100,
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 220 100">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="10 0, 0 3.5, 10 7" fill="#3b82f6" />
        </marker>
      </defs>
      <path
        d="M190,50 Q100,0 10,50"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3.5"
        markerStart="url(#arrowhead)"
      />
    </svg>
  );
};

export default CurvedArrowCallout;



================================================
FILE: packages/list/src/Components/Home/Footer.tsx
================================================
export function Footer() {
    return (
        <div className="text-center text-white/50 pt-32">
            Created by <a href="https://twitter.com/jmeistrich">Jay Meistrich</a>. Follow me on{' '}
            <a href="https://twitter.com/jmeistrich">Twitter</a> or{' '}
            <a href="https://github.com/LegendApp/legend-state">GitHub</a> for updates.
        </div>
    );
}



================================================
FILE: packages/list/src/Components/Home/GradientBorder.tsx
================================================
import classNames from "classnames";
import type { ReactNode } from "react";

export function GradientBorder({ children, className, style }: { children: ReactNode, className?: string, style?: CSSProperties }) {
  return (
    <div className={classNames("grad-stroke", className)} style={style}>
      {children}
      <div className="gs" />
    </div>
  );
}



================================================
FILE: packages/list/src/Components/Home/Header.tsx
================================================
import { createElement, type ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  fontWeight?: string;
  leading?: string;
  color?: `${'!' | ''}text-${string}`;
}

export function Header({
  children,
  color,
  size,
  className,
  leading,
  fontWeight,
}: Props) {
  return createElement(
    size,
    {
      className: classNames(
        color || "text-white",
        leading || "!leading-normal",
        fontWeight || "font-bold",
        className,
      ),
    },
    children
  );
}



================================================
FILE: packages/list/src/Components/Home/Home.tsx
================================================
import { useMount, useObservable } from '@legendapp/state/react';
import React, { useMemo, useRef } from 'react';
import { Button } from 'shared/src/Components/Button';
import { AnimatedBackground } from './AnimatedBackground';
import { Header } from './Header';
import { Preorder } from './Preorder';
import { SectionBadges } from './SectionBadges';
import { SectionEasy } from './SectionEasy';
import { SectionFullSync } from './SectionFullSync';
import { SectionKitComponents } from './SectionKitComponents';
import { SectionKitExamples } from './SectionKitExamples';
import { SectionKitExtension } from './SectionKitExtension';
import { SectionKitWrappers } from './SectionKitWrappers';
import { SectionPerfChart } from './SectionPerfChart';
import { SectionReact } from './SectionReact';
import { SectionFineGrained } from './SectionReactivityPerf';
import { SectionSync } from './SectionSync';
import { SectionTop } from './SectionTop';
import { Text } from './Text';
import { BackgroundGradients } from './BackgroundGradients';
import { SectionKitHeader } from './SectionKitHeader';
import { Footer } from './Footer';

// function useScrollForHeader() {
//   useMount(() => {
//     const header = document.getElementsByTagName("header")[0];
//     // const scroller =
//     const handleScroll = () => {
//       const opacity = Math.min(document.documentElement.scrollTop / 200, 1);
//       const color = `rgba(0,0,0,${opacity})`;
//       header.style.setProperty("background-color", color, "important");
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Initial call to set the initial scroll position
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   });
// }

const EnableKit = true;

const LandingPage = () => {
    const state$ = useObservable({ speed: 2 });
    const refKit = useRef<HTMLDivElement>(null);
    //   useScrollForHeader();

    const onClickGotoKit = () => {
        refKit.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div id="scroller" className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col text-white">
            <div className="fixed inset-0 bg-[#0d1117]" />
            <main className="z-10 flex-grow !mt-0">
                <div className="relative" id="background-container">
                    <div className="max-w-5xl mx-auto pt-28 px-4 !mt-0">
                        <AnimatedBackground state$={state$} />
                        <div className="max-w-3xl z-10 relative !mt-0">
                            <Header
                                size="h1"
                                className="!text-3xl sm:!text-h1 !font-bold !leading-tight text-center md:text-left"
                            >
                                High performance state and local first sync
                            </Header>
                            <div className="max-w-2xl pt-2 pb-4">
                                <Text className="md:text-lg">
                                    Legend State is an extremely fast signal-based state library with fine-grained
                                    reactivity and a powerful sync system that works with any backend.
                                </Text>
                            </div>
                            <div className="flex flex-col xs:flex-row xs:gap-8 !mt-0 items-center">
                                <a href="/open-source/state/v3/intro/introduction/" className="no-underline">
                                    <Button color="bg-blue-700/80 hover:bg-blue-600">Get started</Button>
                                </a>
                                <div
                                    className="!mt-0 text-white/80 hover:text-white cursor-pointer font-medium bg-black/30 border border-white/10 shadow-tShadowDark xs:bg-none xs:shadow-none hover:bg-black/30 hover:shadow-tShadowDark px-4 h-10 rounded-lg transition-colors gap-3 flex items-center"
                                    onClick={onClickGotoKit}
                                >
                                    <div>Check out Legend Kit</div>
                                    <div className="!mt-0">{'>'}</div>
                                </div>
                            </div>
                        </div>

                        <SectionTop state$={state$} />
                        <SectionBadges />
                    </div>
                </div>
                <div className="!mt-0 relative">
                    <BackgroundGradients />
                    <div className="max-w-5xl mx-auto !mt-0 relative pb-12">
                        <SectionFineGrained />
                        <SectionEasy />
                        {/* <SectionReact /> */}

                        <SectionPerfChart />
                        {/* <SectionReactivityComponents /> */}

                        <SectionSync />
                        <SectionFullSync />
                        {/* <SectionLocalFirst /> */}
                        <div ref={refKit} />

                        {EnableKit && (
                            <>
                                <SectionKitHeader />

                                <SectionKitComponents />
                                <SectionKitExtension />
                                <SectionKitWrappers />
                                <SectionKitExamples />
                                {/* <SectionKitDevTools /> */}
                                <Preorder />
                            </>
                        )}
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;



================================================
FILE: packages/list/src/Components/Home/List.tsx
================================================
import classNames from "classnames";
import { Header } from "./Header";

interface Props {
  items: string[];
  title?: string;
  border?: boolean;
  headerSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

function ListItem({ item }: { item: string }) {
  return (
    <li className="flex items-center space-x-2">
      <div className="w-1 h-4 bg-blue-600 rounded-sm mr-1 sm:mr-2"></div>
      <span>{item}</span>
    </li>
  );
}

export function List({ items, title, border, headerSize }: Props) {
  return (
    <div
      className={classNames("!mt-0", border && "border border-tBorder shadow-tShadowDark bg-tBg rounded-lg p-3 sm:p-4")}
    >
      {title && <Header size={headerSize || 'h5'}>{title}</Header>}
      <ul className="text-gray-400 font-medium space-y-2 list-none pl-0 sm:pl-2">
        {items.map((item) => (
          <ListItem key={item} item={item} />
        ))}
      </ul>
    </div>
  );
}


================================================
FILE: packages/list/src/Components/Home/ListOfBoxes.tsx
================================================
import classNames from "classnames";

interface Props {
  items: string[];
  itemSize?: `text-${string}`;
  itemWeight?: `font-${string}`;
  className?: string;
}

export const ListOfBoxes = ({
  items,
  itemSize,
  itemWeight,
  className,
}: Props) => {
  return (
    <div className={classNames("flex mt-16", className)}>
      <div className="flex flex-wrap gap-2 max-w-3xl">
        {items.map((item) => (
          <div
            key={item}
            className="!mt-0 px-8 py-2 text-center whitespace-pre bg-tBgLight rounded-lg"
          >
            <div
              className={classNames(
                "text-white",
                itemSize,
                itemWeight
              )}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



================================================
FILE: packages/list/src/Components/Home/Preorder.tsx
================================================
import { observer, useObservable } from '@legendapp/state/react';
import { Header } from './Header';
import { Text } from './Text';
import { PreorderButton } from './PreorderButton';

export const Preorder = observer(function Preorder() {
    const FullPrice = 399
    const DiscountedPrice = 199;
    const Discount = FullPrice - DiscountedPrice;
    const DiscountPercentage = (Discount / FullPrice) * 100;
    return (
        <div className="sm:flex items-center gap-8 mt-section px-4">
            <div className="flex-1">
                <div className="max-w-lg">
                    <Header size="h1">Buy once, yours forever</Header>
                    <Text>
                        Lifetime access to an ever-growing library of helpers, components, hooks, example projects, and
                        reactive components.
                    </Text>
                    <Text>Now available for pre-order at a discount for a limited time.</Text>
                    <Text>Releasing shortly after Legend-State 3.0.</Text>
                </div>
            </div>
            <div className="rounded-xl p-8 border border-tBorder bg-gradient-to-br from-[#d556e3] to-[#3c59fd] max-w-sm mx-auto !mt-8 sm:!mt-0">
                <Header size="h2">Legend Kit</Header>
                <Text>
                    Get lifetime access to everything in Legend Kit for a single one-time purchase, including all future
                    updates. Preorder now to save ${Discount} and accelerate Legend Kit's development.
                </Text>
                <div className="text-4xl !mt-8 line-through opacity-60">${FullPrice}</div>
                <div className="text-5xl !mt-2">${DiscountedPrice}</div>
                <Text className="!mt-2">
                    Save ${Discount} ({DiscountPercentage.toFixed(0)}% off) with preorder!
                </Text>
                <PreorderButton color="white" className="!mt-8">
                    Preorder Now
                </PreorderButton>
            </div>
        </div>
    );
});



================================================
FILE: packages/list/src/Components/Home/PreorderButton.tsx
================================================
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Button } from 'shared/src/Components/Button';

interface PreorderButtonProps {
    color: 'white' | 'gradient';
    className?: string;
    children: ReactNode;
}

export function PreorderButton({ color, className, children }: PreorderButtonProps) {
    const isProd = import.meta.env.PROD;

    const paymentLink = isProd
        ? 'https://buy.stripe.com/4gw03ZgJle3V0zS288'
        : 'https://buy.stripe.com/test_4gwdUv5Zl5Gye1qaEE';

    return (
        <a href={paymentLink} target="_blank" className='no-underline'>
            <Button
                color={classNames(
                    'font-semibold',
                    color === 'white' && 'bg-white hover:bg-white/70 text-black/90 shadow-md',
                    color === 'gradient' &&
                        'bg-gradient-to-br from-[#d556e3] to-[#3c59fd] hover:from-[#dd70e7] hover:to-[#5370fd] text-white/90',
                )}
                className={className}
            >
                {children}
            </Button>
        </a>
    );
}



================================================
FILE: packages/list/src/Components/Home/SectionBadges.tsx
================================================
import classNames from "classnames";
import { Header } from "./Header";
import { Text } from "./Text";

export function SectionBadges() {
  const badges = [
    { title: "📚  App State", subtitle: "Local and global" },
    { title: "☁️  Remote State", subtitle: "Sync with any backend" },
    { title: "💾  Persistence", subtitle: "Both web and mobile" },
    { title: "😀  Great DX", subtitle: "Easy and intuitive" },
    { title: "🚀  Fast", subtitle: "#1 in performance" },
    { title: "⚡️  Fine-Grained", subtitle: "Reactivity" },
  ];

  return (
    <div className="text-center pt-16 !mt-0">
      <Header size="h1">All in One</Header>
      <Text className="max-w-lg mx-auto text-left">
        Legend-State is the fastest React state library, and it takes care of
        all of the hard sync and caching stuff for you.
      </Text>
      <Badges badges={badges} className={"!mt-8"} />
    </div>
  );
}

interface PropsBadges {
  badges: { title: string; subtitle?: string }[];
  titleSize?: `text-${string}`;
  titleWeight?: `font-${string}`;
  className?: string;
}

const Badges = ({ badges, titleSize, titleWeight, className }: PropsBadges) => {
  return (
    <div className={classNames("flex justify-center max-w-5xl", className)}>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:flex justify-center border bg-tBg border-tBorder rounded-lg divide-x divide-tBorder shadow-tShadowDark backdrop-blur-sm bg-opacity-0">
        {badges.map(({ title, subtitle }, i) => (
          <div
            key={title}
            className={classNames("!mt-0 px-3 sm:px-8 py-3 lg:py-4 text-center whitespace-pre", i === 5 && 'xl:hidden', i > 1 && 'border-t border-tBorder lg:border-0')}
          >
            <div
              className={classNames(
                "text-white",
                titleSize || "text-lg",
                titleWeight || "font-bold"
              )}
            >
              {title}
            </div>
            {subtitle && (
              <div className="text-sm sm:text-md text-white/60 pt-1 !mt-0">{subtitle}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

//   const badges = [
//     { title: "Fine Grained Reactivity", subtitle: "for maximum performance" },
//     { title: "React", subtitle: "2kb" },
//     { title: "Sync", subtitle: "with any backend" },
//     { title: "Persistence", subtitle: "both web and mobile" },
//     { title: "Stars", subtitle: "2.6k+" },
//   ];



================================================
FILE: packages/list/src/Components/Home/SectionEasy.tsx
================================================
import { observable, type Observable } from '@legendapp/state';
import { Memo, Reactive, observer, useObservable } from '@legendapp/state/react';
import { useRef } from 'react';
import { Button } from 'shared/src/Components/Button';
import { Editor } from 'shared/src/Components/Editor/Editor';
import { FlashingDiv } from '../FlashingDiv/FlashingDiv';
import { DemoBox, SectionTitle } from './Components';
import { Header } from './Header';
import { Text } from './Text';

const CodeDemoTop = `
const settings$ = observable({ ui: { theme: 'dark' }})

// Infinitely nested observables
const theme$ = settings$.ui.theme

// get returns the raw data
theme$.get() // 'dark'

// set sets
theme$.set('light')

// Computed observables with just a function
const isDark$ = observable(() =>
    theme$.get() === 'dark'
)

// observe re-runs when observables change
observe(() => {
  console.log(theme$.get())
})

// use$ re-renders when observables change
const Component = () => {
  const theme = use$(settings$.ui.theme)

  return <div>{theme}</div>
})
`;

const DemoEasy = () => {
    return (
        <Editor
            code={CodeDemoTop}
            noInline
            renderCode={`;render(<div><Box><EasyComponent /></Box></div>)`}
            showEditing={false}
            scope={{
                useRef,
                useObservable,
                Button,
                Memo,
                observable,
                Box: DemoBox,
                FlashingDiv,
                Reactive,
                observer,
            }}
            classNameEditor="home-editor"
            hideDemo
            noError
        />
    );
};

export const SectionEasy = () => {
    return (
        <div className="md:flex mt-section gap-16 items-center px-4">
            <div className="flex-1">
                <Header size="h2" className="!mt-0">
                    🦄 Incredibly easy to use
                </Header>
                <Text className="pt-2 max-w-2xl mx-auto">
                    When you get() values while observing, it tracks them and re-runs when they change. No boilerplate,
                    no selectors, no dependency arrays, just easy reactivity.
                </Text>
            </div>
            <div className="mx-auto max-w-lg flex-2 !mt-8 !md:mt-0 [&>div]:!mt-0 md:min-w-[480px]">
                <DemoEasy />
            </div>
        </div>
    );
};

/*
        <div className="inline-flex items-center gap-2 border border-tBorder rounded-full px-4 py-1 text-blue-600 text-xs font-semibold">
          <div className="bg-blue-600 rounded-full w-3 h-1.5 text-white text-xs font-semibold" />
          Easy
        </div>
        */



================================================
FILE: packages/list/src/Components/Home/SectionFullSync.tsx
================================================
import { observable, type ObservableParam } from "@legendapp/state";
import { Memo, observer, useObservable } from "@legendapp/state/react";
import { Editor } from "shared/src/Components/Editor/Editor";
import { SectionTitle } from "./Components";
import { useMemo, useRef } from "react";
import { TabsUnderlined } from "../Kit/TabsUnderlined";
import { Header } from "./Header";
import { Text } from "./Text";
import { CodeSample } from "shared/src/Components/CodeSample";
import { synced } from "@legendapp/state/sync";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { useMeasure } from "@legendapp/state/react-hooks/useMeasure";
import { TabsRounded } from "../Kit/TabsRounded";

const Backends = {
  keel: {
    text: "Keel",
    code: `
const { mutations, queries } = client.api

const messages$ = observable(syncedKeel({
  list: queries.listMessages,
  create: mutations.createMessages,
  update: mutations.updateMessages,
  delete: mutations.deleteMessages,
  persist:
`,
  },
  supabase: {
    text: "Supabase",
    code: `
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const messages$ = observable(syncedSupabase({
  supabase,
  collection: 'messages',
  select: (from) => from.select('id,text'),
  filter: (select) => select.eq('user_id', uid),
  realtime: { filter: \`user_id=eq.\${uid}\` },
  persist:
`,
  },
  firebase: {
    text: "Firebase",
    code: `
const messages$ = observable(syncedFirebase({
  refPath: (uid) => \`/users/\${uid}/messages/\`,
  realtime: true,
  mode: 'merge',
  persist:
`,
  },
  crud: {
    text: "CRUD",
    code: `
const messages$ = observable(syncedCrud({
  list: getMessages,
  create: createMessages,
  update: updateMessages,
  delete: deleteMessages,
  persist:
`,
  },
  query: {
    text: "TanStack Query",
    code: `
const messages$ = observable(syncedQuery({
  queryClient,
  query: {
    queryKey: ['messages'],
    queryFn: async () => {
      return fetch('https://myurl/messages').then((v) => v.json())
    },
  },
  mutation: {
    mutationFn: async (variables) => {
      return fetch(
        'https://myurl/messages',
        { body: JSON.stringify(variables), method: 'POST' }
      )
    },
  },
  persist:
`,
  },
  fetch: {
    text: "Fetch",
    code: `
const messages$ = observable(syncedFetch({
  get: 'https://myurl/messages',
  set: 'https://myurl/messages'
  persist:
`,
  },
  synced: {
    text: "Synced",
    code: `
const messages$ = observable(synced({
  get: () =>
    fetch('https://myurl/messages').then((res) => res.json()),
  set: ({ value }) =>
    fetch('https://myurl/messages', { method: 'POST', data: JSON.stringify(value) })
  persist:
`,
  },
} satisfies Record<string, { text: string; code: string }>;

const Persistences = {
  LocalStorage: "ObservablePersistLocalStorage",
  IndexedDB: "ObservablePersistIndexedDB",
  MMKV: "ObservablePersistMMKV",
  AsyncStorage: "ObservablePersistAsyncStorage",
};

const CodeDemoPersist = (persistence: string) => `
  // Persist locally
  persist: {
    plugin: ${persistence},
    name: 'messages',
    retrySync: true // Retry sync after reload
  },
  changesSince: 'last-sync' // Sync only diffs
`;

type Backend = keyof typeof Backends;
type Persistence = keyof typeof Persistences;

const DemoSync = ({
  backend,
  persistence,
}: {
  backend: Backend;
  persistence: Persistence;
}) => {
  const code = `${Backends[backend].code.replace(
    "persist:",
    CodeDemoPersist(Persistences[persistence]).trim()
  )}}))`;

  return (
    <Editor
      code={code}
      noInline
      renderCode={`;render(null)`}
      hideDemo
      noError
      showEditing={false}
      scope={{
        Memo,
        observable,
      }}
      classNameEditor="home-editor"
    />
  );
};

export const SectionFullSync = observer(function SectionFullSync() {
  const backend$ = useObservable<Backend>("keel");
  const persistence$ = useObservable<Persistence>("LocalStorage");
  const backends = useMemo(() => Object.keys(Backends) as Backend[], []);
  const persistences = useMemo(
    () => Object.keys(Persistences) as Persistence[],
    []
  );

  return (
    <div className="mt-section max-w-3xl mx-auto sm:px-4">
      <div className="sm:border border-tBorder rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 !mt-8 sm:bg-tBgDark sm:shadow-tShadowDark">
        <Header size="h2" className="mb-4">
          Local First with any backend
        </Header>
        <div>
          <Text className="max-w-lg">
            Use one of our ever-expanding library of sync plugins or build your
            own on top of the CRUD plugin or the basic synced plugin.
          </Text>
          <Header size="h6" className="pt-8">
            Backend
          </Header>
          <div className="flex gap-4">
            <TabsRounded
              tabs={backends}
              tabText={(tab) => Backends[tab].text}
              $activeTab={backend$}
            />
          </div>
          <Header size="h6" className="!mt-8">
            Persistence
          </Header>
          <div className="flex gap-4">
            <TabsRounded
              tabs={persistences}
              $activeTab={persistence$}
            />
          </div>
        </div>
        <div>
          <DemoSync backend={backend$.get()} persistence={persistence$.get()} />
        </div>
      </div>
    </div>
  );
});



================================================
FILE: packages/list/src/Components/Home/SectionKitComponents.tsx
================================================
import { Header } from "./Header";
import { List } from "./List";
import { Text } from "./Text";

export function SectionKitComponents() {
  return (
    <div className="mt-subsection px-4">
      <Header size="h3">📚 Tons of tools to get started quickly</Header>
      <Text className="max-w-4xl">
        High performance headless components, general purpose observables, transformer computeds, React hooks that don't re-render, and observable tools for popular frameworks.
      </Text>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm sm:gap-4 sm:text-base">
        <List
          title="Optimized Components"
          items={["Tabs", "Modals", "Forms", "Toasts", "More..."]}
          border
        />
        <List
          title="Observable helpers"
          items={[
            "currentDate",
            "createDraft",
            "stringAsNumber",
            "setAsString",
            "More...",
          ]}
          border
        />
        <List
          title="React hooks"
          items={[
            "useMeasure",
            "usePosition",
            "useScrolled",
            "useHover",
            "More...",
          ]}
          border
        />
        <List
          title="Framework hooks"
          items={[
            "useRoutes",
            "useRouteHistory",
            "useCanRender",
            "usePauseProvider",
            "More...",
          ]}
          border
        />
      </div>
    </div>
  );
}



================================================
FILE: packages/list/src/Components/Home/SectionKitDevTools.tsx
================================================
export function SectionKitDevTools() {
  return (
    <div className="flex">
      <h3>Dev Tools</h3>
      <p className="text-gray-400">More details coming soon...</p>
    </div>
  );
}



================================================
FILE: packages/list/src/Components/Home/SectionKitExamples.tsx
================================================
import { Header } from "./Header";
import { List } from "./List";
import { ListOfBoxes } from "./ListOfBoxes";
import { Text } from "./Text";

export function SectionKitExamples() {
  return (
    <div className="mt-subsection px-4">
      <Header size="h3">👩‍🏫 Example projects</Header>
      <Text>
        Full open-source apps built with Legend-State that you can use as a
        starting point or for reference for best practices.
      </Text>
      <ListOfBoxes
        items={["JSON Viewer", "Trellix Clone", 'Chat app', "More..."]}
        className="!mt-8"
      />
    </div>
  );
}



================================================
FILE: packages/list/src/Components/Home/SectionKitExtension.tsx
================================================
import { observer, useObservable } from "@legendapp/state/react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Header } from "./Header";
import { Text } from "./Text";
import videoSrc from "../../assets/LegendKitExtension.mp4";
import videoFirstFrame from "../../assets/LegendKitExtension.png?url";

const TransitionSpringFast: Transition = {
  type: "spring",
  duration: 0.5,
  bounce: 0.2,
};

export const SectionKitExtension = observer(function SectionKitExtension() {
  const isOpen$ = useObservable(false);

  return (
    <div className="mt-subsection px-4">
      <Header size="h3">🧑‍💻 VS Code Extension</Header>
      <Text>
        A contextually aware coding assistant to accelerate your development
        speed
      </Text>
      <div className="lg:flex items-center gap-4 pt-4">
        <FeatureGrid />
        <motion.div
          className="!mt-8 lg:!mt-0 max-w-full bg-tBg border border-tBorder flex justify-center items-center rounded-lg shadow-tShadowDark cursor-pointer relative overflow-hidden mx-auto"
          style={{ width: 480 }}
          onClick={isOpen$.toggle}
          layout
          layoutId="video-container"
          transition={TransitionSpringFast}
        >
          <img
            src={videoFirstFrame}
            alt="VS Code Extension"
            width="100%"
            height="100%"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen$.get() && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex flex-col justify-center items-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isOpen$.toggle}
          >
            <motion.div
              className="w-[1280px] h-auto max-h-[95%] max-w-[95%] bg-tBg border border-tBorder flex justify-center items-center rounded-lg shadow-tShadowDark overflow-hidden"
              layoutId="video-container"
              transition={TransitionSpringFast}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <video
                src={videoSrc}
                controls
                width="100%"
                height="100%"
                autoPlay
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

function FeatureGrid() {
  const features = [
    {
      title: "Snippets",
      description: "Easily add Legend-State features by hotkey",
    },
    {
      title: "Smart Generation",
      description: "Quickly generate full components",
    },
    {
      title: "Auto Imports",
      description: "Automatically adds imports as needed",
    },
    {
      title: "Context-Aware Sidebar",
      description: "Quick access to tools most useful in any moment",
    },
    {
      title: "Linter",
      description: "Detect and fix common issues like missing observer",
    },
    {
      title: "Extensive Customization",
      description: "Customize to your workflow and create your own snippets",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 flex-1">
      {features.map((feature, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg border-tBorder shadow-tShadowDark bg-tBg !mt-0"
        >
          <Header size="h5" className="font-bold mb-2">
            {feature.title}
          </Header>
          <Text className="text-sm text-gray-300">{feature.description}</Text>
        </div>
      ))}
    </div>
  );
}


================================================
FILE: packages/list/src/Components/Home/SectionKitHeader.tsx
================================================
import { Header } from "./Header";
import { PreorderButton } from "./PreorderButton";
import { Text } from "./Text";

export function SectionKitHeader() {
  return (
      <div className="mt-section text-center px-4">
          <div className="inline-block bg-gradient-to-r from-[#d556e3] to-[#3c59fd] text-white text-sm font-bold py-2 px-4 rounded-full">
              Coming Soon: Preorder now!
          </div>
          <Header
              size="h1"
              className="!text-3xl sm:!text-h1 !font-bold !leading-tight max-w-4xl text-center mx-auto !mt-4"
          >
              Legend Kit
          </Header>
          <Text className="text-xl max-w-2xl mx-auto text-left">
              Both an expertly crafted starter kit and an intelligent coding assistant, it's the perfect starting point
              to build great apps even faster.
          </Text>
          <div className="!mt-8 text-center flex flex-col justify-center items-center">
              <div className="border-tBorder border p-6 rounded-lg bg-tBg">
                  <Text className="text-white/60 text-sm">One time purchase</Text>
                  <Text className="text-white/60 text-sm !mt-1 pb-2">50% discount</Text>
                  <PreorderButton color="gradient" className="mx-auto">
                      Preorder for $199
                  </PreorderButton>
                  <Text className="text-white/60 !mt-0 text-sm pt-2">Lifetime access</Text>
              </div>
          </div>
      </div>
  );
}

/*
      <Header size="h1" className="!text-[8rem] !leading-tight">
        🧺
      </Header>
      */



================================================
FILE: packages/list/src/Components/Home/SectionKitWrappers.tsx
================================================
import { Header } from "./Header";
import { ListOfBoxes } from "./ListOfBoxes";
import { Text } from "./Text";

export function SectionKitWrappers() {
  const items = [
    "NativeWind UI",
    "Tailwind UI",
    "shadcn",
    "Gluestack",
    "Tamagui",
    "Mantine",
    "Chakra UI",
    "NextUI",
    "PrimeReact",
    "More...",
  ];

  return (
    <div className="mt-subsection px-4">
      <Header size="h3">🤗 Reactive Components for your favorite UI kit</Header>
      <Text>Augment your UI kit with reactive props and two-way binding</Text>
      <ListOfBoxes
        items={items}
        className="!mt-8"
      />
    </div>
  );
}



================================================
FILE: packages/list/src/Components/Home/SectionLocalFirst.tsx
================================================
import { useObservable } from "@legendapp/state/react";
import { synced } from "@legendapp/state/sync";
import { CodeSample } from "shared/src/Components/CodeSample";
import { SectionTitle } from "./Components";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

const CodeDemoPersist = `
const syncedState$ = observable(synced({
    persist: {
        plugin: ObservablePersistLocalStorage,
        name: 'messages',
        retrySync: true
    },
    // Sync only diffs
    changesSince: 'last-sync'
}))
`;

const DemoPersistence = () => {
  return <CodeSample code={CodeDemoPersist} scope={{synced, ObservablePersistLocalStorage}} />;
};

export const SectionLocalFirst = () => {

  return (
    <div className="!mt-20 max-w-3xl mx-auto">
      <SectionTitle
        text="💾 Local first is easy"
        description="All the hard parts of local first are built in."
      />
      <div className="!mt-16 flex">
        <div>
          <p>
            Web/mobile plugins for LocalStorage, IndexedDB, MMKV, Async Storage
          </p>
          <p>Or create your own plugins</p>
          <p>Sync only diffs</p>
          <p>Persist unsaved changes and retry</p>
        </div>
        <DemoPersistence />
      </div>
    </div>
  );
};



================================================
FILE: packages/list/src/Components/Home/SectionPerfChart.tsx
================================================
import classNames from "classnames";
import { motion, useInView, type Transition } from "framer-motion";
import { useRef } from "react";
import { Header } from "./Header";
import { Text } from "./Text";

export const SectionPerfChart = () => {
  const TransitionSpringFast: Transition = {
    type: "spring",
    duration: 1,
    bounce: 0.3,
  };
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const chartData = [
    { name: "Legend State", value: 1.02 },
    { name: "Jotai", value: 1.41 },
    { name: "MobX", value: 1.49 },
    { name: "Recoil", value: 1.53 },
    { name: "Redux", value: 1.55 },
    { name: "Zustand", value: 1.69 },
    { name: "Valtio", value: 1.82 },
  ];

  const minValue = 0.82;
  const maxValue = 1;

  return (
      <div className="mt-section gap-8 md:grid grid-cols-2 px-4 flex-col-reverse flex" ref={ref}>
          <div className="max-w-lg">
              {chartData.map((item, index) => (
                  <div key={index} className="flex items-center [&>*]:!mt-0">
                      <div className="w-24 whitespace-pre sm:w-28 flex-shrink-0 text-right mr-4">{item.name}</div>
                      <div className="flex-1 text-sm">
                          <motion.div
                              className={classNames(
                                  'h-7 rounded-full relative text-right flex items-center justify-end font-medium',
                              )}
                              initial={{ width: 0, opacity: 0 }}
                              animate={
                                  inView
                                      ? {
                                            width: `${((item.value - minValue) / maxValue) * 100}%`,
                                            opacity: 1,
                                        }
                                      : {}
                              }
                              transition={{
                                  width: {
                                      ...TransitionSpringFast,
                                      delay: index * 0.1,
                                  },
                                  opacity: {
                                      duration: 0.5,
                                      delay: index * 0.1,
                                  },
                              }}
                          >
                              <motion.div
                                  className={classNames(
                                      'h-7 rounded-full absolute inset-0 text-right flex items-center justify-end font-medium',
                                  )}
                                  style={{
                                      backgroundColor: index === 0 ? '#0284c7' : '#DDEEFF25',
                                  }}
                                  whileHover={{
                                      backgroundColor: index === 0 ? '#1eb5f9' : '#DDEEFF50',
                                      scaleX: 1.02,
                                      scaleY: 1.2,
                                  }}
                                  transition={{
                                      duration: 0.2,
                                  }}
                              />
                              <motion.span className="pr-2 sm:pr-3 z-10 pointer-events-none" layout>
                                  {item.value}
                              </motion.span>
                          </motion.div>
                      </div>
                  </div>
              ))}
          </div>
          <div>
              <Header size="h2">🚀 The fastest React state library</Header>
              <Text className="pt-4 max-w-md">
                  Legend-State is so fast that it even outperforms vanilla JS in{' '}
                  <a href="../intro/fast/">some benchmarks</a>. It's extremely optimized with fine-grained reactivity and
                  massively reduces re-rendering.
              </Text>
          </div>
      </div>
  );
};



================================================
FILE: packages/list/src/Components/Home/SectionReact.tsx
================================================
import { observable, type Observable } from "@legendapp/state";
import {
  Memo,
  Reactive,
  observer,
  useObservable,
} from "@legendapp/state/react";
import { useRef } from "react";
import { Button } from "shared/src/Components/Button";
import { Editor } from "shared/src/Components/Editor/Editor";
import { FlashingDiv } from "../FlashingDiv/FlashingDiv";
import { DemoBox, SectionTitle } from "./Components";
import { Header } from "./Header";
import { Text } from "./Text";

const CodeDemoObserver = `
const EasyComponent = observer(() => {
  const count = count$.get()

  const increment = () =>
    count$.set(count => count + 1)

  return (
    <div>Count: {count} />
    <Button onClick={increment}>
      Increment
    </Button>
  )
})
`;

const CodeDemoReactive = `

const Form = () => {
  const form$ = observable({
    value: '',
    submitting: false
  });

  return (
    <Reactive.input
      $value={form$.value}
      $disabled={form$.submitting}
    />
  )
}
`;

const DemoObserver = () => {
  return (
    <Editor
      code={CodeDemoObserver}
      noInline
      renderCode={`;render(<div><Box><EasyComponent /></Box></div>)`}
      showEditing={false}
      scope={{
        useRef,
        useObservable,
        Button,
        Memo,
        observable,
        Box: DemoBox,
        FlashingDiv,
        Reactive,
        observer,
      }}
      classNameEditor="home-editor"
      hideDemo
      noError
    />
  );
};

const DemoReactive = () => {
  return (
    <Editor
      code={CodeDemoReactive}
      noInline
      renderCode={`;render(<div><Box><EasyComponent /></Box></div>)`}
      showEditing={false}
      scope={{
        useRef,
        useObservable,
        Button,
        Memo,
        observable,
        Box: DemoBox,
        FlashingDiv,
        Reactive,
        observer,
      }}
      classNameEditor="home-editor"
      hideDemo
      noError
    />
  );
};

export const SectionReact = () => {
  return (
    <div className="mt-section px-4">
      <Header size="h2" className="text-center">
        ✨ Makes React fun and fast
      </Header>
      <div className="md:flex !mt-12 md:border-t-2 md:border-b-2 border-white/5">
        <div className="flex-1 md:py-12 md:pr-6 lg:pr-12">
          <div>
            <Header size="h4" className="font-medium text-white">
              Reactive components with observer
            </Header>
            <Text className="pb-4">
              You don't need any complicated selectors or anything. Just get an
              observable value and the component will re-render itself when it
              changes.
            </Text>
          </div>
          <DemoObserver />
        </div>
        <div className="flex-1 !mt-0 md:border-l-2 border-white/5 pt-12 md:py-12 md:pl-6 lg:pl-12">
          <div>
            <Header size="h4" className="font-medium">
              Two-way binding
            </Header>
            <Text className="pb-4">
              No more change handlers, just bind observables to inputs. Reactive
              props simplify logic and optimize performance with the tiniest
              possible rerenders.
            </Text>
          </div>
          <DemoReactive />
        </div>
      </div>
    </div>
  );
};



================================================
FILE: packages/list/src/Components/Home/SectionReactivityComponents.tsx
================================================
import { CodeSample } from 'shared/src/Components/CodeSample';
import { SectionTitle } from "./Components";


const CodeDemoSubtitle = `
function Component() {
    return (
        <Memo>{count$}</Memo>
    )
}
`;

export const SectionReactivityComponents = () => {
  return (
    <div className="!mt-20 max-w-4xl mx-auto">
      <SectionTitle
        text="🚀 Reactive Components"
        description="A built-in set of control-flow components make it easy to isolate re-renders to only the tiniest element that changed."
      />
      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="!mt-0">
          <div>Memo creates a tiny sub-component that re-renders itself</div>
          <CodeSample code={CodeDemoSubtitle} />
        </div>
        <div className="!mt-0">
          <div>For</div>
          <CodeSample code={CodeDemoSubtitle} />
        </div>
        <div className="!mt-0">
          <div>Show</div>
          <CodeSample code={CodeDemoSubtitle} />
        </div>
        <div className="!mt-0">
          <div>Switch</div>
          <CodeSample code={CodeDemoSubtitle} />
        </div>
      </div>
    </div>
  );
};



================================================
FILE: packages/list/src/Components/Home/SectionReactivityPerf.tsx
================================================
import { observable, type Observable } from '@legendapp/state';
import { Memo, Reactive, observer, useObservable } from '@legendapp/state/react';
import { useRef, useState } from 'react';
import { Button } from 'shared/src/Components/Button';
import { Editor } from 'shared/src/Components/Editor/Editor';
import { FlashingDiv } from '../FlashingDiv/FlashingDiv';
import { DemoBox, SectionTitle } from './Components';
import { useInterval } from 'usehooks-ts';
import { Header } from './Header';
import { Text } from './Text';

const CodeDemoPerf1 = `
// This example uses Memo to isolate renders
// to a single div so no components ever re-render

function TreeRight() {
  const renderCount = useRef(1).current++
  return (
    <FlashingDiv bg="bg-gray-800" className="p-3 sm:p-4 border border-gray-600 rounded !mt-0">
        <div className="font-bold">Right</div>
        <div>Renders: {renderCount}</div>
    </FlashingDiv>
)
}
function TreeLeft({ count }) {
  const renderCount = useRef(1).current++
    return <FlashingDiv bg="bg-gray-800" className="p-3 sm:p-4 border border-gray-600 rounded flex-1">
                <div className="font-bold">Left</div>
                <div className="mb-4">Renders: {renderCount}</div>
                <TreeLeaf count={count} />
               </FlashingDiv>
}
function TreeLeaf({ count }) {
  const renderCount = useRef(1).current++
  return <FlashingDiv bg="bg-gray-700" className="p-3 sm:p-4 border border-gray-500 rounded w-36">
                <div className="font-bold">Leaf</div>
                <div>Renders: {renderCount}</div>
                <div>Count: {count}</div>
               </FlashingDiv>
}
function Tree() {
  const renderCount = useRef(1).current++
  const [count, setCount] = useState(1)

  useInterval(() => {
    setCount(v => v + 1)
  }, 600)

  return (
    <FlashingDiv className="p-3 sm:p-4 bg-gray-900 border border-gray-700 rounded">
        <div className="font-bold">Tree</div>
        <div>Renders: {renderCount}</div>
        <div>Count: {count}</div>
        <div className="flex items-start pt-4 gap-4">
            <TreeLeft count={count} />
            <TreeRight />
        </div>
  </FlashingDiv>)
}
`;
const CodeDemoPerf2 = `
// This example uses Memo to isolate renders
// to a single div so no components ever re-render

function TreeRight() {
  return <FlashingDiv bg="bg-gray-800" className="p-3 sm:p-4 border border-gray-600 rounded !mt-0">
                <div className="font-bold">Right</div>
                <div>Renders: 1</div>
              </FlashingDiv>
}
function TreeLeft({ $count }) {
    return <FlashingDiv bg="bg-gray-800" className="p-3 sm:p-4 border border-gray-600 rounded flex-1">
                <div className="font-bold">Left</div>
                <div className="mb-4">Renders: 1</div>
                <TreeLeaf $count={$count} />
               </FlashingDiv>
}
function TreeLeaf({ $count }) {
  return <FlashingDiv bg="bg-gray-700" className="p-3 sm:p-4 border border-gray-500 rounded w-36">
                <div className="font-bold">Leaf</div>
                <div>Renders: 1</div>
                <div>Count: <Memo>{$count}</Memo></div>
               </FlashingDiv>
}
function Tree() {
  const count = useObservable(1)

  useInterval(() => {
    count.set(v => v + 1)
  }, 600)

  return (
    <FlashingDiv className="p-3 sm:p-4 bg-gray-900 border border-gray-700 rounded">
        <div className="font-bold">Tree</div>
        <div>Renders: 1</div>
        <div>Count: <Memo>{count}</Memo></div>
        <div className="flex items-start pt-4 gap-4">
            <TreeLeft $count={count} />
            <TreeRight />
        </div>
  </FlashingDiv>)
}
`;

const DemoPerf1 = () => {
    return (
        <Editor
            code={CodeDemoPerf1}
            noInline
            renderCode={`;render(<div><Tree /></div>)`}
            showEditing={false}
            scope={{
                useRef,
                useObservable,
                Button,
                Memo,
                observable,
                Box: DemoBox,
                FlashingDiv,
                Reactive,
                observer,
                useInterval,
                useState,
            }}
            classNameEditor="home-editor"
            classNamePreview="md:w-[380px]"
            hideCode
        />
    );
};
const DemoPerf2 = () => {
    return (
        <Editor
            code={CodeDemoPerf2}
            noInline
            renderCode={`;render(<div><Tree /></div>)`}
            showEditing={false}
            scope={{
                useRef,
                useObservable,
                Button,
                Memo,
                observable,
                Box: DemoBox,
                FlashingDiv,
                Reactive,
                observer,
                useInterval,
            }}
            transformCode={(code) =>
                code.replace(/<Memo>{(.*)}<\/Memo>/g, (a, b, c) => {
                    const bg = c > 1000 ? 'bg-gray-900' : 'bg-gray-700';
                    return `<Memo>
                        {() => (
                            <FlashingDiv span bg="${bg}">
                                {${b}.get()}
                            </FlashingDiv>
                        )}
                    </Memo>`;
                })
            }
            classNameEditor="home-editor"
            classNamePreview="md:w-[380px]"
            hideCode
        />
    );
};

export const SectionFineGrained = () => {
    return (
        <div className="mt-section px-4">
            <div className="max-w-2xl mx-auto">
                <Header size="h2" className="flex-1">
                    ⚡️ Fine-grained reactivity in React
                </Header>
                <Text className="flex-1 !mt-4">Achieve incredible performance by minimizing the number and size of renders. <br/>Legend State makes apps fast by default because they just do less work.</Text>
            </div>
            <div className="flex justify-center pt-8">
                <div className="lg:flex mx-auto justify-center sm:bg-tBgDark border-tBorder divide-tBorder lg:divide-x sm:border rounded-xl sm:shadow-md sm:shadow-tShadowDark">
                    <div className="flex-1 lg:max-w-[460px] px-8 py-6 flex flex-col items-center">
                        <Header size="h4" className="text-center">
                            Normal React
                        </Header>
                        <DemoPerf1 />
                    </div>
                    <div className="flex-1 !-mt-0 lg:max-w-[460px] px-8 py-6 flex flex-col items-center">
                        <Header size="h4" className="text-center">
                            Legend-State
                        </Header>
                        <DemoPerf2 />
                    </div>
                </div>
            </div>
        </div>
    );
};



================================================
FILE: packages/list/src/Components/Home/SectionSync.tsx
================================================
import { observable } from '@legendapp/state';
import { Memo, Reactive, observer, use$, useObservable } from '@legendapp/state/react';
import { useRef } from 'react';
import { Button } from 'shared/src/Components/Button';
import { Editor } from 'shared/src/Components/Editor/Editor';
import { FlashingDiv } from '../FlashingDiv/FlashingDiv';
import { DemoBox } from './Components';
import { Header } from './Header';
import { Text } from './Text';

const CodeDemoTop = `
const profile$ = observable(syncedFetch({
  get: 'https://myurl/my-profile',
  set: 'https://myurl/my-profile',
  persist: {
    plugin: ObservablePersistLocalStorage,
    name: 'profile',
  },
}))

const Component = () => {
  // get triggers fetch and updates on change
  const name = use$(profile$.name)

  const onClick = () => {
    // set sets the local state and syncs
    profile$.name.set('Annyong')
  }

  // Two-way bind to remote data
  return <Reactive.input $value={profile$.name} />
}
`;

const DemoSync = () => {
    return (
        <Editor
            code={CodeDemoTop}
            noInline
            renderCode={`;render(<div><Box><EasyComponent /></Box></div>)`}
            showEditing={false}
            scope={{
                useRef,
                useObservable,
                Button,
                Memo,
                observable,
                Box: DemoBox,
                FlashingDiv,
                Reactive,
                observer,
                use$,
            }}
            classNameEditor="home-editor"
            hideDemo
            noError
        />
    );
};

export const SectionSync = () => {
    return (
        <div className="lg:flex items-center mt-section gap-16 px-4">
            <div className="flex-1">
                <Header size="h2" className="md:text-nowrap">
                    🤝 Local State = Remote State
                </Header>
                <Text className="pt-2">
                    Just get and set observables and they <span className="text-white">sync themselves</span> with a
                    powerful sync engine. Your UI code doesn't need any querying, creating mutations, or synchronizing
                    with local state.
                </Text>
                <Text className="pt-2">You can even bind UI components directly to synced observables.</Text>
                <Text className="pt-2">
                    You don't need any sync code in your components. You can just focus on making great apps.
                </Text>
            </div>
            <div className="max-w-lg flex-2 !md:mt-0 [&>div]:!mt-0 sm:min-w-[460px] mx-auto">
                <DemoSync />
            </div>
        </div>
    );
};



================================================
FILE: packages/list/src/Components/Home/SectionTop.tsx
================================================
import { AnimatePresence, motion } from 'framer-motion';
import { observable, type Observable } from '@legendapp/state';
import { Memo, Reactive, Show, observer, use$, useMount, useObservable } from '@legendapp/state/react';
import { useRef } from 'react';
import { Button } from 'shared/src/Components/Button';
import { Editor } from 'shared/src/Components/Editor/Editor';
import { FlashingDiv } from '../FlashingDiv/FlashingDiv';
import { DemoBox, SectionTitle } from './Components';
import CurvedArrowCallout from './CurvedArrowCallout';

const CodeDemoTop = `
const speed$ = observable(2)

const Component = () => {
  // Get and observe it
  const speed = use$(speed$)

  // Set it
  const up = () => speed$.set(v => v % 10 + 1)

  return (<>
    {/* Two way bind it */}
    <Reactive.input $value={speed$} type="number" />

    <Button onClick={up}>{speed} is too slow 🤘</Button>
  </>)
}
`;

const DemoTop = ({ state$ }: { state$: Observable<{ speed: number }> }) => {
    const arrowVisible$ = observable(true);
    useMount(() => {
        state$.speed.onChange(() => {
            if (state$.speed.get() > 10) {
                state$.speed.set(10);
            } else if (state$.speed.get() < 1) {
                state$.speed.set(1);
            }
            arrowVisible$.set(false);
        });
    });

    return (
        <div className="relative w-full max-w-lg">
            <Editor
                code={CodeDemoTop}
                noInline
                renderCode={`;render(<div><Box blur><Component /></Box></div>)`}
                previewWidth={190}
                showEditing={false}
                disabled
                scope={{
                    useRef,
                    useObservable,
                    Button,
                    Memo,
                    observable,
                    state$,
                    Box: DemoBox,
                    FlashingDiv,
                    Reactive,
                    observer,
                    use$,
                }}
                transformCode={
                    (code) =>
                        code
                            .replace(`const speed$ = observable(2)`, '')
                            .replace(
                                '<Reactive.input',
                                '<div className="font-bold pb-4 text-center">Particle Speed</div><Reactive.input className="w-20 rounded bg-gray-700 px-2 py-2" min="1" max="10"',
                            )
                            .replace('<div>Speed', '<div className="mt-8">Speed')
                            .replace('<Button ', '<Button className="bg-blue-800 hover:bg-blue-700"')
                            .replace(/speed\$/g, 'state$.speed')
                    //   .replace(/globalState\$.name/g, "state$.name")
                    //   .replace(/speed\$\./g, "state$.speed.")
                }
                classNameEditor="home-editor w-full md:w-auto"
                classNamePreview="absolute right-0 top-0 !-mt-36 xs:!-mt-28 sm:!-mt-12 -mr-2 xs:mr-4 sm:-mr-12 shadow-lg rounded-lg"
                previewCallout={
                    <Show if={arrowVisible$} wrap={AnimatePresence}>
                        {() => (
                            <motion.div
                                className="absolute pointer-events-none w-56 right-28 sm:right-32 -top-12"
                                // style={{ right: 120, top: -50 }}
                                initial={{ opacity: 0.5 }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 0.6,
                                        repeat: Infinity,
                                        repeatType: 'mirror',
                                        ease: 'easeInOut',
                                    },
                                }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="rotate-12">
                                    <CurvedArrowCallout />
                                </div>
                                <div className="absolute top-0 left-0 !mt-10 -ml-3 2xs:-ml-6 text-md font-bold">
                                    Turn it up!
                                </div>
                            </motion.div>
                        )}
                    </Show>
                }
            />
        </div>
    );
};

export const SectionTop = ({ state$ }: { state$: Observable<{ speed: number }> }) => {
    return (
        <div className="lg:grid grid-cols-3 !mt-48 xs:!mt-36 sm:!mt-24 md:!mt-16 lg:!-mt-4 mx-auto">
            <div className="hidden lg:block pointer-events-none" />
            <div className="lg:col-span-2 relative flex justify-center">
                <DemoTop state$={state$} />
            </div>
        </div>
    );
};



================================================
FILE: packages/list/src/Components/Home/Text.tsx
================================================
import { createElement, type ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  type?: 'p';
  className?: string;
  fontWeight?: string;
  leading?: string;
}

export function Text({ children, type, className, fontWeight, leading }: Props) {
  return createElement(
    type || 'p',
    {
      className: classNames("text-white/70", className, fontWeight || "font-medium", leading || 'leading-normal'),
    },
    children
  );
}



================================================
FILE: packages/list/src/Components/Introduction/GettingStarted.astro
================================================
---
import { GettingStarted } from "./GettingStarted";
---

<GettingStarted client:visible client:idle />



================================================
FILE: packages/list/src/Components/Introduction/GettingStarted.tsx
================================================
import { observable, observe } from '@legendapp/state';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
import { For, observer, Reactive, useIsMounted, useObservable, useSelector } from '@legendapp/state/react';
import { configureSynced, synced, syncObservable } from '@legendapp/state/sync';
import classNames from 'classnames';
import { Box } from 'shared/src/Components/Box';
import { Button } from 'shared/src/Components/Button';
import { Checkbox } from 'shared/src/Components/Checkbox';
import { Editor } from 'shared/src/Components/Editor/Editor';
import { ThemeButton } from 'shared/src/Components/ThemeButton';
import { state$ } from 'shared/src/state';
import { $React } from '@legendapp/state/react-web';

const GETTING_STARTED_CODE = `
import { observable, Observable } from "@legendapp/state"
import { configureSynced, synced } from "@legendapp/state/sync"
import { observer, Reactive, use$, useObservable } from "@legendapp/state/react"
import { $TextInput } from "@legendapp/state/react-native"
import { ObservablePersistAsyncStorage } from
    "@legendapp/state/persist-plugins/async-storage"

interface Todo {
    id: number;
    text: string;
    completed?: boolean;
}

interface Store {
    todos: Todo[];
    total: number;
    numCompleted: number;
    addTodo: () => void;
}

interface TodoItemProps {
    item$: Observable<Todo>;
}

// Setup a configured persist options
const mySynced = configureSynced(synced, {
  persist: {
    plugin: observablePersistAsyncStorage({
      AsyncStorage
    })
  }
})

// Create a global observable for the Todos
let nextId = 0;
const store$ = observable<Store>({
  todos: mySynced({
    initial: [],
    persist: {
      name: 'getting-started'
    },
  }),
  // Computeds
  total: (): number => {
    return store$.todos.length;
  },
  numCompleted: (): number => {
    return store$.todos.get().filter((todo) => todo.completed).length;
  },
  addTodo: () => {
    const todo: Todo = {
      id: nextId++,
      text: "",
    };
    store$.todos[todo.id].set(todo);
  },
});

// Receives item$ prop from the For component
function TodoItem({ item$ }: TodoItemProps) {
    const onKeyDown = (e) => {
        // Call addTodo from the global store$
        if (e.key === 'Enter') store$.addTodo()
    }

    // The child components are bound directly to the observable properties
    // so this component never has to re-render.
    return (
        <View className="row">
            <Checkbox $value={item$.completed} />
            <$TextInput
                $value={item$.text}
                onKeyDown={onKeyDown}
            />
        </View>
    );
}

function App() {
    const theme$ = useObservable<'light' | 'dark'>('dark')
    const theme = use$(theme$)
    const total = use$(store$.total)
    const completed = use$(store$.numCompleted)

    return (
        <Box theme={theme}>
            <ThemeButton $value={theme$} />
            <Text>Total: {total}</Text>
            <Text>Completed: {completed}</Text>
            <For each={store$.todos} item={TodoItem} />
            <View className="flex justify-between">
                <Button onClick={() => store$.addTodo()}>Add</Button>
                <Button onClick={() => store$.todos.set({})}>Clear</Button>
            </View>
        </Box>
    )
}
`;

export const GettingStarted = observer(function GettingStarted() {
    const framework = state$.framework.get();
    const replacer = (str: string) =>
        str
            .replace(/<View|<Text/g, '<div')
            .replace(/<\/View|<\/Text/g, '</div')
            .replace(/,\n        asyncStorage: { AsyncStorage }/g, '')
            .replace(/observablePersistAsyncStorage\([^)]+\)/g, 'ObservablePersistLocalStorage')
            .replace(/ObservablePersistAsyncStorage/g, 'ObservablePersistLocalStorage')
            .replace(
                `import { $TextInput } from "@legendapp/state/react-native"`,
                `import { $React } from "@legendapp/state/react-web"`,
            )
            .replace(/\$TextInput/g, '$React.input')
            .replace(/TextInput/g, 'input')
            .replace(/async-storage/g, 'local-storage');

    const isMounted = useIsMounted().get();
    const displayCode = isMounted && framework === 'React' ? replacer(GETTING_STARTED_CODE) : GETTING_STARTED_CODE;

    return (
        <Editor
            code={displayCode}
            scope={{
                observable,
                classNames,
                observe,
                observer,
                For,
                Button,
                Reactive,
                Box,
                Checkbox,
                useObservable,
                ThemeButton,
                configureSynced,
                syncObservable,
                synced,
                use$: useSelector,
                $React,
                ObservablePersistLocalStorage,
            }}
            noInline
            renderCode=";render(<App />)"
            previewWidth={180}
            transformCode={(code) =>
                replacer(
                    code
                        .replace(
                            /<Reactive\.(?:TextInput|input)/g,
                            `<Reactive.input style={{ color: 'inherit' }} className="bg-white/10 text-inherit border rounded border-gray-500 px-2 py-1 ml-2 w-[120px]"`,
                        )
                        .replace(/className="row"/g, 'className="flex items-center"')
                        .replace('<Box>', '<Box theme={theme}>'),
                )
            }
        />
    );
});



================================================
FILE: packages/list/src/Components/Introduction/Intro.astro
================================================
---
import { IntroExampleComponent } from "./Intro";
---

<IntroExampleComponent client:visible client:idle />



================================================
FILE: packages/list/src/Components/Introduction/Intro.tsx
================================================
import { observable, observe } from '@legendapp/state';
import { observer, use$ } from '@legendapp/state/react';
import classNames from 'classnames';
import { Box } from 'shared/src/Components/Box';
import { Button } from 'shared/src/Components/Button';
import { Editor } from 'shared/src/Components/Editor/Editor';

const INTRO_EXAMPLE_CODE = `
import { observable } from "@legendapp/state"
import { use$ } from "@legendapp/state/react"

// Create an observable object
const settings$ = observable({ theme: 'dark' })

// This is the code for the example on your right ----->
function Component() {
  // theme is automatically tracked for changes
  const theme = use$(settings$.theme)

  const toggle = () => {
    settings$.theme.set(theme =>
      theme === 'dark' ? 'light' : 'dark'
    )
  }

  return (
    <Box theme={theme}>
      <div>Theme: {theme}</div>
      <Button theme={theme} onClick={toggle}>
        Toggle theme
      </Button>
    </Box>
  )
}
`;

export function IntroExampleComponent() {
    return (
        <Editor
            code={INTRO_EXAMPLE_CODE}
            scope={{
                observable,
                observer,
                classNames,
                observe,
                Button,
                Box,
                use$,
            }}
            noInline
            renderCode=";render(<Component />)"
            previewWidth={180}
        />
    );
}



================================================
FILE: packages/list/src/Components/Introduction/MemoArrayExample.astro
================================================
---
import { MemoArrayExampleComponent } from "./MemoArrayExample";
---

<MemoArrayExampleComponent client:visible client:idle />



================================================
FILE: packages/list/src/Components/Introduction/MemoArrayExample.tsx
================================================
import { Memo, useObservable } from "@legendapp/state/react";
import { useRef } from "react";
import { Box } from "shared/src/Components/Box";
import { Editor } from "shared/src/Components/Editor/Editor";
import { useInterval } from "usehooks-ts";

const MEMO_ARRAY_EXAMPLE_CODE = `
import { useRef } from "react"
import { useInterval } from "usehooks-ts"
import { Memo, useObservable } from "@legendapp/state/react"

function MemoArrayExample() {
  const renderCount = ++useRef(0).current
  const messages$ = useObservable([])

  useInterval(() => {
    messages$.splice(0, 0, \`Message \${messages$.length + 1}\`)
  }, 600)

  return (
    <Box>
      <h5 className="renders">Renders: {renderCount}</h5>
      <div className="messages">
        <Memo>
          {() => (
            messages$.map((message$, i) => (
              <div key={i}>{message$.get()}</div>
            ))
          )}
        </Memo>
      </div>
    </Box>
  )
}
`;

export function MemoArrayExampleComponent() {
  return (
    <Editor
      code={MEMO_ARRAY_EXAMPLE_CODE}
      scope={{
        useRef,
        useObservable,
        Memo,
        useInterval,
        Box,
      }}
      noInline
      previewWidth={180}
      renderCode=";render(<MemoArrayExample />)"
      transformCode={(code) =>
        code
          .replace(
            /className="renders"/g,
            'className="border-b w-full pb-3 border-gray-500"'
          )
          .replace(
            /className="messages"/g,
            'className="h-[300px] overflow-auto w-full"'
          )
      }
    />
  );
}



================================================
FILE: packages/list/src/Components/Introduction/Primitives.astro
================================================
---
import { Primitives } from "./Primitives";
---

<Primitives client:visible client:idle />



================================================
FILE: packages/list/src/Components/Introduction/Primitives.tsx
================================================
import { observable } from "@legendapp/state";
import { Memo, useObservable } from "@legendapp/state/react";
import { useRef, useState } from "react";
import { Editor } from "shared/src/Components/Editor/Editor";
import { useInterval } from "usehooks-ts";
import { FlashingDiv } from "../FlashingDiv/FlashingDiv";

const PRIMITIVES_CODE = `
import { observable } from "@legendapp/state"
import { Memo, useObservable } from "@legendapp/state/react"
import { useRef, useState } from "react"
import { useInterval } from "usehooks-ts"

function NormalComponent() {
  const [count, setCount] = useState(1)
  const renderCount = useRef(1).current++

  useInterval(() => {
    setCount((v) => v + 1)
  }, 600)

  // This re-renders when count changes
  return (
    <FlashingDiv pad>
      <h5>Normal</h5>
      <div>Renders: {renderCount}</div>
      <div>Count: {count}</div>
    </FlashingDiv>
  )
}
function FineGrained() {
  const count$ = useObservable(1)
  const renderCount = useRef(1).current++

  useInterval(() => {
    count$.set((v) => v + 1)
  }, 600)

  // The text updates itself so the component doesn't re-render
  return (
    <FlashingDiv pad>
      <h5>Fine-grained</h5>
      <div>Renders: {renderCount}</div>
      <div>Count: <Memo>{count$}</Memo></div>
    </FlashingDiv>
  )
}
`;

export function Primitives() {
  return (
    <div>
      <Editor
        code={PRIMITIVES_CODE}
        noInline
        renderCode={`;render(<div><NormalComponent /><div className="!mt-4" /><FineGrained /></div>)`}
        previewWidth={150}
        scope={{
          useState,
          useRef,
          useInterval,
          FlashingDiv,
          useObservable,
          Memo,
          observable,
        }}
        transformCode={(code) =>
          code.replace(
            `<div>Count: <Memo>{count$}</Memo></div>`,
            `<div>Count:{" "}
                <Memo>
                    {() => (
                        <FlashingDiv span>
                            {count$.get()}
                        </FlashingDiv>
                    )}
                </Memo>
            </div>`
          )
        }
      />
    </div>
  );
}



================================================
FILE: packages/list/src/Components/Kit/TabsRounded.tsx
================================================
import {
  computeSelector,
  isObservable,
  type Observable,
} from "@legendapp/state";
import { observer, useObservable } from "@legendapp/state/react";
import cx from "classnames";
import { motion, type Transition } from "framer-motion";
import { useMemo, useRef } from "react";
import { type PositionSize, useElementPosition } from "./usePosition";

let tabGroupNameNext = 0;

const TransitionSpringFast: Transition = {
  type: "spring",
  duration: 0.35,
  bounce: 0.25,
};

interface PropsTab {
  name: string;
  groupName: string;
  text?: string;
  disabled?: boolean;
  activeTab: string;
  $activeTab: Observable<string>;
  defaultTab: string;
  setActiveTab: (value: string) => void;
  numVariant?: "default" | "red";
  numValue?: number | string;
  index: number;
  tabPosition$: Observable<PositionSize>;
}
const Tab = observer(function Tab({
  name,
  groupName,
  text,
  disabled,
  activeTab,
  $activeTab,
  defaultTab,
  setActiveTab,
  index,
  tabPosition$,
}: PropsTab) {
  const ref = useRef<HTMLDivElement>(null);
  // const size$ = useMeasure(ref);
  const pos$ = useElementPosition(ref, groupName);
  useMemo(() => tabPosition$.set(pos$), [index]);

  const isActive = name === (activeTab || defaultTab);

  return (
    <motion.div
      className={cx(
        "relative cursor-pointer select-none !my-0 px-1",
        name,
        disabled && "pointer-events-none opacity-30"
      )}
      onClick={() => {
        isObservable($activeTab) ? $activeTab.set(name) : setActiveTab(name);
      }}
      layout
      layoutRoot
      ref={ref}
    >
      <div
        className={cx(
          "flex items-center whitespace-pre text-sm font-medium text-gray-400 hover:text-white/80 px-3 py-2",
          isActive && "text-white shadow-bold"
        )}
      >
        {text}
      </div>
    </motion.div>
  );
});

interface Props<T extends string> {
  tabs: readonly T[];
  tabTexts?: Record<T, string>;
  tabText?: (tab: T) => string;
  activeTab?: T;
  $activeTab?: Observable<T>;
  defaultTab?: T;
  className?: string;
  tabPadding?: `pb-${number}`;
  onSelect?: (tab: T) => void;
  numVariant?: Record<T, "default" | "red">;
  listsForNum?: Record<any, any[]>;
}

export const TabsRounded = observer(function TabsRounded<T extends string>({
  tabs,
  tabTexts,
  tabText,
  activeTab,
  $activeTab,
  defaultTab,
  tabPadding,
  className,
  onSelect,
  numVariant,
  listsForNum,
}: Props<T>) {
  const groupName = useMemo(() => "Tabs" + tabGroupNameNext++, []);
  // Detect being on a tab that's no longer in the `tabs` prop and redirect to the default
  if ($activeTab && defaultTab && isObservable($activeTab)) {
    const active = computeSelector($activeTab) as T;
    if (active && !tabs.includes(active)) {
      setTimeout(() => {
        $activeTab.set(defaultTab);
      }, 0);
    }
  }

  if (!activeTab && $activeTab) {
    activeTab = $activeTab.get();
  }

  // Create a tabWidths observable for each tab to measure itself and fill it out
  const tabPositions$ = useObservable<Record<string, PositionSize>>({});
  const tabPositions = tabPositions$.get();

  const tabIndex = tabs.indexOf(activeTab || (defaultTab as any));

  const defaultHeight = 32;
  const underlineAnimate: { x: number; y: number; width: number } =
    tabIndex >= 0
      ? {
          x: tabPositions[activeTab as string]?.left || 0,
          y: tabPositions[activeTab as string]?.top,
          width: tabPositions[activeTab as string]?.width || 80,
        }
      : { x: 0, y: defaultHeight, width: 0 };

  // Render
  return (
    <nav
      className={cx("relative border border-tBorder bg-tBg rounded-full overflow-hidden overflow-x-auto", className)}
    >
      <motion.div
        initial={underlineAnimate}
        animate={underlineAnimate}
        className="absolute top-0 h-full bg-blue-700 !mt-0"
        transition={TransitionSpringFast}
      />
      <div className="flex text-sm rounded-full divide-x divide-tBorder !mt-0">
        {tabs.map((tab, i) => (
          <Tab
            key={tab}
            groupName={groupName}
            name={tab}
            text={tabTexts?.[tab] || tabText?.(tab) || tab}
            activeTab={activeTab as string}
            $activeTab={$activeTab as unknown as Observable<string>}
            defaultTab={defaultTab as string}
            setActiveTab={onSelect as any}
            numVariant={numVariant?.[tab]}
            numValue={listsForNum?.[tab]?.length}
            index={i}
            tabPosition$={tabPositions$[tab]}
          />
        ))}
      </div>
    </nav>
  );
});



================================================
FILE: packages/list/src/Components/Kit/TabsUnderlined.tsx
================================================
import {
  computeSelector,
  isObservable,
  type Observable,
} from "@legendapp/state";
import { observer, useObservable } from "@legendapp/state/react";
import cx from "classnames";
import { motion, type Transition } from "framer-motion";
import { useMemo, useRef } from "react";
import { type PositionSize, useElementPosition } from "./usePosition";

let tabGroupNameNext = 0;

const TransitionSpringFast: Transition = {
  type: "spring",
  duration: 0.35,
  bounce: 0.25,
};

interface PropsTab {
  name: string;
  groupName: string;
  text?: string;
  disabled?: boolean;
  activeTab: string;
  $activeTab: Observable<string>;
  defaultTab: string;
  tabPadding: `pb-${number}`;
  setActiveTab: (value: string) => void;
  numVariant?: "default" | "red";
  numValue?: number | string;
  index: number;
  tabPosition$: Observable<PositionSize>;
}
const Tab = observer(function Tab({
  name,
  groupName,
  text,
  tabPadding,
  disabled,
  activeTab,
  $activeTab,
  defaultTab,
  setActiveTab,
  numVariant = "default",
  numValue,
  index,
  tabPosition$,
}: PropsTab) {
  const ref = useRef<HTMLDivElement>(null);
  // const size$ = useMeasure(ref);
  const pos$ = useElementPosition(ref, groupName);
  useMemo(() => tabPosition$.set(pos$), [index]);

  const isActive = name === (activeTab || defaultTab);

  return (
    <motion.div
      className={cx(
        "relative cursor-pointer select-none !my-0 px-1",
        name,
        tabPadding,
        disabled && "pointer-events-none opacity-30"
      )}
      onClick={() => {
        isObservable($activeTab) ? $activeTab.set(name) : setActiveTab(name);
      }}
      layout
      layoutRoot
      ref={ref}
    >
      <div
        className={cx(
          "flex items-center whitespace-pre text-sm font-medium text-gray-400 hover:text-white/80",
          isActive && "text-white shadow-bold"
        )}
      >
        {text}
      </div>
    </motion.div>
  );
});

interface Props<T extends string> {
  tabs: readonly T[];
  tabTexts?: Record<T, string>;
  tabText?: (tab: T) => string;
  activeTab?: T;
  $activeTab?: Observable<T>;
  defaultTab?: T;
  className?: string;
  tabPadding: `pb-${number}`;
  onSelect?: (tab: T) => void;
  numVariant?: Record<T, "default" | "red">;
  listsForNum?: Record<any, any[]>;
}

export const TabsUnderlined = observer(function TabsUnderlined<
  T extends string
>({
  tabs,
  tabTexts,
  tabText,
  activeTab,
  $activeTab,
  defaultTab,
  tabPadding,
  className,
  onSelect,
  numVariant,
  listsForNum,
}: Props<T>) {
  const groupName = useMemo(() => "Tabs" + tabGroupNameNext++, []);
  // Detect being on a tab that's no longer in the `tabs` prop and redirect to the default
  if ($activeTab && defaultTab && isObservable($activeTab)) {
    const active = computeSelector($activeTab) as T;
    if (active && !tabs.includes(active)) {
      setTimeout(() => {
        $activeTab.set(defaultTab);
      }, 0);
    }
  }

  if (!activeTab && $activeTab) {
    activeTab = $activeTab.get();
  }

  // Create a tabWidths observable for each tab to measure itself and fill it out
  const tabPositions$ = useObservable<Record<string, PositionSize>>({});
  const tabPositions = tabPositions$.get();

  const tabIndex = tabs.indexOf(activeTab || (defaultTab as any));

  const defaultHeight = 32;
  const underlineAnimate: { x: number; y: number; width: number } =
    tabIndex >= 0
      ? {
          x: tabPositions[activeTab as string]?.left || 0,
          y: (tabPositions[activeTab as string]?.bottom || defaultHeight) - 2,
          width: tabPositions[activeTab as string]?.width || 80,
        }
      : { x: 0, y: defaultHeight, width: 0 };

  // Render
  return (
    <nav
      className={cx(
        "relative flex flex-wrap gap-x-4 gap-y-2 pr-8 text-sm pb-4",
        className
      )}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab}
          groupName={groupName}
          name={tab}
          text={tabTexts?.[tab] || tabText?.(tab) || tab}
          tabPadding={tabPadding}
          activeTab={activeTab as string}
          $activeTab={$activeTab as unknown as Observable<string>}
          defaultTab={defaultTab as string}
          setActiveTab={onSelect as any}
          numVariant={numVariant?.[tab]}
          numValue={listsForNum?.[tab]?.length}
          index={i}
          tabPosition$={tabPositions$[tab]}
        />
      ))}
      <motion.div
        initial={underlineAnimate}
        animate={underlineAnimate}
        className="absolute top-0 h-0.5 bg-blue-500 !mt-0"
        transition={TransitionSpringFast}
      />
    </nav>
  );
});



================================================
FILE: packages/list/src/Components/Kit/usePosition.ts
================================================
import { event, type Observable, type ObservableEvent } from "@legendapp/state";
import { useObservable } from "@legendapp/state/react";
import { useEffect, type MutableRefObject } from "react";

export interface PositionSize {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

const mapGroups = new Map<string, ObservableEvent>();

function getStyle(el: HTMLElement, styleName: any) {
  return getComputedStyle(el)[styleName] as any;
}

function getOffset(el: HTMLElement) {
  if (!el) {
    return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
  }
  const rect = el.getBoundingClientRect();
  const doc = el.ownerDocument;
  if (!doc) throw new Error("Unexpectedly missing <document>.");
  const win = doc.defaultView || (doc as any).parentWindow;

  const body = (doc.documentElement ||
    doc.body.parentNode ||
    doc.body) as HTMLElement;
  const winX =
    win.pageXOffset !== undefined ? win.pageXOffset : body.scrollLeft;
  const winY = win.pageYOffset !== undefined ? win.pageYOffset : body.scrollTop;

  return {
    left: rect.left + winX,
    top: rect.top + winY,
    right: rect.right + winX,
    bottom: rect.bottom + winY,
    width: rect.width,
    height: rect.height,
  };
}

function getPosition(el: HTMLElement) {
  if (!el) {
    return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
  }
  let offset = getOffset(el);
  let parentOffset = { top: 0, left: 0 };
  const marginTop = parseInt(getStyle(el, "marginTop")) || 0;
  const marginLeft = parseInt(getStyle(el, "marginLeft")) || 0;

  if (getStyle(el, "position") === "fixed") {
    offset = el.getBoundingClientRect();
  } else {
    const doc = el.ownerDocument;

    let offsetParent = (el.offsetParent ||
      doc.documentElement) as HTMLElement | null;

    while (
      offsetParent &&
      (offsetParent === doc.body || offsetParent === doc.documentElement)
    ) {
      offsetParent = offsetParent.parentElement;
    }

    if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
      parentOffset = getOffset(offsetParent);
      parentOffset.top +=
        parseInt(getStyle(offsetParent, "borderTopWidth")) || 0;
      parentOffset.left +=
        parseInt(getStyle(offsetParent, "borderLeftWidth")) || 0;
    }
  }

  const top = offset.top - parentOffset.top - marginTop;
  const left = offset.left - parentOffset.left - marginLeft;

  return {
    left: left,
    top: top,
    right: left + offset.width,
    bottom: top + offset.height,
    width: offset.width,
    height: offset.height,
  };
}

function usePositionOrOffset(
  type: "position" | "offset",
  ref: MutableRefObject<HTMLElement | undefined | null>,
  group?: string
): Observable<PositionSize> {
  const fn = type === "position" ? getPosition : getOffset;
  const elementPosition$ = useObservable<PositionSize>();

  function handleChangePosition() {
    elementPosition$.set(fn(ref.current!));
  }

  let ev$: ObservableEvent;
  if (group) {
    if (!mapGroups.has(group)) {
      mapGroups.set(group, event());
    }
    ev$ = mapGroups.get(group)!;
    ev$.on(handleChangePosition);
  }

  useEffect(() => {
    handleChangePosition();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        handleChangePosition();
      });
    });

    // If in a group then fire the event which will trigger handleChangePosition on every element in the group.
    // Otherwise just call the handler
    const handler = group ? () => ev$.fire() : handleChangePosition;
    window.addEventListener("resize", handler);
    const resizeObserver = new ResizeObserver(handler);
    resizeObserver.observe(ref.current!);

    return () => {
      window.removeEventListener("resize", handler);
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [ref]); // eslint-disable-line react-hooks/exhaustive-deps

  return elementPosition$ as any;
}

type Fn = (
  ref: MutableRefObject<HTMLElement | undefined | null>,
  group?: string
) => Observable<PositionSize>;

export const useElementPosition: Fn = usePositionOrOffset.bind(
  this,
  "position"
);
export const useElementOffset: Fn = usePositionOrOffset.bind(this, "offset");



================================================
FILE: packages/list/src/Components/Overrides/Header.astro
================================================
---
import type { Props } from '@astrojs/starlight/props';

import Search from '@astrojs/starlight/components/Search.astro';
import SocialIcons from '@astrojs/starlight/components/SocialIcons.astro';
import { Image } from 'astro:assets';
import logomark from '../../assets/Logomark_(White).svg';
---

<div class="header sl-flex">
    <div class="sl-flex items-center">
        <a class="flex items-center pr-6 font-medium" href="/">
            <Image src={logomark} alt="Legend homepage" width="20" height="20" class="opacity-60" />
            <span class="hidden sm:block pl-3">Legend Open Source</span>
            <span class="sm:hidden pl-3">Legend</span>
        </a>

        <a class="hidden lg:block px-4" href="/"> Home </a>
        <a class="px-4" href="/open-source/"> Blog </a>
        <a class="px-4" href="/kit"> Kit </a>
        <a class="px-4" href="/open-source/state"> State </a>
        <a class="px-4 text-white" href="/open-source/list"> List </a>
        <a class="hidden lg:block px-4 mr-4" href="/open-source/motion"> Motion </a>
    </div>
    <div class="sl-flex items-center justify-end pr-4">
        <Search {...Astro.props} />
    </div>
    <div class="sl-hidden md:sl-flex right-group">
        <div class="sl-flex">
            <SocialIcons {...Astro.props} />
        </div>
    </div>
</div>

<style is:global>
    header {
        --tw-backdrop-blur: blur(8px);
        backdrop-filter: var(--tw-backdrop-blur);
    }
</style>

<style>
    .header {
        gap: var(--sl-nav-gap);
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    .right-group,
    .social-icons {
        gap: 1rem;
        align-items: center;
    }
    .social-icons::after {
        content: '';
        height: 2rem;
        border-inline-end: 1px solid var(--sl-color-gray-5);
    }
    a {
        text-decoration: none;
        color: #a1a1a4;
    }
    a:hover {
        color: var(--sl-color-text);
    }
    a:hover img {
        opacity: 100;
    }

    @media (min-width: 50rem) {
        :global(:root[data-has-sidebar]) {
            --__sidebar-pad: calc(2 * var(--sl-nav-pad-x));
        }
        :global(:root:not([data-has-toc])) {
            --__toc-width: 0rem;
        }
        .header {
            --__sidebar-width: max(0rem, var(--sl-content-inline-start, 0rem) - var(--sl-nav-pad-x));
            --__main-column-fr: calc(
                (
                        100% + var(--__sidebar-pad, 0rem) - var(--__toc-width, var(--sl-sidebar-width)) -
                            (2 * var(--__toc-width, var(--sl-nav-pad-x))) - var(--sl-content-inline-start, 0rem) -
                            var(--sl-content-width)
                    ) / 2
            );
            display: grid;
            grid-template-columns:
        /* 1 (site title): runs up until the main content column’s left edge or the width of the title, whichever is the largest  */
                minmax(calc(var(--__sidebar-width) + max(0rem, var(--__main-column-fr) - var(--sl-nav-gap))), auto)
                /* 2 (search box): all free space that is available. */
                1fr
                /* 3 (right items): use the space that these need. */
                auto;
            align-content: center;
        }
    }
</style>



================================================
FILE: packages/list/src/Components/Overrides/MobileMenuFooter.astro
================================================
---
import LanguageSelect from "@astrojs/starlight/components/LanguageSelect.astro";
import Select from "@astrojs/starlight/components/Select.astro";
import SocialIcons from "@astrojs/starlight/components/SocialIcons.astro";
import ThemeSelect from "@astrojs/starlight/components/ThemeSelect.astro";
import type { Props } from "@astrojs/starlight/props";
import { versions, defaultVersion } from "shared/config";

const url = new URL(Astro.url);
const urlBase = "/open-source/state/";
const versionMatch = new RegExp(urlBase + "(v\\d)").exec(url.pathname);
const currentVersion = versionMatch?.[1] || defaultVersion;
const options = versions.map(([version, label]) => ({
  label,
  selected: currentVersion === version,
  value: `/open-source/state/${version}`,
}));
---

<div class="mobile-preferences sl-flex items-center gap-2">
  <div class="sl-flex social-icons">
    <SocialIcons {...Astro.props} />
  </div>
  <a class="px-2 no-underline text-white/60 hover:text-white" href="/"> Home </a>
  <a class="px-2 no-underline text-white/60 hover:text-white" href="/open-source/"> Blog </a>
  <a class="px-2 no-underline text-white/60 hover:text-white" href="/open-source/motion"> Motion </a>
  <Select
    icon={undefined as any}
    label="version"
    value="auto"
    options={options}
    width="auto"
  />
</div>

<style>
  .social-icons {
    margin-inline-end: auto;
    gap: 1rem;
    align-items: center;
    padding-block: 1rem;
  }
  .social-icons:empty {
    display: none;
  }
  .mobile-preferences {
    justify-content: space-between;
    flex-wrap: wrap;
    border-top: 1px solid var(--sl-color-gray-6);
    column-gap: 1rem;
    padding: 0.5rem 0;
  }
</style>



================================================
FILE: packages/list/src/Components/Overrides/ThemeProvider.astro
================================================
---
import type { Props } from '@astrojs/starlight/props';
---

{/* This is intentionally inlined to avoid FOUC. */}
<script is:inline>
    localStorage.setItem('starlight-theme', 'dark');
    window.StarlightThemeProvider = (() => {
        document.documentElement.dataset.theme = 'dark';
        return {
            updatePickers(theme = storedTheme || 'auto') {},
        };
    })();
</script>

<template id="theme-icons"> </template>



================================================
FILE: packages/list/src/Components/Performance/TodosExample.astro
================================================
---
import { TodosComponent } from "./TodosExample";
---

<TodosComponent client:only />



================================================
FILE: packages/list/src/Components/Performance/TodosExample.tsx
================================================
import { useEffect, useRef, useState } from "react";
import { Editor } from "shared/src/Components/Editor/Editor";
import { For, observer, useObservable } from "@legendapp/state/react";
import { Box } from "shared/src/Components/Box";
import { Button } from "shared/src/Components/Button";

const TODOS_CODE = `
import { useEffect, useRef, useState } from "react"
import { For, observer, useObservable } from "@legendapp/state/react"

let total = 0
const TodosExample = () => {
  const renderCount = ++useRef(0).current
  const todos$ = useObservable([])

  const onClickAdd = () => (
    todos$.push({ id: ++total, text: total + '. Item', renders: 1 })
  )
  const onClickUpdate = () => {
    todos$[todos$.length - 1].text.set((t) => t + '!')
  }

  return (
    <Box>
      <Button onClick={onClickAdd}>
        Add
      </Button>
      <Button onClick={onClickUpdate}>
        Update Latest
      </Button>
      <div>Renders: {renderCount}</div>
      <div className="messages">
        <div className="hint">(text) - (renders)</div>
        <For each={todos$}>
          {(item) => {
            useEffect(() => {
              item.renders.set((r) => r + 1)
            })
            return (
              <div>
                {item.text.get()} - {item.renders.peek()}
              </div>
            )
          }}
        </For>
      </div>
    </Box>
  )
}
`;

export function TodosComponent() {
  return (
    <Editor
      code={TODOS_CODE}
      scope={{
        useRef,
        useObservable,
        For,
        useState,
        observer,
        useEffect,
        Box,
        Button,
      }}
      noInline={true}
      previewWidth={200}
      renderCode=";render(<TodosExample />)"
      transformCode={(code) =>
        code
          .replace(
            /className="messages"/g,
            'className="rounded-lg p-4 text-sm h-[24rem] overflow-auto bg-gray-700"'
          )
          .replace(/className="hint"/g, 'className="pb-2 text-gray-400"')
      }
    />
  );
}





================================================
FILE: packages/list/src/Components/PersistSync/PersistSync.astro
================================================
---
import { PersistSync } from "./PersistSync"
---

<PersistSync client:visible client:idle />



================================================
FILE: packages/list/src/Components/PersistSync/PersistSync.tsx
================================================
import { observable, syncState } from '@legendapp/state';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
import { Memo, Reactive, observer, use$, useIsMounted } from '@legendapp/state/react';
import { configureSynced, syncObservable, synced } from '@legendapp/state/sync';
import { syncedFetch } from '@legendapp/state/sync-plugins/fetch';
import { Box } from 'shared/src/Components/Box';
import { Editor } from 'shared/src/Components/Editor/Editor';
import { state$ } from 'shared/src/state';

const PERSIST_SYNC_CODE = `
import { observable } from "@legendapp/state"
import { use$ } from "@legendapp/state/react"
import { configureSynced } from "@legendapp/state/sync"
import { syncedFetch } from "@legendapp/state/sync-plugins/fetch";
import { ObservablePersistMMKV } from
    "@legendapp/state/persist-plugins/mmkv"

// Setup global sync and persist configuration. These can be overriden
// per observable.
const mySyncedFetch = configureSynced(syncedFetch, {
    persist: {
        plugin: ObservablePersistMMKV,
        retrySync: true // Persist pending changes and retry
    },
    retry: {
        infinite: true // Retry changes with exponential backoff
    }
})

// Create a synced observable
const profile$ = observable(mySyncedFetch({
    get: 'https://reqres.in/api/users/1',
    set: 'https://reqres.in/api/users/1',
    setInit: { method: 'PUT' },

    // Transform server data to local format
    transform: {
        load: (value, method) => method === 'get' ? value.data : value
    },

    // Update observable with updatedAt time from server
    onSaved: (result) => ({ updatedAt: new Date(result.updatedAt) }),

    // Persist in local storage
    persist: {
        name: 'persistSyncExample',
    },

    // Don't want to overwrite updatedAt
    mode: 'assign'
}))

function App() {
    const updatedAt = use$(profile$.updatedAt)
    const saved = updatedAt ? new Date(updatedAt).toLocaleString() : 'Never'

    return (
        <Box>
            <Reactive.TextInput $value={profile$.first_name} />
            <Reactive.TextInput $value={profile$.last_name} />
            <Text>
                Saved: {saved}
            </Text>
        </Box>
    )
}
`;

export const PersistSync = observer(function PersistSync() {
    const framework = state$.framework.get();
    const replacer = (str: string) =>
        str
            .replace(/<Text/g, '<div')
            .replace(/<\/Text/g, '</div')
            .replace(/\/mmkv/g, '/local-storage')
            .replace(/ObservablePersistMMKV/g, 'ObservablePersistLocalStorage')
            .replace(/TextInput/g, 'input')
            .replace(/async-storage/g, 'local-storage');

    const isMounted = useIsMounted().get();
    const displayCode = isMounted && framework === 'React' ? replacer(PERSIST_SYNC_CODE) : PERSIST_SYNC_CODE;

    return (
        <Editor
            code={displayCode}
            scope={{
                observable,
                observer,
                Reactive,
                Box,
                syncedFetch,
                configureSynced,
                syncObservable,
                ObservablePersistLocalStorage,
                synced,
                syncState,
                Memo,
                use$,
            }}
            noInline
            renderCode=";render(<App />)"
            previewWidth={180}
            transformCode={(code) =>
                replacer(
                    code
                        .replace(
                            /<Reactive\.(?:TextInput|input)/g,
                            `<Reactive.input style={{ color: 'inherit' }} className="bg-white/10 text-inherit border rounded border-gray-500 px-2 py-1 mb-4 w-[140px]"`,
                        )
                        .replace('ObservablePersistMMKV', 'ObservablePersistLocalStorage')
                        .replace('<Footer>', `<div>`)
                        .replace('</Footer>', '</div>'),
                )
            }
        />
    );
});



================================================
FILE: packages/list/src/Components/React/AnimatedSwitchExample.astro
================================================
---
import { AnimatedSwitchComponent } from "./AnimatedSwitchExample";
---

<AnimatedSwitchComponent client:only />



================================================
FILE: packages/list/src/Components/React/AnimatedSwitchExample.tsx
================================================
import { reactive } from "@legendapp/state/react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { observable } from "@legendapp/state";
import { useComputed, Memo } from "@legendapp/state/react";
import { Editor } from "shared/src/Components/Editor/Editor";
import { Box } from "shared/src/Components/Box";
import { Button } from "shared/src/Components/Button";

const ANIMATED_SWITCH_CODE = `
import { reactive } from "@legendapp/state/react"
import { motion } from "framer-motion"
import { useRef } from "react"
import { observable } from "@legendapp/state"
import { useComputed, Memo } from "@legendapp/state/react"

const MotionDiv = reactive(motion.div)

function Toggle({ $value }) {
  return (
    <MotionDiv
      className="toggle"
      $animate={() => ({
        backgroundColor: $value.get() ? '#6ACB6C' : '#515153'
      })}
      style={{ width: 64, height: 32 }}
      onClick={$value.toggle}
    >
      <MotionDiv
        className="thumb"
        style={{ width: 24, height: 24, marginTop: 3 }}
        $animate={() => ({
          x: $value.get() ? 34 : 4
        })}
      />
    </MotionDiv>
  )
}

const settings$ = observable({ enabled: false })

function App() {
  const renderCount = ++useRef(0).current

  // Computed text value
  const text$ = () => (
    settings$.enabled.get() ? 'Yes' : 'No'
  )

  return (
    <Box>
      <div>Renders: {renderCount}</div>
      <div>
        Enabled: <Memo>{text$}</Memo>
      </div>
      <Toggle $value={settings$.enabled} />
    </Box>
  )
}
`;

export function AnimatedSwitchComponent() {
  return (
    <Editor
      code={ANIMATED_SWITCH_CODE}
      scope={{
        useRef,
        observable,
        reactive,
        motion,
        useComputed,
        Memo,
        Box,
        Button,
      }}
      noInline={true}
      renderCode=";render(<App />)"
      previewWidth={128}
      transformCode={(code) =>
        code
          .replace(
            /className="toggle"/g,
            'className="border border-[#717173] rounded-full select-none cursor-pointer"'
          )
          .replace(
            /className="thumb"/g,
            'className="bg-white rounded-full shadow"'
          )
      }
    />
  );
}



================================================
FILE: packages/list/src/Components/React/AutoSavingFormExample.astro
================================================
---
import { AutoSavingFormComponent } from "./AutoSavingFormExample";
---

<AutoSavingFormComponent client:only />



================================================
FILE: packages/list/src/Components/React/AutoSavingFormExample.tsx
================================================
import axios from 'axios';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useObservable, Memo } from '@legendapp/state/react';
import { useObservableSyncedQuery } from '@legendapp/state/sync-plugins/tanstack-react-query';
import { useQueryClient } from '@tanstack/react-query';
import { Editor } from 'shared/src/Components/Editor/Editor';
import { Box } from 'shared/src/Components/Box';
import { $React } from '@legendapp/state/react-web';

let timeout: any;
function debounce(fn: () => void, time: number) {
    clearTimeout(timeout);
    timeout = setTimeout(fn, time);
}
const AUTO_SAVING_FORM_CODE = `
import axios from "axios"
import { useRef } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useObservable, Reactive, Memo } from "@legendapp/state/react"
import { useObservableSyncedQuery } from
    '@legendapp/state/sync-plugins/tanstack-react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const renderCount = ++useRef(0).current
  const lastSaved$ = useObservable(0)
  const data$ = useObservableSyncedQuery({
    queryClient,
    query: {
      queryKey: ["data"],
      queryFn: () =>
        axios.get("https://reqres.in/api/users/1")
          .then((res) => res.data.data),
    },
    mutation: {
      mutationFn: (newData) => {
        // Uncomment to actually save
        /*
        debounce(() => {
          axios
            .post("https://reqres.in/api/users/1", newData)
            .then((res) =>
              lastSaved$.set(Date.now())
            )
        }, 1000)
        */
        lastSaved$.set(Date.now())
      }
    }
  })

  return (
    <Box>
      <div>
        Renders: {renderCount}
      </div>
      <div>Name:</div>
      <$React.input
        className="input"
        $value={data$.first_name}
      />
      <div>Email:</div>
      <$React.input
        className="input"
        $value={data$.email}
      />
      <div>
        Last saved: <Memo>{lastSaved$}</Memo>
      </div>
    </Box>
  )
}
`;

export function AutoSavingFormComponent() {
    return (
        <Editor
            code={AUTO_SAVING_FORM_CODE}
            scope={{
                useRef,
                $React,
                QueryClient,
                QueryClientProvider,
                useObservable,
                useObservableSyncedQuery,
                useQueryClient,
                Memo,
                axios,
                Box,
                debounce,
            }}
            noInline={true}
            renderCode=";render(<App />)"
            transformCode={(code) =>
                code.replace(
                    /className="input"/g,
                    'className="bg-gray-900 text-white border rounded border-gray-600 px-2 py-1 mt-2 mb-6"',
                )
            }
        />
    );
}



================================================
FILE: packages/list/src/Components/React/ComputedExample.astro
================================================
---
import { ComputedExampleComponent } from "./ComputedExample";
---

<ComputedExampleComponent client:visible client:idle />



================================================
FILE: packages/list/src/Components/React/ComputedExample.tsx
================================================
import { observable } from "@legendapp/state";
import { Computed, observer, useObservable } from "@legendapp/state/react";
import { useRef, useState } from "react";
import { Box } from "shared/src/Components/Box";
import { Button } from "shared/src/Components/Button";
import { Editor } from "shared/src/Components/Editor/Editor";
import { useInterval } from "usehooks-ts";

const COMPUTED_CODE = `
import { useInterval } from "usehooks-ts"
import { useRef, useState } from "react"
import { observable } from "@legendapp/state"
import { Computed, observer, useObservable } from "@legendapp/state/react"

const ComputedExample = () => {
  const renderCount = ++useRef(0).current

  const [value, setValue] = useState(1)

  // Only the Computed component tracks this
  const state$ = useObservable({ count: 1 })
  useInterval(() => {
    state$.count.set((v) => v + 1)
  }, 500)

  // Force a render
  const onClick = () => setValue((v) => v + 1)

  return (
    <Box center>
      <h5>Normal</h5>
      <div>Renders: {renderCount}</div>
      <div>Value: {value}</div>
      <Button onClick={onClick}>
        Render
      </Button>
      <Computed>
        {() => <>
          <h5>Computed</h5>
          <div>Value: {value}</div>
          <div>Count: {state$.count.get()}</div>
        </>}
      </Computed>
    </Box>
  )
}
`;

export function ComputedExampleComponent() {
  return (
    <Editor
      code={COMPUTED_CODE}
      scope={{
        Box,
        useRef,
        useObservable,
        Computed,
        observable,
        useInterval,
        observer,
        useState,
        Button,
      }}
      noInline
      previewWidth={180}
      renderCode=";render(<ComputedExample />)"
    />
  );
}



================================================
FILE: packages/list/src/Components/React/EasyExample.astro
================================================
---
import { EasyExampleComponent } from "./EasyExample";
---

<style is:global>
  .p_easy > div > div {
    @apply bg-gray-800 p-5 rounded-md;
    width: 200px;
  }
  .p_easy > div > div > div:nth-child(2){
    @apply pt-4
  }
</style>
<EasyExampleComponent client:only />



================================================
FILE: packages/list/src/Components/React/EasyExample.tsx
================================================
import { Memo, useObservable } from "@legendapp/state/react";
import { useRef } from "react";
import { Box } from "shared/src/Components/Box";
import { Editor } from "shared/src/Components/Editor/Editor";
import { useInterval } from "usehooks-ts";

const EASY_EXAMPLE_CODE = `
import { useRef } from "react"
import { useInterval } from "usehooks-ts"
import { Memo, useObservable } from "@legendapp/state/react"

function EasyExample() {
  const renderCount = ++useRef(0).current
  const state$ = useObservable({ count: 0 })

  useInterval(() => {
      state$.count.set((c) => c + 1)
  }, 500)

  return (
      <Box>
          <div>Renders: {renderCount}</div>
          <div>Count: <Memo>{state$.count}</Memo></div>
      </Box>
  )
}
`;

export function EasyExampleComponent() {
  return (
    <Editor
      name="easy"
      code={EASY_EXAMPLE_CODE.trim()}
      scope={{
        useRef,
        useObservable,
        useInterval,
        Memo,
        Box,
      }}
    />
  );
}



================================================
FILE: packages/list/src/Components/React/FormValidationExample.astro
================================================
---
import { FormValidationComponent } from "./FormValidationExample";
---

<FormValidationComponent client:only />



================================================
FILE: packages/list/src/Components/React/FormValidationExample.tsx
================================================
import { useRef } from 'react';
import { useObservable, useObserve, Memo, Show } from '@legendapp/state/react';
import { Editor } from 'shared/src/Components/Editor/Editor';
import { Box } from 'shared/src/Components/Box';
import { Button } from 'shared/src/Components/Button';
import { $React } from '@legendapp/state/react-web';

const FORM_VALIDATION_CODE = `
import { useRef } from "react"
import { useObservable, useObserve, Reactive, Memo, Show } from "@legendapp/state/react"

function App() {
  const renderCount = ++useRef(0).current

  const username$ = useObservable('')
  const password$ = useObservable('')
  const usernameError$ = useObservable('')
  const passwordError$ = useObservable('')
  const didSave$ = useObservable(false)
  const successMessage$ = useObservable('')

  useObserve(() => {
    if (didSave$.get()) {
      usernameError$.set(username$.get().length < 3 ?
        'Username must be > 3 characters' :
        ''
      )
      const pass = password$.get()
      passwordError$.set(
        pass.length < 10 ?
          'Password must be > 10 characters' :
          !pass.match(/\d/) ?
            'Password must include a number' :
            ''
      )
    }
  })

  const onClickSave = () => {
    // setting triggers useObserve, updating error messages
    didSave$.set(true)

    if (!usernameError$.get() && !passwordError$.get()) {
      console.log('Submit form')
      passwordError$.delete()
      successMessage$.set('Saved!')
    }
  }

  return (
    <Box>
      <div>Renders: {renderCount}</div>
      <div>Username:</div>
      <$React.input
        className="input"
        $value={username$}
      />
      <div className="error">
        <Memo>{usernameError$}</Memo>
      </div>
      <div>Password:</div>
      <$React.input
        type="password"
        className="input"
        $value={password$}
      />
      <div className="error">
        <Memo>{passwordError$}</Memo>
      </div>
      <Show if={successMessage$}>
        {() => (
          <div>
            {successMessage$.get()}
          </div>
        )}
      </Show>
      <Button onClick={onClickSave}>
        Save
      </Button>
    </Box>
  )
}
`;

export function FormValidationComponent() {
    return (
        <Editor
            code={FORM_VALIDATION_CODE}
            scope={{
                useRef,
                $React,
                useObservable,
                useObserve,
                Memo,
                Show,
                Box,
                Button,
            }}
            noInline={true}
            previewWidth={200}
            renderCode=";render(<App />)"
            transformCode={(code) =>
                code
                    .replace(
                        /className="input"/g,
                        'className="bg-gray-900 text-white border rounded border-gray-600 px-2 py-1 mt-2"',
                    )
                    .replace(/className="error"/g, 'className="text-sm text-red-500 mb-2 h-10 pt-1"')
            }
        />
    );
}



================================================
FILE: packages/list/src/Components/React/MemoExample.astro
================================================
---
import { MemoExampleComponent } from "./MemoExample";
---

<MemoExampleComponent client:visible client:idle />



================================================
FILE: packages/list/src/Components/React/MemoExample.tsx
================================================
import { observable } from "@legendapp/state";
import
    {
        Memo,
        observer,
        useObservable,
    } from "@legendapp/state/react";
import { useRef, useState } from "react";
import { Box } from "shared/src/Components/Box";
import { Button } from "shared/src/Components/Button";
import { Editor } from "shared/src/Components/Editor/Editor";
import { useInterval } from "usehooks-ts";

const MEMO_CODE = `
import { useInterval } from "usehooks-ts"
import { observable } from "@legendapp/state"
import { useRef, useState } from "react"
import { Memo, observer, useObservable } from "@legendapp/state/react"

const MemoExample = () => {
  const renderCount = ++useRef(0).current

  const [value, setValue] = useState(1)

  // Only the Memo'd component tracks this
  const state$ = useObservable({ count: 1 })
  useInterval(() => {
    state$.count.set((v) => v + 1)
  }, 500)

  // Force a render
  const onClick = () => setValue((v) => v + 1)

  return (
    <Box center>
      <h5>Normal</h5>
      <div>Renders: {renderCount}</div>
      <div>Value: {value}</div>
      <Button onClick={onClick}>
        Render
      </Button>
      <Memo>
        {() => <>
          <h5>Memo'd</h5>
          <div>Value: {value}</div>
          <div>Count: {state$.count.get()}</div>
        </>}
      </Memo>
    </Box>
  )
}
`;

export function MemoExampleComponent() {
  return (
    <Editor
      code={MEMO_CODE}
      scope={{
        Box,
        useRef,
        useObservable,
        Memo,
        observable,
        useInterval,
        observer,
        useState,
        Button,
      }}
      noInline
      previewWidth={180}
      renderCode=";render(<MemoExample />)"
    />
  );
}



================================================
FILE: packages/list/src/Components/React/MessageListExample.astro
================================================
---
import { MessageListComponent } from "./MessageListExample";
---

<MessageListComponent client:only />



================================================
FILE: packages/list/src/Components/React/MessageListExample.tsx
================================================
import { Box } from 'shared/src/Components/Box';
import { Button } from 'shared/src/Components/Button';
import { For, Memo, Show, useObservable } from '@legendapp/state/react';
import { useRef } from 'react';
import { Editor } from 'shared/src/Components/Editor/Editor';
import { syncedFetch } from '@legendapp/state/sync-plugins/fetch';
import { $React } from '@legendapp/state/react-web';

const MESSAGE_LIST_CODE = `
import { For, Reactive, Show, useObservable, useObservable } from "@legendapp/state/react"
import { syncedFetch } from "@legendapp/state/sync-plugins/fetch"

let nextID = 0
function generateID() {
  return nextID ++
}

function App() {
  const renderCount = ++useRef(0).current

  // Create profile from fetch promise
  const profile = useObservable(syncedFetch({
    get: 'https://reqres.in/api/users/1'
  }))

  // Username
  const userName = useObservable(() => {
    const p = profile.get()
    return p ?
        p.first_name + ' ' + p.last_name :
        ''
  })

  // Chat state
  const { messages, currentMessage } = useObservable({
    messages: [],
    currentMessage: ''
  })

  // Button click
  const onClickAdd = () => {
    messages.push({
      id: generateID(),
      text: currentMessage.get(),
    })
    currentMessage.set('')
  }

  return (
    <Box>
      <div>Renders: {renderCount}</div>
      <Show if={userName} else={<div>Loading...</div>}>
        <div>Chatting with <Memo>{userName}</Memo></div>
      </Show>
      <div className="messages">
        <For each={messages}>
          {(message) => <div>{message.text.get()}</div>}
        </For>
      </div>
      <div className="flex gap-2 items-center">
        <$React.input
          className="input"
          placeholder="Enter message"
          $value={currentMessage}
          onKeyDown={e => e.key === 'Enter' && onClickAdd()}
        />
        <Button onClick={onClickAdd}>
          Send
        </Button>
      </div>
    </Box>
  )
}
`;

export function MessageListComponent() {
    return (
        <Editor
            code={MESSAGE_LIST_CODE}
            scope={{
                useRef,
                $React,
                syncedFetch,
                useObservable,
                Show,
                Memo,
                For,
                Box,
                Button,
            }}
            noInline={true}
            renderCode=";render(<App />)"
            transformCode={(code) =>
                code
                    .replace(
                        /className="input"/g,
                        'className="bg-gray-900 text-white border rounded border-gray-600 px-2 py-1"',
                    )
                    .replace(
                        /className="messages"/g,
                        'className="h-64 p-2 my-3 overflow-auto border border-gray-600 rounded [&>*]:!mt-2"',
                    )
            }
        />
    );
}



================================================
FILE: packages/list/src/Components/React/ModalExample.astro
================================================
---
import { ModalComponent } from "./ModalExample";
---

<ModalComponent client:only />



================================================
FILE: packages/list/src/Components/React/ModalExample.tsx
================================================
import { Box } from "shared/src/Components/Box";
import { Button } from "shared/src/Components/Button";
import {
  reactive,
  useObservable,
  Switch,
  Show,
  useComputed,
} from "@legendapp/state/react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { observable } from "@legendapp/state";
import { AnimatePresence } from "framer-motion";
import { Editor } from "shared/src/Components/Editor/Editor";

const MODAL_CODE = `
const MotionDiv = reactive(motion.div)
const MotionButton = reactive(motion.button)

const TransitionBounce = {
  type: 'spring',
  duration: 0.4,
  bounce: 0.3,
}

function Modal({ show }) {
  const renderCount = ++useRef(0).current
  const page$ = useObservable(0)

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => show.set(false)}
      />
      <motion.div
        className="modal"
        initial={{ opacity: 0, scale: 0.7, translateY: 40 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        exit={{ scale: 0.7, opacity: 0 }}
        style={{ width: 240, height: 320 }}
        transition={TransitionBounce}
      >
        <div>
          Renders: {renderCount}
        </div>
        <div className="pageText">
          <Switch value={page$}>
            {{
              0: () => <div>First Page</div>,
              1: () => <div>Second Page</div>,
              2: () => <div>Third Page</div>
            }}
          </Switch>
        </div>
        <div className="modalButtons">
          <MotionButton
            className="pageButton"
            animate={() => ({ opacity: page$.get() === 0 ? 0.5 : 1 })}
            $disabled={() => page$.get() === 0}
            onClick={() => page$.set(p => p - 1)}
            transition={{ duration: 0.15 }}
          >
            Prev
          </MotionButton>
          <MotionButton
            className="pageButton"
            animate={() => ({ opacity: page$.get() === 2 ? 0.5 : 1 })}
            $disabled={() => page$.get() === 2}
            onClick={() => page$.set(p => p + 1)}
            transition={{ duration: 0.15 }}
          >
            Next
          </MotionButton>
        </div>
      </motion.div>
    </motion.div>
  )
}


function App() {
  const renderCount = ++useRef(0).current

  const showModal = useObservable(false)

  return (
    <Box height={512}>
      <div>Renders: {renderCount}</div>
      <Button onClick={showModal.toggle}>
        Show modal
      </Button>
      <Show if={showModal} wrap={AnimatePresence}>
        {() => <Modal show={showModal} />}
      </Show>
    </Box>
  )
}
`;

export function ModalComponent() {
  return (
    <Editor
      code={MODAL_CODE}
      scope={{
        useRef,
        observable,
        reactive,
        motion,
        useObservable,
        Show,
        AnimatePresence,
        Switch,
        useComputed,
        Box,
        Button,
      }}
      noInline={true}
      renderCode=";render(<App />)"
      previewWidth={220}
      transformCode={(code) =>
        code
          .replace(
            /className="pageText"/g,
            'className="flex-1 flex justify-center items-center"'
          )
          .replace(
            /className="pageButton"/g,
            'className="px-4 py-2 my-4 font-bold rounded shadow text-2xs cursor-pointer bg-gray-600 hover:bg-gray-500 !mt-0"'
          )
          .replace(
            /className="modal"/g,
            'className="relative bg-gray-700 rounded-xl flex flex-col p-4"'
          )
          .replace(/className="modalButtons"/g, 'className="flex justify-center gap-4"')
      }
    />
  );
}




================================================
FILE: packages/list/src/Components/React/PauseExample.astro
================================================
---
import { PauseExampleComponent } from "./PauseExample";
---

<PauseExampleComponent client:visible client:idle />



================================================
FILE: packages/list/src/Components/React/PauseExample.tsx
================================================
import {
  Memo,
  useObservable,
  usePauseProvider,
} from "@legendapp/state/react";
import { Box } from "shared/src/Components/Box";
import { Button } from "shared/src/Components/Button";
import { Editor } from "shared/src/Components/Editor/Editor";
import { useInterval } from "usehooks-ts";

const MEMO_CODE = `
import { useInterval } from "usehooks-ts"
import { Memo, usePauseProvider, useObservable } from '@legendapp/state/react'

function App() {
    const { PauseProvider, isPaused$ } = usePauseProvider()

    const int$ = useObservable(0)
    useInterval(() => {
        int$.set((val) => val + 1)
    }, 100)

    return (
        <Box center>
            <Button onClick={isPaused$.toggle}>
                <Memo>{() => (isPaused$.get() ? 'Resume' : 'Pause')}</Memo>
            </Button>
            <PauseProvider>
                <Memo>{int$}</Memo>
            </PauseProvider>
        </Box>
    )
}
`;

export function PauseExampleComponent() {
  return (
    <Editor
      code={MEMO_CODE}
      scope={{
        Box,
        useObservable,
        Memo,
        useInterval,
        Button,
        usePauseProvider,
      }}
      noInline
      previewWidth={140}
      renderCode=";render(<App />)"
    />
  );
}



================================================
FILE: packages/list/src/Components/React/Persistence.astro
================================================
---
import { PersistenceComponent } from "./Persistence";
---

<PersistenceComponent client:only />



================================================
FILE: packages/list/src/Components/React/Persistence.tsx
================================================
import { observable } from '@legendapp/state';
import { syncObservable } from '@legendapp/state/sync';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
import { reactive } from '@legendapp/state/react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Box } from 'shared/src/Components/Box';
import { Button } from 'shared/src/Components/Button';
import { Editor } from 'shared/src/Components/Editor/Editor';
import { $React } from '@legendapp/state/react-web';

export const Footer = ({
    className,
    theme,
    children,
    width,
    center,
}: {
    className?: string;
    theme?: 'light' | 'dark';
    center?: boolean;
    children: any;
    width?: number;
}) => {
    return (
        <div
            className={classNames(
                'rounded-lg p-4',
                center && 'flex flex-col items-center',
                theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-800',
                className,
            )}
            style={{ width }}
        >
            {children}
        </div>
    );
};

const PERSISTENCE_CODE = `
import { observable } from "@legendapp/state"
import { syncObservable } from "@legendapp/state/sync"
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage"
import { $React } from "@legendapp/state/react-web"
import { motion } from "framer-motion"
import { useRef } from "react"

const state$ = observable({
  settings: { showSidebar: false, theme: 'light' },
  user: {
    profile: { name: '', avatar: '' },
    messages: {}
  }
})

// Persist state
syncObservable(state$, {
  local: 'persistenceExample',
  pluginLocal: ObservablePersistLocalStorage,
})

// Create a reactive Framer-Motion div
const MotionDiv = reactive(motion.div)

function App() {
  const renderCount = ++useRef(0).current

  const sidebarHeight = () => (
    state$.settings.showSidebar.get() ? 96 : 0
  )

  return (
    <Box>
      <div>Renders: {renderCount}</div>
      <div>Username:</div>
      <$React.input
        className="input"
        $value={state$.user.profile.name}
      />
      <Button onClick={state$.settings.showSidebar.toggle}>
        Toggle footer
      </Button>
      <MotionDiv
        className="footer"
        $animate={() => ({
           height: state$.settings.showSidebar.get() ?
             96 : 0
        })}
      >
        <div className="p-4">Footer</div>
      </MotionDiv>
    </Box>
  )
}
`;

export function PersistenceComponent() {
    return (
        <Editor
            code={PERSISTENCE_CODE}
            scope={{
                useRef,
                observable,
                syncObservable,
                ObservablePersistLocalStorage,
                reactive,
                motion,
                $React,
                Button,
                Box,
            }}
            noInline={true}
            previewWidth={210}
            renderCode=";render(<App />)"
            transformCode={(code) =>
                code
                    .replace(
                        /className="footer"/g,
                        'className="bg-gray-600 text-center text-white text-sm overflow-hidden"',
                    )
                    .replace(
                        /className="input"/g,
                        'className="bg-gray-900 text-white border rounded border-gray-600 px-2 py-1 mt-2"',
                    )
            }
        />
    );
}



================================================
FILE: packages/list/src/Components/React/RouterExample.astro
================================================
---
import { RouterComponent } from "./RouterExample";
---

<RouterComponent client:only />



================================================
FILE: packages/list/src/Components/React/RouterExample.tsx
================================================
import { useRef } from "react";
import { Editor } from "shared/src/Components/Editor/Editor";
import { Memo, Switch } from "@legendapp/state/react";
import { pageHash } from "@legendapp/state/helpers/pageHash";
import { pageHashParams } from "@legendapp/state/helpers/pageHashParams";
import { Box } from "shared/src/Components/Box";
import { Button } from "shared/src/Components/Button";

const ROUTER_CODE = `
import { useRef } from "react"
import { Memo, Switch } from "@legendapp/state/react"
import { pageHash } from "@legendapp/state/helpers/pageHash"
import { pageHashParams } from "@legendapp/state/helpers/pageHashParams"

function RouterExample() {
  const renderCount = ++useRef(0).current

  return (
    <Box width={240}>
      <div>Renders: {renderCount}</div>
      <div>
        <Button onClick={() => pageHashParams.page.delete()}>
          Go to root
        </Button>
        <Button onClick={() => pageHashParams.page.set('')}>
          Go to Page
        </Button>
        <Button onClick={() => pageHashParams.page.set('Home')}>
          Go Home
        </Button>
        <Button onClick={() => pageHashParams.page.set('asdf')}>
          Go to unknown
        </Button>
      </div>
        <div>Hash: <Memo>{pageHash}</Memo></div>
        <div className="p-4 bg-gray-600 rounded-xl">
          <Switch value={pageHashParams.page}>
            {{
              undefined: () => <div>Root</div>,
              '': () => <div>Page</div>,
              Home: () => <div>Home</div>,
              default: () => <div>Unknown page</div>,
            }}
          </Switch>
        </div>
    </Box>
  )
}
`;

export function RouterComponent() {
  return (
    <Editor
      code={ROUTER_CODE}
      scope={{ useRef, Memo, pageHash, pageHashParams, Switch, Box, Button }}
      noInline={true}
      renderCode=";render(<RouterExample />)"
    />
  );
}



================================================
FILE: packages/list/src/Components/React/ShowExample.astro
================================================
---
import { ShowComponent } from "./ShowExample";
---

<ShowComponent client:only />



================================================
FILE: packages/list/src/Components/React/ShowExample.tsx
================================================
import { Show, useObservable } from "@legendapp/state/react";
import { useRef } from "react";
import { Box } from "shared/src/Components/Box";
import { Button } from "shared/src/Components/Button";
import { Editor } from "shared/src/Components/Editor/Editor";

function Modal() {
    return (
        <div className="p-6 my-4 font-bold text-center bg-gray-700 rounded-lg shadow">Modal</div>
    )
}
function Nothing() {
    return <div className="text-xs text-gray-500">Nothing to see here</div>
}

const SHOW_EXAMPLE_CODE = `
import { Show, useObservable } from "@legendapp/state/react"
import { useRef } from "react"

const ShowExample = () => {
  const renderCount = ++useRef(0).current
  const state$ = useObservable({ show: false })

  return (
    <Box width={160}>
      <div>Renders: {renderCount}</div>
      <Button
        onClick={state$.show.toggle}
      >
        Toggle
      </Button>
      <Show if={state$.show} else={<Nothing />}>
        {() => <Modal />}
      </Show>
    </Box>
  )
}
`;

export function ShowComponent() {
  return (
    <Editor
      code={SHOW_EXAMPLE_CODE}
      scope={{
        useRef,
        useObservable,
        Show,
        Box,
        Button,
        Modal,
        Nothing,
      }}
      noInline={true}
      previewWidth={160}
      renderCode=";render(<ShowExample />)"
    />
  );
}



================================================
FILE: packages/list/src/Components/React/SwitchExample.astro
================================================
---
import { SwitchComponent } from "./SwitchExample";
---

<SwitchComponent client:only />



================================================
FILE: packages/list/src/Components/React/SwitchExample.tsx
================================================
import { Switch, useObservable } from "@legendapp/state/react";
import { useRef } from "react";
import { Box } from "shared/src/Components/Box";
import { Button } from "shared/src/Components/Button";
import { Editor } from "shared/src/Components/Editor/Editor";

const SWITCH_EXAMPLE_CODE = `
import { Switch, useObservable } from "@legendapp/state/react"
import { useRef } from "react"

function SwitchExample() {
  const renderCount = ++useRef(0).current
  const index$ = useObservable(0)

  const onClick = () => index$.set((v) => (v > 2 ? 0 : v + 1))

  return (
    <Box>
      <div>Renders: {renderCount}</div>
      <Button onClick={onClick}>
        Next tab
      </Button>
      <Switch value={index$}>
        {{
          0: () => <div>Tab 1</div>,
          1: () => <div>Tab 2</div>,
          2: () => <div>Tab 3</div>,
          3: () => <div>Error</div>,
        }}
      </Switch>
    </Box>
  )
}
`;

export function SwitchComponent() {
  return (
    <Editor
      code={SWITCH_EXAMPLE_CODE}
      scope={{
        useRef,
        useObservable,
        Switch,
        Box,
        Button,
      }}
      noInline={true}
      previewWidth={160}
      renderCode=";render(<SwitchExample />)"
    />
  );
}



================================================
FILE: packages/list/src/content/config.ts
================================================
import { defineCollection } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
	i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};



================================================
FILE: packages/list/src/content/docs/index.mdx
================================================
---
title: Legend List
description: Fast React Native list component
template: splash
hero:
  tagline: React Native list component
  image:
    file: ../../assets/logo.png
  actions:
    - text: Documentation
      link: api/gettingstarted/
      icon: right-arrow
      variant: primary
    - text: From the builders of Legend App
      link: https://legendapp.com
      icon: external
---

import { Card, CardGrid } from "@astrojs/starlight/components";

## Why Legend State?

<CardGrid stagger>
  <Card title="Easy to Use" icon="pencil">
    You can start sprinkling legend state without worrying about how to setup
  </Card>
  <Card title="Built for the New Era" icon="add-document">
    Legend State brings back reactivity from knockout with a cool API for React
  </Card>
  <Card title="Blazingly Fast" icon="setting">
    Check the [Krausest benchmarks](./intro/fast)
  </Card>
  <Card title="Read the docs" icon="open-book">
    Learn more in [the Legend Docs](./intro/introduction).
  </Card>
</CardGrid>



================================================
FILE: packages/list/src/content/docs/api/animated.mdx
================================================
---
title: Animated & Keyboard
description: Basic optimizations
sidebar:
    order: 4
---

## Animated

AnimatedLegendList supports animated props with React Native's Animated.

```jsx
import { AnimatedLegendList } from "@legendapp/list/animated";

export function AnimatedExample() {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <AnimatedLegendList
      data={data}
      renderItem={renderItem}
      style={{ opacity: animated }}
    />
  );
}
```

Note that this is just a wrapper around the normal `createAnimatedComponent` so you can use that if you prefer.

```ts
const AnimatedLegendList = Animated.createAnimatedComponent(LegendList);
```

## Reanimated

The Reanimated version of AnimatedLegendList supports animated props with Renimated. Note that using `Animated.createAnimatedComponent` will not work as it needs more boilerplate, so you should use this instead.

```jsx
import { AnimatedLegendList } from "@legendapp/list/reanimated";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

export function ReanimatedExample() {
  const scale = useSharedValue(0.8);

  useEffect(() => {
    scale.value = withSpring(1);
  }, []);

  return (
    <AnimatedLegendList
      data={data}
      renderItem={renderItem}
      style={useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
      }))}
    />
  );
}
```

## Keyboard Controller

LegendList integrates with the `KeyboardAvoidingView` in [react-native-keyboard-controller](https://github.com/kirillzyusko/react-native-keyboard-controller) for smoother keyboard interactions. Note that it is important to use `behavior="position"` for best compatibility with Legend List.

```jsx
import { KeyboardAvoidingView, KeyboardProvider } from "react-native-keyboard-controller";
import { LegendList } from "@legendapp/list/keyboard-controller";

export function KeyboardControllerExample() {
  return (
    <KeyboardProvider>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={headerHeight}
      >
        <LegendList
          data={data}
          renderItem={renderItem}
          behavior="position"
        />
      </KeyboardAvoidingView>
    </KeyboardProvider>
  );
}
```



================================================
FILE: packages/list/src/content/docs/api/gettingStarted.mdx
================================================
---
title: Getting Started
description: Basic intro to Legend List
sidebar:
    order: 1
---

Legend List is a high performance virtualized ScrollView library for React Native. Compared to FlatList and FlashList it's faster, simpler, and has useful features they don't support.

- ✨ Extremely fast
- ✨ Dynamic item sizes
- ✨ Optional recycling
- ✨ Bidirectional infinite lists
- ✨ Chat list without inverting
- ✨ Maintain content view position
- ✨ Recycling hooks

For more information, listen to Jay's conversation on React Native Radio [here](https://infinite.red/react-native-radio/rnr-325-legend-list-with-jay-meistrich).

import legendList1 from "../../../assets/legendlist1.mp4";

<div style="width: 600px; margin: 32px auto 0 auto; border-radius: 4px; overflow: hidden;">
    <video
        src={legendList1}
        controls
        width="100%"
        height="100%"
        autoPlay
        loop
    />
</div>

## Install

import Install from "shared/src/Components/Install/Install.astro";

<Install name="@legendapp/list" />

## Usage

Legend List is a virtualized ScrollView component for React Native with optional recycling, that can massively increase performance of rendering long lists. Rather than rendering every item in the list, it only renders the items that are in view, which significantly reduces the amount of items that need to render.

Legend List is a drop-in replacement for FlatList or FlashList. So since you're likely coming from one of those, we'll start with a guide on how to switch.

### Quick Start

```jsx
import { Text } from "react-native";
import { LegendList } from "@legendapp/list";

const items = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
];

export function MyList() {
  return (
    <LegendList
      data={items}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      keyExtractor={(item) => item.id}
      recycleItems
    />
  );
}
```

### Switch from FlashList

If you're coming from FlashList, in most cases you can just rename the component and it will work as expected. But note that Legend List does not recycle items by default, so to match FlashList's behavior you can enable `recycleItems`. See [Recycling Items](../performance#recycling-list-items) for more details of recycling behavior.

```diff
return (
-  <FlashList
+  <LegendList
      data={items}
      renderItem={({ item }) => <Text>{item.title}</Text>}
+      recycleItems
  />
)
```

### Switch from FlatList

If you're coming from FlatList, Legend List should immediately be much faster. But you may want to add the `recycleItems` prop to add extra performance.

```diff
return (
-  <FlatList
+  <LegendList
      data={items}
      renderItem={({ item }) => <Text>{item.title}</Text>}
+      recycleItems
  />
)
```

See [Props](../props) for all properties of LegendList.

## 1.0

Legend List recently reached 1.0. So while we are confident that it's stable for use in production, the documentation still needs more work.

## Supported Platforms

- Android
- iOS
- React Native Web
- React Native MacOS
- React Native Windows (likely but untested)
- Any React Native platform should work since there's no native code, but if not please let us know!

## Community

Join us on [Discord](https://discord.gg/5CBaNtADNX) or [Github](https://github.com/LegendApp/legend-list) to get involved with the Legend community.

Talk to Jay on [Bluesky](https://bsky.app/profile/jayz.us) or [Twitter](https://twitter.com/jmeistrich).

## Contributing

We welcome contributions! Please read our [Contributing Guide](https://github.com/LegendApp/legend-list) on Github. And we welcome documentation PRs in our [documentation repo](https://github.com/LegendApp/legend-docs).

## Legend Kit

Legend Kit is our early but growing collection of high performance headless components, general purpose observables, transformer computeds, React hooks that don't re-render, and observable tools for popular frameworks. [Check out Legend Kit](https://www.legendapp.com/kit) to learn more.



================================================
FILE: packages/list/src/content/docs/api/performance.mdx
================================================
---
title: Performance
description: Basic optimizations
sidebar:
    order: 3
---

Legend List is very optimized by default, so it may already be working well without any configuration. But these are some common ways to improve your list behavior.

It's important to provide an `estimatedItemSize` (if items are the same size or all dynamic sizes) or `getEstimatedItemSize` (if items are different known sizes). Legend List uses this as the default item size, then as items are rendered it updates their positions with the actual size. So getting this estimate as close as possible to the real size will reduce layout shifting and blank spaces as items render. If not provided it will use `100px` as the default.

The `onItemSizeChanged` event can also help with your estimations - it will be called whenever an item's size changes. So you can use it to log what the actual rendered size is to adjust your estimates.

### Use `keyExtractor` Prop

```ts
keyExtractor?: (item: T, index: number) => string;
```

The `keyExtractor` prop lets Legend List save item layouts by key, so that if the `data` array changes it can reuse previous layout information and only update the changed items. Without `keyExtractor`, item sizes will reset to their default whenever `data` changes. So it is *very recommended* to have a `keyExtractor` if `data` ever changes. If your items are a fixed size, providing a `keyExtractor` that returns the index will tell it to reuse size information.

### Recycling List Items

```ts
recycleItems?: boolean // default: false
```

Legend List has an optional `recycleItems` prop which enables view recycling. This will reuse the component rendered by your `renderItem` function. This can be a big performance optimization because it does not need to destroy/create views while scrolling. But it also reuses any local state, which can cause some weird behavior that may not be desirable depending on your app. But see the [recycling hooks](../props#userecyclingstate) to make that easier.

So there are some tradeoffs with recycling:

- 👍 If you have items with no state then recycling should be great
- 👎 If you have simple items with complex state then it may be more trouble than it's worth
- 👍 If you have heavy items with complex state then working around the state recycling may be worth it for the performance gains

### Estimate Item Sizes

```ts
estimatedItemSize?: number;
getEstimatedItemSize?: (index: number, item: T) => number;
onItemSizeChanged?: (info: {
        size: number;
        previous: number;
        index: number;
        itemKey: string;
        itemData: ItemT;
    }) => void;
```

### Set DrawDistance Prop

```ts
drawDistance?: number
```

The `drawDistance` (defaults to `250`) is the buffer size in pixels above and below the viewport that will be rendered in advance. So for example if your screen is `2000px` tall and your draw distance is `1000`, then it will render double your screen size, from `-1000px` above the viewport to `1000px` below the viewport.

This can help reduce the amount of blank space while scrolling quickly. But if your items are computationally expensive, it may reduce performance because more items are rendering at once. So you should experiment with it to find the most optimal behavior for your app.


### Use `waitForInitialLayout` Prop

```ts
waitForInitialLayout?: boolean
```

If the size of your list items differs significantly from the estimate, you may see a layout jump after the first render. If so, the `waitForInitialLayout` prop solves that by delaying displaying list items by one frame so they start at the correct position.




================================================
FILE: packages/list/src/content/docs/api/props.mdx
================================================
---
title: Props
description: Legend List Props
sidebar:
    order: 2
---

Below is a list of all the properties for LegendList:

## Required Props
___
### data

```ts
data: ItemT[];
```

An array of the items to render. This can also be an array of keys if you want to get the item by key in [renderItem](#renderitem).

### renderItem

```ts
renderItem?: (props: LegendListRenderItemProps<ItemT>) => ReactNode;
```

Takes an item from data and renders it into the list.

See [React Native Docs](https://reactnative.dev/docs/flatlist#renderItem).

## Recommended Props
___
### keyExtractor

```ts
keyExtractor?: (item: ItemT, index: number) => string;
```

Highly recommended. The `keyExtractor` prop lets Legend List save item layouts by key, so that if the `data` array changes it can reuse previous layout information and only update the changed items. The value it returns should be unique to each item - if a value is reused for a different item it will cause big problems. It is okay to return the index, if list items are reordered or prepended, it will also cause big problems. See [Use key extractor](../optimizations/#use-keyextractor).

If LegendList detects duplicate keys, it will log a warning.

### recycleItems

```ts
recycleItems?: boolean; // default: false
```

This will reuse the component rendered by your `renderItem` function. This can be a big performance improvement, but if your list items have internal state there's potential for undesirable behavior. For more information, see [Performance](../performance#recycling-list-items) for more information.

### estimatedItemSize

```ts
estimatedItemSize?: number;
```

An estimated size for all items which is used to estimate the list layout before items actually render. This can help to provide a hint for how large items will be in the first frame and can speed up initial layout, but subsequent renders will use the average item size.


## Optional Props

___

### alignItemsAtEnd
```ts
alignItemsAtEnd?: boolean; // default: false
```

Aligns to the end of the screen. If there's only a few items, Legend List will add padding to the top to align them to the bottom. See [Chat interfaces without inverse](../../examples/chatinterfaces) for more.

### columnWrapperStyle

```ts
columnWrapperStyle?: StyleProp<ViewStyle>;
```

Style applied to each column's wrapper view.

### contentContainerStyle

```ts
contentContainerStyle?: StyleProp<ViewStyle>;
```

Style applied to the underlying ScrollView's content container.

### drawDistance

```ts
drawDistance?: number;
```

The `drawDistance` (defaults to `250`) is the buffer size in pixels above and below the viewport that will be rendered in advance. See [Performance](../performance#set-drawdistance-prop)  for more.

### extraData

```ts
extraData?: any;
```

Extra data to trigger re-rendering when changed.

See [React Native Docs](https://reactnative.dev/docs/flatlist#extraData).

### getEstimatedItemSize

```ts
getEstimatedItemSize?: (index: number, item: ItemT) => number;
```

An estimated size for each item which is used to estimate the list layout before items actually render. If you don't provide this, it will log a suggested value for optimal performance.

### horizontal

```ts
horizontal?: boolean; // default: false
```

Renders all items in the list in horizontal.

### initialContainerPoolRatio

```ts
initialContainerPoolRatio?: number; // default: 2
```

Ratio of initial container pool size to data length. The container pool is extra unallocated containers that are used in case the actual size is smaller than the estimated size. This defaults to `2` which we've found to cover most usage. If your items are a fixed size you could set it closer to `1`, or if your items or viewport can resize signficantly it may help to increase it. If the number of containers needed exceeds the pool, LegendList will allocate more containers and re-render the outer list, which may cause a frame stutter.

### initialScrollIndex

```ts
initialScrollIndex?: number;
```

Start scrolled with this item at the top. By default, to have accurate scrolling position you will need to provide accurate element positions to the [getEstimatedItemSize](#getestimateditemsize) function(similar FlatList). When accurate positions are not known (e.g., for dynamically sized list items), please enable [maintainVisibleContentPosition](#maintainvisiblecontentposition) prop. This will allow LegendList to automatically adjust its top boundary when elements below initialScrollIndex will be measured.

### initialScrollOffset

```ts
initialScrollOffset?: number;
```

Start scrolled to this offset.

### ItemSeparatorComponent

```ts
ItemSeparatorComponent?: React.ComponentType<{ leadingItem: ItemT }>
```

Rendered in between each item, but not at the top or bottom.

See [React Native Docs](https://reactnative.dev/docs/flatlist#itemseparatorcomponent).

### ListEmptyComponent

```ts
ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
```
Rendered when the list is empty.

See [React Native Docs](https://reactnative.dev/docs/flatlist#listemptycomponent).

### ListEmptyComponentStyle

```ts
ListEmptyComponentStyle?: StyleProp<ViewStyle> | undefined;
```
Styling for internal View for `ListEmptyComponent`.


### ListFooterComponent

```ts
ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
```
Rendered at the bottom of all the items.

See [React Native Docs](https://reactnative.dev/docs/flatlist#listfootercomponent).


### ListFooterComponentStyle

```ts
ListFooterComponentStyle?: StyleProp<ViewStyle> | undefined;
```
Styling for internal View for `ListFooterComponent`.

See [React Native Docs](https://reactnative.dev/docs/flatlist#listfootercomponentstyle).

### ListHeaderComponent

```ts
ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
```
Rendered at the top of all the items.

See [React Native Docs](https://reactnative.dev/docs/flatlist#listheadercomponent).

### ListHeaderComponentStyle

Styling for internal View for `ListHeaderComponent`.

See [React Native Docs](https://reactnative.dev/docs/flatlist#listheadercomponentstyle).


### maintainScrollAtEnd

```ts
maintainScrollAtEnd?: boolean;
```

This will check if you are already scrolled to the bottom when `data` changes, and if so it keeps you scrolled to the bottom.

See [Chat interfaces without `inverted`](../../examples/chatinterfaces) for more.

### maintainScrollAtEndThreshold

```ts
maintainScrollAtEndThreshold?: number;
```

This defines what percent of the screen counts as the bottom. Defaults to `0.1`.

See [Chat interfaces without `inverted`](../../examples/chatinterfaces) for more.

### maintainVisibleContentPosition

```ts
maintainVisibleContentPosition?: boolean;
```

The `maintainVisibleContentPosition` prop automatically adjusts item positions when items are added/removed/resized above the viewport so that there is no shift in the visible content. This is very helpful for some scenarios, but if you have a static list of fixed sized items you probably don't need it.

- If items get added/removed/resized above the viewport, items will not move on screen
- When using `initialScrollOffset` or `initialScrollIndex`, items will not jump around when scrolling up if they're different sizes than the estimate
- When scrolling to an index far down the list and then back up, items will not jump around as they layout

LegendList utilizes ScrollView's [maintainVisibleContentPosition](https://reactnative.dev/docs/scrollview#maintainvisiblecontentposition) prop internally, so your target react-native version should support that prop. To use maintainVisibleContentPosition on Android you will need at least React Native version [0.72](https://github.com/facebook/react-native/commit/c19548728c9be3ecc91e6fefb35bc14929109d60).

### numColumns

```ts
numColumns?: number;
```

Multiple columns will zig-zag like a flexWrap layout. Rows will take the maximum height of their columns, so items should all be the same height - masonry layouts are not supported.

### onEndReached

```ts
onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined;
```

A callback that's called only once when scroll is within `onEndReachedThreshold` of the bottom of the list. It resets when scroll goes above the threshold and then will be called again when scrolling back into the threshold.

### onEndReachedThreshold

```ts
onEndReachedThreshold?: number | null | undefined;
```

The distance from the end as a percentage that the scroll should be from the end to trigger `onEndReached`. It is multiplied by screen size, so a value of 0.5 will trigger `onEndReached` when scrolling to half a screen from the end.

### onItemSizeChanged

```ts
onItemSizeChanged?: (info: {
        size: number;
        previous: number;
        index: number;
        itemKey: string;
        itemData: ItemT;
    }) => void;
```

Called whenever an item's rendered size changes. This can be used to adjust the estimatedItemSize to match the actual size, which can improve performance or reduce layout shifting.

### onRefresh

```ts
onRefresh?: () => void;
```

Called whenever a user pulls down to refresh. See [React Native Docs](https://reactnative.dev/docs/flatlist#onRefresh).

### onStartReached

```ts
onStartReached?: ((info: { distanceFromStart: number }) => void) | null | undefined;
```

A callback that's called only once when scroll is within `onStartReachedThreshold` of the top of the list. It resets when scroll goes below the threshold and then will be called again when scrolling back into the threshold.

### onStartReachedThreshold

```ts
onStartReachedThreshold?: number | null | undefined;
```

The distance from the start as a percentage that the scroll should be from the end to trigger `onStartReached`. It is multiplied by screen size, so a value of 0.5 will trigger `onStartReached` when scrolling to half a screen from the start.

### onViewableItemsChanged

```ts
onViewableItemsChanged?: OnViewableItemsChanged | undefined;
```

Called when the viewability of rows changes, as defined by the `viewabilityConfig` prop.

See [React Native Docs](https://reactnative.dev/docs/flatlist#onviewableitemschanged).


### progressViewOffset

```ts
progressViewOffset?: number | undefined;
```

Offset in pixels for the refresh indicator.

### ref

```ts
ref?: LegendListRef;
```

Used to call `scrollTo` [methods](#ref-methods).

### refreshing

```ts
refreshing?: boolean;
```

Set this true while waiting for new data from a refresh.

See [React Native Docs](https://reactnative.dev/docs/flatlist#refreshing).

### renderScrollComponent

```ts
renderScrollComponent?: (props: ScrollViewProps) => ReactNode
```

Render a custom ScrollView component. This allows customization of the underlying ScrollView.

Note that passing `renderScrollComponent` as an inline function might cause you to lose scroll position if the list is rerendered.

```tsx
renderScrollComponent={(props) => <BottomSheetScrollView {...props} />}
```

Instead, it's better to extract it as a custom component.

```tsx
const CustomScrollView = (props: ScrollViewProps) => {
  return <BottomSheetScrollView {...props} />;
};
```

### style

```ts
style?: StyleProp<ViewStyle>;
```

Style applied to the underlying ScrollView.

### viewabilityConfig

```ts
viewabilityConfig?: ViewabilityConfig;
```

Configuration for when to update the `onViewableItemsChanged` callback.

See [React Native Docs](https://reactnative.dev/docs/flatlist#viewabilityconfig).

### viewabilityConfigCallbackPairs

```ts
viewabilityConfigCallbackPairs?: ViewabilityConfigCallbackPairs | undefined;
```

List of `ViewabilityConfig`/`onViewableItemsChanged` pairs. A specific `onViewableItemsChanged` will be called when its corresponding `ViewabilityConfig`'s conditions are met.

See [React Native Docs](https://reactnative.dev/docs/flatlist#viewabilityconfigcallbackpairs).

### waitForInitialLayout

```ts
waitForInitialLayout?: boolean; // default false
```

If true, delays rendering until initial layout is complete


## Ref Methods
___

### getState

```ts
getState: () => {
    contentLength: number;
    end: number;
    endBuffered: number;
    isAtEnd: boolean;
    isAtStart: boolean;
    scroll: number;
    scrollLength: number;
    start: number;
    startBuffered: number;
}
```

Returns the internal scroll state of the list.

### scrollToIndex

```ts
scrollToIndex: (params: {
  index: number;
  animated?: boolean;
});
```

Scrolls to the item at the specified index. By default ([maintainVisibleContentPosition](#maintainvisiblecontentposition) is false), accurate scroll is guaranteed only if all accurate sizes of elements are provided to [getEstimatedItemSize](#getestimateditemsize) function(similar FlatList).

If estimated item sizes are not known, [maintainVisibleContentPosition](#maintainvisiblecontentposition) prop need to be set to true. In this mode, list would automatically select element you are scrolling to as anchor element and guarantee accurate scroll.

### scrollToOffset

```ts
scrollToOffset(params: {
  offset: number;
  animated?: boolean;
});
```

Scroll to a specific content pixel offset in the list.

Valid parameters:

- *offset* (number) - The offset to scroll to. In case of horizontal being true, the offset is the x-value, in any other case the offset is the y-value. Required.
- *animated* (boolean) - Whether the list should do an animation while scrolling. Defaults to true.

### scrollToItem

```ts
scrollToItem(params: {
  animated?: ?boolean,
  item: Item,
});
```

Requires linear scan through data - use [scrollToIndex](#scrolltoindex) instead if possible. Provided for compatibility with FlatList only.

Valid parameters:

- *animated* (boolean) - Whether the list should do an animation while scrolling. Defaults to true.
- *item* (object) - The item to scroll to. Required.

### scrollToEnd

```ts
scrollToEnd(params?: {
  animated?: boolean,
});
```

Scrolls to the end of the list.

Valid parameters:

- *animated* (boolean) - Whether the list should do an animation while scrolling. Defaults to true.

### scrollIndexIntoView

Scrolls the index into view. If the index is above the viewable range it will be scrolled to the top of the screen, and if it's below the viewable range it will be scrolled to the bottom of the screen.

```ts
scrollIndexIntoView(params: {
  animated?: boolean | undefined;
  index: number;
}): void
```

```jsx
import { LegendList } from "@legendapp/list";
import { useRef } from "react";

export function ScrollExample() {
  const listRef = useRef(null);

  const scrollToItem = () => {
    // Scroll to the item at index 10
    listRef.current?.scrollIndexIntoView(10);
  };

  return (
    <>
      <Button title="Scroll to item 10" onPress={scrollToItem} />
      <LegendList
        ref={listRef}
        data={data}
        renderItem={renderItem}
      />
    </>
  );
}
```

### scrollItemIntoView

Scrolls the item into view. If the item is above the viewable range it will be scrolled to the top of the screen, and if it's below the viewable range it will be scrolled to the bottom of the screen.

```ts
scrollItemIntoView(params: {
  animated?: boolean | undefined;
  item: any;
}): void;
```

```jsx
import { LegendList } from "@legendapp/list";
import { useRef } from "react";

export function ScrollToItemExample() {
  const listRef = useRef(null);
  const targetItem = { id: "item-5", text: "Target Item" };

  const scrollToSpecificItem = () => {
    // Scroll to the item that matches targetItem
    listRef.current?.scrollItemIntoView(targetItem);
  };

  return (
    <>
      <Button title="Scroll to target item" onPress={scrollToSpecificItem} />
      <LegendList
        ref={listRef}
        data={data}
        renderItem={renderItem}
      />
    </>
  );
}
```

## Hooks

### useRecyclingState

```ts
interface LegendListRecyclingState<T> {
    item: T;
    prevItem: T | undefined;
    index: number;
    prevIndex: number | undefined;
}
useRecyclingState: <T>(updateState: ((info: LegendListRecyclingState<T>) => T) | T) => [T, Dispatch<T>];
```

`useRecyclingState` automatically resets the state when an item is recycled into a new item.

```tsx
import { useRecyclingState } from "@legendapp/list"
export function ItemComponent({ item }) {
    // Like useState but it resets when the item is recycled
    const [isExpanded, setIsExpanded] = useRecyclingState(() => false);

    // ...
}
```

### useRecyclingEffect

```ts
interface LegendListRecyclingState<T> {
    item: T;
    prevItem: T | undefined;
    index: number;
    prevIndex: number | undefined;
}
useRecyclingEffect: <T>(effect: (info: LegendListRecyclingState<T>) => void | (() => void)) => void;
```

`useRecyclingEffect` can be used to reset any side effects when an item gets recycled.

```tsx
import { useRecyclingEffect } from "@legendapp/list"

export function ItemComponent({ item, useRecyclingEffect }) {
    // A callback when the item is recycled into a new item
    useRecyclingEffect(({ item, prevItem, index, prevIndex }) => {
        // Reset any side effects from the previous item
        refSwipeable?.current?.close();
        refVideo?.current?.reset();
    });

    // ...
}
```

### useViewability

```ts
interface ViewToken<ItemT = any> {
    containerId: number;
    index: number;
    isViewable: boolean;
    item: ItemT;
    key: string;
}
useViewability: (configId: string, callback: (viewToken: ViewToken) => void) => void;
```

A hook that provides callbacks when an item's viewability changes. This hook registers a callback that will be invoked whenever the item's visibility status changes, providing detailed information about the item through the ViewToken interface. It is similar to [onViewableItemsChanged](#onviewableitemschanged) but runs for only the rendering item. If you defined multiple viewability configs using [viewabilityConfigCallbackPairs](#viewabilityconfigcallbackpairs) then provide the id of the one you're interested in with `configId`.

```tsx
import { useViewability } from "@legendapp/list"

export function ItemComponent({ item }) {
    const [isVisible, setIsVisible] = useState(false);

    useViewability((viewToken) => {
        // Called when viewability changes
        setIsVisible(viewToken.isViewable);

        if (viewToken.isViewable) {
            console.log("Item visible:", viewToken.item);
            console.log("Item index:", viewToken.index);
        }
    }, "main");

    return (
        <View>
            {isVisible ? <ExpensiveComponent /> : <PlaceholderComponent />}
        </View>
    );
}
```

### useViewabilityAmount

```ts
interface ViewAmountToken<ItemT = any> {
    containerId: number;
    index: number;
    isViewable: boolean;
    item: ItemT;
    key: string;
    percentOfScroller: number;
    percentVisible: number;
    scrollSize: number;
    size: number;
    sizeVisible: number;
}

useViewabilityAmount: (callback: (viewAmountToken: ViewAmountToken) => void) => void;
```

A hook that provides detailed metrics about how much of an item is visible in the viewport. The callback receives a ViewAmountToken with information like the pixel measurements (sizeVisible, size), percentage visible, and more.

```tsx
import { useViewabilityAmount } from "@legendapp/list"

export function ItemComponent({ item }) {
    const [opacity, setOpacity] = useState(0);

    useViewabilityAmount((viewAmountToken) => {
        // Get detailed visibility information
        setOpacity(viewAmountToken.percentVisible);

        // Additional metrics available:
        // viewAmountToken.sizeVisible - pixels of item visible in viewport
        // viewAmountToken.size - total size of the item
        // viewAmountToken.percentOfScroller - what percent of the scroller this item takes up
        // viewAmountToken.scrollSize - size of the viewport
    });

    return (
        <Animated.View style={{ opacity }}>
            <Text>{item.title}</Text>
        </Animated.View>
    );
}
```



================================================
FILE: packages/list/src/content/docs/benchmarks/placeholder.mdx
================================================
---
title: Benchmarks
description: Performance benchmarks comparing LegendList to FlatList and FlashList
sidebar:
    order: 1
---

These docs are still in progress. Below are preliminary benchmarks comparing `LegendList` to `FlatList` and `FlashList`. These metrics are placeholders and will be updated with real data as testing progresses.

## Performance Benchmarks

| Metric                  | LegendList | FlatList | FlashList | Notes                              |
|-------------------------|------------|----------|-----------|------------------------------------|
| **Initial Render Time** | XXXms      | XXXms    | XXXms     | 1000 items, simple text render     |
| **Scroll FPS (60fps)**  | XXfps      | XXfps    | XXfps     | 5000 items, mixed content          |
| **Memory Usage**        | XXMB       | XXMB     | XXMB      | 10,000 items, images + text        |
| **Item Recycling**      | Yes        | No       | Yes       | Efficiency with dynamic content   |
| **Cold Start Time**     | XXXms      | XXXms    | XXXms     | App launch with 2000 items         |
| **Re-render Time**      | XXms       | XXms     | XXms      | Update 10% of 5000 items           |
| **CPU Usage**           | XX%        | XX%      | XX%       | Continuous scroll, 3000 items      |

### Notes
- **Initial Render Time**: Time to render the list on screen from a blank state.
- **Scroll FPS**: Frames per second during smooth scrolling; higher is better (target 60fps).
- **Memory Usage**: Peak memory consumption during list operation.
- **Item Recycling**: Whether the list reuses item views for performance.
- **Cold Start Time**: Time from app launch to fully rendered list.
- **Re-render Time**: Time to update the list after data changes.
- **CPU Usage**: Average CPU load during active scrolling.

These benchmarks are based on simulated conditions (e.g., iOS 16, mid-tier device). Actual performance may vary depending on hardware, React Native version, and list content complexity. Stay tuned for finalized data!


================================================
FILE: packages/list/src/content/docs/examples/chatInterfaces.mdx
================================================
---
title: Chat Interfaces
description: Guide for setting up chat interfaces
sidebar:
    order: 1
---

## Chat Interfaces Without `inverted`

In other list libraries if you wanted items to start scrolling from the bottom, you'd need to use an `inverted` prop, which would apply a negative scale transform. But that causes a lot of weird issues, so Legend List explicitly does not do that.

```ts
alignItemsAtEnd?: boolean;
maintainScrollAtEnd?: boolean;
maintainScrollAtEndThreshold?: number;
```

Instead, to align items at the end you can just use the `alignItemsAtEnd` prop, which will apply padding above items to fill the screen and stick them to the bottom.

The `maintainScrollAtEnd` prop will check if you are already scrolled to the bottom when `data` changes, and if so it keeps you scrolled to the bottom.

The `maintainScrollAtEndThreshold` prop (which defaults to 0.1) defines what percent of the screen counts as the bottom.

So using Legend List for a chat interface would look like this:

```tsx
  <LegendList
    data={items}
    renderItem={({ item }) => <Text>{item.title}</Text>}
    estimatedItemSize={320}
    alignItemsAtEnd
    maintainScrollAtEnd
    maintainScrollAtEndThreshold={0.1}
  />
```



================================================
FILE: packages/list/src/content/docs/examples/infiniteScrolling.mdx
================================================
---
title: Infinite Scrolling
description: Guide for setting up chat interfaces
sidebar:
    order: 2
---

## Two-way infinite scrolling

```ts
onStartReached?: ((info: { distanceFromStart: number }) => void) | null | undefined;
onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined;
```

These callbacks fire when you scroll to the top or bottom of a list. This can be used to load more data in either direction. In a typical list you'll likely just use `onEndReached` to load more data when the users scrolls to the bottom.

If you have a chat-like interface you may want to load more messages as you scroll up, and you can use `onStartReached` for that. If you are doing that, you will very likely want to use [maintainVisibleContentPosition](../../api/props/##maintain-visible-content-position) so that the items loading above don't shift the viewport down.



================================================
FILE: packages/list/src/content/docs/plugins/placeholder.mdx
================================================
---
title: Placeholder
description: Placeholder spot for future plugins
sidebar:
    order: 1
---

Our goal with LegendList is to keep the main package as small as possible to benefit the most people. However, there are special use cases that some may need for their product, so we plan on supporting those with a plugin system.



================================================
FILE: packages/list/src/pages/llms-full.txt.ts
================================================
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { sortDocsByCategory, getProjectSidebarOrder } from 'shared/src/docSorting';

const docs = await getCollection('docs');

// Get sidebar order from config
const sidebarOrder = await getProjectSidebarOrder(import.meta.url);

export const GET: APIRoute = async ({}) => {
    // Sort the docs using the shared helper
    const sortedDocs = sortDocsByCategory(docs, sidebarOrder);

    return new Response(
        `# Legend List Full Documentation\n\n${sortedDocs
            .map((doc) => {
                return `# ${doc.data.title}\n\n${doc.body}\n\n`;
            })
            .join('')}`,
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
};



================================================
FILE: packages/list/src/pages/llms.txt.ts
================================================
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { sortDocsByCategory, getProjectSidebarOrder } from 'shared/src/docSorting';

const docs = await getCollection('docs');

// Get sidebar order from config
const sidebarOrder = await getProjectSidebarOrder(import.meta.url);

export const GET: APIRoute = async ({ params, request }) => {
    // Sort the docs using the shared helper
    const sortedDocs = sortDocsByCategory(docs, sidebarOrder);

    return new Response(
        `# Legend List Documentation\n\n${sortedDocs
            .map((doc) => {
                return `- [${doc.data.title}](https://www.legendapp.com/open-source/list/${doc.slug}/)\n`;
            })
            .join('')}`,
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
};



================================================
FILE: packages/motion/astro.config.mjs
================================================
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Legend Motion",
      social: {
        github: "https://github.com/LegendApp/legend-motion",
      },
      editLink: {
        baseUrl: "https://github.com/LegendApp/legend-motion/edit/main/",
      },
      sidebar: [
        {
          label: "Getting Started",
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  vite: {
    resolve: {
      alias: {
        "react-native": "react-native-web",
      },
    },
  },
});



================================================
FILE: packages/motion/package.json
================================================
{
  "name": "motion-docs",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/react": "^3.0.3",
    "@astrojs/starlight": "^0.11.0",
    "@astrojs/starlight-tailwind": "^2.0.0",
    "@astrojs/tailwind": "^5.0.2",
    "@legendapp/motion": "^2.2.1",
    "@legendapp/tools": "^2.0.1",
    "astro": "^3.2.3",
    "classnames": "^2.3.2",
    "nativewind": "^2.0.11",
    "react-native": "^0.72.5",
    "react-native-web": "^0.19.9",
    "shared": "workspace:*",
    "sharp": "^0.32.6",
    "tailwindcss": "^3.3.3"
  }
}



================================================
FILE: packages/motion/tsconfig.json
================================================
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}



================================================
FILE: packages/motion/src/env.d.ts
================================================
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />



================================================
FILE: packages/motion/src/Components/ExampleAnim/ExampleAnimComponent.tsx
================================================
import { useInterval } from "@legendapp/tools/react";
import classNames from "classnames";
import { useState } from "react";

export const ExampleAnim = ({
  width,
  noValue,
  time,
  children,
}: {
  width: number;
  noValue?: boolean;
  time?: number;
  children: (value: number) => JSX.Element;
}) => {
  const [value, setValue] = useState(0);
  useInterval(() => setValue((v) => (v === 0 ? 1 : 0)), time || 1000);
  return (
    <div
      className={classNames(
        "flex flex-col justify-center",
        !noValue && "mt-10"
      )}
      style={{ width }}
    >
      {children(value)}
      {!noValue && (
        <div className="flex justify-center pt-6 font-medium">
          <div>value:</div>
          <div className="w-3 pl-2 font-bold text-blue-accent">{value}</div>
        </div>
      )}
    </div>
  );
};



================================================
FILE: packages/motion/src/Components/Introduction/Intro.astro
================================================
---
import { IntroComponent } from "./Intro";
---

<IntroComponent client:only />



================================================
FILE: packages/motion/src/Components/Introduction/Intro.tsx
================================================
import { observable } from "@legendapp/state";
import classNames from "classnames";
import { Editor } from "shared/src/Components/Editor/Editor";
import { ExampleAnim } from "../ExampleAnim/ExampleAnimComponent";
import { Motion } from "@legendapp/motion";

const MotionPressable = Motion.Pressable;
const MotionView = Motion.View;

const INTRO_CODE = `
const Intro = () => {
  return (
      <ExampleAnim width={200}>
          {(value) => (
              <MotionPressable>
                  <MotionView
                      style={styleBox}
                      initial={{ y: -50 }}
                      animate={{ x: value * 100, y: 0 }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ y: 20 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  />
              </MotionPressable>
          )}
      </ExampleAnim>
  );
};

render(<Intro />)
`;

export function IntroComponent() {
  return (
    <Editor
      code={INTRO_CODE}
      scope={{
        observable,
        classNames,
        ExampleAnim,
        MotionPressable,
        MotionView,
      }}
      noInline={true}
    />
  );
}



================================================
FILE: packages/motion/src/Components/Introduction/IntroUsage.astro
================================================
---
import { IntroUsageComponent } from "./IntroUsage";
---

<IntroUsageComponent client:only client:visible />



================================================
FILE: packages/motion/src/Components/Introduction/IntroUsage.tsx
================================================
import classNames from "classnames";
import { Editor } from "shared/src/Components/Editor/Editor";

const INTRO_USAGE_CODE = `
const IntroUsage = () => {
  return (
      <ExampleAnim width={200}>
          {(value) => (
              <View>
                  <Motion.View
                      style={styleBox}
                      animate={{
                          x: value * 100,
                          opacity: value ? 1 : 0.2,
                          scale: value ? 1 : 0.5,
                      }}
                      transition={{
                          type: 'spring',
                      }}
                  />
                  <MotionSvg.Svg height="200" width="200" style={{ marginTop: 48 }}>
                      <MotionSvg.Polygon
                          strokeWidth={1}
                          fill="#59B0F8"
                          animateProps={{
                              points: value === 1 ? '120,10 190,160 70,190 23,184' : '100,50 140,160 50,130 23,84',
                          }}
                          transition={{
                              type: 'spring',
                              damping: 20,
                              stiffness: 300,
                          }}
                      />
                  </MotionSvg.Svg>
                  <MotionLinearGradient
                      style={[styleBox, { width: 100, height: 100, marginLeft: 50, marginTop: 48 }]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      animateProps={{
                          colors: [value ? '#F81FEC' : 'blue', value ? '#59B0F8' : 'yellow'],
                      }}
                  />
              </View>
          )}
      </ExampleAnim>
  );
};`;

export function IntroUsageComponent() {
  return (
    <Editor code={INTRO_USAGE_CODE} scope={{ classNames }} noInline={true} />
  );
}



================================================
FILE: packages/motion/src/content/config.ts
================================================
import { defineCollection } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
	i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};



================================================
FILE: packages/motion/src/content/docs/index.mdx
================================================
---
title: Welcome to Starlight
description: Get started building your docs site with Starlight.
template: splash
hero:
  tagline: Congrats on setting up a new Starlight project!
  image:
    file: ../../assets/houston.webp
  actions:
    - text: Example Guide
      link: /guides/example/
      icon: right-arrow
      variant: primary
    - text: Read the Starlight docs
      link: https://starlight.astro.build
      icon: external
---

import { Card, CardGrid } from '@astrojs/starlight/components';

## Next steps

<CardGrid stagger>
	<Card title="Update content" icon="pencil">
		Edit `src/content/docs/index.mdx` to see this page change.
	</Card>
	<Card title="Add new content" icon="add-document">
		Add Markdown or MDX files to `src/content/docs` to create new pages.
	</Card>
	<Card title="Configure your site" icon="setting">
		Edit your `sidebar` and other config in `astro.config.mjs`.
	</Card>
	<Card title="Read the docs" icon="open-book">
		Learn more in [the Starlight Docs](https://starlight.astro.build/).
	</Card>
</CardGrid>



================================================
FILE: packages/motion/src/content/docs/2-usage/1-overview.mdx
================================================
---
title: Overview
sidebar:
  order: 1
---

Legend-Motion provides a set of components wrapping React Native Views.

<div className="max-w-lg">
  ```js import {Motion} from "@legendapp/motion" ```
</div>

This page includes live examples running through React Native Web.

## Simple animations

We can simply set values on the `animate` prop.

<Example name="Simple">
  ```jsx
  <Motion.View
    animate={{
      x: value * 100,
    }}
  />
  ```
</Example>

When any value in `animate` changes, it will automatically animate to the new values.

## Transitions

Animations use a tween of `300ms` by default, which you can change with the `transition` prop. The easiest way to do that is to set a `Transition` on all animations.

<Example name="TransitionBasic">
  ```jsx
  <Motion.View
    animate={{
      x: value * 100,
    }}
    transition={{
      type: "spring",
      damping: 20,
      stiffness: 400,
    }}
  />
  ```
</Example>

You can customize the animations even further by settings a `Transition` for each animated property. The `default` Transition will apply to all animated properties unless they have a specified transition.

<Example name="TransitionProperties">
  ```jsx
  <Motion.View
    animate={{
      x: value * 100,
      opacity: value ? 1 : 0.2,
      scale: value ? 1 : 0.5,
    }}
    transition={{
      default: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
      x: {
        type: "spring",
        damping: 20,
        stiffness: 1000,
      },
      opacity: {
        type: "tween",
        duration: 1000,
      },
    }}
  />
  ```
</Example>

Legend-Motion supports two kinds of transitions, `spring` or `timing`. They pass straight through to Animated, so see the React Native docs on [Timing](https://reactnative.dev/docs/animated#timing) and [Spring](https://reactnative.dev/docs/animated#spring) for usage.

Transitions with durations are called `timing` in React Native's Animated and `tween` in Framer Motion, so Legend-Motion has transition types of both names that do the same thing, to make it easy to match props with the rest of your codebase.

## Animate on mount

When a component mounts, it will automatically be set to the `animate` value. But you want to animate it into position on mount, set `initial` as a starting point.

<Example name="Initial">
  ```jsx
  <Motion.View initial={{ x: 0 }} animate={{ x: 100 }} />
  ```
</Example>

This example can be hard to see because it's a mount transition, so try refreshing the page to see it animate into place.

## Automatic interpolating

For values that are strings or arrays, Legend-Motion automatically interpolates between the values so you don't have to worry about it.

<Example name="TransitionColor">
  ```jsx
  <Motion.View
    animate={{
      backgroundColor: value ? "#F81FEC" : "#59B0F8",
    }}
  />
  ```
</Example>

## Text

With the automatic interpolating, it's easy to animate text colors as well as simple numbers like fontSize.

<Example name="TransitionText">
  ```jsx
  <Motion.Text
    animate={{
      color: value ? "#F81FEC" : "#59B0F8",
      fontSize: value ? 48 : 24,
    }}
  >
    Text
  </Motion.Text>
  ```
</Example>

## Easing

React Native and Framer Motion use different naming, so Legend-Motion supports either `ease` or `easing` props, which do the same thing.

It accepts the same easing functions as React Native's `Animated` along with some named functions to match usage of Framer Motion.

The supported values match most of Framer Motion's options:

`linear`, `easeIn`, `easeOut`, `easeInOut`, `circIn`, `circOut`, `circInOut`, `backIn`, `backOut`, `backInOut'`

See the [React Native docs](https://reactnative.dev/docs/easing) for more details.

<Example name="Easing">
  ```jsx
  <Motion.View
    animate={{ x: value * 100 }}
    transition={{
      type: "timing",
      duration: 300,
      easing: "linear",
    }}
  />
  <Motion.View
    animate={{ x: value * 100 }}
    transition={{
      type: "timing",
      duration: 300,
      easing: Easing.easing,
    }}
  />
  ```
</Example>

## Gestures

The `whileTap` prop animates to the target while the component is pressed, and the `whileHover` prop animates to the target while the component is hovered. Try pressing the box on the right to see it in action. `whileHover` is only supported in `react-native-web`.

These props require a `Motion.Pressable` ancestor, which is uses for tracking whether it is hovered or pressed. So you could have multiple inner elements that use the same hovered/pressed state.

<Example name="WhileTap">
  ```jsx
  <Motion.Pressable>
    <Motion.View
      whileHover={{ scale: 1.2 }}
      whileTap={{ y: 20 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
      }}
    />
  </Motion.Pressable>
  ```
</Example>



================================================
FILE: packages/motion/src/content/docs/2-usage/2-svg.mdx
================================================
---
title: Svg
sidebar:
  order: 2
---

To use SVG animations, you'll need to additionally install `react-native-svg`. See [its documentation](https://github.com/react-native-svg/react-native-svg#installation) for details.

## Usage

SVG animations work by animating the props that you want to change, with the `animateProps` prop.

<Example name="Svg">
  ```jsx
  <MotionSvg.Svg height="200" width="200">
    <MotionSvg.Rect
      stroke="#555"
      strokeWidth="1"
      animateProps={{
        fill: value ? "#F81FEC" : "#59B0F8",
        x: value ? "60" : "0",
        y: value ? "40" : "10",
        width: value ? "140" : "50",
        height: value ? "140" : "50",
      }}
      transition={{
        default: {
          type: "spring",
          damping: 20,
          stiffness: 300,
        },
        fill: {
          type: "tween",
          duration: 800,
        },
      }}
    />
  </MotionSvg.Svg>
  ```
</Example>

You can see in this example that we used a tween transition for the `fill` color and set a default spring transition for the rest of the props, because spring transitions don't look good on colors.



================================================
FILE: packages/motion/src/content/docs/2-usage/3-linear-gradient.mdx
================================================
---
title: Linear Gradient
sidebar:
  order: 3
---

To use Linear Gradients you'll also need to install a `linear-gradient` library. There are different libraries for React Native vs. Expo, so choose the right import for your platform:

import Install from "shared/src/Components/Install/Install.astro";

## Installation

### React Native

<Install name="react-native-linear-gradient" />

then import

```js
import { MotionLinearGradient } from "@legendapp/motion/linear-gradient";
```

### Expo

<Install name="expo-linear-gradient" />

then import

```js
import { MotionLinearGradient } from "@legendapp/motion/linear-gradient-expo";
```

### React Native Web

<Install name="react-native-web-linear-gradient" />

Alias the package in your webpack config:

```js
resolve: {
    alias: {
        'react-native': 'react-native-web',
        ...
        'react-native-linear-gradient': 'react-native-web-linear-gradient',
    }
}
```

then import

```js
import { MotionLinearGradient } from "@legendapp/motion/linear-gradient";
```

## Usage

`MotionLinearGradient` has `colors`, `start`, and `end` props that you can animate.

<Example name="LinearGradient">
  ```jsx
  <MotionLinearGradient
    animateProps={{
      colors: [value ? "#F81FEC" : "blue", value ? "#59B0F8" : "yellow"],
      start: { x: 0, y: 0 },
      end: { x: value ? 1 : 0, y: 1 },
    }}
  />
  ```
</Example>



================================================
FILE: packages/motion/src/content/docs/2-usage/4-custom-components.mdx
================================================
---
title: Custom Components
sidebar:
  order: 4
---

While Legend-Motion providers animated wrappers around built-in components, you may want to create animated versions of custom components.

`createMotionComponent` is the function that adds the `animate` and `transition` properties and creates the animation logic. You can use it to convert your own components to Motion components.

As an example:

```js
import { createMotionComponent } from "@legendapp/motion";

const AnimatedView = createMotionComponent(Animated.View);
```



================================================
FILE: packages/motion/src/content/docs/2-usage/5-transform-origin.mdx
================================================
---
title: Transform Origin
sidebar:
  order: 5
---

A crucial animation feature that's missing from React Native Animated is `transformOrigin`. React Native does transformations from the center of the component, but sometimes you need to scale or rotate from one side. So Legend-Motion adds a `transformOrigin` prop.

You can see in the following example the difference between scaling from the top left vs. the bottom right.

<Example name="TransformOrigin">
  ```jsx
  <Motion.View
    animate={{ scale: value ? 1 : 0.5 }}
    transformOrigin={{ x: 0, y: 0 }}
  />
  <Motion.View
    animate={{ scale: value ? 1 : 0.5 }}
    transformOrigin={{ x: "100%", y: "100%" }}
  />
  ```
</Example>

Possible values are a number of pixels or a percentage, and it defaults to `50%` as usual in React Native.

**Note**: Using `transformOrigin` adds a hook, so setting `transformOrigin` conditionally would cause crashes.



================================================
FILE: packages/motion/src/content/docs/2-usage/6-animate-props.mdx
================================================
---
title: Animate Props
sidebar:
  order: 6
---

Legend-Motion allows you to animate props, which passes an `Animated.Value` into the prop. It's not necessary for the basic React Native components, but it's useful for Legend-Motion's SVG and LinearGradient components or for creating custom components.

See this SVG example that animates the `fill` prop:

<Example name="SvgProps">
  ```jsx
  <MotionSvg.Svg height="200" width="200">
    <MotionSvg.Rect
      stroke="#555"
      strokeWidth="1"
      x="0"
      y="10"
      width="150"
      height="150"
      animateProps={{
        fill: value ? "#F81FEC" : "#59B0F8",
      }}
      transition={{
        type: "tween",
        duration: 500,
      }}
    />
  </MotionSvg.Svg>
  ```
</Example>



================================================
FILE: packages/motion/src/content/docs/2-usage/7-configuration.mdx
================================================
---
title: Configuration
sidebar:
  order: 7
---

## Timing

React Native's Animated does timing in milliseconds while Framer Motion does timing in seconds. Legend-Motion supports both options so you can use the timing configuration that matches the rest of your codebase.

```js
import { configureMotion } from "@legendapp/motion";

configureMotion({ timing: "s" });
```



================================================
FILE: packages/motion/src/content/docs/2-usage/8-tailwind-CSS.mdx
================================================
---
title: Tailwind CSS
sidebar:
  order: 8
---

Legend-Motion includes a special set of Motion components that support TailwindCSS `className` by using [NativeWind](https://www.nativewind.dev).

<Example name="Tailwind">
  ```jsx
  <Motion.View
    className="items-center justify-center p-4"
    animate={{ x: value * 50 }}
  >
    <Motion.Text className="font-bold text-white">RN View</Motion.Text>
  </Motion.View>
  <Motion.View
    className="items-center justify-center p-4 mt-8"
    whileHover={{ scale: 1.1 }}
    whileTap={{ x: 30 }}
  >
    <Motion.Text className="font-bold text-white">Press me</Motion.Text>
  </Motion.View>
  ```
</Example>

## Installation

1. This depends on [NativeWind](https://www.nativewind.dev) so first follow its [installation steps](https://www.nativewind.dev).

2. Then pass `styled` into `configureMotion`

```js
import { styled } from "nativewind";
import { configureMotion } from "@legendapp/motion";

configureMotion({ styled });
```

<br />
3. Then just change the Motion import to `/styled`

```js
import { Motion } from "@legendapp/motion/styled";
```



================================================
FILE: packages/motion/src/content/docs/2-usage/9-animate-presence.mdx
================================================
---
title: Animate Presence
sidebar:
  order: 9
---

`AnimatePresence` lets you use the `exit` prop to animate components when they unmount.

React Native does not have a built-in way to defer unmounting, so `AnimatePresence` holds onto removed components until their exit animation is finished.

Any children of `AnimatePresence` that have an `exit` prop will animate before being removed.

## Usage

<Example name="Presence">
  ```jsx
  <AnimatePresence>
    {value ? (
      <MotionStyled.View
        key="A"
        initial={{ opacity: 0.1, x: 0 }}
        animate={{ opacity: 1, x: 100 }}
        exit={{ opacity: 0.2, x: 0 }}
        transition={{
          default: {
            type: "spring",
          },
          opacity: {
            type: "timing",
          },
        }}
      />
    ) : null}
  </AnimatePresence>
  ```
</Example>

`key` is a required prop on children of `AnimatePresence`. This is needed to make sure it is operating on the same elements.

Note that this example has an exit animation going to opacity 0.2 so you can see when it actually gets removed.



================================================
FILE: packages/motion/src/content/docs/3-resources/1-caveats.mdx
================================================
---
title: Caveats
sidebar:
  order: 1
---

## Cannot mix native and non-native animations

React Native does not support mixing native and non-native animations, so Legend-Motion cannot either. The following properties animate with `useNativeDriver` and you cannot mix them with any other properties.

- opacity
- x
- y
- scale
- scaleX
- scaleY
- skewX
- skewY
- perspective
- rotate
- rotateY
- rotateZ
- matrix

If you do need to mix properties together we suggest making them separate components.

## Transform Origin percentages do not work on SVG

The transformOrigin depends on onLayout from the animated component, which doesn't really apply to drawing SVG elements. So you'll need to specific transformOrigin in pixels.



================================================
FILE: packages/motion/src/content/docs/3-resources/2-typescript.mdx
================================================
---
title: TypeScript
sidebar:
  order: 2
---

Legend-Motion tries to be as strongly typed as possible, with the `animate` prop autocompleting the available styles of the component, `animateProps` autocompleting the component's props, and the `transition` prop autocompleting only the properties that are animated.

If types are not working please ensure that you've installed both `@types/react` and `@types/react-dom`.

import Install from "shared/src/Components/Install/Install.astro";

<Install name="@types/react @types/react-native" />



================================================
FILE: packages/motion/src/content/docs/3-resources/3-next.js.mdx
================================================
---
title: Next.js
sidebar:
  order: 3
---

There are a few extra steps to get Legend-Motion working on Next.js.

First, Legend-Motion and its dependencies need to be added to the transpile list.

import Install from "shared/src/Components/Install/Install.astro";

<Install name="next-transpile-modules" className="mb-8" />

Then wrap your export in `next.config.js` with `withTM`. This is the full config needed to setup Legend-Motion including Linear Gradient and SVG features. You can remove those lines if you don't need them.

```js
const withTM = require("next-transpile-modules")([
  "@legendapp/motion",
  // Only required for MotionLinearGradient:
  "react-native-linear-gradient",
  // Only required for MotionSvg:
  "react-native-svg",
]);

module.exports = withTM({
  webpack(cfg) {
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      "react-native$": "react-native-web",
      // Only required for MotionLinearGradient:
      "react-native-linear-gradient": "react-native-web-linear-gradient",
    };
    // Only required for MotionSvg:
    cfg.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...cfg.resolve.extensions,
    ];

    return cfg;
  },
});
```

**_Note_**: The reason for these changes is that `react-native-svg` needs `.web.js` to be added to the resolve extensions, and Linear Gradient requires aliasing `react-native-linear-gradient` to `react-native-web-linear-gradient`.



================================================
FILE: packages/motion/src/content/docs/getting-started/introduction.mdx
================================================
---
title: Introduction
sidebar:
  order: 1
---

Legend-Motion is a declarative animations library for React Native, to make it easy to transition between styles without needing to manage animations.

```jsx
<Motion.View
  initial={{ y: -50 }}
  animate={{ x: value * 100, y: 0 }}
  whileHover={{ scale: 1.2 }}
  whileTap={{ y: 20 }}
  transition={{ type: "spring" }}
/>
```

import Intro from "../../../Components/Introduction/Intro.astro";

<Intro />

## Highlights

- ✨ Supports react-native and react-native-web
- ✨ API similar to Framer Motion for easy mixing of React Native with React
- ✨ Supports animating SVG and linear gradient
- ✨ Supports transformOrigin
- ✨ whileHover and whileTap for easy animations on touch
- ✨ AnimatePresence for exit animations
- ✨ 0 dependencies using the built-in Animated
- ✨ Built for maximum performance
- ✨ Strongly typed with TypeScript

## Quick Start

Legend-Motion can be installed in React Native or React Native Web.

### Installation

### Importing

<div className="max-w-lg">
  ```js import {Motion} from "@legendapp/motion" ```
</div>

### Usage

Then set values on the `animate` prop to animate as the value changes.

```jsx
<Motion.View
    animate={{
        x: value * 100,
        opacity: value ? 1 : 0.2,
        scale: value ? 1 : 0.5
    }}
/>
<MotionSvg.Svg>
    <MotionSvg.Polygon
        animateProps={{ points: value === 1 ?
            "120,10 190,160 70,190 23,184" :
            "100,50 140,160 50,130 23,84"
        }}
    />
</MotionSvg.Svg>
<MotionLinearGradient
    animateProps={{
        colors: value ?
            ["#F81FEC", "#59B0F8"] :
            ["blue", "yellow"]
    }}
/>
```

See the [Overview page](./overview) for a more detailed usage guide.

## Motivation

**Easy to use**: We love the API of Framer-Motion in our web apps and wanted to build our React Native animations with the same ease.

**Interoperable with React**: At [Legend](https://legendapp.com) and [Bravely](https://bravely.io) our web apps mix React.js with components from our React Native apps using react-native-web, and we wanted them to work the same way.

**High performance**: Performance is extremely important to us so we designed for maximum performance with as little overhead as possible, using 0 dependences and minimal code. This library is tree shakeable and comes in at a total of 3kb gzipped if you use every feature.

**Svg and Gradients**: The [Bravely](https://bravely.io) app makes heavy use of gradient and svg animations, so we wanted to make that easy for our developers and yours.

## How it works

To keep the code small and and performance high, we tried to design this as simply as possible.

When a prop passed into `animate` changes, the `Motion` component starts an `Animated.spring` or `Animated.timing` animation with the new prop. If the prop is a string or array, it needs to be interpolated, so it bounces the value of an `AnimatedInterpolation` between 0 and 1, interpolating between the previous prop and the new prop.

For SVG animations, `legend-animations` provides Motion wrappers around all of the `react-native-svg` components, which itself supports passing Animated values into its props.

Linear Gradient animations were inspired by [react-native-animated-linear-gradient](https://github.com/heineiuo/react-native-animated-linear-gradient) (see it for a great description of how it works) and Legend-Motion additionally includes support for multiple color stops and animating `start` and `end`.

## Alternatives

### Moti

[Moti](https://moti.fyi) may be better for you, depending on your needs. It has a similar goal and has some other advanced features like variants, delays, and sequences. But it is larger, depends on Reanimated 2, has a different API, and does not include svg or gradient animations.



================================================
FILE: packages/motion/src/content/docs/guides/example.md
================================================
---
title: Example Guide
description: A guide in my new Starlight docs site.
---

Guides lead a user through a specific task they want to accomplish, often with a sequence of steps.
Writing a good guide requires thinking about what your users are trying to do.

## Further reading

- Read [about how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework



================================================
FILE: packages/motion/src/content/docs/reference/example.md
================================================
---
title: Example Reference
description: A reference page in my new Starlight docs site.
---

Reference pages are ideal for outlining how things work in terse and clear terms.
Less concerned with telling a story or addressing a specific use case, they should give a comprehensive outline of what your documenting.

## Further reading

- Read [about reference](https://diataxis.fr/reference/) in the Diátaxis framework



================================================
FILE: packages/shared/config.ts
================================================
export const versions = [
  ["v3", "v3 (next)"],
  ["v2", "v2"],
];

export const defaultVersion = "v3";


================================================
FILE: packages/shared/package.json
================================================
{
    "name": "shared",
    "version": "1.0.0",
    "description": "Common Code Shared across state and motion docs",
    "type": "module",
    "files": [
        "src"
    ],
    "dependencies": {
        "@astrojs/react": "^3.0.3",
        "astro": "^3.2.4",
        "react": "^18.2.0",
        "react-live": "^4.1.5"
    }
}



================================================
FILE: packages/shared/tsconfig.json
================================================
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}



================================================
FILE: packages/shared/src/docSorting.ts
================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Generic doc entry type that matches the structure of Astro content collections
 */
export type DocEntry = {
    slug: string;
    data: {
        title: string;
        sidebar?: {
            order?: number;
        };
        [key: string]: any;
    };
    body: string;
};

/**
 * Helper function to sort documentation by sidebar category and order
 *
 * @param docs Array of document collection entries
 * @param sidebarOrder Array of category names in the order they should appear
 * @returns Sorted array of document collection entries
 */
export function sortDocsByCategory<T extends DocEntry>(docs: T[], sidebarOrder: string[]): T[] {
    return [...docs].sort((a, b) => {
        // Extract the top-level category from the slug
        const aCategory = a.slug.split('/')[0];
        const bCategory = b.slug.split('/')[0];

        // Get the index of each category in the sidebarOrder array
        const aCategoryIndex = sidebarOrder.indexOf(aCategory);
        const bCategoryIndex = sidebarOrder.indexOf(bCategory);

        // First sort by category order
        if (aCategoryIndex !== bCategoryIndex) {
            return aCategoryIndex - bCategoryIndex;
        }

        // If same category, sort by sidebar property
        const aSidebar = a.data.sidebar?.order || 0;
        const bSidebar = b.data.sidebar?.order || 0;
        return aSidebar - bSidebar;
    });
}

/**
 * Extract sidebar order from an Astro config file
 * @param configPath Path to the astro.config.mjs file
 * @returns Array of sidebar category directories in order
 */
export async function getSidebarOrder(configPath: string): Promise<string[]> {
    try {
        // Read the file content
        const content = fs.readFileSync(configPath, 'utf-8');

        // Find the sidebar configuration using regex
        const sidebarMatch = content.match(/sidebar:\s*\[([\s\S]*?)\]/);
        if (!sidebarMatch || !sidebarMatch[1]) {
            console.warn(`Could not find sidebar configuration in ${configPath}`);
            return [];
        }

        // Extract the directories from the sidebar entries
        const sidebarSection = sidebarMatch[1];
        // Look for patterns like: autogenerate: { directory: 'intro' }
        const directoryMatches = sidebarSection.matchAll(/directory:\s*['"]([^'"]+)['"]/g);

        // Convert iterator to array and extract directory names
        const sidebarOrder = Array.from(directoryMatches, (match) => match[1]);

        return sidebarOrder;
    } catch (error) {
        console.error(`Error parsing Astro config at ${configPath}:`, error);
        return [];
    }
}

/**
 * Helper function to get sidebar order for a specific project
 * @param importMetaUrl The import.meta.url of the calling file
 * @returns Array of sidebar category directories in order
 */
export async function getProjectSidebarOrder(importMetaUrl: string): Promise<string[]> {
    // Get the current file's directory
    const __filename = fileURLToPath(importMetaUrl);
    const __dirname = path.dirname(__filename);

    // Path to the astro config file (going up from src/pages to root)
    const configPath = path.resolve(__dirname, '../../astro.config.mjs');

    // Get and return sidebar order from config
    return getSidebarOrder(configPath);
}



================================================
FILE: packages/shared/src/state.ts
================================================
import { observable, type ObservableParam } from "@legendapp/state";

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export const state$ = observable({
  packageManager: "bun" as PackageManager,
  exampleCount: 0,
  exampleTheme: "light",
  framework: 'React' as 'React' | 'React Native'
});



================================================
FILE: packages/shared/src/Components/Box.tsx
================================================
import classNames from "classnames";

export const Box = ({
  className,
  theme,
  children,
  width,
  height,
  center
}: {
  className?: string;
  theme?: "light" | "dark";
  center?: boolean;
  children: any;
  width?: number;
  height?: number;
}) => {
  return (
    <div
      className={classNames(
        "rounded-lg p-4 relative",
        center && "flex flex-col items-center",
        theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-gray-800 text-gray-100",
        className
      )}
      style={{ width, height }}
    >
      {children}
    </div>
  );
};



================================================
FILE: packages/shared/src/Components/Button.tsx
================================================
import classNames from "classnames";

export const Button = ({
  onClick,
  className,
  color,
  children,
}: {
  onClick?: () => void;
  className?: string;
  color?: string;
  children: any;
}) => {

  return (
    <button
      className={classNames(
        "block px-4 h-10 my-4 font-bold rounded-lg shadow text-2xs cursor-pointer transition-colors",
        color || 'bg-gray-600 hover:bg-gray-500',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};



================================================
FILE: packages/shared/src/Components/Checkbox.tsx
================================================
import { type ObservableParam } from '@legendapp/state';
import { $React } from '@legendapp/state/react-web';

export const Checkbox = ({ $value }: { $value: ObservableParam<boolean> }) => {
    return (
        <div className="inline-flex items-center">
            <label className="relative flex items-center p-1 -m-1 rounded-full cursor-pointer" htmlFor="checkbox">
                <$React.input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-600 checked:bg-blue-600 checked:before:bg-blue-600 hover:before:opacity-10"
                    id="checkbox"
                    $checked={$value}
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </span>
            </label>
        </div>
    );
};



================================================
FILE: packages/shared/src/Components/CodeSample.tsx
================================================
import { observable } from "@legendapp/state";
import {
  Memo,
  Reactive,
  observer,
  useObservable,
} from "@legendapp/state/react";
import { useRef } from "react";
import { Button } from "./Button";
import { Editor } from "./Editor/Editor";
import { useInterval } from "usehooks-ts";

export function CodeSample({
  code,
  scope,
}: {
  code: string;
  scope?: Record<string, unknown>;
}) {
  return (
    <Editor
      code={code}
      noInline
      renderCode={`;function Component(){};render(<div><Component /></div>)`}
      previewWidth={360}
      showEditing={false}
      scope={{
        useRef,
        useObservable,
        Button,
        Memo,
        observable,
        Reactive,
        observer,
        useInterval,
        ...(scope || {})
      }}
      classNameEditor="home-editor"
      hideDemo
    />
  );
}



================================================
FILE: packages/shared/src/Components/Tabs.tsx
================================================
import { type ObservableParam } from "@legendapp/state";
import { observer } from "@legendapp/state/react";
import classNames from "classnames";
import { motion, type Transition } from "framer-motion";

interface PropsTab<T extends string> {
  name: string;
  layoutId: string;
  text?: string;
  activeTab$: ObservableParam<T>;
}
const TransitionTab: Transition = {
  type: "spring",
  duration: 0.4,
  bounce: 0.21,
};

interface Props<T extends string> {
  name: string;
  tabs: T[];
  tabTexts?: string[];
  activeTab$: ObservableParam<T>;
  className?: string;
}

const Tab = observer(function Tab<T extends string>({
  name,
  layoutId,
  text,
  activeTab$,
}: PropsTab<T>) {
  const isActive = name === activeTab$.get();
  return (
    <div
      className="relative px-1 pb-1 mx-2 !mt-0 cursor-pointer"
      onClick={() => activeTab$.set(name)}
    >
      <div
        data-text={text}
        className={classNames(
          "bold-consistent-width",
          isActive && "text-blue-accent font-bold"
        )}
      >
        {text}
      </div>
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-x-0 bottom-0 h-1 rounded bg-blue-accent"
          transition={TransitionTab}
        />
      )}
    </div>
  );
});

export const Tabs = function <T extends string>({
  name,
  tabs,
  tabTexts,
  activeTab$,
  className,
}: Props<T>) {
  return (
    <motion.div className={classNames("flex items-center", className)} layout>
      {tabs.map((tab, i) => (
        <Tab
          layoutId={name}
          key={tab}
          name={tab}
          text={tabTexts?.[i] || tab}
          activeTab$={activeTab$}
        />
      ))}
    </motion.div>
  );
};



================================================
FILE: packages/shared/src/Components/ThemeButton.tsx
================================================
import { type Observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { $React } from '@legendapp/state/react-web';
import { BiMoon, BiSun } from 'react-icons/bi';
export const ThemeButton = observer(function ThemeButton({ $value }: { $value: Observable<'light' | 'dark'> }) {
    const value = $value.get();
    return (
        <$React.div
            className={
                'absolute right-0 top-0 size-8 flex justify-center items-center cursor-pointer hover:text-blue-500'
            }
            onClick={() => $value.set((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        >
            {value === 'dark' ? <BiMoon size={16} /> : <BiSun size={16} />}
        </$React.div>
    );
});



================================================
FILE: packages/shared/src/Components/Editor/Editor.astro
================================================
---
import { Editor } from "./Editor";
---

<Editor client:only />



================================================
FILE: packages/shared/src/Components/Editor/Editor.tsx
================================================
import { observer } from "@legendapp/state/react";
import classNames from "classnames";
import { BiPencil } from "react-icons/bi";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

interface Props {
  code: string;
  scope?: Record<string, unknown>;
  name?: string;
  noInline?: boolean;
  renderCode?: string;
  previewWidth?: number;
  classNameEditor?: string;
  classNamePreview?: string;
  hideCode?: boolean;
  hideDemo?: boolean;
  showEditing?: boolean;
  noError?: boolean;
  disabled?: boolean;
  transformCode?: (code: string) => string;
  previewCallout?: React.ReactNode;
}
const emptyTheme = { plain: {}, styles: [] };

function removeImports(code: string) {
  return code.replace(/import .*?\n/g, "");
}

export const Editor = observer(function Editor({
  code,
  scope,
  name,
  previewWidth,
  renderCode,
  classNameEditor,
  classNamePreview,
  transformCode,
  hideCode = false,
  hideDemo = false,
  showEditing = true,
  noInline = false,
  noError = false,
  disabled = false,
  previewCallout
}: Props) {
  code = code.trim();
  return (
    <LiveProvider
      code={code}
      transformCode={(output) =>
        removeImports(
          (transformCode ? transformCode(output) : output) + (renderCode || "")
        )
      }
      scope={scope}
      enableTypeScript={true}
      theme={emptyTheme}
      disabled={disabled}
      noInline={noInline}
      language="tsx"
    >
      <div className="flex gap-4 text-sm mt-6 items-center">
        {!hideCode && <div className={classNames("relative flex-1", classNameEditor)}>
          <div>
            <LiveEditor />
          </div>
          {showEditing && (
            <div
              className={classNames(
                "absolute top-3 right-3 !mt-0 flex items-center bg-blue-700 px-2 py-1 rounded-md text-sm cursor-default"
              )}
            >
              <BiPencil className="mr-2" />
              Live Editing
            </div>
          )}
        </div>}
        {!hideDemo && (
          <div
            className={classNames(name ? `p_${name}` : "col-span-1 rounded", classNamePreview)}
            style={{ width: previewWidth }}
          >
            <LivePreview />
            {previewCallout}
          </div>
        )}
      </div>
      {!noError && <LiveError />}
    </LiveProvider>
  );
});



================================================
FILE: packages/shared/src/Components/Install/Install.astro
================================================
---
import { Install } from "./Install";
const { name } = Astro.props;
---

<Install name={name} client:only />



================================================
FILE: packages/shared/src/Components/Install/Install.tsx
================================================
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { observer } from "@legendapp/state/react";
import { syncObservable } from "@legendapp/state/sync";
import classNames from "classnames";
import { state$, type PackageManager } from "../../state";
import { Tabs } from "../Tabs";

const tabs: PackageManager[] = ["bun", "npm", "yarn", "pnpm"];

syncObservable(state$, {
    persist: {
        plugin: ObservablePersistLocalStorage,
      name: "state",
    },
  })

export const InstallTabs = observer(function ({ name }: { name: string }) {
  return <Tabs name={name} tabs={tabs} activeTab$={state$.packageManager} />;
});

export const InstallCode = observer(function ({ name }: { name: string }) {
  const manager = state$.packageManager.get();

  return (
    <pre
      className="!mt-4 astro-code css-variables"
      style={{
        backgroundColor: "var(--astro-code-color-background)",
        overflowX: "auto",
      }}
    >
      <code className="language-bash code-highlight">
        <span className="code-line">
          <span className="token function">{manager}</span>{" "}
          <span className="token function">
            {manager === "npm" ? "i" : "add"}
          </span>
          {" " + name}
        </span>
      </code>
    </pre>
  );
});

export const Install = observer(function ({
  name,
  className,
  uid,
}: {
  name: string;
  className?: string;
  uid?: string;
}) {
  return (
    <div className={classNames("mt-6", className)}>
      <InstallTabs name={name || uid!} />
      <InstallCode name={name} />
    </div>
  );
});


export function CodeLine({ children }: { children: React.ReactNode }) {
    return (
        <pre
            className="!mt-4 astro-code css-variables inline-block"
            style={{
                backgroundColor: 'var(--astro-code-color-background)',
                overflowX: 'auto',
            }}
        >
            <code className="language-bash code-highlight">
                <span className="code-line px-4">
                    <span className="text-white">{children}</span>
                </span>
            </code>
        </pre>
    );
}


================================================
FILE: packages/shared/src/Components/InstallFrameworks/InstallFrameworks.astro
================================================
---
import { InstallFrameworks } from "./InstallFrameworks";
---

<InstallFrameworks client:only />



================================================
FILE: packages/shared/src/Components/InstallFrameworks/InstallFrameworks.tsx
================================================
import { observer } from '@legendapp/state/react';
import classNames from 'classnames';
import { state$ } from '../../state';
import { InstallCode, InstallTabs } from '../Install/Install';

export const InstallFrameworks = observer(function ({ className }: { className?: string }) {
    const name = '@legendapp/state@beta';
    const framework = state$.framework.get();
    return (
        <div className={classNames('mt-6', className)}>
            <InstallTabs name={name} />
            <InstallCode name={name} />
            {framework === 'React Native' && (
                <div>
                    <div>And if you want to use persistence, install your preferred storage plugin</div>
                    <InstallCode name="react-native-mmkv" />
                    <div className="!mt-2 -mb-2">or</div>
                    <InstallCode name="@react-native-async-storage/async-storage" />
                </div>
            )}
        </div>
    );
});



================================================
FILE: packages/shared/src/Components/ReactOrNativeCode/ReactOrNativeCode.astro
================================================
---
import { ReactOrNativeCode } from "./ReactOrNativeCode";
const { value } = Astro.props;
---

<ReactOrNativeCode client:only value={value} />



================================================
FILE: packages/shared/src/Components/ReactOrNativeCode/ReactOrNativeCode.tsx
================================================
import { observe } from '@legendapp/state';
import { useMount } from '@legendapp/state/react';
import { state$ } from '../../state';

interface Props {
    onlyFirst: boolean;
}

export const ReactOrNativeCode = function ReactOrNativeCode({ onlyFirst }: Props) {
    useMount(() => {
        const mapSpans = new Map<Element, 'View' | 'Text'>();
        const spans = document.querySelectorAll('code span');
        const spansMMKV = new Set<Element>();
        const spansMMKV2 = new Set<Element>();
        const spansTextInput = new Set<Element>();
        const spansTextInputImport1 = new Set<Element>();
        const spansTextInputImport2 = new Set<Element>();

        spans.forEach((span) => {
            const text = span.textContent as string;
            if (text === 'View' || text === 'Text') {
                mapSpans.set(span, text);
            } else if (text?.includes('ObservablePersistMMKV')) {
                if (!onlyFirst || spansMMKV.size < 2) {
                    spansMMKV.add(span);
                }
            } else if (text?.includes('/mmkv')) {
                if (!onlyFirst || spansMMKV2.size < 1) {
                    spansMMKV2.add(span);
                }
            } else if (text?.includes('Reactive.TextInput')) {
                spansTextInput.add(span as HTMLSpanElement);
            } else if (text === '$TextInput') {
                spansTextInput.add(span as HTMLSpanElement);
            } else if (text === ' { $TextInput } ') {
                spansTextInputImport1.add(span as HTMLSpanElement);
            } else if (text === '@legendapp/state/react-native') {
                spansTextInputImport2.add(span as HTMLSpanElement);
            }
        });
        const dispose = observe(() => {
            const isReact = state$.framework.get() === 'React';
            mapSpans.forEach((text, span) => {
                span.textContent = isReact ? 'div' : text;
            });
            spansMMKV.forEach((span) => {
                span.textContent = span.textContent!.replace(
                    /ObservablePersist(?:LocalStorage|MMKV)/,
                    isReact ? 'ObservablePersistLocalStorage' : 'ObservablePersistMMKV',
                );
            });
            spansMMKV2.forEach((span) => {
                span.textContent = span.textContent!.replace(/local-storage|mmkv/, isReact ? 'local-storage' : 'mmkv');
            });
            spansTextInput.forEach((span) => {
                span.textContent = isReact ? '$React.input' : '$TextInput';
            });
            spansTextInputImport1.forEach((span) => {
                span.textContent = isReact ? ' { $React } ' : ' { $TextInput } ';
            });
            spansTextInputImport2.forEach((span) => {
                span.textContent = isReact ? '@legendapp/state/react-web' : '@legendapp/state/react-native';
            });
        });

        return dispose;
    });
    return null;
};



================================================
FILE: packages/shared/src/Components/SelectFramework/SelectFramework.astro
================================================
---
import { SelectFramework } from "./SelectFramework";
const { onlyFirst } = Astro.props;
---

<SelectFramework onlyFirst={onlyFirst} client:only />



================================================
FILE: packages/shared/src/Components/SelectFramework/SelectFramework.tsx
================================================
import { observer } from "@legendapp/state/react";
import classNames from "classnames";
import { state$ } from "shared/src/state";
import { Tabs } from "../Tabs";
import {ReactOrNativeCode} from "../ReactOrNativeCode/ReactOrNativeCode";

export const SelectFramework = observer(function ({
  className,
  onlyFirst
}: {
  className?: string;
  onlyFirst?: string
}) {
  const tabs = ['React', 'React Native'];

  return (
    <div className={classNames("mt-6", className)}>
      <Tabs
        name={'SelectFramework'}
        tabs={tabs}
        activeTab$={state$.framework}
      />
      <ReactOrNativeCode onlyFirst={onlyFirst} />
    </div>
  );
});



================================================
FILE: packages/state/astro.config.mjs
================================================
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import tailwindcssNesting from 'tailwindcss/nesting';
import sitemap from '@astrojs/sitemap';

const isPublish = process.argv[process.argv.length - 1] === '--publishlegend';

// https://astro.build/config
export default defineConfig({
    site: 'https://legendapp.com/open-source/state',
    integrations: [
        starlight({
            title: 'Legend State',
            customCss: ['./src/tailwind.css', './src/editor.css', './src/overrides.css'],
            favicon: '/favicon.ico',
            social: {
                github: 'https://github.com/LegendApp/legend-state',
            },
            editLink: {
                baseUrl: 'https://github.com/LegendApp/legend-docs/edit/main/packages/state/',
            },
            sidebar: [
                {
                    label: 'Intro',
                    autogenerate: { directory: 'intro' },
                },
                {
                    label: 'Usage',
                    autogenerate: { directory: 'usage' },
                },
                {
                    label: 'React',
                    autogenerate: { directory: 'react' },
                },
                {
                    label: 'Persist and Sync',
                    autogenerate: { directory: 'sync' },
                },
                {
                    label: 'Guides',
                    autogenerate: { directory: 'guides' },
                },
                {
                    label: 'Other',
                    autogenerate: { directory: 'other' },
                },
            ],
            components: {
                ThemeProvider: './src/Components/Overrides/ThemeProvider.astro',
                ...(isPublish
                    ? {
                          Header: './src/Components/Overrides/Header.astro',
                          MobileMenuFooter: './src/Components/Overrides/MobileMenuFooter.astro',
                      }
                    : {}),
            },
        }),
        react(),
        tailwind({ applyBaseStyles: false }),
        sitemap(),
    ],
    // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
    image: {
        service: passthroughImageService(),
    },
    vite: {
        css: {
            postcss: {
                plugins: [tailwindcssNesting()],
            },
        },
        ssr: { noExternal: ['usehooks-ts', 'react-icons'] },
    },
});



================================================
FILE: packages/state/package.json
================================================
{
    "name": "state-docs",
    "type": "module",
    "version": "0.0.1",
    "scripts": {
        "dev": "astro dev",
        "devlegend": "astro dev --publishlegend",
        "start": "astro dev",
        "build": "astro build",
        "publish": "astro build --base /open-source/state/v3 --publishlegend",
        "preview": "astro preview",
        "astro": "astro"
    },
    "dependencies": {
        "@astrojs/react": "3.1.0",
        "@astrojs/starlight": "0.21.2",
        "@astrojs/starlight-tailwind": "2.0.1",
        "@astrojs/tailwind": "5.1.0",
        "@legendapp/state": "3.0.0-beta.30",
        "@tanstack/react-query": "^4",
        "@types/react": "^18.2.69",
        "@types/react-dom": "^18.2.22",
        "astro": "4.5.9",
        "axios": "^1.6.8",
        "classnames": "^2.5.1",
        "framer-motion": "^11.0.20",
        "prettier": "^3.3.3",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-icons": "^5.0.1",
        "shared": "workspace:*",
        "tailwindcss": "^3.4.1",
        "usehooks-ts": "^3.0.2"
    }
}



================================================
FILE: packages/state/tailwind.config.cjs
================================================
const colors = require("tailwindcss/colors");
const starlightPlugin = require("@astrojs/starlight-tailwind");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}', '../shared/src/**/*.{astro,html,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            opacity: {
                2: '0.02',
                3: '0.03',
                4: '0.04',
            },
            fontSize: {
                h1: '3.5rem',
            },
            colors: {
                tBorder: '#31353e',
                tBg: '#141820',
                tBgDark: 'rgba(0,0,0,0.2)',
                tBgLight: '#1d232f',
                tShadowDark: 'rgba(0, 0, 0, 0.5)',
            },
        },
        colors: {
            gray: {
                50: '#fafafa',
                100: '#f4f4f5',
                200: '#e4e4e7',
                300: '#d4d4d8',
                350: '#cececf',
                400: '#a1a1a4',
                500: '#71717a',
                600: '#52525b',
                700: '#3f3f46',
                750: '#2D2E2F',
                800: '#27272a',
                850: '#1F2025',
                900: '#18181b',
                950: '#131317',
            },
            // coolgray: colors.coolGray,
            black: colors.black,
            white: colors.white,
            red: colors.red,
            blue: colors.sky,
            violet: colors.violet,
            'blue-accent': '#25A2E8',
        },
        screens: {
            '2xs': '400px',
            xs: '480px',
            ...defaultTheme.screens,
        },
    },
    plugins: [starlightPlugin()],
};


================================================
FILE: packages/state/tsconfig.json
================================================
{
    "extends": "astro/tsconfigs/strict",
    "compilerOptions": {
        "jsx": "react-jsx",
        "jsxImportSource": "react",
        "paths": {
            "shared/*": [
                "../shared/*"
            ]
        }
    }
}


================================================
FILE: packages/state/public/fonts/inter-v13-latin-300.woff2
================================================
[Binary file]


================================================
FILE: packages/state/public/fonts/inter-v13-latin-500.woff2
================================================
[Binary file]


================================================
FILE: packages/state/public/fonts/inter-v13-latin-600.woff2
================================================
[Binary file]


================================================
FILE: packages/state/public/fonts/inter-v13-latin-700.woff2
================================================
[Binary file]


================================================
FILE: packages/state/public/fonts/inter-v13-latin-800.woff2
================================================
[Binary file]


================================================
FILE: packages/state/public/fonts/inter-v13-latin-900.woff2
================================================
[Binary file]


================================================
FILE: packages/state/public/fonts/inter-v13-latin-regular.woff2
================================================
[Binary file]


================================================
FILE: packages/state/src/editor.css
================================================
:root {
    --sl-text-code: var(--sl-text-xs);
    --sl-sidebar-width: 14rem;
    --color-fg-default: #c9d1d9;
    --color-bg-code-block: #0E1218;
    --color-border-code-block: #2E3238;
    --color-bg-inline-code-block: rgb(110 118 129 / 40%);
    --color-gray: #8b949e;
    --color-red: #ff7b72;
    --color-green: #7ee787;
    --color-blue: #79c0ff;
    --color-light-blue: #a5d6ff;
    --color-indigo: #a5d6ff;
    --color-purple: #d2a8ff;
    --color-brown: #ffa657;
    --code-border-radius: 0.5em;
    --code-background: var(--astro-code-color-background) !important;
    --astro-code-color-text: var(--color-fg-default);
    --astro-code-color-background: var(--color-bg-code-block);
    --astro-code-token-constant: var(--color-green);
    --astro-code-token-string: var(--color-light-blue);
    --astro-code-token-comment: var(--color-gray);
    --astro-code-token-keyword: var(--color-red);
    --astro-code-token-parameter: var(--color-purple);
    --astro-code-token-function: var(--color-purple);
    --astro-code-token-string-expression: var(--color-blue);
    --astro-code-token-punctuation: var(--color-gray);
    --astro-code-token-link: var(--color-indigo);
}

.mt-section {
    @apply mt-24 md:mt-32 !important;
}

.mt-subsection {
    @apply mt-16 md:mt-24 !important;
}

.astro-code {
    border-radius: var(--code-border-radius);
    border-color: var(--color-border-code-block) !important;
}

.shadow-dark {
    @apply shadow-md shadow-tShadowDark
}

.home-editor {
    @apply max-w-full;
}

.home-editor .prism-code {
    padding: 16px !important;
    @apply border border-tBorder shadow-dark bg-[#161b22] whitespace-pre !important;
}

code {
    border-radius: 0.25rem;
}


/**
 * GitHub's theme skeleton for prism.js
 * @author Jongwoo Han (@jongwooo)
 * https: //github.com/jongwooo/prism-theme-github/blob/main/themes/prism-github-default-dark.css
 */

code[class*="language-"],
pre[class*="language-"],
.expressive-code pre {
    background-color: var(--color-bg-code-block) !important;
    color: var(--color-fg-default) !important;
    border-color: var(--color-border-code-block) !important;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    tab-size: 2;
    hyphens: none;
    border-radius: var(--code-border-radius) !important;
}


/* Code blocks */

pre[class*="language-"] {
    font-family: "Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace !important;
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: var(--code-border-radius);
}


/* Inline code */

:not(pre)>code[class*="language-"] {
    background-color: var(--color-bg-inline-code-block);
    padding: 0.2em 0.3em;
    border-radius: var(--code-border-radius);
    white-space: normal;
}

@media (width <=700px) {
     :not(pre)>code[class*="language-"] {
        font-size: 0.875rem;
    }
}

.token.comment,
.token.prolog,
.token.cdata {
    color: var(--color-gray);
}

.token.doctype,
.token.punctuation,
.token.entity {
    color: var(--color-fg-default);
}

.token.attr-name,
.token.class-name,
.token.boolean,
.token.constant,
.token.number,
.token.atrule {
    color: var(--color-blue);
}

.token.keyword {
    color: var(--color-indigo);
}

.token.property,
.token.tag,
.token.symbol,
.token.deleted,
.token.important {
    color: var(--color-green);
}

.token.selector,
.token.string,
.token.char,
.token.builtin,
.token.inserted,
.token.regex,
.token.attr-value,
.token.attr-value>.token.punctuation {
    color: var(--color-light-blue);
}

.token.variable,
.token.operator,
.token.function {
    color: var(--color-indigo);
}

.token.url {
    color: var(--color-green);
}


/* HTML overrides */

.token.attr-value>.token.punctuation.attr-equals,
.token.special-attr>.token.attr-value>.token.value.css {
    color: var(--color-fg-default);
}


/* CSS overrides */

.language-css .token.selector {
    color: var(--color-green);
}

.language-css .token.property {
    color: var(--color-blue);
}

.language-css .token.important,
.language-css .token.atrule .token.rule {
    color: var(--color-red);
}


/* JS overrides */

.language-js .token.keyword,
.language-javascript .token.keyword {
    color: var(--color-red);
}

.language-js .token.operator,
.language-js .token.constant,
.language-js .token.boolean,
.language-js .token.number,
.language-js .token.atrule,
.language-javascript .token.operator,
.language-javascript .token.constant,
.language-javascript .token.boolean,
.language-javascript .token.number,
.language-javascript .token.atrule {
    color: var(--color-blue);
}

.language-js .token.function,
.language-javascript .token.function {
    color: var(--color-purple);
}

.language-js .token.attr-name,
.language-js .token.class-name,
.language-js .token.function-variable,
.language-javascript .token.attr-name,
.language-javascript .token.class-name,
.language-javascript .token.function-variable {
    color: var(--color-brown);
}


/* JSX overrides */

.language-jsx .token.keyword,
.language-tsx .token.keyword {
    color: var(--color-red);
}

.language-jsx .token.function,
.language-tsx .token.function {
    color: var(--color-purple);
}

.language-jsx .token.function-variable,
.language-tsx .token.function-variable {
    color: var(--color-brown);
}

.language-jsx .token.punctuation,
.language-tsx .token.punctuation {
    color: var(--color-blue);
}

.language-jsx .token.class-name,
.language-tsx .token.class-name {
    color: var(--color-green);
}

.language-jsx .token.attr-name,
.language-tsx .token.attr-name {
    color: var(--color-blue);
}

.language-jsx .token.string,
.language-tsx .token.string {
    color: var(--color-indigo);
}


/* JSON overrides */

.language-json .token.operator {
    color: var(--color-fg-default);
}

.language-json .token.null.keyword {
    color: var(--color-blue);
}


/* Java overrides */

.language-java .token.keyword {
    color: var(--color-red);
}

.language-java .token.operator,
.language-java .token.constant,
.language-java .token.boolean,
.language-java .token.number,
.language-java .token.atrule {
    color: var(--color-blue);
}

.language-java .token.function {
    color: var(--color-purple);
}

.language-java .token.attr-name,
.language-java .token.function-variable {
    color: var(--color-green);
}


/* Kotlin overrides */

.language-kotlin .token.keyword {
    color: var(--color-red);
}

.language-kotlin .token.operator,
.language-kotlin .token.constant,
.language-kotlin .token.boolean,
.language-kotlin .token.number,
.language-kotlin .token.atrule {
    color: var(--color-blue);
}

.language-kotlin .token.function {
    color: var(--color-purple);
}

.language-kotlin .token.attr-name,
.language-kotlin .token.function-variable {
    color: var(--color-green);
}


/* Go overrides */

.language-go .token.keyword {
    color: var(--color-red);
}

.language-go .token.operator,
.language-go .token.constant,
.language-go .token.boolean,
.language-go .token.number,
.language-go .token.atrule {
    color: var(--color-blue);
}

.language-go .token.function {
    color: var(--color-purple);
}

.language-go .token.attr-name,
.language-go .token.function-variable {
    color: var(--color-green);
}


/* YAML overrides */

.language-yml .token.atrule,
.language-yaml .token.atrule {
    color: var(--color-green);
}


/* Dockerfile overrides */

.language-dockerfile .token.keyword {
    color: var(--color-red);
}

.language-dockerfile .token.function {
    color: var(--color-purple);
}

.language-dockerfile .token.punctuation {
    color: var(--color-blue);
}

.language-dockerfile .token.attr-name,
.language-dockerfile .token.class-name {
    color: var(--color-green);
}

.language-dockerfile .token.string {
    color: var(--color-indigo);
}


/* General */

.token.bold {
    font-weight: bold;
}

.token.italic {
    font-style: italic;
}

.token.entity {
    cursor: help;
}

.token.namespace {
    opacity: 0.8;
}


================================================
FILE: packages/state/src/env.d.ts
================================================
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />



================================================
FILE: packages/state/src/overrides.css
================================================
:root {
    --sl-color-accent-high: #09d;
    --sl-color-bg-nav: rgba(13, 14, 15, 0.8);
    --sl-color-bg-sidebar: #0d0e0f;
    --sl-font: 'Inter', ui-sans-serif, system-ui, sans-serif;
    @media (min-width: 80rem) {
        --sl-content-width: 48rem;
    }
    @media (min-width: 85rem) {
        --sl-content-width: 52rem;
    }
    .starlight-aside__title {
        font-size: var(--sl-text-h6);
    }
    .starlight-aside__content {
        @apply text-base;
    }
}

.content a:hover {
    color: #0ae !important;
}

aside {
    @apply rounded;
}

/* inter-300 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    src: url('fonts/inter-v13-latin-300.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-regular - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('fonts/inter-v13-latin-regular.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-500 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    src: url('fonts/inter-v13-latin-500.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-600 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    src: url('fonts/inter-v13-latin-600.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-700 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('fonts/inter-v13-latin-700.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-800 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    src: url('fonts/inter-v13-latin-800.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}

/* inter-900 - latin */

@font-face {
    font-display: swap;
    /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    src: url('fonts/inter-v13-latin-900.woff2') format('woff2');
    /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
}



================================================
FILE: packages/state/src/tailwind.css
================================================
@tailwind base;
@tailwind components;
@tailwind utilities;
.bold-consistent-width:after {
    @apply block font-bold h-[1px] opacity-0 overflow-hidden invisible;
    content: attr(data-text);
}

.flex-2 {
    flex: 2 1 0%;
}

.shadow-bold {
    text-shadow: 0px 0px 1px white;
}


================================================
FILE: packages/state/src/Components/FlashingDiv/FlashingDiv.tsx
================================================
import classNames from "classnames";
import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { type ReactNode } from "react";

export function FlashingDiv({
  span,
  className,
  classNameOuter,
  bg,
  pad,
  children,
}: {
  span?: boolean;
  className?: string;
  classNameOuter?: string;
  bg?: boolean;
  pad?: boolean;
  children: ReactNode;
}) {
  const controls = useAnimation();

  useEffect(() => {
    controls
      .start({
        opacity: 0.2,
        transition: {
          duration: 0.1,
        },
      })
      .then(() => {
        controls.start({
          opacity: 0,
          transition: {
            duration: 0.2,
          },
        });
      });
  });

  return (
    <span
      className={classNames(
        "relative",
        span ? "p-1" : "block p-1",
        classNameOuter
      )}
    >
      <motion.div
        animate={controls}
        className="absolute inset-0 rounded-lg opacity-0 bg-blue-500"
      />
      <span
        className={classNames(
          "relative z-10 rounded-lg",
          bg || "bg-gray-800",
          pad && 'p-4',
          span ? "px-2" : "block",
          className
        )}
      >
        {children}
      </span>
    </span>
  );
}



================================================
FILE: packages/state/src/Components/Home/AnimatedBackground.tsx
================================================
import type { Observable } from "@legendapp/state";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
}

interface Props {
  state$: Observable<{ speed: number }>;
}

export const AnimatedBackground: React.FC<Props> = ({ state$ }) => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null);
  const refBg = useRef<HTMLDivElement | null>(null);
  const NumParticles = 50;

  useEffect(() => {
    const canvas = refCanvas.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    let oldWidth = canvas.width;
    let oldHeight = canvas.height;

    const particles: Particle[] = [];

    const resizeCanvas = () => {
      const container = document.getElementById("background-container");
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }

      particles.forEach((particle) => {
        particle.x = (particle.x / oldWidth) * canvas.width;
        particle.y = (particle.y / oldHeight) * canvas.height;
      });

      oldWidth = canvas.width;
      oldHeight = canvas.height;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const createParticle = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    };

    for (let i = 0; i < NumParticles; i++) {
      createParticle();
    }

    const opacityLevels = Array.from(
      { length: 101 },
      (_, i) => 0.4 * (1 - i / 100)
    );

    const strokeStyles = opacityLevels.map(
      (opacity) => `rgba(100, 149, 237, ${opacity})`
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    //   ctx.fillStyle = "rgba(0, 0, 50, 0.05)";
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);

      const state = state$.get();
      const stateSpeed = +state.speed;
      const speed = (stateSpeed - 1) * 10 + 1;
      const num = NumParticles + speed * 5;
      const opacityRaw = (0.3 + (stateSpeed / 30))
      const opacity = Math.round(opacityRaw * 100) / 100;

      if (num < particles.length) {
        particles.length = num;
      }
      while (num > particles.length) {
        createParticle();
      }

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.dx * speed;
        particle.y += particle.dy * speed;

        if (particle.x < 0 || particle.x >= canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y >= canvas.height - particle.radius) particle.dy *= -1;

        const x = particle.x;
        const y = particle.y;

        ctx.beginPath();
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 171, 245, ${opacity})`;
        ctx.fill();

        for (let j = i; j < particles.length; j++) {
          const particle2 = particles[j];
          const x2 = particle2.x;
          const y2 = particle2.y;
          const dx = x - x2;
          const dy = y - y2;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = strokeStyles[Math.floor(distance)];
            ctx.lineWidth = 0.5;
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div
        ref={refBg}
        className="absolute inset-0 bg-gradient-to-b from-[#112c53] to-[#0d1117] -z-10"
        // style={{ height: '800%'}}
      />
      <canvas ref={refCanvas} className="!mt-0" />
    </div>
  );
};



================================================
FILE: packages/state/src/Components/Home/BackgroundGradients.tsx
================================================
import classNames from "classnames";

export function BackgroundGradients() {
    const light = '1b1b27';
    const dark = "0d1117";
  return (
      <div
          className="absolute inset-0 background-gradients -z-10"
          style={{
              background: `linear-gradient(
            to bottom,
            #${dark} 0%,
            #${light} 31%,
            #${light} 35%,
            #${dark} 66%,
            #${light} 90%
          )`,
          }}
      />
  );
}


================================================
FILE: packages/state/src/Components/Home/Components.tsx
================================================
import classNames from "classnames";

export const SectionTitle = ({
  text,
  description,
}: {
  text: string;
  description: string;
}) => {
  return (
    <div className="mx-auto grid grid-cols-2 gap-16">
      <h2 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
        {text}
      </h2>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-400">
        {description}
      </p>
    </div>
  );
};

export const DemoBox = ({
  children,
  width,
  height,
  blur,
}: {
  children: any;
  width?: number;
  height?: number;
  blur?: boolean;
}) => {
  return (
    <div
      className={classNames(
        "rounded-lg p-4 relative text-gray-200 border border-tBorder shadow-tShadowDark",
        blur && "backdrop-blur-sm bg-black/20"
      )}
      style={{ width, height }}
    >
      {children}
    </div>
  );
};



================================================
FILE: packages/state/src/Components/Home/CurvedArrowCallout.tsx
================================================
import React from "react";

const CurvedArrowCallout = ({
  width = 200,
  height = 100,
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 220 100">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="10 0, 0 3.5, 10 7" fill="#3b82f6" />
        </marker>
      </defs>
      <path
        d="M190,50 Q100,0 10,50"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3.5"
        markerStart="url(#arrowhead)"
      />
    </svg>
  );
};

export default CurvedArrowCallout;



================================================
FILE: packages/state/src/Components/Home/Footer.tsx
================================================
export function Footer() {
    return (
        <div className="text-center text-white/50 pt-32">
            Created by <a href="https://twitter.com/jmeistrich">Jay Meistrich</a>. Follow me on{' '}
            <a href="https://twitter.com/jmeistrich">Twitter</a> or{' '}
            <a href="https://github.com/LegendApp/legend-state">GitHub</a> for updates.
        </div>
    );
}



================================================
FILE: packages/state/src/Components/Home/GradientBorder.tsx
================================================
import classNames from "classnames";
import type { ReactNode } from "react";

export function GradientBorder({ children, className, style }: { children: ReactNode, className?: string, style?: CSSProperties }) {
  return (
    <div className={classNames("grad-stroke", className)} style={style}>
      {children}
      <div className="gs" />
    </div>
  );
}



================================================
FILE: packages/state/src/Components/Home/Header.tsx
================================================
import { createElement, type ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  fontWeight?: string;
  leading?: string;
  color?: `${'!' | ''}text-${string}`;
}

export function Header({
  children,
  color,
  size,
  className,
  leading,
  fontWeight,
}: Props) {
  return createElement(
    size,
    {
      className: classNames(
        color || "text-white",
        leading || "!leading-normal",
        fontWeight || "font-bold",
        className,
      ),
    },
    children
  );
}



================================================
FILE: packages/state/src/Components/Home/Home.tsx
================================================
import { useMount, useObservable } from '@legendapp/state/react';
import React, { useMemo, useRef } from 'react';
import { Button } from 'shared/src/Components/Button';
import { AnimatedBackground } from './AnimatedBackground';
import { Header } from './Header';
import { Preorder } from './Preorder';
import { SectionBadges } from './SectionBadges';
import { SectionEasy } from './SectionEasy';
import { SectionFullSync } from './SectionFullSync';
import { SectionKitComponents } from './SectionKitComponents';
import { SectionKitExamples } from './SectionKitExamples';
import { SectionKitExtension } from './SectionKitExtension';
import { SectionKitWrappers } from './SectionKitWrappers';
import { SectionPerfChart } from './SectionPerfChart';
import { SectionReact } from './SectionReact';
import { SectionFineGrained } from './SectionReactivityPerf';
import { SectionSync } from './SectionSync';
import { SectionTop } from './SectionTop';
import { Text } from './Text';
import { BackgroundGradients } from './BackgroundGradients';
import { SectionKitHeader } from './SectionKitHeader';
import { Footer } from './Footer';
import { SectionKitCLI } from './SectionKitCLI';

// function useScrollForHeader() {
//   useMount(() => {
//     const header = document.getElementsByTagName("header")[0];
//     // const scroller =
//     const handleScroll = () => {
//       const opacity = Math.min(document.documentElement.scrollTop / 200, 1);
//       const color = `rgba(0,0,0,${opacity})`;
//       header.style.setProperty("background-color", color, "important");
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Initial call to set the initial scroll position
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   });
// }

const LandingPage = () => {
    const state$ = useObservable({ speed: 2 });
    const refKit = useRef<HTMLDivElement>(null);
    //   useScrollForHeader();

    const onClickGotoKit = () => {
        refKit.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div id="scroller" className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col text-white">
            <div className="fixed inset-0 bg-[#0d1117]" />
            <main className="z-10 flex-grow !mt-0">
                <div className="relative" id="background-container">
                    <div className="max-w-5xl mx-auto pt-28 px-4 !mt-0">
                        <AnimatedBackground state$={state$} />
                        <div className="max-w-3xl z-10 relative !mt-0">
                            <Header
                                size="h1"
                                className="!text-3xl sm:!text-h1 !font-bold !leading-tight text-center md:text-left"
                            >
                                High performance state and local first sync
                            </Header>
                            <div className="max-w-2xl pt-2 pb-4">
                                <Text className="md:text-lg">
                                    Legend State is an extremely fast signal-based state library with fine-grained
                                    reactivity and a powerful sync system that works with any backend.
                                </Text>
                            </div>
                            <div className="flex flex-col xs:flex-row xs:gap-8 !mt-0 items-center">
                                <a href="/open-source/state/v3/intro/introduction/" className="no-underline">
                                    <Button color="bg-blue-700/80 hover:bg-blue-600">Get started</Button>
                                </a>
                                <div
                                    className="!mt-0 text-white/80 hover:text-white cursor-pointer font-medium bg-black/30 border border-white/10 shadow-tShadowDark xs:bg-none xs:shadow-none hover:bg-black/30 hover:shadow-tShadowDark px-4 h-10 rounded-lg transition-colors gap-3 flex items-center"
                                    onClick={onClickGotoKit}
                                >
                                    <div>Check out Legend Kit</div>
                                    <div className="!mt-0">{'>'}</div>
                                </div>
                            </div>
                        </div>

                        <SectionTop state$={state$} />
                        <SectionBadges />
                    </div>
                </div>
                <div className="!mt-0 relative">
                    <BackgroundGradients />
                    <div className="max-w-5xl mx-auto !mt-0 relative pb-12">
                        <SectionFineGrained />
                        <SectionEasy />
                        {/* <SectionReact /> */}

                        <SectionPerfChart />
                        {/* <SectionReactivityComponents /> */}

                        <SectionSync />
                        <SectionFullSync />
                        {/* <SectionLocalFirst /> */}
                        <div ref={refKit} />

                        <SectionKitHeader />

                        <SectionKitCLI />
                        <SectionKitComponents />
                        <SectionKitExtension />
                        <SectionKitWrappers />
                        <SectionKitExamples />
                        {/* <SectionKitDevTools /> */}
                        <Preorder />
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;



================================================
FILE: packages/state/src/Components/Home/List.tsx
================================================
import classNames from "classnames";
import { Header } from "./Header";

interface Props {
  items: string[];
  title?: string;
  border?: boolean;
  headerSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

function ListItem({ item }: { item: string }) {
  return (
    <li className="flex items-center space-x-2">
      <div className="w-1 h-4 bg-blue-600 rounded-sm mr-1 sm:mr-2"></div>
      <span>{item}</span>
    </li>
  );
}

export function List({ items, title, border, headerSize }: Props) {
  return (
    <div
      className={classNames("!mt-0", border && "border border-tBorder shadow-tShadowDark bg-tBg rounded-lg p-3 sm:p-4")}
    >
      {title && <Header size={headerSize || 'h5'}>{title}</Header>}
      <ul className="text-gray-400 font-medium space-y-2 list-none pl-0 sm:pl-2">
        {items.map((item) => (
          <ListItem key={item} item={item} />
        ))}
      </ul>
    </div>
  );
}


================================================
FILE: packages/state/src/Components/Home/ListOfBoxes.tsx
================================================
import classNames from "classnames";

interface Props {
  items: string[];
  itemSize?: `text-${string}`;
  itemWeight?: `font-${string}`;
  className?: string;
}

export const ListOfBoxes = ({
  items,
  itemSize,
  itemWeight,
  className,
}: Props) => {
  return (
    <div className={classNames("flex mt-16", className)}>
      <div className="flex flex-wrap gap-2 max-w-3xl">
        {items.map((item) => (
          <div
            key={item}
            className="!mt-0 px-8 py-2 text-center whitespace-pre bg-tBgLight rounded-lg"
          >
            <div
              className={classNames(
                "text-white",
                itemSize,
                itemWeight
              )}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



================================================
FILE: packages/state/src/Components/Home/Preorder.tsx
================================================
import { observer, useObservable } from '@legendapp/state/react';
import { Header } from './Header';
import { Text } from './Text';
import { PreorderButton } from './PreorderButton';

export const Preorder = observer(function Preorder() {
    const FullPrice = 399;
    const DiscountedPrice = 199;
    const Discount = FullPrice - DiscountedPrice;
    const DiscountPercentage = (Discount / FullPrice) * 100;
    return (
        <div className="sm:flex items-center gap-8 mt-section px-4">
            <div className="flex-1">
                <div className="max-w-lg">
                    <Header size="h1">Buy once, yours forever</Header>
                    <Text>
                        Lifetime access to an ever-growing library of helpers, components, hooks, example projects, and
                        reactive components.
                    </Text>
                    <Text>Now available with promotional launch pricing for a limited time.</Text>
                    <Text>
                        First version with CLI tools is available now, with more features coming soon after Legend-State
                        3.0.
                    </Text>
                </div>
            </div>
            <div className="rounded-xl p-8 border border-tBorder bg-gradient-to-br from-[#d556e3] to-[#3c59fd] max-w-sm mx-auto !mt-8 sm:!mt-0">
                <Header size="h2">Legend Kit</Header>
                <Text>
                    Get lifetime access to everything in Legend Kit for a single one-time purchase, including all future
                    updates. Get started now to save ${Discount} and accelerate Legend Kit's development.
                </Text>
                <div className="text-4xl !mt-8 line-through opacity-60">${FullPrice}</div>
                <div className="text-5xl !mt-2">${DiscountedPrice}</div>
                <Text className="!mt-2">
                    Save ${Discount} ({DiscountPercentage.toFixed(0)}% off) with promotional pricing!
                </Text>
                <PreorderButton color="white" className="!mt-8">
                    Get Started
                </PreorderButton>
            </div>
        </div>
    );
});



================================================
FILE: packages/state/src/Components/Home/PreorderButton.tsx
================================================
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Button } from 'shared/src/Components/Button';

interface PreorderButtonProps {
    color: 'white' | 'gradient';
    className?: string;
    children: ReactNode;
}

export function PreorderButton({ color, className, children }: PreorderButtonProps) {
    const isProd = import.meta.env.PROD;

    const paymentLink = isProd
        ? 'https://buy.stripe.com/4gw03ZgJle3V0zS288'
        : 'https://buy.stripe.com/test_4gwdUv5Zl5Gye1qaEE';

    return (
        <a href={paymentLink} target="_blank" className='no-underline'>
            <Button
                color={classNames(
                    'font-semibold',
                    color === 'white' && 'bg-white hover:bg-white/70 text-black/90 shadow-md',
                    color === 'gradient' &&
                        'bg-gradient-to-br from-[#d556e3] to-[#3c59fd] hover:from-[#dd70e7] hover:to-[#5370fd] text-white/90',
                )}
                className={className}
            >
                {children}
            </Button>
        </a>
    );
}



================================================
FILE: packages/state/src/Components/Home/SectionBadges.tsx
================================================
import classNames from "classnames";
import { Header } from "./Header";
import { Text } from "./Text";

export function SectionBadges() {
  const badges = [
    { title: "📚  App State", subtitle: "Local and global" },
    { title: "☁️  Remote State", subtitle: "Sync with any backend" },
    { title: "💾  Persistence", subtitle: "Both web and mobile" },
    { title: "😀  Great DX", subtitle: "Easy and intuitive" },
    { title: "🚀  Fast", subtitle: "#1 in performance" },
    { title: "⚡️  Fine-Grained", subtitle: "Reactivity" },
  ];

  return (
    <div className="text-center pt-16 !mt-0">
      <Header size="h1">All in One</Header>
      <Text className="max-w-lg mx-auto text-left">
        Legend-State is the fastest React state library, and it takes care of
        all of the hard sync and caching stuff for you.
      </Text>
      <Badges badges={badges} className={"!mt-8"} />
    </div>
  );
}

interface PropsBadges {
  badges: { title: string; subtitle?: string }[];
  titleSize?: `text-${string}`;
  titleWeight?: `font-${string}`;
  className?: string;
}

const Badges = ({ badges, titleSize, titleWeight, className }: PropsBadges) => {
  return (
    <div className={classNames("flex justify-center max-w-5xl", className)}>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:flex justify-center border bg-tBg border-tBorder rounded-lg divide-x divide-tBorder shadow-tShadowDark backdrop-blur-sm bg-opacity-0">
        {badges.map(({ title, subtitle }, i) => (
          <div
            key={title}
            className={classNames("!mt-0 px-3 sm:px-8 py-3 lg:py-4 text-center whitespace-pre", i === 5 && 'xl:hidden', 