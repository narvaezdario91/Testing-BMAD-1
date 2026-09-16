# Tests Architecture & Developer Guide

## 📁 Layout de Directorios

* `tests/features/`: Archivos Gherkin (`.feature`) agrupados por dominio de negocio. Contienen las etiquetas TEA (`@P0`, `@P1`, `@story:US-XXX`).
* `tests/steps/`: Step Definitions delgados que delegan directamente en fixtures y componentes.
* `tests/fixtures/`: Contenedor de Inversión de Dependencias (DIP) de Playwright (`test.extend`).
* `tests/domain/components/`: Component Objects atómicos con responsabilidad única (SRP), utilizando localizadores de accesibilidad y aserciones Web-First.
* `tests/domain/services/`: Clientes API para inicialización rápida de precondiciones (*Network-First*).
* `tests/support/context/`: `ScenarioContext` tipado para aislamiento por worker de Playwright.
* `tests/support/factories/`: Generación de datos sintéticos con `@faker-js/faker`.

## 🧪 Ejecución de Pruebas

```bash
# Compilar BDD y ejecutar todas las pruebas
npm test

# Ejecutar suite de humo / PR Gate (@P0)
npm run test:p0

# Ejecutar suite de regresión crítica (@P0 y @P1)
npm run test:p1

# Abrir Playwright UI interactivo
npm run test:ui

# Ver reporte HTML
npm run test:report
```

## 🛡️ Buenas Prácticas y Reglas TEA

1. **Locators Accesibles:** Usar siempre `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText` o `getByTestId`.
2. **Web-First Assertions:** Utilizar `await expect(locator).toBeVisible()` con auto-retry nativo.
3. **Cero Hard Waits:** Prohibido el uso de `page.waitForTimeout()` o `sleep`.
4. **Network-First:** Realizar el setup de datos en los `Given` mediante API para mantener las pruebas rápidas y estables.
