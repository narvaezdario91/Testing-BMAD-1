# Forged Idea: Framework Playwright BDD (vitalets) + SOLID + TEA

## Decisiones Clave (Locked)

* **Inyección de Dependencias y Abstracción (DIP / SRP):**
  * Se usa el sistema nativo de fixtures de Playwright (`test.extend<{ ... }>()`) de `playwright-bdd` como motor de inyección de dependencias (DIP).
  * La lógica de interacción se divide en Component/Domain Objects granulares con responsabilidad única (SRP), eliminando los Page Objects monolíticos heredados de Selenium.

* **Gestión de Estado y Datos (Scenario Context & Network-First):**
  * Fixture `scenarioContext` fuertemente tipado en TypeScript con ciclo de vida por test (`scope: 'test'`), garantizando aislamiento total entre workers paralelos.
  * Estrategia TEA *Network-First*: Los pasos de preparación (`Given`) utilizan la API nativa (`request` context de Playwright) para crear estado en milisegundos, reservando la UI para la interacción real bajo prueba (`When`).

* **Estructura Modular y Gobernanza de Tags TEA:**
  * Estructura por capas: `tests/features/` (Gherkin), `tests/steps/` (orquestadores delgados), `tests/fixtures/` (DI container), `tests/domain/components/` (UI actions), `tests/domain/services/` (API clients), `tests/support/` (contexto y configuración).
  * Gobernanza de Quality Gates con Tags TEA: `@P0` (Smoke / PR Gate < 3 min), `@P1` (Regresión crítica / Pre-merge), `@P2` (Flujos extendidos / Nightly), combinados con `@story:US-XXX` y `@nfr:XXX`.

* **Resiliencia de Localizadores y Aserciones (Cero Flakiness):**
  * Locators centrados en accesibilidad (`getByRole`, `getByLabel`, `getByText`, `getByTestId`). Prohibidos los selectores CSS y XPaths estructurales frágiles.
  * Web-First Assertions exclusivas (`await expect(locator)...`) con auto-waiting nativo. Prohibidas las evaluaciones booleanas estáticas (`expect(await ...).toBeTruthy()`).
  * Cero `waitForTimeout()` o `sleep` arbitrarios.
  * Diagnóstico completo: Trazas automáticas con `retain-on-failure`, screenshots y video en fallos en CI.

* **Integración TEA y Scripts de Automatización:**
  * Scripts NPM estandarizados: `bdd:gen`, `test:p0`, `test:p1`, `test:all`, `test:ui`.
  * Generación y exportación de reportes hacia `_bmad-output/test-artifacts/` para integración directa con `bmad-testarch-trace` (Matriz de Trazabilidad) y `bmad-testarch-atdd` (desarrollo guiado por pruebas de aceptación).

---

## Opciones Rechazadas y Motivos

* **Screenplay Pattern clásico (Actors, Abilities, Tasks):**
  * *Rechazado:* Añade excesiva ceremonia y niveles de abstracción innecesarios que chocan con la inyección nativa de `playwright-bdd`.
* **Page Object Model monolítico tradicional:**
  * *Rechazado:* Fomenta clases gigantescas (violación de SRP) e instanciación manual (`new Page()`) que rompe el ciclo de vida de fixtures.
* **World / State Bag genérico sin tipar (estilo Cucumber clásico):**
  * *Rechazado:* Provoca pérdida de autocompletado en TypeScript, bugs en tiempo de ejecución y riesgo de fugas de estado entre workers.
* **Wrappers customizados con pausas fijas (`waitForTimeout`):**
  * *Rechazado:* Anula el auto-waiting y auto-retry nativo de Playwright, siendo la causa principal de tests inestables (flaky).
