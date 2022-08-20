const { Schema, model, Types } = require('mongoose');

const productSchema = new Schema({
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Schema.Types.Decimal128,
        default: 0.0,
        required: true,
        min: 0,
    },
});

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;
