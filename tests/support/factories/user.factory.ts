import { faker } from '@faker-js/faker';
import { UserEntity } from '../context/scenario-context';

export class UserFactory {
  public static create(overrides: Partial<UserEntity> = {}): UserEntity {
    return {
      id: faker.string.uuid(),
      email: faker.internet.email().toLowerCase(),
      name: faker.person.fullName(),
      role: 'standard',
      token: `jwt-${faker.string.alphanumeric(32)}`,
      ...overrides,
    };
  }

  public static createAdmin(overrides: Partial<UserEntity> = {}): UserEntity {
    return this.create({
      role: 'admin',
      ...overrides,
    });
  }
}
