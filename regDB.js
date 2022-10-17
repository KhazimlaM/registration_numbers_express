module.exports = function myRegistration(db) {

    async function getTown(regNumber) {
        let code = regNumber.slice(0, 2)
        let getReg = await db.oneOrNone('select * from towns where town_code = $1', [code])
        return getReg
    }

    async function addRegNumber(regNumber) {
        let town = await getTown(regNumber)
        let town_id = town.id
        await db.none('insert into registrationnumbers(regNumbers,town_id) values($1, $2)', [regNumber, town_id])
    }

    async function getRegNumbers(){
        let getCode = await db.manyOrNone('select * from registrationnumbers')
        return getCode
    }

    return {
        getTown,
        addRegNumber,
        getRegNumbers,


    }
m

}
