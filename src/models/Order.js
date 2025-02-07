import mongoose, { model, models, Schema } from "mongoose"

const OrderSchema = new Schema({
    status: {
        type: String,
        default: "placed"
    },
    description: String,
    waiterId: String,
    kitchenStaffId: String,
    customerName: String,
    customerPhone: String,
    cartProducts: Object,
    tableNumber: Number,
    isDineIn: {type: Boolean,default: false},
    paid: {type: Boolean,default: false},
}, { timestamps: true });

export const Order = models?.Order || model("Order", OrderSchema);