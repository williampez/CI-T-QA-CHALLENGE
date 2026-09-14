import { faker } from '@faker-js/faker';
import userService from '../../services/users.service';

describe ('API - Endpoint Usuarios', () => {
    let validUser;

    beforeEach(() => {
     validUser = {
        nome: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({lenght: 8}),
        administrador: 'true'
     }
    })

    it('1. Deve cadastrar um novo usuario com sucesso', () => {
        userService.postUser(validUser).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            expect(response.body).to.have.property('_id');
            expect(response.duration).to.be.lessThan(2000);

        })
    })

it('2. Não deve permitir cadastro com email duplicado (Regra de Negócio)', () => {
    userService.postUser(validUser).then(() => {
      userService.postUser(validUser).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('Este email já está sendo usado');
      });
    });
  });


it('3. Deve listar usuários cadastrados e validar estrutura do contrato', () => {
    userService.getUsers().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios).to.be.an('array');

      if (response.body.usuarios.length > 0) {
        const usuario = response.body.usuarios[0];
        expect(usuario).to.include.keys('nome', 'email', 'password', 'administrador', '_id');
      }
    });
  });




})