'use client'
import SectionHeaders from "@/components/layout/SectionHeaders";
import Link from "next/link";
import { useState, useEffect } from "react";
import UseProfile from "@/components/UseProfile";
import Tabs from "@/components/layout/Tabs";

export default function PaymentPage() {
   
    const [orders, setOrders] = useState([]);
    const { loading: profileLoading, role: profileRole } = UseProfile();

    if (profileRole === "waiter" || profileRole === "kitchenStaff") {
        return <div>Access Denied</div>;
    }

    useEffect(() => {
        fetch('/api/orders').then(res => {
            res.json().then(data => setOrders(data));
        });
    }, []);

    console.log(orders);

   

    return (
        <section className="mt-8 max-w-4xl mx-auto">
            <div className="text-center">
                <SectionHeaders mainHeader="Payment List" />
                <Link href="/payment/history"> 
                <SectionHeaders subHeader="Payment History" /> </Link>
                
                <Tabs role={profileRole} />
            </div>
            <div className="grid grid-cols-3 gap-4">
            {
                orders.length > 0 && orders
                    .filter(order => order.status !== "cancelled" && !order.paid)
                    .map(order => (
                        <div key={order._id} className="border p-4 mt-4">
                            <div className="flex justify-between">
                                <div>
                                    <p>Order ID: {order._id}</p>
                                    <p>Customer Name: {order.customerName}</p>
                                    <p>Customer Phone: {order.customerPhone}</p>
                                    <p>Table Number: {order.tableNumber}</p>
                                    <p>Total: {order.total}</p>
                                    <p>
                                      Order Date: {new Date(order.updatedAt).toLocaleString("en-GB", { 
                                          day: '2-digit', month: '2-digit', year: 'numeric', 
                                          hour: '2-digit', minute: '2-digit', hour12: false, 
                                          timeZone: "Asia/Kuala_Lumpur" 
                                      })}
                                    </p>
                                    <p>Payment: {order.paid ? 'Paid' : 'Not Paid'}</p>
                                </div>
                                <div>
                                    <Link href={"/orders/" + order._id}>
                                        <button 
                                            className="border-0 px-2 py-1 rounded" 
                                            onClick={() => handleOrderStatus(order._id, order.status)}
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-4">
                                <SectionHeaders subHeader="Order Items" />
                                {
                                    order.cartProducts.map((product, index) => (
                                        <div key={product._id} className="flex flex-col mb-2">
                                            <div className="flex justify-between">
                                                <p>{index + 1}. {product.menuName}</p>
                                                <p>RM{product.basePrice}</p>
                                            </div>
                                            {
                                                product.extraOptions.length > 0 && product.extraOptions.map((option, idx) => (
                                                    <div key={idx} className="flex justify-between ml-4">
                                                        <p>{idx + 1}. {option.name}</p>
                                                        <p>RM{option.price}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <Link href={"/orders/" + order._id}>
                                        <button 
                                            className="border-0 px-2 py-1 rounded bg-green-500" 
                                           
                                        >
                                            Pay
                                        </button>
                                    </Link>
                        </div>
                        
                    ))
            }
            
            </div>
        </section>
    );
}