Directory structure:
└── legendapp-legend-motion/
    ├── README.md
    ├── babel.config.js
    ├── CHANGELOG.md
    ├── index.d.ts
    ├── index.js
    ├── LICENSE
    ├── linear-gradient-expo.d.ts
    ├── linear-gradient-expo.js
    ├── linear-gradient.d.ts
    ├── linear-gradient.js
    ├── package.json
    ├── styled.d.ts
    ├── styled.js
    ├── svg.d.ts
    ├── svg.js
    ├── tsconfig.build.json
    ├── tsconfig.json
    ├── .editorconfig
    ├── .yarnrc
    ├── example/
    │   ├── app.json
    │   ├── babel.config.js
    │   ├── index.js
    │   ├── metro.config.js
    │   ├── package.json
    │   ├── tailwind.config.js
    │   ├── tsconfig.json
    │   ├── webpack.config.js
    │   └── src/
    │       └── App.tsx
    ├── scripts/
    │   └── bootstrap.js
    ├── src/
    │   ├── AnimatedComponents.ts
    │   ├── AnimatePresence.tsx
    │   ├── configureMotion.ts
    │   ├── Constants.ts
    │   ├── createMotionComponent.tsx
    │   ├── index.ts
    │   ├── Interfaces.ts
    │   ├── linear-gradient-expo.ts
    │   ├── linear-gradient.ts
    │   ├── LinearGradient.tsx
    │   ├── MotionPressable.tsx
    │   ├── styled.ts
    │   ├── svg.ts
    │   ├── useTransformOrigin.ts
    │   └── __tests__/
    │       └── index.test.tsx
    └── .husky/
        ├── commit-msg
        ├── pre-commit
        └── .npmignore


Files Content:

================================================
FILE: README.md
================================================
# Legend-Motion

Legend-Motion is a declarative animations library for React Native, to make it easy to transition between styles without needing to manage animations.

`npm install @legendapp/motion` or `yarn add @legendapp/motion`

```jsx
import { Motion } from "@legendapp/motion"

<Motion.View
    initial={{ y: -50 }}
    animate={{ x: value * 100, y: 0 }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ y: 20 }}
    transition={{ type: 'spring' }}
/>
```

<a href="https://www.youtube.com/watch?v=cV8whnjLFFU"><img src="https://www.legendapp.com/img/legend-motion-video.png" width="300" /></a>

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

## 📖 Docs

