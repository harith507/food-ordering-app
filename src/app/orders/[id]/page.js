'use client'
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect } from "react";



export default function OrderPage() {

    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }


    }, [])


    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Order Details" />
                <div className="my-4">
                    <p>Thanks for ordering</p>
                    <p>Please click the order tab to view your order progress</p>
                </div>
            </div>

            products

        </section>
    )

}