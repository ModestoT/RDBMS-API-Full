const db = require('../../db/dbconfig.js');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
};

function get() {
    return db('students');
}

function getById(id) {
    return db('students')
        .where({ id })
        .first();
}

function insert(student) {
    return db('students')
        .insert(student)
        .then(id => {
            return getById(id[0]);
        });
}

function update(id, changes) {
    return db('students')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('students')
        .where({ id })
        .del();
}