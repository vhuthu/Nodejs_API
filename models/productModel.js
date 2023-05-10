const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Enter your name "]
        },
        quantity:{
            type:Number,
            required:true,
            default:0
        },
        price:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:false
        }
    },
    {TimeRanges:true}
)

const Product = mongoose.model('Product', productSchema);
module.exports = Product;