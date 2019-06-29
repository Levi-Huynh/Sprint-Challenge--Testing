
exports.up = function(knex) {
    return knex.schema.createTable('games', tbl => {
        tbl.increments();
    
        tbl
        .string('title')
        .unique()

        tbl
        .string('genre')
      

        tbl
        .integer('releaseYear')
      

      });
    };
    
    exports.down = function(knex, Promise) {
      // undo the operation in up
      return knex.schema.dropTableIfExists('games');
    };
    