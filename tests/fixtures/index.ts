import { test as base, createBdd } from 'playwright-bdd';
import { TodoAppComponent } from '../domain/components/todos/todo-app.component';
import { HeaderComponent } from '../domain/components/navigation/header.component';
import { AuthApiService } from '../domain/services/auth-api.service';
import { ScenarioContext } from '../support/context/scenario-context';

/**
 * AppFixtures - Definición de fixtures nativos de Playwright (Contenedor DIP).
 */
export interface AppFixtures {
  scenarioContext: ScenarioContext;
  todoApp: TodoAppComponent;
  headerComponent: HeaderComponent;
  authApi: AuthApiService;
}

export const test = base.extend<AppFixtures>({
  scenarioContext: async ({}, use) => {
    const context = new ScenarioContext();
    await use(context);
  },
  todoApp: async ({ page }, use) => {
    const component = new TodoAppComponent(page);
    await use(component);
  },
  headerComponent: async ({ page }, use) => {
    const component = new HeaderComponent(page);
    await use(component);
  },
  authApi: async ({ request }, use) => {
    const service = new AuthApiService(request);
    await use(service);
  },
});

export const { Given, When, Then, Step } = createBdd(test);
export { expect } from '@playwright/test';
