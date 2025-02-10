'use client'
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useState, useContext, useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import CartProduct from "@/components/layout/Menu/cartProduct";
import UseProfile from "@/components/UseProfile";
import DeleteButton from "@/components/DeleteButton";
import { toast } from "react-hot-toast";



export default function OrderPage() {
// filter by order by today date
    const {loading:profileLoading, role:profileRole} = UseProfile();
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

    
    console.log(order);
    

    async function handleRemoveOrder() {
        
        const creationPromise = new Promise(async (resolve, reject) => {
            fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: id, status: 'cancelled' })
            }).then(res => {
                if (res.ok) {
                    setOrder({
                        ...order,
                        status: 'cancelled'
                    })
                    resolve();
                    redirect('/orders');
                }
                else{
                    reject();
                }
            })
        });

        await toast.promise(creationPromise, {
            loading:  "Cancelling Order",
            success:  "Order Cancelled",
            error: "Error",
        });
        
    }

    function handleRemoveProduct(productId) {
        fetch('/api/orders', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: id, productId})
        }).then(res => {
            if (res.ok) {
                setOrder({
                    ...order,
                    cartProducts: order.cartProducts.filter(p => p._id !== productId)
                })
            }
        })
    }

    function handleSaveEdit() { 

        const updatedOrder = { ...order, customerName, customerPhone, isDineIn, tableNumber };

        fetch('/api/orders', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: id, ...updatedOrder })
        }).then(res => {
            if (res.ok) {
                console.log('success');
            } 
    } )
}

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Order Details" />
                <div className="my-4">
                    <p>Thanks for ordering</p>
                    <p>Please click the order tab to view your order progress</p>
                </div>
            </div>

            {order && (
                <div className="grid grid-cols-2 gap-16">
                    <div>
                        {order.cartProducts.map(product => (
                            
                                <CartProduct product={product} onRemove={profileRole === 'businessOwner' ? handleRemoveProduct : undefined} />
                                
                            
                            
                        ))}
                        <DeleteButton label={'Cancel Order'} onDelete={handleRemoveOrder} />
                       
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2>Customer Details</h2>
                        <form >
                            <label>Name</label>
                            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} disabled={(profileRole === "businesOwner" || profileRole === 'cashier' || profileRole === 'waiter' )} />
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
                                    <input type="text" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} disabled={(profileRole === "businesOwner" || profileRole === 'cashier' ||  profileRole === 'waiter')} />
                                </>
                            )}
                            <div className="flex flex-col gap-2">
                                {   !order.paid ? (
                                        <button className="bg-red-500">Pay RM{total}</button>
                                ):<button className={order.paid ? 'bg-green-500':'bg-red-500'}>Paid RM{total}</button>}
                                
                                
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