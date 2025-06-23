# prettier-plugin-one-line-imports

[![npm version](https://img.shields.io/npm/v/prettier-plugin-one-line-imports.svg)](https://www.npmjs.com/package/prettier-plugin-one-line-imports)
[![npm downloads](https://img.shields.io/npm/dm/prettier-plugin-one-line-imports.svg)](https://www.npmjs.com/package/prettier-plugin-one-line-imports)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> A Prettier plugin that **forces TypeScript imports to stay on one line** - and get rid of these ugly multi-line statements spanning half your screen.

## 💡 Motivation

Prettier authors consistently keep ignoring community feedback about the impracticality of multi-line imports that Prettier is forcing on everybody and are even adamant that Prettier should not offer any options to configure this behavior.

See this age-old Github issue from 2019:

 💬 [Don’t multi-line imports (let them take less space) / Conflict with VSCode’s organizeImports](https://github.com/prettier/prettier/issues/5995)

## 📸 Showcase

### Before (Default Prettier Behavior)
```typescript
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from "react";
import type {
  ComponentProps,
  FC,
  ReactElement
} from "react";
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById
} from "@/api/users";
```

### After (With This Plugin)
```typescript
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { ComponentProps, FC, ReactElement } from "react";
import { createUser, updateUser, deleteUser, getUserById } from "@/api/users";
```

## 🚀 Installation

```bash
# npm
npm install --save-dev prettier-plugin-one-line-imports

# yarn
yarn add prettier-plugin-one-line-imports --dev

# pnpm
pnpm add -D prettier-plugin-one-line-imports
```

## ⚙️ Configuration

Add the plugin to your Prettier configuration:

### Option 1: `package.json`
```json
{
  "prettier": {
    "plugins": ["prettier-plugin-one-line-imports"]
  }
}
```

### Option 2: `.prettierrc`
```json
{
  "plugins": ["prettier-plugin-one-line-imports"]
}
```

### Option 3: `.prettierrc.js`
```javascript
module.exports = {
  plugins: ['prettier-plugin-one-line-imports']
};
```

## 💡 Comment Preservation

The plugin intentionally ignores import statements with comments inside like this:

```typescript
// This stays multi-line because of comments
import {
  // React state management
  useState,
  // Side effects
  useEffect,
  useCallback, // memoized callback
  useMemo,
  useRef // mutable ref
} from "react";
```

## 🛠️ Requirements

- **Prettier**: Version 3.0.0 or higher

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.