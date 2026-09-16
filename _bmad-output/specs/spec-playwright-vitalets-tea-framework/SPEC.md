---
id: SPEC-playwright-vitalets-tea-framework
companions:
  - stack.md
  - conventions.md
  - architecture-diagrams.md
sources:
  - _bmad-output/forge/playwright-vitalets-tea-framework/forged-idea.md
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate. Source documents listed in frontmatter are for traceability — consult them only if you need narrative rationale or prose color this contract intentionally omits.

# Framework de Automatización Playwright BDD (vitalets) + SOLID + TEA

## Why

Los equipos de ingeniería necesitan alinear la lógica de negocio con las pruebas automatizadas mediante BDD (Gherkin) sin pagar el costo habitual de lentitud, fragilidad y sobre-ingeniería de los frameworks BDD tradicionales. Este framework resuelve esa fricción combinando `playwright-bdd` (vitalets) con la potencia nativa de `@playwright/test` (paralelismo real por workers, tracing y auto-waiting), aplicando principios SOLID (DIP mediante fixtures nativos y SRP en Component Objects atómicos) e integrándose directamente con la metodología TEA de BMAD para gobernar Quality Gates y trazabilidad de extremo a extremo.

## Capabilities

- **CAP-1**
  - **intent:** Los ingenieros de QA y desarrolladores pueden redactar escenarios de prueba en lenguaje Gherkin (`.feature`) y ejecutarlos de forma nativa a través del motor `@playwright/test` mediante compilación `playwright-bdd`.
  - **success:** La ejecución de `npm run bdd:gen` compila los archivos `.feature` en suites de Playwright ejecutables en paralelo por múltiples workers sin colisiones.

- **CAP-2**
  - **intent:** El framework inyecta dependencias automáticamente en los step definitions mediante fixtures nativos de Playwright (`test.extend`), manteniendo componentes desacoplados bajo principios SOLID (DIP y SRP).
  - **success:** Los step definitions consumen componentes de UI y servicios API directamente como parámetros de fixture sin requerir instanciación manual (`new Component()`) ni dependencias globales.

- **CAP-3**
  - **intent:** Los steps pueden transferir datos de forma tipada y segura entre `Given`, `When` y `Then` mediante un contexto de escenario aislado por worker.
  - **success:** La entidad generada en un paso `Given` o `When` es accesible y fuertemente tipada en TypeScript en el paso `Then` dentro del mismo escenario, sin compartir memoria entre tests paralelos.

- **CAP-4**
  - **intent:** Los steps de precondición (`Given`) preparan el estado de las pruebas a través de la API nativa de Playwright (*Network-First*), acelerando drásticamente el tiempo de ejecución.
  - **success:** Un escenario con precondiciones complejas inicializa sus datos en < 100ms vía llamadas API (`request` context), reservando la navegación UI únicamente para el flujo de acción bajo prueba (`When`).

- **CAP-5**
  - **intent:** El framework clasifica y filtra suites de pruebas mediante Tags de confianza TEA (`@P0`, `@P1`, `@P2`, `@story`, `@nfr`) para gobernar los Quality Gates en CI/CD.
  - **success:** Los comandos `npm run test:p0` y `npm run test:p1` ejecutan quirúrgicamente los subconjuntos de pruebas correspondientes a PR Gate (< 3 min) y regresión crítica respectivamente.

- **CAP-6**
  - **intent:** Las pruebas interactúan con la interfaz mediante localizadores accesibles y aserciones Web-First automáticas, eliminando el flakiness y capturando diagnósticos en fallos.
  - **success:** Ningún test utiliza esperas fijas (`waitForTimeout`) ni selectores CSS/XPath frágiles; ante cualquier fallo, Playwright genera automáticamente trazas (`trace.zip`), captura de pantalla y video.

- **CAP-7**
  - **intent:** Los resultados de las pruebas se exportan en formatos estándar a `_bmad-output/test-artifacts/` para alimentar la matriz de trazabilidad y auditoría de calidad de BMAD TEA.
  - **success:** Una corrida de pruebas genera artefactos compatibles que `bmad-testarch-trace` y `bmad-testarch-test-review` pueden procesar para dictaminar la aprobación de la entrega.

## Constraints

- Estricto uso de `vitalets/playwright-bdd` para la integración BDD sobre `@playwright/test` nativo en TypeScript.
- Prohibido el uso de Page Objects monolíticos tradicionales; la interacción UI debe encapsularse en Component/Domain Objects granulares con responsabilidad única (SRP).
- Prohibido el uso de `page.waitForTimeout()` o pausas fijas en cualquier capa del framework.
- Tipado estricto en TypeScript con `strict: true`.
- Los artefactos de prueba deben almacenarse en la ruta estándar de BMAD (`_bmad-output/test-artifacts/`).

## Non-goals

- No se implementará el patrón Screenplay (Actors, Tasks, Abilities) debido a su sobrecarga de ceremonia y fricción con los fixtures nativos de Playwright.
- No se dará soporte a frameworks alternativos (Cypress, Selenium, WebdriverIO) dentro de esta arquitectura.
- No se implementarán wrappers genéricos o helpers de clicks manuales que anulen el auto-waiting de Playwright.

## Success signal

- El comando `npm run test:p0` ejecuta una suite de prueba BDD de humo en menos de 180 segundos en CI a través de workers paralelos, reportando resultados y trazas enriquecidas directamente en `_bmad-output/test-artifacts/` con cero falsos positivos (flaky tests).
