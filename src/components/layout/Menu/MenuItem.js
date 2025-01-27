
export default function MenuItem({ title, description, price, image }) {
  return (
    <>
      
                <div className="bg-gray-200 p-4 rounded-lg group hover:bg-white transition-all hover:shadow-md hover:shadow-black/30"> 
                    <div className=" text-center ">
                        <img src="/nasikerabu.png" alt="Nasi Kerabu" className="max-h-auto max-h-30 block mx-auto" />
                    </div>
                    <h4 className="text-xl font-semibold">Nasi Kerabu</h4>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <button className="bg-primary text-white rounded-full px-4 py-2">Add to Cart RM9</button>
                </div>
           
    </>
  );
}