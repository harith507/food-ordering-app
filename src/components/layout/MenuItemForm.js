import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import { useEffect } from "react";

import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItems }) {

    const [image, setImage] = useState(menuItems?.image || "");
    const [menuName, setMenuName] = useState(menuItems?.menuName || "");
    const [description, setDescription] = useState(menuItems?.description || "");
    const [basePrice, setBasePrice] = useState(menuItems?.basePrice || "");
    const [availabilityStatus, setAvailabilityStatus] = useState(menuItems?.availabilityStatus || "true");
    const [extraOptions, setExtraOptions] = useState(menuItems?.extraOptions || []);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(menuItems?.category || "");

    useEffect(() => {
      fetch('/api/categories').then(res => {
        res.json().then(categories=>{
            setCategories(categories);
        });
      })
    }, [])
    
    

    

    return (
        <form className="mt-8 max-w-md mx-auto"
            onSubmit={ev => onSubmit(ev, { image, menuName, description, basePrice, availabilityStatus,extraOptions,category })}>
            <div className="grid gap-4 items-start"
                style={{ gridTemplateColumns: "0.3fr 0.7fr" }}>
                {/* need menu name, desc,price,availbility status@status, img */}
                <div className="max-w-[200px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow">

                    <label>
                        Menu Name
                    </label>
                    <input type="text" value={menuName} onChange={ev => setMenuName(ev.target.value)} />
                    <label>
                        Description
                    </label>
                    <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />
                    <label>
                        Base Price
                    </label>
                    <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)} />

                    <label>Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c =>(
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ) )}

                        {categories?.length === 0 && <option value="">No Categories</option>}
                    </select>

                    <label className="flex flex-col">
                        Status:
                        <select className={availabilityStatus ? "bg-green-300" : "bg-red-300"} value={availabilityStatus} onChange={ev => setAvailabilityStatus(ev.target.value)}>
                            <option className="bg-green-400" value="true">Available</option>
                            <option className="bg-red-400" value="false">Not Available</option>
                        </select>
                    </label>

                    <MenuItemPriceProps 
                    name={'Extra Option'}
                    addLabel ={"Option"}
                     props={extraOptions} setProps={setExtraOptions} />

                    
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    );

}