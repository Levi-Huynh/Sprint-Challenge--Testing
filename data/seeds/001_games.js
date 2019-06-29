
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games')
  .truncate()
  .then(function() {
    return knex('games').insert([
      { title: 'Pacman', genre:'Arcade', releaseYear: 1980 },
      { title: 'Tetris', genre:'Arcade', releaseYear: 1984 },
      { title: 'Grand Theft Auto', genre:'Action-adventure', releaseYear: 2013 },
      { title: 'Mario Bros', genre:'Platform', releaseYear: 1983 },
    
   
    ]);
  });
};
