import { metadata } from "@/app/layout";
import { MenuItem } from "@/models/menuItem";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);

    const {cartProducts,customerData} = await req.json();
    
    // convert dineOrTakeaway to boolean because form is crazyyyy
    if (customerData.dineOrTakeaway === 'dine') {
        customerData.dineOrTakeaway = true;
    } else {
        customerData.dineOrTakeaway = false;
    }
    const orderDoc = await Order.create({
        cartProducts,
        customerName: customerData.customerName,
        customerPhone: customerData.customerPhone,
        tableNumber: customerData.customerTable,
        isDineIn: customerData.dineOrTakeaway,
        paid: false,
     });

     console.log('Order Doc', orderDoc);
     console.log('cusotmer Data', customerData);

     const stripeLineItems = [];
     for (const cartProduct of cartProducts) {
        
        const productInfo = await MenuItem.findById(cartProduct._id);
        let productPrice = productInfo.basePrice;
        if(cartProduct.extraOptions?.length > 0){
            for (const extraOption of cartProduct.extraOptions){
                const option = productInfo.extraOptions.find(option => option._id.toString() === extraOption.extraOptions._id.toString());
                productPrice += option.price
            }
        }

        const productName = cartProduct.menuName;

        stripeLineItems.push({
            quantity:1,
            price_data:{
                currency: 'MYR',
                product_data:{
                    name: productName,
                },
                unit_amount: productPrice * 100,
            }
        })
     }

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_name: customerData.name,
        success_url: process.env.NEXTAUTH_URL + 'orders/'+ orderDoc._id.toString() + '?clear-cart=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?cancel=1', 
        metadata:{orderId : orderDoc._id.toString()},
        payment_intent_data: {
            metadata: {orderId: orderDoc._id.toString()},
        }
        
    });

    return Response.json(stripeSession.url);
}
