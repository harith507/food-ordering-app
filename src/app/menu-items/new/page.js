'use client';
import UseProfile from "@/components/UseProfile";
import Tabs from "@/components/layout/Tabs";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage(){
        const {loading:profileLoading, role:profileRole} = UseProfile();
        const[availabilityStatus, setAvailabilityStatus] = useState("true");
        const[redirectToItems, setRedirectToItems] = useState(false);

    if(profileLoading){
        return <p>Loading...</p>;
    }

    if(profileRole === "waiter"|| profileRole === "kitchenStaff" || profileRole === "cashier"||profileRole === " "){
        return redirect("/login");
    }

    async function handleMenuSubmit(ev,data){
        ev.preventDefault();
        const savingPromise = new Promise(async(resolve,reject) => {
            const response = await fetch('/api/menu-items', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                });

                if(response.ok){
                    resolve();
                }
                else{
                    reject();
                }
        });

        await toast.promise(savingPromise, {
            loading: "Saving...",
            success: "Saved",
            error: "Failed ",
        })

        setRedirectToItems(true);
       
        }

        if (redirectToItems){
            return redirect("/menu-items");
        }


    return(
        <section className="mt-8">
        <Tabs role={profileRole} />

        <MenuItemForm onSubmit={handleMenuSubmit} menuItems={null} />
        
        </section>
    )
}