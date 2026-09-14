import { faker } from '@faker-js/faker';

export class UserFactory {
    static buildUser(isAdmin = 'true') {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password({ length: 10, prefix: 'P@1' }),
            administrador: isAdmin
        }
    }

    static buildInvalidEmail() {
        return `invalid_email_${Date.now()}@inexistente.com`
    }
}