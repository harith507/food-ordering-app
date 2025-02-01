

export default function MenuItemTile({onAddToCart,...item}) {
    const { menuName, description, image, basePrice } = item;
    return (
        <div className="bg-gray-200 p-4 rounded-lg group hover:bg-white transition-all hover:shadow-md hover:shadow-black/30">
        <div className=" text-center ">
          <img src={image} alt="Nasi Kerabu" className="max-h-auto max-h-30 block mx-auto" />
        </div>
        <h4 className="text-xl font-semibold">{menuName}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
        <button className="bg-primary text-white rounded-full px-4 py-2" onClick={onAddToCart} >Add to Cart RM{basePrice}</button>
      </div>

    )
}