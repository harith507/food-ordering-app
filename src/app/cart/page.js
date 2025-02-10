'use client'
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect } from "react";
import { CartContext } from "@/components/AppContext";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import { cartProductPrice } from "@/components/AppContext";
import { useState } from "react";
import toast from "react-hot-toast";
import CartProduct from "@/components/layout/Menu/cartProduct";

export default function Home() {

    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [customerName, setCustomerName] = useState('');
    const [customerTable, setCustomerTable] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [dineOrTakeaway, SetDineOrTakeaway] = useState('dine');

    let total = 0;
    for (const p of cartProducts) {
        total += cartProductPrice(p)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('cancel=1')) {
                toast.error('Your payment failed')
            }
        }
    }, [])

    async function proceedToCheckout(ev) {
        ev.preventDefault();

        let customerData = { customerName, customerPhone, dineOrTakeaway };
        if (dineOrTakeaway === 'dine') {

            customerData = { ...customerData, customerTable };
        }

        const promise = new Promise((resolve, reject) => {
            fetch('api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerData,
                    cartProducts
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


    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">

                <SectionHeaders mainHeader="Cart" />
                <p className="mt-4">Your cart is empty, add your food and drinks now !</p>

            </section>
        )
    }



    return (
        <section className="mt-8 ">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>

            <div className="grid gap-4 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div> No Products in your shopping cart </div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct
                          key={index}
                          product={product}
                          index={index}
                          onRemove={removeCartProduct}
                        />
                    ))}
                    <div className="py-4 text-right pr-16">
                        <span className="text-gray-600">Total  </span>
                        <span className="text-lg font-semibold pl-2">RM{total}</span>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <label>Name</label>
                        <input type="text" value={customerName} onChange={ev => setCustomerName(ev.target.value)} placeholder="Name" />
                        <label>Phone Number</label>
                        <input type="text" value={customerPhone} onChange={ev => setCustomerPhone(ev.target.value)} required placeholder="Phone Number" />
                        <label className="flex flex-col">
                            Dine in Or Takeaway:
                            <select value={dineOrTakeaway} onChange={ev => SetDineOrTakeaway(ev.target.value)}>
                                <option value="dine">Dine In</option>
                                <option value="takeaway">Takeaway</option>
                            </select>
                        </label>
                        {dineOrTakeaway === 'dine' && (
                            <>
                                <label>Table Number</label>
                                <input type="text" value={customerTable} onChange={ev => setCustomerTable(ev.target.value)} required placeholder="..." />
                            </>
                        )}



                        <button type="submit">Pay RM{total}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}