'use client';
import UseProfile from "@/components/UseProfile";
import Tabs from "@/components/layout/Tabs";
import { useEffect, useState} from "react";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";


export default function EditMenuItemPage() {

    const {loading:profileLoading, role:profileRole} = UseProfile();

    const [menuItems, setMenuItems] = useState(null);
    const[image, setImage] = useState("");
        const[menuName, setMenuName] = useState("");
        const[description, setDescription] = useState("");
        const[basePrice, setBasePrice] = useState("");
        const[availabilityStatus, setAvailabilityStatus] = useState("");
        const[redirectToItems, setRedirectToItems] = useState(false);
        const {id} = useParams();
        
        // console.log("availabilityStatus",{availabilityStatus});
        

        useEffect(() => {
            fetch("/api/menu-items").then(res =>{
                res.json().then(items => {
                    const item = items.find(i => i._id === id);
                    setMenuItems(item);
                })
            })
        }, []);

    if(profileLoading){
        return <p>Loading...</p>;
    }

    if(profileRole === "waiter"|| profileRole === "kitchenStaff" || profileRole === "cashier"||profileRole === " "){
        return redirect("/login");
    }

    async function handleMenuSubmit(ev,data){
        ev.preventDefault();

        data = {...data, _id: id};
        const savingPromise = new Promise(async(resolve,reject) => {
            const response = await fetch('/api/menu-items', {
                method: "PUT",
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
        
                <MenuItemForm onSubmit={handleMenuSubmit} menuItems={menuItems} />
        
                </section>
    )
}