const mongoose = require('mongoose');
const { Schema } = mongoose; 

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product; //  다른곳에서도 사용할 수 있도록 내보낸다. 