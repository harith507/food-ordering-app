import { useState } from "react";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";

export default function MenuItemPriceProps({props, setProps}) {


    function addProps() {
            setProps(oldProps => {
                return [...oldProps, { name: "", price: 0 }];
            })
        }
    
        function editProps(ev, index, prop) {
            const newValue = ev.target.value;
            setProps( prevExtraOptions => {
                const newExtraOptions = [...prevExtraOptions];
                newExtraOptions[index][prop] = newValue;
    
                return newExtraOptions;
            });
        }
    
        function removeProps(indexToRemove){
            setProps(old => old.filter((v,index) => index !== indexToRemove ));
        }


    return(
        <div className="bg-gray-200 p-2 rounded-md mb-2">
                        <label>Extra Option</label>
                        {props?.length > 0 && props.map((extra, index) => (
                            <div key={index} className="flex gap-2 items-end ">
                                <div>
                                    <label className="text-sm ">Option Name</label>
                                    <input type="text" placeholder="Option Name"
                                        value={extra.name}
                                        onChange={ev => editProps(ev, index, 'name')}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm ">Option Price</label>
                                    <input type="text" placeholder="RM..."
                                        value={extra.price}
                                        onChange={ev => editProps(ev, index, 'price')}
                                    />
                                </div>

                                <div> 
                                    <button type='button' 
                                    onClick={()=> removeProps(index)}
                                    className="bg-white mb-2 px-2">
                                        <Trash />
                                    </button>
                                </div>

                            </div>
                        ))}
                        <button type="button"
                            onClick={addProps}
                            className="bg-white flex items-center justify-center gap-2 px-2">
                                <Plus /> 
                                <span> Add Extra Option </span>
                        </button>
                    </div>
    )
}