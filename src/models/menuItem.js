import { model, models, Schema } from "mongoose"

const MenuItemScheme = new Schema({
    image: {type: String},
    menuName: {type: String},
    description: {type: String},
    basePrice: {type: Number},
    availabilityStatus: {type: Boolean},

},{timestamps: true})

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemScheme);