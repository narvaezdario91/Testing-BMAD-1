/**
 * ScenarioContext - Contexto de estado tipado aislado por worker y escenario.
 * Permite compartir datos de forma segura entre Given, When y Then sin variables globales.
 */
export interface UserEntity {
  id: string;
  email: string;
  name: string;
  token?: string;
  role?: string;
}

export interface ScenarioData {
  currentUser?: UserEntity;
  authToken?: string;
  lastApiResponse?: {
    status: number;
    body: unknown;
  };
  customState: Map<string, unknown>;
}

export class ScenarioContext {
  private data: ScenarioData = {
    customState: new Map(),
  };

  public setUser(user: UserEntity): void {
    this.data.currentUser = user;
  }

  public getUser(): UserEntity {
    if (!this.data.currentUser) {
      throw new Error('No user is set in current ScenarioContext');
    }
    return this.data.currentUser;
  }

  public hasUser(): boolean {
    return !!this.data.currentUser;
  }

  public setToken(token: string): void {
    this.data.authToken = token;
  }

  public getToken(): string | undefined {
    return this.data.authToken;
  }

  public setApiResponse(status: number, body: unknown): void {
    this.data.lastApiResponse = { status, body };
  }

  public getApiResponse() {
    return this.data.lastApiResponse;
  }

  public set<T>(key: string, value: T): void {
    this.data.customState.set(key, value);
  }

  public get<T>(key: string): T | undefined {
    return this.data.customState.get(key) as T | undefined;
  }

  public clear(): void {
    this.data = {
      customState: new Map(),
    };
  }
}
