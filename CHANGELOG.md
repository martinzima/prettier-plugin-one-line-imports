### CHANGELOG

## [1.0.3] - 2026-02-17
- fixed ESM runtime error by replacing `require('prettier/package.json')` with Prettier's exported `version` in the Prettier >= 3 compatibility check (fixes #5 and #6)

## [1.0.2] - 2026-01-06
- fixed prettier version compatibility issues by not bundling it with rolldown (marked as external) - fixes issue #3

## [1.0.1] - 2025-10-14
- fixed wrong extension index.mjs in package.json exports

## [1.0.0] - 2025-06-23
-initial version