The full documentation with live examples is on our [website](https://www.legendapp.com/dev/motion).

## Upgrading from 1.x

- `whileTap` and `whileHover` props now require a `Motion.Pressable` ancestor, which it uses for tracking whether it's hovered or pressed. See [the example](https://www.legendapp.com/dev/motion/overview/#gestures).

## 👩‍⚖️ License

[MIT](LICENSE)

---

Legend-Motion is created and maintained by [Jay Meistrich](https://github.com/jmeistrich) with [Legend](https://www.legendapp.com) and [Bravely](https://www.bravely.io).

<p>
    <a href="https://www.legendapp.com"><img src="https://www.legendapp.com/img/LogoTextOnWhite.png" height="56" alt="Legend" /></a>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <a href="https://www.bravely.io"><img src="https://www.legendapp.com/img/bravely-logo.png" height="56" alt="Bravely" /></a>
</p>



================================================
FILE: babel.config.js
================================================
module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
};



================================================
FILE: CHANGELOG.md
================================================
## 2.2.0
- Fix: Styled components are upgraded from the older tailwindcss-react-native to NativeWind. If you were using `tailwindcss-react-native` see [the upgrade guide](https://www.nativewind.dev/guides/tailwindcss-react-native).

## 2.1.10
- Fix: Default `skew` values (https://github.com/LegendApp/legend-motion/pull/6)

## 2.1.9
- Fix: `skewX` and `skewY` types are strings

## 2.1.8
- Fix: `rotate` transform was not working

## 2.1.7
- Fix: A bad import

## 2.1.6
- Feature: Added Pressable export to /styled

## 2.1.5
- Fix: Types of styled components were not correct

## 2.1.4
- Fix: forwardRef had removed the generic typing so transition was not autocompleting

## 2.1.3
- Fix: ref was not forwarding through to component

## 2.1.2
- Fix: `onLayout` prop was not passing through to component

## 2.1.1
- Fix: "default" transition was not working correctly

## 2.1.0
- Feature: Added `exit` prop along with `AnimatePresence`.  See [the example](https://www.legendapp.com/dev/motion/animate-presence).

## 2.0.0
- Breaking: `whileTap` and `whileHover` props now require a `Motion.Pressable` ancestor, which is uses for tracking whether it is hovered or pressed. See [the example](https://www.legendapp.com/dev/motion/overview/#gestures).

## 1.4.2
- Fix: whileHover was not working without whileTap

## 1.4.1
- Fix: ordering of gesture state so `whileTap` overrides `whileHover`

## 1.4.0
- Feature: Added styled components using [tailwindcss-react-native](https://github.com/marklawlor/tailwindcss-react-native). Import from `@legendapp/motion/styled`. See https://legendapp.com/dev/motion/tailwind-css/ for more info.

## 1.3.0
- Feature: Added `whileHover` prop

## 1.2.0
- Feature: Added `whileTap` prop

## 1.1.0
- Feature: Added `configureMotion` to be able to set timing to seconds to match Framer Motion
- Feature: Added named easing functions



================================================
FILE: index.d.ts
================================================
export * from './lib/typescript/index';



================================================
FILE: index.js
================================================
export * from './lib/commonjs/index.js';



================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2022 Moo.do LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



================================================
FILE: linear-gradient-expo.d.ts
================================================
export * from './lib/typescript/linear-gradient-expo';



================================================
FILE: linear-gradient-expo.js
================================================
export * from './lib/commonjs/linear-gradient-expo.js';



================================================
FILE: linear-gradient.d.ts
================================================
export * from './lib/typescript/linear-gradient';



================================================
FILE: linear-gradient.js
================================================
export * from './lib/commonjs/linear-gradient.js';



================================================
FILE: package.json
================================================
{
    "name": "@legendapp/motion",
    "version": "2.4.0",
    "description": "legend-motion",
    "sideEffects": false,
    "main": "lib/commonjs/",
    "module": "lib/module/",
    "types": "index.d.ts",
    "react-native": "src/",
    "source": "src/",
    "exports": {
        ".": "./index.js",
        "./svg": "./svg.js",
        "./linear-gradient": "./linear-gradient.js",
        "./linear-gradient-expo": "./linear-gradient-expo.js",
        "./styled": "./styled.js",
        "./package.json": "./package.json"
    },
    "files": [
        "src",
        "lib",
        "index.js",
        "index.d.ts",
        "svg.js",
        "svg.d.ts",
        "linear-gradient.js",
        "linear-gradient.d.ts",
        "linear-gradient-expo.js",
        "linear-gradient-expo.d.ts",
        "styled.js",
        "styled.d.ts"
    ],
    "scripts": {
        "test": "jest",
        "typescript": "tsc --noEmit",
        "lint": "eslint \"**/*.{js,ts,tsx}\"",
        "prepare": "bob build",
        "release": "release-it",
        "example": "cd example && npm i",
        "pods": "cd example && pod-install --quiet",
        "bootstrap": "npm run example && npm i && npm run pods"
    },
    "keywords": [
        "react",
        "native",
        "react-native",
        "animations",
        "transitions",
        "framer",
        "motion",
        "framer-motion"
    ],
    "repository": {
        "type": "git",
        "url": "git+https://github.com/LegendApp/legend-motion.git"
    },
    "author": "Legend <contact@legendapp.com> (https://github.com/LegendApp)",
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/LegendApp/legend-motion/issues"
    },
    "homepage": "https://github.com/LegendApp/legend-motion#readme",
    "publishConfig": {
        "registry": "https://registry.npmjs.org/"
    },
    "devDependencies": {
        "@commitlint/config-conventional": "^16.2.1",
        "@react-native-community/eslint-config": "^3.0.1",
        "@release-it/conventional-changelog": "^4.3.0",
        "@types/jest": "^27.0.3",
        "@types/react": "^17.0.37",
        "@types/react-native": "0.66.6",
        "commitlint": "^16.2.3",
        "eslint": "^8.13.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-plugin-prettier": "^4.0.0",
        "expo-linear-gradient": "*",
        "expo-modules-core": "*",
        "husky": "^7.0.4",
        "jest": "^27.5.1",
        "pod-install": "^0.1.0",
        "prettier": "^2.0.5",
        "react-native-builder-bob": "^0.18.0",
        "react-native-linear-gradient": "^2.5.6",
        "react-native-svg": "^12.3.0",
        "release-it": "^14.2.2",
        "typescript": "^5.5.2"
    },
    "dependencies": {
        "@legendapp/tools": "2.0.1"
    },
    "peerDependencies": {
        "react": ">=16",
        "react-native": "*",
        "nativewind": "*"
    },
    "jest": {
        "preset": "react-native",
        "modulePathIgnorePatterns": [
            "<rootDir>/example/node_modules",
            "<rootDir>/lib/"
        ]
    },
    "commitlint": {
        "extends": [
            "@commitlint/config-conventional"
        ]
    },
    "release-it": {
        "git": {
            "commitMessage": "chore: release ${version}",
            "tagName": "v${version}"
        },
        "npm": {
            "publish": true
        },
        "github": {
            "release": true
        },
        "plugins": {
            "@release-it/conventional-changelog": {
                "preset": "angular"
            }
        }
    },
    "eslintConfig": {
        "root": true,
        "extends": [
            "@react-native-community",
            "prettier"
        ],
        "rules": {
            "prettier/prettier": [
                "error",
                {
                    "printWidth": 140,
                    "semi": true,
                    "singleQuote": true,
                    "trailingComma": "es5",
                    "tabWidth": 4
                }
            ]
        }
    },
    "eslintIgnore": [
        "node_modules/",
        "lib/"
    ],
    "prettier": {
        "printWidth": 140,
        "semi": true,
        "singleQuote": true,
        "trailingComma": "es5",
        "tabWidth": 4
    },
    "react-native-builder-bob": {
        "source": "src",
        "output": "lib",
        "targets": [
            "commonjs",
            "module", [
                "typescript",
                {
                    "project": "tsconfig.build.json"
                }
            ]
        ]
    },
    "directories": {
        "example": "example",
        "lib": "lib"
    }
}


================================================
FILE: styled.d.ts
================================================
export * from './lib/typescript/styled';



================================================
FILE: styled.js
================================================
export * from './lib/commonjs/styled';



================================================
FILE: svg.d.ts
================================================
export * from './lib/typescript/svg';



================================================
FILE: svg.js
================================================
export * from './lib/commonjs/svg.js';



================================================
FILE: tsconfig.build.json
================================================

{
  "extends": "./tsconfig",
  "exclude": ["example"]
}



================================================
FILE: tsconfig.json
================================================
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@legendapp/motion": [
                "./src"
            ]
        },
        "allowUnreachableCode": false,
        "allowUnusedLabels": false,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "jsx": "react",
        "lib": [
            "esnext"
        ],
        "module": "esnext",
        "moduleResolution": "node",
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "noImplicitUseStrict": false,
        "noStrictGenericChecks": false,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "strict": false,
        "target": "esnext"
    },
    "exclude": [
        "example",
        "node_modules"
    ]
}


================================================
FILE: .editorconfig
================================================
# EditorConfig helps developers define and maintain consistent
# coding styles between different editors and IDEs
# editorconfig.org

root = true

[*]

indent_style = space
indent_size = 4

end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true



================================================
FILE: .yarnrc
================================================
# Override Yarn command so we can automatically setup the repo on running `yarn`

yarn-path "scripts/bootstrap.js"



================================================
FILE: example/app.json
================================================
{
    "name": "@legendapp/motion-example",
    "displayName": "Legend-Motion Example",
    "expo": {
        "name": "Legend-Motion Example",
        "slug": "legend-motion-example",
        "description": "Example app for @legendapp/motion",
        "privacy": "public",
        "version": "1.0.0",
        "platforms": ["ios", "android", "web"],
        "ios": {
            "supportsTablet": true
        },
        "assetBundlePatterns": ["**/*"]
    }
}



================================================
FILE: example/babel.config.js
================================================
const path = require('path');
const pak = require('../package.json');

module.exports = function (api) {
    api.cache(true);

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    extensions: ['.tsx', '.ts', '.js', '.json'],
                    alias: {
                        // For development, we want to alias the library to the source
                        [pak.name]: path.join(__dirname, '..', pak.source),
                    },
                },
            ],
            ['nativewind/babel', { mode: 'compileOnly' }],
        ],
    };
};



================================================
FILE: example/index.js
================================================
import { registerRootComponent } from 'expo';

import App from './src/App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);



================================================
FILE: example/metro.config.js
================================================
const path = require('path');
const blacklist = require('metro-config/src/defaults/exclusionList');
const escape = require('escape-string-regexp');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
    ...pak.peerDependencies,
});

