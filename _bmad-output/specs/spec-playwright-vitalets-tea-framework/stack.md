# Technology Stack & Tooling

## Core Dependencies

* **Language / Runtime:** TypeScript 5.x / Node.js 20+ LTS
* **Test Runner:** `@playwright/test` (última versión estable)
* **BDD Compiler & Integration:** `playwright-bdd` (de *vitalets* / Vitaliy Potapov)
* **Linter & Formatter:** ESLint + Prettier con reglas estrictas de Playwright (`eslint-plugin-playwright`)

## Project Scripts Specification (`package.json`)

```json
{
  "scripts": {
    "bdd:gen": "bddgen",
    "test": "bddgen && playwright test",
    "test:p0": "bddgen && playwright test --grep \"@P0\"",
    "test:p1": "bddgen && playwright test --grep \"@P0|@P1\"",
    "test:all": "bddgen && playwright test",
    "test:ui": "bddgen && playwright test --ui",
    "test:report": "playwright show-report _bmad-output/test-artifacts/playwright-report"
  }
}
```

## Configuration Files

* `playwright.config.ts`: Configuración principal de Playwright (`defineBddConfig`, proyectos de navegadores, paralelismo, reporters).
* `tsconfig.json`: Configuración de TypeScript con `strict: true` y paths mapeados (`@components/*`, `@services/*`, `@fixtures/*`, `@support/*`).
* `_bmad/tea/config.yaml`: Integración con variables y rutas de BMAD TEA.
