const db = require('../../db/dbconfig.js');

module.exports = {
    get,
    getByid,
    getCohortsStudents,
    insert,
    update,
    remove
};

function get() {
    return db('cohorts');
}

function getByid(id) {
    return db('cohorts')
        .where({ id })
        .first();
}

function getCohortsStudents(cohortsId) {
    return db('students')
        .join('cohorts')
        .on(`students.cohort_id = ${cohortsId}`)
}

function insert(cohort) {
    return db('cohorts')
        .insert(cohort)
        .then(id => {
            return getByid(id);
        });
}

function update(id, changes) {
    return db('cohorts')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('cohorts')
        .where({ id })
        .del();
}