module.exports = {
    projectRoot: __dirname,
    watchFolders: [root],

    // We need to make sure that only one version is loaded for peerDependencies
    // So we blacklist them at the root, and alias them to the versions in example's node_modules
    resolver: {
        blacklistRE: blacklist(modules.map((m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`))),

        extraNodeModules: modules.reduce((acc, name) => {
            acc[name] = path.join(__dirname, 'node_modules', name);
            return acc;
        }, {}),
    },

    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
};



================================================
FILE: example/package.json
================================================
{
    "name": "legend-motion-example",
    "description": "Example app for legend-motion",
    "version": "0.0.1",
    "private": true,
    "main": "index",
    "scripts": {
        "android": "expo start --android",
        "ios": "expo start --ios",
        "web": "expo start --web",
        "start": "expo start",
        "test": "jest"
    },
    "dependencies": {
        "@expo/webpack-config": "^0.16.24",
        "electron": "^18.2.4",
        "expo": "^45.0.0",
        "expo-linear-gradient": "~11.3.0",
        "expo-modules-core": "~0.9.2",
        "expo-splash-screen": "~0.15.1",
        "react": "17.0.2",
        "react-dom": "17.0.2",
        "react-native": "0.68.2",
        "react-native-svg": "12.3.0",
        "react-native-syntax-highlighter": "^2.1.0",
        "react-native-web": "^0.18",
        "tailwindcss": "^3.1.8",
        "nativewind": "^4"
    },
    "devDependencies": {
        "@babel/core": "^7.12.9",
        "@babel/runtime": "^7.9.6",
        "babel-loader": "^8.2.4",
        "babel-plugin-module-resolver": "^4.0.0",
        "babel-preset-expo": "~9.1.0",
        "typescript": "^4.8.4"
    },
    "resolutions": {
        "@types/react": "^16"
    }
}



================================================
FILE: example/tailwind.config.js
================================================
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
};



================================================
FILE: example/tsconfig.json
================================================
{
    "compilerOptions": {
        "allowUnreachableCode": false,
        "allowUnusedLabels": false,
        "esModuleInterop": true,
        "importsNotUsedAsValues": "error",
        "forceConsistentCasingInFileNames": true,
        "allowSyntheticDefaultImports": true,
        "jsx": "react",
        "lib": [
            "es2015"
        ],
        "module": "es2015",
        "moduleResolution": "node",
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "noImplicitUseStrict": false,
        "noStrictGenericChecks": false,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "strict": false,
        "target": "esnext",
        "paths": {
            "@legendapp/motion": [
                "../src/index"
            ],
            "@legendapp/motion/svg": [
                "../src/svg"
            ],
            "@legendapp/motion/linear-gradient": [
                "../src/linear-gradient"
            ],
            "@legendapp/motion/linear-gradient-expo": [
                "../src/linear-gradient-expo"
            ],
            "@legendapp/motion/styled": [
                "../src/styled"
            ]
        },
    },
    "extends": "expo/tsconfig.base"
}


================================================
FILE: example/webpack.config.js
================================================
const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { resolver } = require('./metro.config');

const root = path.resolve(__dirname, '..');
const node_modules = path.join(__dirname, 'node_modules');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(root, 'src'),
        use: 'babel-loader',
    });

    // We need to make sure that only one version is loaded for peerDependencies
    // So we alias them to the versions in example's node_modules
    Object.assign(config.resolve.alias, {
        ...resolver.extraNodeModules,
        'react-native-web': path.join(node_modules, 'react-native-web'),
    });

    return config;
};



================================================
FILE: example/src/App.tsx
================================================
import { AnimatePresence, configureMotion, Motion } from '@legendapp/motion';
import { MotionLinearGradient } from '@legendapp/motion/linear-gradient-expo';
import { Motion as MotionStyled } from '@legendapp/motion/styled';
import { MotionSvg } from '@legendapp/motion/svg';
import { styled } from 'nativewind';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';

configureMotion({
    styled,
});
interface Props {
    value: number;
}

function useInterval(cb: () => void, ms: number) {
    useEffect(() => {
        const int = setInterval(() => {
            cb();
        }, ms);

        return () => clearInterval(int);
    }, [ms, cb]);
}

const Examples: Record<string, { code: string; Component: FC<any>; disableValue?: boolean }> = {
    Simple: {
        code: `
<Motion.View
    animate={{
        x: value * 100
    }}
/>`,
        Component: ({ value }: Props) => <Motion.View animate={{ x: value * 100 }} style={styles.box} />,
    },
    Transition: {
        code: `
<Motion.View
    animate={{
        x: value * 100
    }}
    transition={{
        type: 'spring',
        damping: 20,
        stiffness: 400
    }}
/>`,
        Component: ({ value }: Props) => (
            <Motion.View style={styles.box} animate={{ x: value * 100 }} transition={{ type: 'spring', damping: 20, stiffness: 400 }} />
        ),
    },
    'Transitions Custom': {
        code: `
<Motion.View
    animate={{
        x: value * 100,
        opacity: value ? 1 : 0.2,
        scale: value ? 1 : 0.5
    }}
    transition={{
        default: {
            type: "spring",
            damping: 20,
            stiffness: 300
        }
        x: {
            type: "spring",
            damping: 24,
            stiffness: 500
        },
        opacity: {
            type: "tween",
            duration: 1000
        }
    }}
/>`,
        Component: ({ value }: Props) => (
            <Motion.View
                style={styles.box}
                animate={{
                    x: value * 100,
                    opacity: value ? 1 : 0.2,
                    scale: value ? 1 : 0.5,
                }}
                transition={{
                    default: {
                        type: 'spring',
                        damping: 20,
                        stiffness: 300,
                    },
                    x: {
                        type: 'spring',
                        damping: 24,
                        stiffness: 500,
                    },
                    opacity: {
                        type: 'tween',
                        duration: 1000,
                    },
                }}
            />
        ),
    },
    Timing: {
        code: `
<Motion.View
    animate={{
        x: value * 100,
    }}
    transition={{
        type: 'tween',
        duration: 1000
    }}
/>`,
        Component: ({ value }: Props) => (
            <Motion.View
                style={styles.box}
                animate={{
                    x: value * 100,
                }}
                transition={{
                    type: 'tween',
                    duration: 1000,
                }}
            />
        ),
    },
    Easing: {
        code: `
<Motion.View
    animate={{
        x: value * 100,
    }}
    transition={{
        type: 'tween',
        duration: 1000,
        easing: 'easeOut'
    }}
/>`,
        Component: ({ value }: Props) => (
            <Motion.View
                style={styles.box}
                animate={{
                    x: value * 100,
                }}
                transition={{
                    type: 'tween',
                    duration: 1000,
                    easing: 'easeOut',
                }}
            />
        ),
    },
    Initial: {
        code: `
<Motion.View
    initial={{ x: 0 }}
    animate={{ x: 100 }}
/>`,
        Component: () => <Motion.View style={styles.box} initial={{ x: 0 }} animate={{ x: 100 }} />,
    },
    Color: {
        code: `
<Motion.View
    animate={{
        backgroundColor:
            value ? '#F81FEC' : '#59B0F8'
    }}
/>`,
        Component: ({ value }: Props) => (
            <Motion.View
                style={[styles.box, { marginLeft: 0 }]}
                animate={{
                    backgroundColor: value ? '#F81FEC' : '#59B0F8',
                }}
            />
        ),
    },
    Text: {
        code: `
<Motion.Text
    animate={{
        color: value ? '#F81FEC' : '#59B0F8',
        fontSize: value ? 48 : 24
    }}
>
    Text
</Motion.Text>`,
        Component: ({ value }: Props) => (
            <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
                <Motion.Text
                    animate={{
                        color: value ? '#F81FEC' : '#59B0F8',
                        fontSize: value ? 48 : 24,
                    }}
                >
                    Text
                </Motion.Text>
            </View>
        ),
    },
    'Linear Gradient': {
        code: `
<MotionLinearGradient
    animateProps={{
        colors: [
            value ? '#F81FEC' : 'blue',
            value ? '#59B0F8' : 'yellow'
        ],
        start: { x: 0, y: 0 },
        end: { x: value ? 1 : 0, y: 1 },
    }}
/>
`,
        Component: ({ value }: Props) => (
            <MotionLinearGradient
                style={[styles.box, { marginLeft: 0 }]}
                animateProps={{
                    colors: [value ? '#F81FEC' : 'blue', value ? '#59B0F8' : 'yellow'],
                    start: { x: 0, y: 0 },
                    end: { x: value ? 1 : 0, y: 1 },
                }}
            />
        ),
    },
    Svg: {
        code: `
<MotionSvg.Svg height="150" width="300">
    <MotionSvg.Polygon
        stroke="purple"
        animateProps={{
            points: value === 1 ? '40,50 70,90 50,95' : '40,5 70,80 25,95',
            fill: value === 1 ? 'pink' : 'lime',
            strokeWidth: value ? '1' : '3',
        }}
        transition={{
            points: {
                type: 'spring',
                damping: 20,
                stiffness: 300,
            },
        }}
    />
    <MotionSvg.Rect
        fill="rgba(255, 0, 0, 0.5)"
        stroke="purple"
        strokeWidth="1"
        animateProps={{
            fill: value ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)',
            x: value ? '100' : '180',
            y: value ? '20' : '40',
            width: value ? '50' : '100',
            height: value ? '50' : '100',
        }}
        transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300,
        }}
    />
</MotionSvg.Svg>`,
        Component: ({ value }: Props) => (
            <MotionSvg.Svg height="150" width="300">
                <MotionSvg.Polygon
                    stroke="purple"
                    animateProps={{
                        points: value === 1 ? '40,50 70,90 50,95' : '40,5 70,80 25,95',
                        fill: value === 1 ? 'pink' : 'lime',
                        strokeWidth: value ? '1' : '3',
                    }}
                    transition={{
                        points: {
                            type: 'spring',
                            damping: 20,
                            stiffness: 300,
                        },
                    }}
                />
                <MotionSvg.Rect
                    fill="rgba(255, 0, 0, 0.5)"
                    stroke="purple"
                    strokeWidth="1"
                    animateProps={{
                        fill: value ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)',
                        x: value ? '100' : '180',
                        y: value ? '20' : '40',
                        width: value ? '50' : '100',
                        height: value ? '50' : '100',
                    }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 300,
                    }}
                />
            </MotionSvg.Svg>
        ),
    },
    whileTap: {
        code: `
<MotionPressable>
    <Motion.View
        whileHover={{ scale: 1.1 }}
        whileTap={{ y: 10 }}
    >
        <Text>
            Press me
        </Text>
    </Motion.View>
</MotionPressable>
`,
        Component: () => (
            <Motion.Pressable>
                <Motion.View
                    style={[styles.box, { marginLeft: 0, justifyContent: 'center', alignItems: 'center' }]}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ y: 10 }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 400,
                    }}
                >
                    <Text style={{ color: 'white' }}>Press me</Text>
                </Motion.View>
            </Motion.Pressable>
        ),
    },
    Styled: {
        code: `
<Motion.View
    className="w-32 h-32 bg-blue-500 rounded-xl"
    animate={{ x: value * 100 }}
    transition={{
        type: 'spring',
        damping: 20,
        stiffness: 400,
    }}
/>
`,
        Component: ({ value }: Props) => (
            <MotionStyled.View
                style={{ marginLeft: -100 }}
                className="w-32 h-32 bg-blue-500 rounded-xl"
                animate={{ x: value * 100 }}
                transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 400,
                }}
            />
        ),
    },
    Presence: {
        code: `
<AnimatePresence>
    {value ? (
        <MotionStyled.View
            key="A"
            style={{ marginLeft: -100 }}
            initial={{ opacity: 0.5, x: 0 }}
            animate={{ opacity: 1, x: 100 }}
            exit={{ opacity: 0.1, x: 0, y: 20 }}
            transition={{
                default: {
                    type: 'spring',
                },
                opacity: {
                    type: 'timing',
                },
            }}
        />
    ) : null}
</AnimatePresence>
`,
        Component: ({ value }: Props) => (
            <View style={{ height: 150 }}>
                <AnimatePresence>
                    {value ? (
                        <Motion.View
                            key="A"
                            style={[styles.box, { marginLeft: -100 }]}
                            initial={{ opacity: 0.5, x: 0 }}
                            animate={{ opacity: 1, x: 100 }}
                            exit={{ opacity: 0.1, x: 0, y: 10 }}
                            transition={{
                                default: {
                                    type: 'spring',
                                    damping: 20,
                                    stiffness: 400,
                                },
                                opacity: {
                                    type: 'timing',
                                    duration: 300,
                                },
                            }}
                        />
                    ) : null}
                </AnimatePresence>
            </View>
        ),
    },
    Loop: {
        code: `
<Motion.View
    initial={{
        x: 0
    }}
    animate={{
        x: 100
    }}
    transition={{
        type: 'timing',
        duration: 1500,
        loop: -1
    }}
/>`,
        Component: ({ value }: Props) => (
            <Motion.View
                initial={{ x: 0 }}
                animate={{ x: 100 }}
                transition={{ type: 'timing', duration: 1500, loop: -1 }}
                style={styles.box}
            />
        ),
        disableValue: true,
    },
};

export default function App() {
    const [selected, setSelected] = useState<keyof typeof Examples>('Simple');
    const [value, setValue] = useState(0);

    useInterval(
        useCallback(() => {
            setValue((v) => (v === 0 ? 1 : 0));
        }, []),
        1800
    );

    const { code, Component, disableValue } = Examples[selected];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>{selected}</Text>
            </View>
            <View style={styles.main}>
                <Component value={value} />
                <Text style={styles.text}>{disableValue ? '' : `value: ${value}`}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <SyntaxHighlighter highlighter="prism" language="jsx">
                    {code}
                </SyntaxHighlighter>
            </View>
            <View style={styles.bottom}>
                {Object.keys(Examples).map((ex: keyof typeof Examples) => (
                    <TouchableHighlight key={ex} onPress={() => setSelected(ex)} underlayColor="#fafafa" style={styles.button}>
                        <Text style={[styles.buttonText, selected === ex && styles.buttonTextSelected]}>{ex}</Text>
                    </TouchableHighlight>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        alignItems: 'center',
    },
    topBarText: {
        fontWeight: 'bold',
        lineHeight: 40,
    },
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 190,
        maxHeight: 190,
    },
    bottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
    box: {
        backgroundColor: '#666768',
        width: 150,
        height: 150,
        borderRadius: 24,
        marginLeft: -100,
    },
    text: {
        marginTop: 16,
        fontSize: 16,
        minWidth: 68,
        color: '#0099dd',
        fontWeight: 'bold',
    },
    button: {
        height: 36,
        paddingHorizontal: 14,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#323334',
    },
    buttonTextSelected: {
        fontWeight: 'bold',
        color: '#09d',
    },
});



================================================
FILE: scripts/bootstrap.js
================================================
const os = require('os');
const path = require('path');
const child_process = require('child_process');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  encoding: 'utf-8',
};

if (os.type() === 'Windows_NT') {
  options.shell = true
}

let result;

if (process.cwd() !== root || args.length) {
  // We're not in the root of the project, or additional arguments were passed
  // In this case, forward the command to `yarn`
  result = child_process.spawnSync('yarn', args, options);
} else {
  // If `yarn` is run without arguments, perform bootstrap
  result = child_process.spawnSync('yarn', ['bootstrap'], options);
}

process.exitCode = result.status;



================================================
FILE: src/AnimatedComponents.ts
================================================
import { Animated } from 'react-native';
import { createMotionComponent } from './createMotionComponent';
import { MotionPressable } from './MotionPressable';

export namespace Motion {
    export const View = createMotionComponent(Animated.View);
    export const Text = createMotionComponent(Animated.Text);
    export const FlatList = createMotionComponent(Animated.FlatList);
    export const Image = createMotionComponent(Animated.Image);
    export const ScrollView = createMotionComponent(Animated.ScrollView);
    export const SectionList = createMotionComponent(Animated.SectionList);
    export const Pressable = MotionPressable;
}



================================================
FILE: src/AnimatePresence.tsx
================================================
import { arrayRemove, isString } from '@legendapp/tools';
import { useForceRender, usePrevious } from '@legendapp/tools/react';
import React, { Children, cloneElement, Key, ReactElement, ReactNode, useRef } from 'react';

interface Props {
    children: ReactNode;
}

function exitableByKey(children: ReactNode[]) {
    const map = new Map<Key, ReactElement>();
    Children.forEach(children, (child: ReactElement) => {
        if (child.key && child.props?.exit && isString(child.key)) {
            map.set(child.key, child);
        }
    });
    return map;
}

export function AnimatePresence({ children }: Props) {
    const fr = useForceRender();
    const childArr = Children.toArray(children);
    const childrenPrevious = usePrevious(childArr);

    // Map children and previous children to { key: child }
    const childrenByKey = exitableByKey(childArr);
    const childrenByKeyPrevious = usePrevious(childrenByKey);

    // Add newly exited elements to the exiting map
    const exiting = useRef(new Map<Key, ReactElement>());
    if (childrenByKeyPrevious) {
        childrenByKeyPrevious.forEach((prevChild, key) => {
            if (!childrenByKey.get(key)) {
                exiting.current.set(key, prevChild);
            }
        });
    }

    // Render exiting elements into the position they were previously
    let childrenToRender = [...childArr];
    exiting.current.forEach((child, key) => {
        if (childrenByKey.get(key)) {
            exiting.current.delete(key);
        } else {
            const index = childrenPrevious.indexOf(child);
            childrenToRender.splice(index, 0, child);
        }
    });

    return (
        <>
            {childrenToRender.map((child: ReactElement) => {
                if (child && child.props.exit) {
                    const key = child.key;
                    const animKeys = Object.keys(child.props.exit);
                    // Remove the child when all exit animations end
                    return key && exiting.current.get(key) && animKeys
                        ? cloneElement(child, {
                              animate: child.props.exit,
                              onAnimationComplete: (animKey) => {
                                  if (exiting.current.has(key)) {
                                      arrayRemove(animKeys, animKey);
                                      if (animKeys.length === 0) {
                                          exiting.current.delete(key);
                                          fr();
                                      }
                                  }
                              },
                          })
                        : child;
                }
                return child;
            })}
        </>
    );
}



================================================
FILE: src/configureMotion.ts
================================================
import type { MotionConfig } from './Interfaces';

export const config: MotionConfig = {
    timing: 'ms',
};

export const configureMotion = function configureMotion(configuration: MotionConfig) {
    Object.assign(config, configuration);
};



================================================
FILE: src/Constants.ts
================================================
export const DefaultTransitionTime = 300;



================================================
FILE: src/createMotionComponent.tsx
================================================
import { isArray, isNumber, isString } from '@legendapp/tools';
import React, { ComponentPropsWithRef, ComponentType, forwardRef, ReactElement, Ref, useContext, useMemo, useRef } from 'react';
import { Animated, Easing, StyleProp, TransformsStyle } from 'react-native';
import { config } from './configureMotion';
import { DefaultTransitionTime } from './Constants';
import type {
    ComponentStyle,
    EaseFunction,
    MotionComponentProps,
    MotionTransition,
    MotionTransitionTween,
    PropsTransforms,
    UnionToIntersection,
} from './Interfaces';
import { ContextPressable } from './MotionPressable';
import { useTransformOrigin } from './useTransformOrigin';

interface AnimInfo {
    animValue: Animated.Value;
    value: any;
    valueInterp?: number;
    interpolation?: any;
}

const TransformKeys: Record<keyof PropsTransforms, keyof UnionToIntersection<TransformsStyle['transform'][number]>> = {
    x: 'translateX',
    y: 'translateY',
    scale: 'scale',
    scaleX: 'scaleX',
    scaleY: 'scaleY',
    skewX: 'skewX',
    skewY: 'skewY',
    perspective: 'perspective',
    rotate: 'rotate',
    rotateX: 'rotateX',
    rotateY: 'rotateY',
    rotateZ: 'rotateZ',
    matrix: 'matrix',
};

const OtherNativeKeys = {
    opacity: 'opacity',
} as const;

const DefaultValues: Record<keyof PropsTransforms | keyof typeof OtherNativeKeys, any> = {
    x: 0,
    y: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    skewX: '0deg',
    skewY: '0deg',
    perspective: 0,
    rotate: '0deg',
    rotateX: '0deg',
    rotateY: '0deg',
    rotateZ: '0deg',
    matrix: [],
    opacity: 1,
};

const DefaultTransition: MotionTransition = { type: 'tween', duration: DefaultTransitionTime };
const Eases: Record<EaseFunction, (value: number) => number> = {
    linear: Easing.linear,
    easeIn: Easing.ease,
    easeInOut: Easing.inOut(Easing.ease),
    easeOut: Easing.out(Easing.ease),
    circIn: Easing.circle,
    circInOut: Easing.inOut(Easing.circle),
    circOut: Easing.out(Easing.circle),
    backIn: Easing.back(2),
    backInOut: Easing.inOut(Easing.back(2)),
    backOut: Easing.out(Easing.back(2)),
};

function addKeysToSet(...objs: Record<string, any>[]) {
    const set = new Set<string>();
    for (let i = 0; i < objs.length; i++) {
        const obj = objs[i];
        if (obj) {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                set.add(keys[i]);
            }
        }
    }
    return set;
}

export function createMotionComponent<T extends ComponentType<any>, TExtraProps = {}>(Component: Animated.AnimatedComponent<T> | T) {
    return forwardRef(function MotionComponent<TAnimate, TAnimateProps>(
        {
            animate,
            animateProps,
            initial,
            initialProps,
            exit,
            transition,
            transformOrigin,
            style: styleProp,
            onLayout: onLayoutProp,
            whileTap,
            whileHover,
            onAnimationComplete,
            ...rest
        }: Animated.AnimatedProps<ComponentPropsWithRef<T & TExtraProps>> &
            MotionComponentProps<T, ComponentStyle<T>, TAnimate, TAnimateProps>,
        // @ts-ignore
        ref: Ref<InstanceType<T>>
    ) {
        const refAnims = useRef<Partial<Record<string, AnimInfo>>>({});

        // Generate the arrays of keys and values for transitioning. These are used as deps of useMemo
        // so that it will update whenever a key or value changes.
        const animKeysSet = addKeysToSet(initial, animate, animateProps, whileTap, whileHover, exit);
        const values = Object.assign({}, animate);

        if (animateProps) {
            addKeysToSet(animKeysSet, animateProps);
            Object.assign(values, animateProps);
        }

        if (whileTap || whileHover) {
            const { pressed, hovered } = useContext(ContextPressable);

            if (whileHover) {
                addKeysToSet(animKeysSet, whileHover);
                if (hovered) {
                    Object.assign(values, whileHover);
                }
            }
            if (whileTap) {
                addKeysToSet(animKeysSet, whileTap);
                if (pressed) {
                    Object.assign(values, whileTap);
                }
            }
        }

        if (exit) {
            addKeysToSet(animKeysSet, exit);
        }

        const animKeys = [...animKeysSet];
        const animValues = animKeys.map((key) => values[key]);

        const update = () => {
            const anims = refAnims.current;

            const useNativeDriver = !animateProps && animKeys.every((key) => !!OtherNativeKeys[key] || !!TransformKeys[key]);

            for (let i = 0; i < animKeys.length; i++) {
                const key = animKeys[i];
                const isProp = animateProps?.[key] !== undefined;
                let value = values[key];
                const valueInitial = (isProp ? initialProps?.[key] : initial?.[key]) ?? value ?? DefaultValues[key];
                if (value === undefined) {
                    value = valueInitial ?? DefaultValues[key];
                }

                if (!anims[key] || anims[key].value !== value) {
                    const isStr = isString(valueInitial);
                    const isArr = isArray(valueInitial);

                    // If this is the first run or it's a new key, create the Animated.Value
                    if (!anims[key]) {
                        const startValue = isStr || isArr ? 1 : (valueInitial as number);
                        const animValue = new Animated.Value(startValue);
                        anims[key] = {
                            value: valueInitial,
                            animValue,
                            valueInterp: isStr ? 1 : undefined,
                        };
                    }

                    let toValue: number;
                    // If string or array it needs to interpolate, so toggle back and forth between 0 and 1,
                    // interpolating from current value to target value
                    if (isStr || isArr) {
                        const fromInterp = anims[key].valueInterp;
                        const from = anims[key].value;
                        anims[key].interpolation = anims[key].animValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: fromInterp === 1 ? [value, from] : [from, value],
                        });
                        anims[key].valueInterp = toValue = 1 - fromInterp;
                        anims[key].value = value;
                    } else {
                        anims[key].value = toValue = value as number;
                    }

                    // Get the transition for this key, the 'default' key, the root transition, or default transition if no transition prop
                    const transitionForKey: MotionTransition =
                        transition?.[key] || transition?.['default'] || transition || DefaultTransition;

                    if (
                        config.timing === 's' &&
                        transitionForKey !== DefaultTransition &&
                        isNumber((transitionForKey as MotionTransitionTween).duration)
                    ) {
                        (transitionForKey as MotionTransitionTween).duration *= 1000;
                    }

                    if (isString((transitionForKey as MotionTransitionTween).easing)) {
                        (transitionForKey as MotionTransitionTween).easing =
                            Eases[(transitionForKey as MotionTransitionTween).easing as unknown as EaseFunction];
                    }
                    if (isString((transitionForKey as MotionTransitionTween).ease)) {
                        (transitionForKey as MotionTransitionTween).ease =
                            Eases[(transitionForKey as MotionTransitionTween).ease as unknown as EaseFunction];
                    }

                    const animOptions = Object.assign(
                        {
                            toValue,
                            useNativeDriver,
                        },
                        transitionForKey
                    );

                    // This typeof check is to make it work when rendered server-side like in Next.js
                    if (typeof requestAnimationFrame !== 'undefined') {
                        requestAnimationFrame(() => {
                            const callback = onAnimationComplete ? () => onAnimationComplete(key) : undefined;
                            const { loop, type } = transitionForKey;

                            let animation: Animated.CompositeAnimation;

                            // Spring or timing based on the transition prop
                            if (type === 'spring') {
                                animation = Animated.spring(anims[key].animValue, animOptions);
                            } else {
                                animation = Animated.timing(anims[key].animValue, animOptions as Animated.TimingAnimationConfig);
                            }

                            // Loop based on the transition prop
                            if (loop !== undefined) {
                                animation = Animated.loop(animation, { iterations: loop });
                            }

                            animation.start(callback);
                        });
                    }
                }
            }
        };

        useMemo(update, animValues); // eslint-disable-line react-hooks/exhaustive-deps

        // Apply the animations to the style object
        const style: StyleProp<any> = {};
        const animProps = {};
        const transforms: { key: string; value: AnimInfo }[] = [];
        Object.entries(refAnims.current).forEach(([key, value]) => {
            if (animateProps?.[key] !== undefined) {
                animProps[key] = value.interpolation || value.animValue;
            } else if (TransformKeys[key]) {
                transforms.push({ key, value });
            } else {
                style[key] = value.interpolation || value.animValue;
            }
        });

        // Map the transforms into an Animated transforms array
        if (transforms.length) {
            style.transform = transforms.map(({ key, value }) => ({
                [TransformKeys[key]]: value.interpolation || value.animValue,
            }));
        }

        const onLayout = transformOrigin ? useTransformOrigin(transformOrigin, style.transform, onLayoutProp) : onLayoutProp;

        // @ts-ignore
        return <Component style={[styleProp, style]} onLayout={onLayout} {...rest} {...animProps} ref={ref} />;
    }) as <TAnimate, TAnimateProps>(
        p: Animated.AnimatedProps<ComponentPropsWithRef<T>> &
            TExtraProps &
            MotionComponentProps<T, ComponentStyle<T>, TAnimate, TAnimateProps>,
        // @ts-ignore
        ref: Ref<InstanceType<T>>
    ) => ReactElement;
}
export function createMotionAnimatedComponent<T extends ComponentType<any>>(component: T) {
    return createMotionComponent(Animated.createAnimatedComponent(component));
}



================================================
FILE: src/index.ts
================================================
export * from './AnimatedComponents';
export * from './createMotionComponent';
export * from './Interfaces';
export * from './AnimatePresence';
export { configureMotion } from './configureMotion';



================================================
FILE: src/Interfaces.ts
================================================
import type {
    ComponentClass,
    ComponentProps,
    ComponentType,
    FunctionComponent,
    JSXElementConstructor,
    PropsWithChildren,
    ReactNode,
} from 'react';
import type { ImageStyle, LayoutChangeEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ComponentStyle<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
    ComponentProps<T>['style'] extends StyleProp<infer P> ? P : ComponentProps<T>['style'];

export type StyledProps<P> = PropsWithChildren<
    P & {
        className?: string;
        inheritedClassName?: string;
        nthChild?: number;
        tw?: string;
        style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
    }
>;

export type EaseFunction =
    | 'linear'
    | 'easeIn'
    | 'easeOut'
    | 'easeInOut'
    | 'circIn'
    | 'circOut'
    | 'circInOut'
    | 'backIn'
    | 'backOut'
    | 'backInOut';

interface Loopable {
  loop?: number;
}

export interface MotionTransitionTween extends Loopable {
    type?: 'tween' | 'timing' | undefined;
    ease?: EaseFunction | ((value: number) => number) | undefined;
    easing?: EaseFunction | ((value: number) => number) | undefined;
    duration: number | undefined;
    delay?: number | undefined;
}
export interface MotionTransitionSpring extends Loopable {
    type: 'spring';
    friction?: number;
    tension?: number;
    speed?: number;
    bounciness?: number;
    stiffness?: number;
    damping?: number;
    mass?: number;
    overshootClamping?: boolean | undefined;
    restDisplacementThreshold?: number | undefined;
    restSpeedThreshold?: number | undefined;
    velocity?: number | { x: number; y: number } | undefined;
}

export type MotionTransition = MotionTransitionTween | MotionTransitionSpring;

export type MotionTransitionRecord<T> = {
    [key in keyof T]: MotionTransition;
};
export type TransformOrigin = `${number}%` | number | `${number}px`;

export interface MotionComponentProps<
    T extends ComponentType<any>,
    TStyle extends ComponentStyle<T>,
    TAnimate,
    TAnimateProps,
    TExtraProps = unknown
> {
    style?: ComponentProps<T>['style'];
    animate?: TAnimate | TStyle | PropsTransforms;
    animateProps?: TAnimateProps | (Omit<ComponentProps<T>, 'style'> & TExtraProps);
    initial?: TStyle | PropsTransforms;
    initialProps?: Omit<ComponentProps<T>, 'style'> & TExtraProps;
    transition?: MotionTransition | MotionTransitionRecord<TAnimate | (TAnimateProps & TExtraProps) | { default: '' }>;
    children?: ReactNode;
    onLayout?: (event: LayoutChangeEvent) => void;
    transformOrigin?: { x?: TransformOrigin; y?: TransformOrigin };
    whileTap?: TAnimate | TStyle | PropsTransforms;
    whileHover?: TAnimate | TStyle | PropsTransforms;
    exit?: TAnimate | TStyle | PropsTransforms;
    onAnimationComplete?: (key: string) => void;
}
export interface PropsTransforms {
    x?: number;
    y?: number;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    skewX?: `${number}deg` | `${number}rad`;
    skewY?: `${number}deg` | `${number}rad`;
    perspective?: number;
    rotate?: `${number}deg` | `${number}rad`;
    rotateX?: `${number}deg` | `${number}rad`;
    rotateY?: `${number}deg` | `${number}rad`;
    rotateZ?: `${number}deg` | `${number}rad`;
    matrix?: number[];
}
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
declare type Component<P> = string | FunctionComponent<P> | ComponentClass<P>;
export interface MotionConfig {
    timing?: 'ms' | 's';
    styled?: <P>(Component: Component<P>) => FunctionComponent<StyledProps<P>>;
}



================================================
FILE: src/linear-gradient-expo.ts
================================================
import { LinearGradient } from 'expo-linear-gradient';
import { setLinearGradientComponent } from './LinearGradient';
setLinearGradientComponent(LinearGradient);

export type { LinearGradientPoint, LinearGradientProps } from './LinearGradient';
export { MotionLinearGradient } from './LinearGradient';



================================================
FILE: src/linear-gradient.ts
================================================
import LinearGradient from 'react-native-linear-gradient';
import { setLinearGradientComponent } from './LinearGradient';
setLinearGradientComponent(LinearGradient);

export { MotionLinearGradient, LinearGradientPoint, LinearGradientProps } from './LinearGradient';



================================================
FILE: src/LinearGradient.tsx
================================================
import { isArray } from '@legendapp/tools';
import { MemoFnComponent } from '@legendapp/tools/react';
import React, { Component, ComponentClass } from 'react';
import type { ViewProps, ViewStyle } from 'react-native';
import { createMotionAnimatedComponent } from './createMotionComponent';
import type { MotionComponentProps } from './Interfaces';

export type LinearGradientPoint = {
    x: number;
    y: number;
};

export type LinearGradientProps = ViewProps & {
    colors?: string[];
    locations?: number[] | null;
    start?: LinearGradientPoint | null;
    end?: LinearGradientPoint | null;
};

let LinearGradient;

function setLinearGradientComponent(linearGradient) {
    LinearGradient = linearGradient;
}

type PropsGradient = Omit<LinearGradientProps, 'colors'> & {
    numColors?: number;
    startX?: number;
    startY?: number;
    endX?: number;
    endY?: number;
};

class GradientHelper extends Component<PropsGradient> {
    render() {
        const { numColors, startX, startY, endX, endY, ...rest } = this.props;

        // Combine startX, startY, endX, endY back into start,end
        let start;
        if (startX !== undefined || startY !== undefined) {
            start = {
                x: startX,
                y: startY,
            };
        }
        let end;
        if (endX !== undefined || endY !== undefined) {
            end = {
                x: endX,
                y: endY,
            };
        }

        // Combine individual color props back into a colors array
        const colors: string[] = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(rest['color' + i]);
            delete rest['color' + i];
        }

        return <LinearGradient colors={colors} start={start} end={end} {...rest} />;
    }
}

const AnimatedGradientHelper = createMotionAnimatedComponent(GradientHelper);

function pointToXY(props: PropsGradient, point: LinearGradientPoint, name: string) {
    if (point) {
        props[name + 'X'] = isArray(point) ? point[0] : point.x;
        props[name + 'Y'] = isArray(point) ? point[1] : point.y;
    }
}

// Create MotionLinearGradient with the same API as other Motion components, but it's more complicated because it needs to
// transform to a different set of props into the AnimatedGradientHelper.
const MotionLinearGradient = MemoFnComponent(function <
    TAnimate,
    TAnimateProps extends Partial<Omit<LinearGradientProps, 'locations' | 'style'>>
>(
    props: MotionComponentProps<
        ComponentClass<Omit<LinearGradientProps, 'locations'>>,
        ViewStyle,
        TAnimate,
        TAnimateProps,
        Omit<LinearGradientProps, 'locations' | 'style'>
    > &
        LinearGradientProps
) {
    const { colors, animateProps, start, end, initialProps, ...propsOut } = props;
    const { colors: colorsAnimate, start: startAnimate, end: endAnimate, ...animatePropsOut } = animateProps as LinearGradientProps;

    // Split colors array out into individual props so they can be animated
    colors?.forEach((color, i) => (propsOut['color' + i] = color));
    colorsAnimate?.forEach((color, i) => (animatePropsOut['color' + i] = color));

    // Split start/end objects out into individual props so they can be animated
    pointToXY(propsOut, start, 'start');
    pointToXY(propsOut, end, 'end');

    pointToXY(animatePropsOut, startAnimate, 'start');
    pointToXY(animatePropsOut, endAnimate, 'end');

    let numColors = colors?.length || colorsAnimate?.length || 0;

    // Split initialProps too if it exists
    const initialPropsOut: Partial<LinearGradientProps> = {};
    if (initialProps) {
        const { colors: colorsInitial, start: startInitial, end: endInitial } = animateProps as LinearGradientProps;
        colorsInitial?.forEach((color, i) => (initialPropsOut['color' + i] = color));
        pointToXY(initialPropsOut, startInitial, 'start');
        pointToXY(initialPropsOut, endInitial, 'end');

        if (colorsInitial) {
            numColors = colorsInitial.length;
        }
    }

    // @ts-ignore Ignore this because it won't conform to the customized props
    return <AnimatedGradientHelper numColors={numColors} {...propsOut} initialProps={initialPropsOut} animateProps={animatePropsOut} />;
});

export { setLinearGradientComponent, MotionLinearGradient };



================================================
FILE: src/MotionPressable.tsx
================================================
import React, { createContext, useCallback, useState } from 'react';
import { Platform, Pressable, PressableProps } from 'react-native';

export const ContextPressable = createContext({ pressed: false, hovered: false });

export function MotionPressable(props: PressableProps) {
    // @ts-ignore Web props cause errors
    const { onPressIn, onPressOut, onMouseEnter, onMouseLeave, children, ...rest } = props;

    const [state, setState] = useState({ pressed: false, hovered: false });

    const update = useCallback((pressed: boolean, hovered: boolean) => {
        setState((cur) => ({
            pressed: pressed ?? cur.pressed,
            hovered: hovered ?? cur.hovered,
        }));
    }, []);

    return (
        <Pressable
            onPressIn={(e) => {
                update(true, undefined);
                onPressIn?.(e);
            }}
            onPressOut={(e) => {
                update(false, undefined);
                onPressOut?.(e);
            }}
            // @ts-ignore
            onMouseEnter={
                Platform.OS === 'web'
                    ? (e) => {
                          update(undefined, true);
                          onMouseEnter?.(e);
                      }
                    : undefined
            }
            // @ts-ignore
            onMouseLeave={
                Platform.OS === 'web'
                    ? (e) => {
                          update(undefined, false);
                          onMouseLeave?.(e);
                      }
                    : undefined
            }
            {...rest}
        >
            <ContextPressable.Provider value={state}>{children}</ContextPressable.Provider>
        </Pressable>
    );
}



================================================
FILE: src/styled.ts
================================================
import {
    Animated,
    FlatList as RNFlatList,
    Image as RNImage,
    PressableProps,
    ScrollView as RNScrollView,
    SectionList as RNSectionList,
    Text as RNText,
    View as RNView,
} from 'react-native';
import { MotionPressable } from './MotionPressable';
// @ts-ignore This was there in v2 but not in v4
import { styled } from 'nativewind';
import { createMotionComponent } from './createMotionComponent';

export declare type StyledProps = {
    className?: string;
    tw?: string;
    baseClassName?: string;
    baseTw?: string;
};

export namespace Motion {
    export const View = createMotionComponent<typeof RNView, StyledProps>(styled(Animated.View));
    export const Text = createMotionComponent<typeof RNText, StyledProps>(styled(Animated.Text));
    export const FlatList = createMotionComponent<typeof RNFlatList, StyledProps>(
        styled(Animated.FlatList) as unknown as typeof RNFlatList
    );
    export const Image = createMotionComponent<typeof RNImage, StyledProps>(styled(Animated.Image));
    export const ScrollView = createMotionComponent<typeof RNScrollView, StyledProps>(styled(Animated.ScrollView));
    export const SectionList = createMotionComponent<typeof RNSectionList, StyledProps>(
        styled(Animated.SectionList) as unknown as typeof RNSectionList
    );
    export const Pressable = styled(MotionPressable) as (props: PressableProps & StyledProps) => JSX.Element;
}



================================================
FILE: src/svg.ts
================================================
import * as RNSvg from 'react-native-svg';
import { createMotionAnimatedComponent } from './createMotionComponent';

export namespace MotionSvg {
    export const Svg = createMotionAnimatedComponent(RNSvg.Svg);
    export const Polygon = createMotionAnimatedComponent(RNSvg.Polygon);
    export const Rect = createMotionAnimatedComponent(RNSvg.Rect);
    export const Circle = createMotionAnimatedComponent(RNSvg.Circle);
    export const Ellipse = createMotionAnimatedComponent(RNSvg.Ellipse);
    export const Line = createMotionAnimatedComponent(RNSvg.Line);
    export const Polyline = createMotionAnimatedComponent(RNSvg.Polyline);
    export const Path = createMotionAnimatedComponent(RNSvg.Path);
    export const Text = createMotionAnimatedComponent(RNSvg.Text);
    export const TSpan = createMotionAnimatedComponent(RNSvg.TSpan);
    export const TextPath = createMotionAnimatedComponent(RNSvg.TextPath);
    export const G = createMotionAnimatedComponent(RNSvg.G);
    export const ClipPath = createMotionAnimatedComponent(RNSvg.ClipPath);
    export const LinearGradient = createMotionAnimatedComponent(RNSvg.LinearGradient);
    export const RadialGradient = createMotionAnimatedComponent(RNSvg.RadialGradient);
}



================================================
FILE: src/useTransformOrigin.ts
================================================
/* eslint-disable react-hooks/rules-of-hooks */
import { isString } from '@legendapp/tools';
import { useEverHadValue } from '@legendapp/tools/react';
import { useCallback, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import type { TransformOrigin } from './Interfaces';

function computeOrigin(val: TransformOrigin, size: number) {
    const isStr = isString(val);
    const isPerc = isStr && (val as string).endsWith('%');
    // Chop off a % or px
    let num = isStr ? +(val as string).replace(/%|px/, '') : val;
    // Divide by 100 for percent or by view size if pixels
    const perc = isPerc ? +num / 100 : +num / size;
    // Offset by half of the size
    if (!isNaN(perc)) {
        num = (perc - 0.5) * size;
    } else {
        // Fallback to no origin
        num = 0;
    }

    return num;
}

export const useTransformOrigin = function useTransformOrigin(
    transformOrigin: { x?: TransformOrigin; y?: TransformOrigin },
    transform: any[],
    onLayoutProp: (e: LayoutChangeEvent) => void
) {
    let onLayout = onLayoutProp;
    let needsLayoutX = false;
    let needsLayoutY = false;

    // Compute whether x and y need layout based on input
    if (transformOrigin) {
        let { x, y } = transformOrigin;
        needsLayoutX = x !== undefined && x !== '50%';
        needsLayoutY = y !== undefined && y !== '50%';
    }

    // Compute whether we ever needed layout so we don't remove a hook if the origin is removed
    const everDidLayout = useEverHadValue(!!transformOrigin, true);

    if (everDidLayout) {
        const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
        onLayout = useCallback(
            (e: LayoutChangeEvent) => {
                setSize(e.nativeEvent.layout);
                onLayoutProp?.(e);
            },
            [onLayoutProp]
        );

        if (transformOrigin && transform) {
            let { x, y } = transformOrigin;

            // Compute x and y origins
            x = needsLayoutX ? computeOrigin(x, size.width) : 0;
            y = needsLayoutY ? computeOrigin(y, size.height) : 0;

            // First move the center of the view to the origin
            transform.splice(0, 0, {
                translateY: y,
            });
            transform.splice(0, 0, {
                translateX: x,
            });

            // Restore it back the the original position after transforming
            transform.push({
                translateX: -x,
            });
            transform.push({
                translateY: -y,
            });
        }
    }

    return onLayout;
};



================================================
FILE: src/__tests__/index.test.tsx
================================================
it.todo('write a test');



================================================
FILE: .husky/commit-msg
================================================
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn commitlint -E HUSKY_GIT_PARAMS



================================================
FILE: .husky/pre-commit
================================================
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint && yarn typescript



================================================
FILE: .husky/.npmignore
================================================
_
