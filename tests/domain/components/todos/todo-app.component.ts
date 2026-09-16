import { Page, Locator, expect } from '@playwright/test';

/**
 * TodoAppComponent - Component Object modular para la aplicación TodoMVC.
 * Encapsula interacciones accesibles y aserciones Web-First.
 */
export class TodoAppComponent {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoCount = page.getByTestId('todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
    await expect(this.newTodoInput).toBeVisible();
  }

  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(items: string[]): Promise<void> {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  async toggleTodo(text: string): Promise<void> {
    const item = this.page.getByTestId('todo-item').filter({ hasText: text });
    await item.getByRole('checkbox').check();
  }

  async deleteTodo(text: string): Promise<void> {
    const item = this.page.getByTestId('todo-item').filter({ hasText: text });
    await item.hover();
    await item.getByRole('button', { name: 'Delete' }).click();
  }

  async filterBy(filterName: 'All' | 'Active' | 'Completed'): Promise<void> {
    await this.page.getByRole('link', { name: filterName }).click();
  }

  async expectTodoVisible(text: string): Promise<void> {
    await expect(this.todoItems.filter({ hasText: text })).toBeVisible();
  }

  async expectTodoCount(count: number): Promise<void> {
    await expect(this.todoItems).toHaveCount(count);
  }

  async expectItemsLeft(expectedText: string): Promise<void> {
    await expect(this.todoCount).toContainText(expectedText);
  }
}
