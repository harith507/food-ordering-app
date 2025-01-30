'use client';
import EditableImage from "@/components/layout/EditableImage";
import Tabs from "@/components/layout/Tabs";
import UseProfile from "@/components/UseProfile";
import { resolve } from "path";
import { use, useMemo, useState } from "react";
import toast from "react-hot-toast";


export default function MenuItemsPage() {

    const[image, setImage] = useState("");
    const[menuName, setMenuName] = useState("");
    const[description, setDescription] = useState("");
    const[basePrice, setBasePrice] = useState("");
    const[availabilityStatus, setAvailabilityStatus] = useState(null);
    

    const {loading:profileLoading, role:profileRole} = UseProfile();

    if(profileLoading){
        return <p>Loading...</p>;
    }

    if(!profileRole ==="businessOwner"){
        return redirect("/login");}


    async function handleMenuSubmit(ev){
        ev.preventDefault();

        const data = {image, menuName, description, basePrice, availabilityStatus};
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
       
        }

    

    return(
        <section className="mt-8">
        <Tabs role={profileRole} />

        <form className="mt-8 max-w-md mx-auto" onSubmit={handleMenuSubmit}>
            <div className="grid gap-4 items-start" 
                style={{gridTemplateColumns: "0.3fr 0.7fr"}}>
                {/* need menu name, desc,price,availbility status@status, img */}
                <div className="max-w-[200px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow">
                    
                    <label>
                        Menu Name
                    </label>
                    <input type="text" value={menuName}  onChange={ev => setMenuName(ev.target.value)}/>
                    <label>
                        Description
                    </label>
                    <input type="text" value={description}  onChange={ev => setDescription(ev.target.value)}/>
                    <label>
                        Base Price
                    </label>
                    <input type="text" value={basePrice}  onChange={ev => setBasePrice(ev.target.value)}/>
                    
                    <label className="flex flex-col">
                    Status:
                    <select className={availabilityStatus === "true" ? "bg-green-300" : "bg-red-300" } value={availabilityStatus} onChange={ev => setAvailabilityStatus(ev.target.value)}>
                        <option className="bg-green-400" value="true">Available</option>
                        <option className="bg-red-400" value="false">Not Available</option>
                    </select>
                    </label>

                    
                    <button type="submit">Save</button>
                </div>
                

            </div>

        </form>

        </section>
    )
}