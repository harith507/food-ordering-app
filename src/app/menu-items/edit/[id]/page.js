'use client';
import UseProfile from "@/components/UseProfile";
import Tabs from "@/components/layout/Tabs";
import { useEffect, useState} from "react";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";


export default function EditMenuItemPage() {

    const {loading:profileLoading, role:profileRole} = UseProfile();

    const [menuItems, setMenuItems] = useState(null);
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


        async function handleMenuDelete(){

            const promise = new Promise(async(resolve,reject) => {

                const res = await fetch(`/api/menu-items?_id=${id}`,{
                    method: "DELETE"
                });
                if(res.ok){
                    resolve();
                }
                else{
                    reject();
                }
            });

            toast.promise(promise, {
                loading: "Deleting...",
                success: "Deleted",
                error: "Failed to delete"
            });

            setRedirectToItems(true);
        }


    
    return(
        <section className="mt-8">
                <Tabs role={profileRole} />
        
                <MenuItemForm onSubmit={handleMenuSubmit} menuItems={menuItems} />
                <div className="max-w-md mx-auto mt-2">
                    <div className="max-w-xs ml-auto pl-4">
                        <DeleteButton 
                        label="Delete"
                        onDelete={handleMenuDelete} 
                        />
                        
                    </div>
                  
                </div>
                
                </section>
    )
}