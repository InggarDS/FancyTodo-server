const axios = require('axios');


class Controller {

  
    static getWallpaper(req, res, next){
        axios.get(`https://api.unsplash.com//photos/random?username=stphnwlkr&client_id=${process.env.API_KEY_UNSPLASH}`)
        .then(result => {
            let { data } = result;

            return res.status(200).json({
                url : data.urls.regular,
                creator : data.user.name 
            })
            
        })
        .catch(err => {
            return next(err)
        })
    }

    static getQuote(req, res, next) {
        axios.get(`https://api.quotable.io/random`)
        .then(result => {

            let { data } = result
            return res.status(200).json({
                content : data.content,
                author : data.author
            })
        })
        .catch(err => {
            return next(err)
        })
    }
    
    static getCalender(req, res, next) {
        
        let date = new Date();
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        let days = ['Sunday', 'Tuesday', 'Wednesday','Thursday','Friday', 'Saturday', 'Monday'];        
        let nameOfDay = days[day-1]

        axios.get(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=${req.params.country}&year=${year}&month=${month + 1}&day=${day}`)
        .then(result => {
            let { data } = result
            if ( data.response.holidays.length <= 0 ){
                return res.status(200).json({
                    day : nameOfDay 
                 })
            } else {
                return res.status(200).json({
                    day : data.response.holidays[0].name
                 })
            }
            
        })
        .catch(err => {
            return next(err)
        })
    }

}

module.exports = Controller