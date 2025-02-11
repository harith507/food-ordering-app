'use client'
import SectionHeaders from "@/components/layout/SectionHeaders";
import Tabs from "@/components/layout/Tabs";
import Link from "next/link";
import { useState, useEffect } from "react";
import UseProfile from "@/components/UseProfile";


export default function PaymentHistoryPage() {
    const [orders, setOrders] = useState([]);
    const { loading: profileLoading, role: profileRole } = UseProfile();

    useEffect(() => {
        fetch('/api/orders').then(res => {
            res.json().then(data => setOrders(data));
        })

    }, []);

    console.log(orders);

    return (
        <section className="mt-8 max-w-4xl mx-auto">
            <div className="text-center">
                <SectionHeaders mainHeader="Payment History" />
                <Tabs role={profileRole} />
            </div>
            <div className="grid grid-cols-3 gap-4">
            {orders.length > 0 && orders.map(order => (
                <div key={order._id} className="border p-4 mt-4">
                    <div className="flex justify-between">
                        <div>
                            <p>Order ID: {order._id}</p>
                            <p>Customer Name: {order.customerName}</p>
                            <p>Customer Phone: {order.customerPhone}</p>
                            <p>Table Number: {order.tableNumber}</p>
                            <p>Order Status: {order.status}</p>
                            <p>Total: {order.total}</p>
                            <p>Order Date: {new Date(order.createdAt).toLocaleString("en-GB", { day: '2-digit', month: '2-digit',year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: "Asia/Kuala_Lumpur" })}</p>
                            <p>Last Update: {new Date(order.updatedAt).toLocaleString("en-GB", { day: '2-digit', month: '2-digit', hour: '2-digit',year: 'numeric', minute: '2-digit', hour12: false, timeZone: "Asia/Kuala_Lumpur" })} </p>
                            <p>Payment: {order.paid ? 'Paid' : 'Not Paid'}</p>
                        </div>
                        <div>
                            <Link href={"/orders/"+order._id}> 
                                <button className="border-0 px-2 py-1 rounded" onClick={() => handleOrderStatus(order._id, order.status)}>Edit</button>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <SectionHeaders subHeader="Order Items" />
                        {order.cartProducts.map((product, index) => (
                            <div key={product._id} className="flex justify-between">
                                <p>{index + 1}. {product.menuName}</p>
                                <p> RM{product.basePrice}</p>
                                { product.extraOptions.length > 0 && product.extraOptions.map((option,index) => (
                                  <>
                                    <p>{index+1}. {option.name} </p>
                                    <p>RM{option.price} </p>
                                  </>  
                                ))}
                                
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </section>
    )
}