const supertest = require('supertest');
const server= require('./server.js');

//won't use catch below for promise b/c want test to faili if error
//expect from supertest
//signature arguments you're getting in JS (pass in number expects status code)

//working with async code in Jest:

//1st: Return the Promise to Jest 
//2: use async await
//3: 

describe('server', () => {
    describe('GET /', () => {
       //async test need to either return the promise
    
        it('responds with 200 OK', () => {
           return supertest(server)
            .get('/')
            .expect(200);
            // .expect('Content-Type', /xml/i); would fail

            //
            })

        //use squad async/await    
        it('responds with 200 OK', async () => {
            await supertest(server)
             .get('/')
             .expect('Content-Type', /json/i);
             // .expect('Content-Type', /xml/i); would fail
 
             //
             });

             //done let know when done
             //res.status is from jest not library
             it('using done', done=> {
                 supertest(server)
                 .get('/')
                 .expect(200, done);
               });

          
             })
        })