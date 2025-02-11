'use client'
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useState, useContext, useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import CartProduct from "@/components/layout/Menu/cartProduct";
import UseProfile from "@/components/UseProfile";
import DeleteButton from "@/components/DeleteButton";
import { toast } from "react-hot-toast";
import Tabs from "@/components/layout/Tabs";



export default function OrderPage() {
    // filter by order by today date
    const { loading: profileLoading, role: profileRole } = UseProfile();
    const { clearCart } = useContext(CartContext);
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [isDineIn, setIsDineIn] = useState(true);
    const [tableNumber, setTableNumber] = useState('');



    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }

        if (id) {
            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                    setCustomerName(orderData.customerName);
                    setCustomerPhone(orderData.customerPhone);
                    setIsDineIn(orderData.isDineIn);
                    setTableNumber(orderData.tableNumber);


                })
            })
        }


    }, [])


    let total = 0;

    if (order?.cartProducts) {
        for (const p of order.cartProducts) {
            total += p.basePrice;
            if (p.extraOptions?.length > 0) {
                for (const option of p.extraOptions) {
                    total += option.price;
                }
            }
        }
    }

    async function handleRemoveOrder() {

        const newStatus = order?.status === 'cancelled' ? 'placed' : 'cancelled';

        const creationPromise = new Promise(async (resolve, reject) => {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: id, status: newStatus })
            }).then(res => {
                if (res.ok) {
                    setOrder({
                        ...order,
                        status: newStatus
                    })
                    resolve();
                    redirect('/orders');
                } else {
                    reject();
                }
            })
        });

        await toast.promise(creationPromise, {
            loading: newStatus === 'cancelled' ? 'Cancelling Order' : 'Reactivating Order',
            success: newStatus === 'cancelled' ? "Order Cancelled" : "Order Reactivated",
            error: "Error",
        });

    }

    function handleRemoveProduct(productId) {
        fetch('/api/orders', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: id, productId })
        }).then(res => {
            if (res.ok) {
                setOrder({
                    ...order,
                    cartProducts: order.cartProducts.filter(p => p._id !== productId)
                })
            }
        })
    }

    async function handleSaveEdit() {

        const updatedOrder = { ...order, customerName, customerPhone, isDineIn, tableNumber };

        const creationPromise = new Promise(async (resolve, reject) => {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: id, ...updatedOrder })
            }).then(res => {
                if (res.ok) {
                    resolve();
                } else {
                    reject();
                }
            })
        });

        await toast.promise(creationPromise, {
            loading: "Updating Order",
            success: "Order Updated",
            error: "Error",
        });
    }

    async function proceedToCheckout(ev) {
        ev.preventDefault();

        let customerData = { customerName, customerPhone, isDineIn };
        if (isDineIn === 'true') {

            customerData = { ...customerData, customerTable };
        }

        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {  // Updated URL with a leading slash
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerData,
                    cartProducts: order.cartProducts  // use order.cartProducts
                })
            }).then(async (response) => {
                if (response.ok) {
                    resolve();
                    window.location = await response.json();
                } else {
                    reject();
                }
            });
        })

        toast.promise(promise, {
            loading: 'Processing your order',
            success: 'Redirecting to payment page',
            error: 'Something went wrong, please try again later'
        })
    }

    async function updatePaymentStatus() {
        const updatedOrder = { ...order, paid: true };

        const creationPromise = new Promise(async (resolve, reject) => {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: id, ...updatedOrder })
            }).then(res => {
                if (res.ok) {
                    resolve();
                    window.location.reload(); // Refresh the page after payment cancellation
                } else {
                    reject();
                }
            })
        });

        await toast.promise(creationPromise, {
            loading: "Updating Order",
            success: "Order Updated",
            error: "Error",
        });
    }

    async function handleUpdatepayment() {
        const updatedOrder = { ...order, paid: false };
        const updatePromise = new Promise(async (resolve, reject) => {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: id, ...updatedOrder })
            }).then(res => {
                if (res.ok) {
                    setOrder(updatedOrder);
                    resolve();
                    window.location.reload(); // Refresh the page after payment cancellation
                } else {
                    reject();
                }
            });
        });

        await toast.promise(updatePromise, {
            loading: "Updating Payment Status",
            success: "Payment cancelled",
            error: "Error",
        });
        
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center mb-8">
                <SectionHeaders mainHeader="Order Details" />
                <Tabs role={profileRole} />
            </div>

            {order && (
                <div className="grid grid-cols-2 gap-16">
                    <div>
                        {order.cartProducts.map(product => (

                            <CartProduct product={product} onRemove={profileRole === 'businessOwner' ? handleRemoveProduct : undefined} />



                        ))}
                        <div className=" flex flex-col gap-2">
                        <DeleteButton label={order.status !== 'cancelled' ? 'Cancel Order' : 'Reactivate Order'} onDelete={handleRemoveOrder} />
                        {profileRole === 'businessOwner' && order.paid !== 'true' && (<DeleteButton label={order.status !== 'cancelled' ? 'Cancel Payment' : 'Reactivate Payment'} onDelete={handleUpdatepayment} />)}

                        </div>
                        
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2>Customer Details</h2>
                        <form onSubmit={proceedToCheckout}>
                            <label>Name</label>
                            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} disabled={(profileRole === "businesOwner" || profileRole === 'cashier' || profileRole === 'waiter')} />
                            <label>Phone Number</label>
                            <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} disabled={(profileRole === "businesOwner" || profileRole === 'cashier' || profileRole === 'waiter')} />
                            <label className="flex flex-col">
                                Dine in Or Takeaway:
                                <select value={isDineIn} onChange={(e) => setIsDineIn(e.target.value === 'true')} disabled={(profileRole === "businesOwner" || profileRole === 'cashier' || profileRole === 'waiter')} >
                                    <option value="true">Dine In</option>
                                    <option value="false">Takeaway</option>
                                </select>
                            </label>
                            {order.isDineIn && (
                                <>
                                    <label>Table Number</label>
                                    <input type="text" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} disabled={(profileRole === "businesOwner" || profileRole === 'cashier' || profileRole === 'waiter')} />
                                </>
                            )}
                            <div className="flex flex-col gap-2">
                                {!order.paid ? (<>
                                    <button type="submit" >Pay Online RM{total}</button>
                                    <button type="button" onClick={() => updatePaymentStatus()} >Pay At Counter RM{total}</button>
                                </>

                                ) : <button disabled='true' className={order.paid ? 'bg-green-500' : 'bg-red-500'}>Paid RM{total}</button>}


                                {profileRole === 'businessOwner' && (
                                    <button type="button" className='bg-primary' onClick={() => handleSaveEdit()}>Save Edit</button>
                                )}

                            </div>

                        </form>
                    </div>
                </div>

            )}

        </section>
    )

}