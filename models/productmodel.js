const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        rating:{
            type: Number,
            required: true,
            default: 0
        },
        category:{
        type: String,
        required:true
        },
        stock:{
            type: Number,
            required: true,
            default: 0
        }  ,
        image: {
            type: Object,
            required: true,
            default: {
                public_id : '',
                secure_url: ''
            }
        }
    }
)
module.exports = mongoose.model('Product', productSchema)
