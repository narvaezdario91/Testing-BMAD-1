import { APIRequestContext } from '@playwright/test';
import { UserEntity } from '../../support/context/scenario-context';
import { UserFactory } from '../../support/factories/user.factory';

/**
 * AuthApiService - Servicio API para la estrategia TEA Network-First.
 * Permite inicializar y autenticar usuarios en milisegundos sin pasar por la UI.
 */
export class AuthApiService {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Prepara un usuario autenticado para la prueba usando simulación o API directa.
   */
  async seedAuthenticatedUser(overrides: Partial<UserEntity> = {}): Promise<UserEntity> {
    const user = UserFactory.create(overrides);
    // En un backend real se realizaría: await this.request.post('/api/auth/register', { data: user });
    return user;
  }

  async validateToken(token: string): Promise<boolean> {
    return token.startsWith('jwt-');
  }
}
