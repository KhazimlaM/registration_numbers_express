module.exports = function myRegistration(db) {

    async function getTown(regNumber) {
        let code = regNumber.slice(0, 2)
        let getReg = await db.oneOrNone('select * from towns where town_code = $1', [code])
        return getReg
    }

    async function addRegNumber(regNumber) {
        
        var reg1 = /[CY|CJ|CA]{2}(\s)[0-9]{3}(\s|\-)[0-9]{3}/gi

        let newRegNo = regNumber.toUpperCase()
        let Code = '';
    
        const registrations = reg1.test(newRegNo);
    
        if(!registrations){
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
     
    async function getRegNumbers(){
        let getCode = await db.manyOrNone('select distinct RegNumbers from registrationNumbers')
        return getCode
    }

    async function clear(){
      let reset = await db.none('delete from registrationnumbers')
    }

    return {
        getTown,
        addRegNumber,
        getRegNumbers,
        clear


    }

}
