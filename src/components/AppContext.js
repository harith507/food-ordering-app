'use client';
import { set } from "mongoose";
import { SessionProvider } from "next-auth/react";
import { useEffect,useState,createContext } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let total = cartProduct.basePrice || 0;
  if (cartProduct.extraOptions?.length) {
    for (const extra of cartProduct.extraOptions) {
      total += extra.price || 0;
    }
  }
  return total;
}

export function AppProvider({children}){
    
    const [cartProducts, setCartProducts] = useState([]);
    const ls = typeof window !== "undefined" ? window.localStorage:null;
    
    

    useEffect(() => {
      if(ls && ls.getItem('cart')){
        setCartProducts(JSON.parse(ls.getItem('cart')));

      }
    }, [])

    function saveCartProductToLocalStorage(cartProducts){
        if(ls){
            ls.setItem("cart", JSON.stringify(cartProducts));
        }
    }

    function clearCart(){
        setCartProducts([]);
        saveCartProductToLocalStorage([]);
    }

    function removeCartProduct(indexToRemove){
        setCartProducts(prevCartProducts =>{
            const newCartProducts = prevCartProducts.filter((v,index)=>index !== indexToRemove);
            saveCartProductToLocalStorage(newCartProducts);
            toast.success('Product removed from cart');
            return newCartProducts;
        })
        toast.success('Product removed from cart');
    }
    

    function addToCart(product, extraOptions=[]){

        

        setCartProducts(prevProduct => {
            const cartProduct = {...product, extraOptions};
            const newProducts = [...prevProduct, cartProduct ];
            saveCartProductToLocalStorage(newProducts);
            return newProducts;
        });
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts, addToCart,removeCartProduct, clearCart
                }}> 
             {children}
            </CartContext.Provider>
        </SessionProvider>
    );
};