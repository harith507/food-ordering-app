'use client'
import OrderProgressTile from "@/components/layout/Order/OrderProgressTile";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Tabs from "@/components/layout/Tabs";
import UseProfile from "@/components/UseProfile";



export default function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const { loading: profileLoading, role: profileRole } = UseProfile();



    useEffect(() => {
        fetch('/api/orders?today=1').then(res => {
            res.json().then(data => setOrders(data));
        });
    }, [])

    function handleProceed(orderId) {
        const order = orders.find(order => order._id === orderId);
        if (order.status === 'placed') {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: orderId, status: 'in-progress' }),
            }).then(res => {
                if (res.ok) {
                    setOrders(orders.map(order => {
                        if (order._id === orderId) {
                            return { ...order, status: 'in-progress' };
                        }
                        return order;
                    }));
                }
            });
        } else if(order.status === 'in-progress') {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: orderId, status: 'complete' }),
            }).then(res => {
                if (res.ok) {
                    setOrders(orders.map(order => {
                        if (order._id === orderId) {
                            return { ...order, status: 'complete' };
                        }
                        return order;
                    }));
                }
            });
        } else if(order.status === 'complete') {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: orderId, status: 'delivered' }),
            }).then(res => {
                if (res.ok) {
                    setOrders(orders.map(order => {
                        if (order._id === orderId) {
                            return { ...order, status: 'delivered' };
                        }
                        return order;
                    }));
                }
            });
        } else if(order.status === 'delivered') {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: orderId, status: 'Clear' }),
            }).then(res => {
                if (res.ok) {
                    setOrders(orders.map(order => {
                        if (order._id === orderId) {
                            return { ...order, status: 'clear' };
                        }
                        return order;
                    }));
                }
            });

        }else{
            return;
        }         
    }

    function handleUndo(orderId) {
        const order = orders.find(order => order._id === orderId);
        if (order.status === 'in-progress') {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: orderId, status: 'placed' }),
            }).then(res => {
                if (res.ok) {
                    setOrders(orders.map(order => {
                        if (order._id === orderId) {
                            return { ...order, status: 'placed' };
                        }
                        return order;
                    }));
                }
            });
        } else if(order.status === 'complete') {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: orderId, status: 'in-progress' }),
            }).then(res => {
                if (res.ok) {
                    setOrders(orders.map(order => {
                        if (order._id === orderId) {
                            return { ...order, status: 'in-progress' };
                        }
                        return order;
                    }));
                }
            });
        } else if(order.status === 'delivered') {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: orderId, status: 'complete' }),
            }).then(res => {
                if (res.ok) {
                    setOrders(orders.map(order => {
                        if (order._id === orderId) {
                            return { ...order, status: 'complete' };
                        }
                        return order;
                    }));
                }
            });
        } else {
            return;
        }
    }

    function CalculateWaitTime(){
        const placedCount = orders.filter(order => order.status === 'placed').length;
        const inProgressCount = orders.filter(order => order.status === 'in-progress').length;
        const completeCount = orders.filter(order => order.status === 'complete').length;

 
        let waitTime = 0;
        //per hour
        const arrivalRate = placedCount + inProgressCount + completeCount;
        const serviceRate = 15;
        const Lq = Math.pow(arrivalRate, 2) / (serviceRate*( serviceRate - arrivalRate));
        waitTime = (Lq / arrivalRate)*60;
        

       

        return waitTime.toFixed(2) ; //minutes
        
    }

    

    

    return (
        <section className="mt-8 max-w-4xl">
            <div className="text-center">
                <SectionHeaders mainHeader="Order Progress" />
               
                {profileRole === 'businessOwner' &&(
                     <Link href="/orders/history"> 
                    <SectionHeaders subHeader="Order History" /> 
                    </Link>
                )}
                   
       
                <Tabs role={profileRole}/>
                

                
                   
                <div className=" max-w-6xl mx-auto mt-8">
                    <div className=" max-w-auto mx-auto">
                        
                        <div className="grid grid-cols-4 gap-2 mt-4">
                            
                            <div className="bg-gray-400 rounded-lg p-4 ">
                                <h1 className="text-2xl text-center"> Placed </h1>

                                {/* ORDER PROGRESS TILE */}
                                {orders.filter(order => order.status === 'placed').map((order) => (
                                    
                                    <OrderProgressTile key={order._id} order={order} onProceed={handleProceed} waitTime={CalculateWaitTime()} />
                         
                                ))}
                                {/* ORDER PROGRESS TILE */}
                            </div>
                            <div className="bg-gray-400 rounded-lg p-4 ">
                                <h1 className="text-2xl text-center"> In Progress</h1>
                                {orders.filter(order => order.status === 'in-progress').map((order) => (
                                    <OrderProgressTile key={order._id} order={order} onProceed={handleProceed} onReverse={handleUndo} />
                                ))}
                            </div>
                            <div className="bg-gray-400 rounded-lg p-4">
                                <h1 className="text-2xl text-center"> Complete</h1>
                                
                                    {/* ORDER PROGRESS TILE */}
                                    {orders.filter(order => order.status === 'complete').map((order) => (
                                    <OrderProgressTile key={order._id} order={order} onProceed={handleProceed} onReverse={handleUndo}/>
                                ))}
                                    {/* ORDER PROGRESS TILE */}
                         

                            </div>
                            <div className="bg-gray-400 rounded-lg p-4">
                                <h1 className="text-2xl text-center"> Delivered</h1>
                                {orders.filter(order => order.status === 'delivered').map((order) => (
                                    <OrderProgressTile key={order._id} order={order} onProceed={handleProceed} onReverse={handleUndo}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )

}

