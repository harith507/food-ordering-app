import { CartContext } from "@/components/AppContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";


export default function MenuItem(menuItem) {

  const { image, menuName, description, basePrice, category, availabilityStatus, extraOptions } = menuItem;
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [selectedOptions, setSelectedOptions] = useState([]);


  function handleAddToCart() {
    if (showPopup) {
      addToCart(menuItem, selectedOptions);
      toast.success('Success!');
      setShowPopup(false);
      return;
    }
    if (extraOptions.length === 0) {
      addToCart(menuItem)
      toast.success(`${menuName} added to cart`)
    } else {
      setShowPopup(true);
    }
  }

  function handleExtraOption(ev, extraOptions) {
    const checked = ev.target.checked;

    if (checked) {
      setSelectedOptions(prev => [...prev, extraOptions])

    } else {
      setSelectedOptions(prev => {
        return prev.filter(e => e.name !== extraOptions.name)
      })
    }
  }

  let selectedPrice = basePrice;
  if (selectedOptions?.length > 0) {
    for (const extra of selectedOptions) {
      selectedPrice += extra.price;
    }
  }
  
  console.log(menuItem);



    return (
      <>
        {showPopup && (
          <div onClick={() => setShowPopup(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center">


            <div onClick={ev => ev.stopPropagation()} className="bg-white p-4 rounded-lg max-w-md my-8 ">

              <div className="overflow-y-scroll p-2"
                style={{ maxHeight: 'calc(100vh - 100px)' }}>
                <Image src={image} alt={menuName} width={300} height={200} className="mx-auto" />
                <h2 className="text-lg font-semibold mb-2">{menuName}</h2>
                <p className="text-center text-gray-600 text-sm">{description}</p>
                {extraOptions.length > 0 && (
                  <div className="p-2">

                    <h3 className="text-center text-gray-600">Extra Options</h3>
                    {extraOptions.map(option => (

                      <label key={option.name} className="flex item-center gap-2 p-4 border rounded-md mb-1">
                        <input type="checkbox" onClick={ev => handleExtraOption(ev, option)} />
                        {option.name} RM{option.price}
                      </label>


                    ))}
                  </div>
                )}

                <button onClick={handleAddToCart} className="bg-primary sticky bottom-2" type="button">Add to Cart RM{selectedPrice}</button>
                <button onClick={() => setShowPopup(false)} className="mt-2" type="button">Cancel</button>
              </div>

            </div>
          </div>
        )}

        <MenuItemTile onAddToCart={handleAddToCart}
          {...menuItem} />

      </>
    );
  }