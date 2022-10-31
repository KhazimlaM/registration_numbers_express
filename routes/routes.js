module.exports = function myRoutes(db) {

    async function index(req, res) {
 
        let regnumber = await db.getRegNumbers()

        res.render('index', {
          regnumber
        });


    }
    async function home(req, res) {

        let myBody = req.body.name
        let newBody = myBody.toUpperCase()
        let regNumbers = req.body.regnumbers
        let check = await db.checkReg(newBody)
      
        if (newBody) {
      
          if (check == true) {
            req.flash('info', 'Oops Duplicate Number Entered')
      
          } else {
            let res = await db.addRegNumber(newBody)
      
            if (res == "Valid") {
              req.flash('success', 'Registration Number Added')
      
            } else if (res == "Invalid") {
              req.flash('info', 'Invalid Registration Number')
            }
      
          }
        } else {
      
          req.flash('info', 'Please Enter Registration Number')
        }
      
      
      
        res.redirect("/")

    }

    async function clear(req, res) {
        await db.clear()
        req.flash('info', 'Registration Number Cleared')
      
        res.redirect('/');
       
    };

    async function filter(req, res) {
      
        let town = req.body.town

        let regnumber = await db.filter(town)
        console.log("filtrertd", regnumber)
      
        if (!town) {
          req.flash('info', 'Please Select Town')
        }

        if(!1 || 2 || 3 ||4 ){
          req.flash('info', 'There Is No Town Selected')
        }

      
        res.render("index", {
          regnumber
        })
        
    }

  


    return {
        home,
        index,
        clear,
        filter
    }

}
