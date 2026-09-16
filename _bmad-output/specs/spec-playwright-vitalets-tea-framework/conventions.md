# Framework Conventions & Architectural Guidelines

## 1. SOLID Principles Implementation

* **Single Responsibility Principle (SRP):**
  * Los step definitions (`steps/*.ts`) son **únicamente orquestadores** que llaman a métodos de fixtures y aserciones; no contienen selectores ni llamadas de red directas.
  * Cada Component Object (`domain/components/*.ts`) modela una sección o componente visual atómico (ej: `NavigationHeaderComponent`, `LoginFormDialog`, `ProductGridComponent`).
  * Cada Service (`domain/services/*.ts`) maneja un dominio de API específico (ej: `AuthApiService`, `CartApiService`).

* **Dependency Inversion Principle (DIP):**
  * El runner de Playwright (`test.extend<{ ... }>()`) es el único contenedor de inversión de dependencias.
  * Los steps reciben sus dependencias listas en sus argumentos de fixture sin usar `new` manualmente ni contenedores IoC externos.

* **Open/Closed Principle (OCP):**
  * Componentes base extensibles para componentes UI reutilizables (tablas, modales, formularios) sin modificar el código core.

## 2. Metodología TEA (Test Engineering Architecture)

* **Patrón Network-First:**
  * Toda preparación de estado para un escenario (`Given`) se realiza mediante llamadas directas a la API del backend a través de `request` o `domain/services/`.
  * La navegación e interacción visual (`page.goto()`, `click()`) se reserva exclusivamente para los pasos de acción bajo prueba (`When`).

* **Gobernanza de Tags y Quality Gates:**
  * `@P0`: Pruebas de humo críticas. Suite de ejecución ultrarrápida para PR Gate (< 3 minutos).
  * `@P1`: Flujos de negocio esenciales. Ejecución pre-merge o pre-release.
  * `@P2`: Casos de borde, variaciones y flujos secundarios. Ejecución en pipelines nocturnos (*nightly*).
  * `@story:US-XXX`: Trazabilidad directa a historias de usuario de BMAD.
  * `@nfr:performance|security`: Pruebas asociadas a requerimientos no funcionales.

## 3. Resiliencia de Selectores y Aserciones (Cero Flakiness)

* **Prioridad de Localizadores:**
  1. `page.getByRole('button', { name: 'Guardar' })`
  2. `page.getByLabel('Correo electrónico')`
  3. `page.getByPlaceholder('Buscar...')`
  4. `page.getByText('Bienvenido')`
  5. `page.getByTestId('checkout-submit')` (fallback acordado)
  * ❌ *Prohibido:* Selectores CSS estructurales (`div.main > div:nth-child(2)`) y XPaths frágiles.

* **Aserciones Web-First Obligatorias:**
  * ✅ `await expect(component.submitButton).toBeVisible()`
  * ✅ `await expect(component.statusBadge).toHaveText('Completado')`
  * ❌ *Prohibido:* `expect(await component.isButtonVisible()).toBe(true)` (evaluación síncrona sin auto-retry).

* **Prohibición de Hard-Waits:**
  * ❌ *Prohibido:* `page.waitForTimeout()` o `setTimeout()`.
  * ✅ *Permitido:* Esperas explícitas de estado (`page.waitForResponse()`, `page.waitForURL()`, `expect(locator)...`).

## 4. Estructura de Directorios

```text
tests/
├── features/               # Archivos Gherkin .feature organizados por dominio
│   ├── authentication/
│   └── checkout/
├── steps/                  # Step definitions organizados por contexto
│   ├── auth.steps.ts
│   └── checkout.steps.ts
├── fixtures/               # Inyección de dependencias con test.extend
│   ├── index.ts            # Fixture unificado (createBdd)
│   ├── ui.fixtures.ts
│   └── api.fixtures.ts
├── domain/
│   ├── components/         # UI Component Objects (SRP)
│   └── services/           # Clientes API para Network-First
└── support/
    ├── context/            # ScenarioContext tipado por test
    └── config/             # Configuración de entornos y credenciales
```
