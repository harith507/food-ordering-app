import { cartProductPrice } from "@/components/AppContext"
import Trash from "@/components/icons/Trash"
import Image from "next/image"

export default function CartProduct({ product, index, onRemove }) {
    return (
      
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
                {!!onRemove && (
                    <div className="ml-2" >
                        <button type="button"
                            onClick={() => onRemove(index)}
                            className="p-2"><Trash />
                        </button>
                    </div>
                )}
                
            </div>
    
    )
}