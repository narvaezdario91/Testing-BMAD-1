import { Page, Locator } from '@playwright/test';

/**
 * HeaderComponent - Component Object para el encabezado global y navegación.
 * Aplica SRP (Responsabilidad Única) y Accessibility Locators.
 */
export class HeaderComponent {
  readonly page: Page;
  readonly logo: Locator;
  readonly userMenuButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: /home|logo|todomvc/i });
    this.userMenuButton = page.getByRole('button', { name: /usuario|perfil|account/i });
    this.searchInput = page.getByPlaceholder(/buscar|search/i);
  }

  async openUserMenu(): Promise<void> {
    await this.userMenuButton.click();
  }
}
