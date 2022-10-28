module.exports = function myRegistration(db) {

    async function getTown(regNumber) {
        let code = regNumber.slice(0, 2)
        let getReg = await db.oneOrNone('select * from towns where town_code = $1', [code])
        return getReg
    }

    async function addRegNumber(regNumber) {
        console.log(regNumber);

        var reg1 = /[CY|CJ|CA]{2}(\s)[0-9]{3}(\s|\-)[0-9]{3}/gi

        let newRegNo = regNumber.toUpperCase().trim()
        let Code = '';

        const registrations = reg1.test(newRegNo);

        if (!registrations) {
            return "Invalid"
        }

        if (registrations) {
            Code = newRegNo.substring(0, 2);
        }

        if (Code) {
            let townId = await db.oneOrNone('select id from towns where town_code = $1 ', [Code])
            await db.none('insert into registrationnumbers(regNumbers,town_id) values($1, $2)', [regNumber, townId.id])
        }

        return "Valid"

    }

    async function getRegNumbers() {
        let getCode = await db.manyOrNone('select distinct RegNumbers from registrationNumbers')
        return getCode
    }

    async function clear() {
        let reset = await db.none('delete from registrationnumbers')
    }

    async function filter(town) {

        let result;
        if (Number(town) === 4) {
            result = await getRegNumbers()
        } else {
            result = await db.manyOrNone('select regnumbers from registrationnumbers  where town_id = $1', [town])

        }
        return result
    }

    async function checkReg(num) {

        let reg = await db.any('select regnumbers from registrationnumbers where regnumbers = $1', [num.toUpperCase().trim()])
        return reg.length >= 1 ? true : false;
    }




    return {
        getTown,
        addRegNumber,
        clear,
        getRegNumbers,
        filter,
        checkReg
       

    }
}

