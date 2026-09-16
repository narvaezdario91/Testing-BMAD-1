import { test as base } from 'playwright-bdd';
import { AuthApiService } from '../domain/services/auth-api.service';

export interface ApiFixtures {
  authApi: AuthApiService;
}

export const apiFixtures = base.extend<ApiFixtures>({
  authApi: async ({ request }, use) => {
    const authApi = new AuthApiService(request);
    await use(authApi);
  },
});
