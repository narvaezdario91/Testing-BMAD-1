import { Given, When, Then, expect } from '../fixtures';

Given('un usuario administrador creado vía servicio API', async ({ authApi, scenarioContext }) => {
  const adminUser = await authApi.seedAuthenticatedUser({ role: 'admin' });
  scenarioContext.setUser(adminUser);
  if (adminUser.token) {
    scenarioContext.setToken(adminUser.token);
  }
});

When('el usuario valida su token de sesión', async ({ authApi, scenarioContext }) => {
  const token = scenarioContext.getToken();
  expect(token).toBeDefined();
  const isValid = await authApi.validateToken(token!);
  scenarioContext.set('isTokenValid', isValid);
});

Then('el token debe ser válido y quedar registrado en el ScenarioContext', async ({ scenarioContext }) => {
  const isValid = scenarioContext.get<boolean>('isTokenValid');
  expect(isValid).toBe(true);
  expect(scenarioContext.hasUser()).toBe(true);
  expect(scenarioContext.getUser().role).toBe('admin');
});
