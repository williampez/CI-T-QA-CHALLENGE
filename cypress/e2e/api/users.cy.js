import userService from '../../services/users.service';
import { UserFactory } from '../../support/factories/user.factory';

describe ('API - Users Endpoint', () => {
    let validUser;
    let messages;

    before(() => {
        cy.fixture('messages').then((data) => {
            messages = data;
        });
    })

    beforeEach(() => {
        // UserFactory e a fonte unica de criacao de usuario em todo o projeto,
        // garantindo dados dinamicos e evitando duplicacao entre os specs.
        validUser = UserFactory.buildUser();
    })

    it('1. Should register a new user successfully (Happy path)', () => {
        userService.postUser(validUser).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq(messages.api.user.createdSuccess);
            expect(response.body).to.have.property('_id');
            expect(response.duration).to.be.lessThan(2000);

        })
    })

it('2. Should not allow registration with a duplicate email (Business Rule)', () => {
    // cadastro o mesmo usuario duas vezes de proposito pra bater na regra de email unico
    userService.postUser(validUser).then(() => {
      userService.postUser(validUser).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq(messages.api.user.duplicateEmail);
      });
    });
  });


it('3. Should list registered users and validate the contract structure', () => {
    userService.getUsers().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios).to.be.an('array');

      // O beforeEach garante ao menos um usuario cadastrado, entao a lista
      // nunca deve estar vazia. Validamos o contrato do primeiro registro.
      expect(response.body.usuarios.length).to.be.greaterThan(0);
      const usuario = response.body.usuarios[0];
      expect(usuario).to.include.keys('nome', 'email', 'password', 'administrador', '_id');
    });
  });




})