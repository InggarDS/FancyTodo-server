const axios = require('axios');


class Controller {

  
    
    static getCalender(req, res, next) {
       
        axios.get(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=${req.params.country}&year=${req.params.year}`)
        .then(result => {
            let { data } = result
            res.status(200).json({
               data
            })
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = Controller