
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('cohorts', tbl => {
        tbl.increments();
        tbl.string('name', 100).notNullable();
        tbl.timestamps(true, true);
    })
    .createTable('students', tbl => {
        tbl.increments();
        tbl.string('name', 100).notNullable();

        tbl
            .integer('cohorts_id')
            .unsigned()
            .references('id')
            .inTable('cohorts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        
        tbl.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts').dropTableIfExists('students');
};
