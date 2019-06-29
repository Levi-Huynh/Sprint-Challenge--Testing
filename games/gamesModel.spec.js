const {insert, remove, findById} = require('./gamesModel');
const db = require('../data/dbConfig');
const supertest = require('supertest');
const server = require('../api/server');


describe('games model', () => {
    //NEED GLOBAL FUNCTIONS PROVIDE BY JEST THAT CLEAN UP TESTS HERE!!!  
    //beforeAll  implements the clean up only once before tests are ran
    //beforeEach implements the clean up before each test is ran 
    
    
        beforeEach(async () => {
            //truncate clears db very fast, used in seeding
            await db('games').truncate();
    })

    it('should set enviornment to testing', () => {
        //DB_ENV is global
        expect(process.env.DB_ENV).toBe('testing');
    });

describe('insert()', () => {
    it('should insert game', async() => {
        await insert({ title: 'Fortnite', genre:'Action-adventure', releaseYear: 2017});

       await insert({ title: 'World of Warcraft', genre:'Action-adventure', releaseYear: 2004});
        const games = await db('games');

        expect(games).toHaveLength(2);
    })

    it('should insert provided game', async () => {
        let game =  { title: 'Zelda', genre:'RPG', releaseYear: 1998 };
        let inserted= await insert (game);
        expect(inserted.title).toBe(game.title);
    
       game =  { title: 'Pokemon', genre:'Adventure', releaseYear: 1996 };
        inserted = await insert (game);
        expect(inserted.title).toBe(game.title);

})
})


describe('delete()', ()=> {
    it('should delete a agame', async() => {
   await insert( { title: 'Zelda', genre:'RPG', releaseYear: 1998 });
        await insert({ title: 'Pokemon', genre:'Adventure', releaseYear: 1996 });

             await remove(1);
        
        const deletedgame = await findById(1);
       const remained = await findById(2);
        expect(deletedgame).toBeUndefined();
        expect(remained.title).toBe('Pokemon');
       
    });
});

describe('Get(/games)',  () => {

    it('should have an array of 0 length if no games stored', async() => {
    const games = await db('games')
    expect(games).toHaveLength(0);
});

it('another way to find empty array', async () => {
    const res = await supertest(server).get('/games');
  
    expect(res.body).toEqual([]);
  });

  it('HTTP status for Get(/games) 200 if successful', async() => {
    const res = await supertest(server).get('/games');
    expect(res.status).toBe(200);
  })

});

describe('Post(/games)', () => {
  
    it('should return 200 code if req info is complete', async() => {

const game = { title: 'Zelda', genre:'RPG', releaseYear: 1998}
  
 const res = await supertest(server).post('/games').send(game);
expect(res.status).toBe(201);

 
    });
    
it('should return 422 code if req info is not complete', async() => {

const game= {genre:'RPG', releaseYear: 1998}
         
    const res = await supertest(server).post('/games').send(game);
    expect(res.status).toBe(422);
    
   
        });
 
        it('req body should have list of games', async() => {

            const game = { title: 'Zelda', genre:'RPG', releaseYear: 1998, id:1}
              
             const res = await supertest(server).post('/games').send(game);
            expect(res.body).toBe(game); 
            
             
                }); 


 })

})

// it('getting 201 status code if the information is complete', () => {
//     const game = { title: 'Pacman', genre: 'Arcade' };
//     return request(app)
//         .post('/games')
//         .send(game)
//         .expect(201)
// });