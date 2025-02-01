import mongoose, { model, models, Schema } from "mongoose"

const ExtraPriceSchema = new Schema({
    name: {type: String},
    price: {type: Number}
})

const MenuItemScheme = new Schema({
    image: {type: String},
    menuName: {type: String},
    description: {type: String},
    basePrice: {type: Number},
    category: {type: mongoose.Types.ObjectId},
    availabilityStatus: {type: Boolean},
    extraOptions: {type: [ExtraPriceSchema]}

},{timestamps: true})

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemScheme);