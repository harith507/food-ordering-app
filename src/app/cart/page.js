'use client'
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext } from "react";
import { CartContext } from "@/components/AppContext";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import { cartProductPrice } from "@/components/AppContext";
import { useState } from "react";

export default function Home() {

    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const[customerName,setCustomerName] = useState('');
    const [customerTable,setCustomerTable] = useState('');
    const [customerPhone,setCustomerPhone] = useState('');

    let total = 0;
    for (const p of cartProducts) {
        total += cartProductPrice(p)
    }

    async function handleCustomerSubmit(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { customerName,customerTable,customerTable };
            if (editingCategory) {
                data._id = editingCategory._id;
            }

            const response = await fetch("/api/categories", {
                method: editingCategory ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            setCategoryName("");
            fetchCategories();
            setEditingCategory(null);
            if (response.ok) {
                setCategoryName("");
                resolve();
            }
            else {
                reject();
            }
        });
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
                        <div className="flex gap-4 items-center mb-2 border-b py-4">
                            <div className="w-24">
                                <Image src={product.image} alt="Menu Image" width={240} height={240} />
                            </div>
                            <div className="grow">

                                <h3>{product.menuName}</h3>
                                {product.extraOptions?.length > 0 && (
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            {product.extraOptions.map(option => (
                                                <div>
                                                    {option.name} RM{option.price}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                )}
                            </div>
                            <div className="text-lg font-semibold">
                                RM{cartProductPrice(product)}
                            </div>
                            <div className="ml-2" >
                                <button type="button"
                                    onClick={() => removeCartProduct(index)}
                                    className="p-2"><Trash /></button>
                            </div>

                        </div>

                    ))}
                    <div className="py-4 text-right pr-16">
                        <span className="text-gray-600">Subtotal  </span>
                        <span className="text-lg font-semibold pl-2">RM{total}</span>
                    </div>
                    <div className="py-4 text-right pr-16">
                        <span className="text-gray-600">Waiting Time to Complete  </span>
                        <span className="text-lg font-semibold pl-2">15 Minutes</span>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form>
                        <label>Name</label>
                        <input type="text" value={customerName} onChange={ev => setCustomerName(ev.target.value)} placeholder="Name" />
                        <label>Phone Number</label>
                        <input type="text" value={customerPhone} onChange={ev => setCustomerPhone(ev.target.value)} required placeholder="Phone Number" />
                        <label>Table Number</label>
                        <input type="text" value={customerTable} onChange={ev => setCustomerTable(ev.target.value)} required placeholder="..." />
                        <button type="submit">Pay RM{total}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}