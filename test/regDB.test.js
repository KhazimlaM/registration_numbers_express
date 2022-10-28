const assert = require('assert');
const registration = require('../regDB');
const pgPromise = require('pg-promise')
const pg = require("pg");

const pgp = pgPromise({})


const local_database_url = 'postgres://codex:pg123@localhost:5432/tests';
const connectionString = process.env.DATABASE_URL || local_database_url;

const db = pgp(connectionString);
const myReg = registration(db)



describe("The Registration database factory function", async function () {

    

    beforeEach(async function () {
        await db.none('delete from registrationnumbers')

    });


    
    it("should clear all registration numbers in the database", async function () {
        let myReg = registration(db)

        await myReg.addRegNumber("cj 888 999")
        await myReg.addRegNumber("ca 789 456")
        await myReg.addRegNumber("cy 874 521")

        await myReg.clear()

        assert.deepEqual([], await myReg.getRegNumbers())




    })

    it("should show all registration numbers from Paarl in the database", async function () {
        let myReg = registration(db)

        await myReg.addRegNumber("ca 666 123")
        await myReg.addRegNumber("ca 789 456")

        assert.deepEqual([
            {
                "regnumbers": "ca 666 123"
            },
            {
                "regnumbers": "ca 789 456"
            }
        ]
            , await myReg.getRegNumbers())


    })

    it("should show all registration numbers from Bellville in the database", async function () {
        let myReg = registration(db)

        await myReg.addRegNumber("cj 888 999")
        await myReg.addRegNumber("ca 789 456")
        await myReg.addRegNumber("cy 874 521")

        assert.deepEqual([
            {
                "regnumbers": "cj 888 999"
            },
            {
                "regnumbers": "ca 789 456"
            },
            {
                "regnumbers": "cy 874 521"
            }
        ]
            , await myReg.getRegNumbers())




    })
    it("should show all registration numbers from Cape Town in the database", async function () {
        let myReg = registration(db)

        await myReg.addRegNumber("ca 666 123") 
        await myReg.addRegNumber("ca 789 456")
        await myReg.addRegNumber("cy 874 521")

        assert.deepEqual([
            {
                "regnumbers": "ca 789 456"
            },
            {
                "regnumbers": "ca 666 123"
            },
            {
                "regnumbers": "cy 874 521"
            },
        ]
            , await myReg.getRegNumbers())


    })
    

    
    it("should show all registration numbers in the database", async function () {
        let myReg = registration(db)

        await myReg.addRegNumber("cy 874 521")
        await myReg.addRegNumber("ca 789 456")


        assert.deepEqual([

            {
                "regnumbers": "cy 874 521"

            },
            {
                "regnumbers": "ca 789 456"
            },
        ]
            , await myReg.getRegNumbers())

    })

   

    it("should return fasle if the registration is already entered in the app", async function () {
        let myReg = registration(db)

        await myReg.addRegNumber("cj 888 999")
        await myReg.addRegNumber("ca 789 456")
        await myReg.addRegNumber("cy 874 521")


        assert.equal(false, await myReg.checkReg("cj 888 999"))




    })
    it("should return false if the registration is not already entered in app", async function () {
        let myReg = registration(db)

        await myReg.addRegNumber("cj 888 999")
        await myReg.addRegNumber("ca 789 456")
        await myReg.addRegNumber("cy 874 521")


        assert.equal(false, await myReg.checkReg("cj 888 929"))




    })
    

    after(async function () {
        await db.manyOrNone('Truncate registrationnumbers');
        
    })
})

