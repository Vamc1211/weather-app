const mongoose=require('mongoose');

const WeatherSchema=mongoose.Schema(
    {
        city:{
            type:'string',
            required:[true]
        },
        feelslike:{
            type:'string',
            required:true

        } 
    },
    {
        timestamps:true
    }

)
const weather=mongoose.model('Weather', WeatherSchema);
module.exports=weather;


