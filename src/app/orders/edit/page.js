'use client';
import Tabs from "@/components/layout/Tabs";
import UseProfile from "@/components/UseProfile";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Trash from "@/components/icons/Trash";
import Image from "next/image";


export default function OrdersEditPage() { 
    const{loading: profileLoading, role: profileRole} = UseProfile();
    if(profileLoading) return <div>Loading...</div>
    return(
    <section className="mt-8">
    <Tabs role={profileRole} />
    
                <div className="text-center mt-2">
                    <SectionHeaders mainHeader="Order Details" />
                </div>
    
                <div className="grid gap-4 grid-cols-2">
                    <div>
                        
                       
                            <div className="flex gap-4 items-center mb-2 border-b py-4">
                                <div className="w-24">
                                    <Image src='/nasiKerabu.png' alt="Menu Image" width={240} height={240} />
                                </div>
                                <div className="grow">
    
                                    <h3>Nasi Kerabu</h3>
                                    
                                        <div>
                                            <div className="text-sm text-gray-500">
                                               
                                                    <div>
                                                        Ayam RM5
                                                    </div>
                                              
                                            </div>
                                        </div>                                   
                                </div>
                                <div className="text-lg font-semibold">
                                    RM15
                                </div>
                                <div className="ml-2" >
                                    <button type="button"
                                        className="p-2"><Trash /></button>
                                </div>
    
                            </div>
    
                   
                        <div className="py-4 text-right pr-16">
                            <span className="text-gray-600">Subtotal  </span>
                            <span className="text-lg font-semibold pl-2">RM15</span>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2>Checkout</h2>
                        <form>
                            <label>Name</label>
                            <input type="text" value="Ali" placeholder="Name" />
                            <label>Phone Number</label>
                            <input type="text" value="018663512" required placeholder="Phone Number" />
                            <label>Table Number</label>
                            <input type="text" value="4" required placeholder="..." />
                            <button type="submit">Paid RM15</button>
                        </form>
                    </div>
                </div>
            </section>
)}