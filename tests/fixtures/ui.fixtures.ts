import { test as base } from 'playwright-bdd';
import { TodoAppComponent } from '../domain/components/todos/todo-app.component';
import { HeaderComponent } from '../domain/components/navigation/header.component';

export interface UiFixtures {
  todoApp: TodoAppComponent;
  headerComponent: HeaderComponent;
}

export const uiFixtures = base.extend<UiFixtures>({
  todoApp: async ({ page }, use) => {
    const todoApp = new TodoAppComponent(page);
    await use(todoApp);
  },
  headerComponent: async ({ page }, use) => {
    const headerComponent = new HeaderComponent(page);
    await use(headerComponent);
  },
});
