import { MenuItem } from "@/models/menuItem";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);

    const { cartProducts, customerData } = await req.json();

    // convert dineOrTakeaway to boolean because form is crazyyyy
    if (customerData.dineOrTakeaway === 'dine') {
        customerData.dineOrTakeaway = true;
    } else {
        customerData.dineOrTakeaway = false;
    }
    const orderDoc = await Order.create({
        cartProducts,
        customerName: customerData.customerName,
        customerEmail: customerData.customerEmail,
        customerPhone: customerData.customerPhone,
        tableNumber: customerData.customerTable,
        isDineIn: customerData.dineOrTakeaway,
        paid: false,
    });

    const stripeLineItems = [];
    for (const cartProduct of cartProducts) {
        
        const productInfo = await MenuItem.findById(cartProduct._id);
        let productPrice = productInfo.basePrice;
        if (cartProduct.extraOptions?.length > 0) {
            for (const extraOption of cartProduct.extraOptions) {
                const option = productInfo.extraOptions.find(option => option._id.toString() === extraOption.extraOptions._id.toString());
                productPrice += option.price;
            }
        }

        const productName = cartProduct.menuName;

        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'MYR',
                product_data: {
                    name: productName,
                },
                unit_amount: productPrice * 100,
            }
        });
    }

    // Ensure NEXTAUTH_URL is defined and normalized with a trailing slash
    const baseUrl = process.env.NEXTAuth_URL;
    if (!baseUrl) {
        throw new Error("NEXTAUTH_URL is not defined");
    }
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';

    // Create stripe session with absolute URLs
    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: customerData.customerEmail, // corrected customer field
        success_url: `${formattedBaseUrl}orders/${orderDoc._id}?clear-cart=1`,
        cancel_url: `${formattedBaseUrl}cart?cancel=1`, 
        metadata: { orderId: orderDoc._id.toString() },
        payment_intent_data: {
            metadata: { orderId: orderDoc._id.toString() },
        }
    });

    return Response.json(stripeSession.url);
}
