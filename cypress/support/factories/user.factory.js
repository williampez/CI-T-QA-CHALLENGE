import { faker } from '@faker-js/faker';

export class UserFactory {
    // administrador vem como string ('true'/'false') porque e assim que a API do ServeRest espera
    static buildUser(isAdmin = 'true') {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password({ length: 10, prefix: 'P@1' }),
            administrador: isAdmin
        }
    }

    // uso o timestamp pra garantir email sempre unico e nao esbarrar na regra de duplicidade
    static buildInvalidEmail() {
        return `invalid_email_${Date.now()}@inexistente.com`
    }
}