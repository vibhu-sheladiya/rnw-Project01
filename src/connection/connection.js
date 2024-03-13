const mongoose=require('mongoose')

const connectdb=async()=>{
    mongoose.connect('mongodb://localhost:27017/demo-04').then((data)=>{
        console.log('connection done')
    }).catch((erroe)=>{
        console.log('error in connection')
    })
}
module.exports={connectdb}