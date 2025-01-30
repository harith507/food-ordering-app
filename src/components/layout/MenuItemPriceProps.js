import { useState } from "react";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";

export default function MenuItemPriceProps({name,addLabel,props, setProps}) {

    const[isOpen, setIsOpen] = useState(false);

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
                        
                                <button onClick={()=>setIsOpen(props =! props)} type="button" className="inline-flex border-0 p-1 "> 
                                    {isOpen ? < ChevronUp/> : < ChevronDown/>}
                                    
                                    <span className="mx-2">{name}</span>
                                    <span className="mx-2">({props?.length})</span>

                                    </button>

                                    <div className={isOpen ? "block" : "hidden"}>
                                    {props?.length > 0 && props.map((extra, index) => (
                            <div key={index} className="flex gap-2 items-end ">
                                <div>
                                    <label className="text-sm ">Name</label>
                                    <input type="text" placeholder="Option Name"
                                        value={extra.name}
                                        onChange={ev => editProps(ev, index, 'name')}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm ">Price</label>
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
                                <span> {addLabel}</span>
                        </button>
                                    </div>
                                                    
                      
                    </div>
    )
}