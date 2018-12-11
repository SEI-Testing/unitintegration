let dbCon;

function getUserService(db) {

    dbCon = db;
    let userService = {
        getUserById: function (id) {
            return db.query('SELECT * from users where id = $1', [id])
                .then(res => {
                   return res.rows[0];
                });
        },

        createUser: function (user) {
            return db.query('INSERT into users(name,password) values($1,$2)',
                [user.name, user.password])
                .then((res) => {
                    return db.query('SELECT id from users where name = $1', [user.name])
                        .then((userrows) => {
                            return userrows.rows[0].id;
                        });
                });

        },
        updateUser: function (id, user) {

        },
        deleteUser: function (id) {

        }
    };

    return userService;
}


module.exports = {
    getUserService: getUserService
};