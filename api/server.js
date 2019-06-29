const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/games', (req, res) => {
Games.getAll()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});



server.post('/games', async (req, res) => {
    const game= req.body;
  
    if (!game.title || !game.genre) {
        res.status(422).json({ message: 'Please provide title and genre for your game' });
    
      } else {
        try {
            const inserted = await Games.insert(game);
            res.status(201).json(inserted);
          } catch (error) {
            res
              .status(500)
              .json({ message: 'We ran into an error adding the games' });
          }
      }

    // if (game.title && game.genre) {
    //   try {
    //     const inserted = await Games.insert(game);
    //     res.status(201).json(inserted);
    //   } catch (error) {
    //     res
    //       .status(500)
    //       .json({ message: 'We ran into an error adding the games' });
    //   }
    // } else if(!game.title || !game.genre) {
    //   res.status(422).json({ message: 'Please provide title and genre for your game' });
    // }
  

});


module.exports = server;
