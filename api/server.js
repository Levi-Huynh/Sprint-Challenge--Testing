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


server.get('/games/:id', async (req, res) => {
  try {
    const games = await Games.findById(req.params.id);
    if (games) {
      res.status(200).json(games);
    } else {
      res.status(404).json({ message: 'We could not find the games' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error retrieving the ganes' });
  }
});

server.delete('/:id', async (req, res) => {
  try {
    const count = await Games.remove(req.params.id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: 'That game does not exist, perhaps it was deleted already',
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error removing the game' });
  }
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
