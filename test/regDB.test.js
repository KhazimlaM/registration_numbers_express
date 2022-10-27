const assert = require('assert');
const registration = require('../regDB');
const pgPromise = require('pg-promise')
const pg = require("pg");

const pgp = pgPromise({})


const local_database_url = 'postgres://codex10:pg123@localhost:5432/postgres';
const connectionString = process.env.DATABASE_URL || local_database_url;

const db = pgp(connectionString);
const myReg = registration(db)



describe("The Registration database factory function", async function () {

    

    it("", async function () {
       

        assert.deepEqual([], await myReg.addRegNumber())
    });


    it("", async function () {

       
        assert.deepEqual([], await myReg.getTown())

    });


    it("", async function () {
     

      assert.deepEqual([], await myReg.addRegNumber())
    });

    it("", async function () {

       
        assert.deepEqual([], await myReg.clear())

    });

    it("", async function () {

       
        assert.deepEqual([], await myReg.filter())

    });

    it("", async function () {

       
        assert.deepEqual([], await myReg.filter())

    });

 

})

