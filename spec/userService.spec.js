let client;
let UserService;

describe('UserService Integration Test', function () {


    beforeAll(function (done) {
        const pg = require('pg');
        const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/retoblunschi';

        client = new pg.Client(connectionString);
        client.connect();
        UserService = require('../src/userservice').getUserService(client);

        const query = client.query(
            'CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, password VARCHAR(40))')
            .then((res) => {
                console.log('Table USERS created');
                //                client.end();
                return done();
            });
    });

    it('should create a user and return the new id', function (done) {
        let user = {
            name: 'john',
            password: 'pw'
        };

        UserService.createUser(user)
            .then(function(id) {
                expect(id).toBeDefined();
                expect(typeof id).toBe('number');
                expect(id).toBe(1);
                return done();
            });
    });


    afterAll(function () {
        const query = client.query(
            'DROP TABLE users')
            .then((res) => {
                client.end();
                console.log('dropped!!!');

                return done();
            });
    });
});