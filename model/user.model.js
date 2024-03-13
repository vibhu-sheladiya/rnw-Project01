const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    title:{type:String},
    body:{
        type: String,
    },
    email:{
        type:String,
    },
    password:{
        type:String
    },
    status:{
        type:Boolean,
        default:0,
    },
    lat:{
        type:String,
    },
    long:{
        type:String
    },
    token:{
        type:String,
    }
    // Geolocation:{
    //     lat:{
    //         type:String
    //     },
    //     long:{
    //         type:String
    //     },
    // },
    
},{
    timestamps: true,
    versionKey: false,
  });
const User=mongoose.model('user',userSchema)
module.exports=User;