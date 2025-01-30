import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link,setLink}) {


   
        async function handleFileChange(ev){
            const files = ev.target.files;
            if (files?.length===1) {
                const data = new FormData;
                data.set('file', files[0]);

                const uploadPromise = fetch('/api/upload',{
                    method: 'POST',
                    body: data,
                }).then(res => {
                    if (res.ok) {
                        return res.json().then(link =>{
                            setLink(link);
                        })
                    }

                    throw new Error("Something went wrong");
                });

                await toast.promise(uploadPromise, {
                    loading: "Uploading image...",
                    success: "Image uploaded",
                    error: "Failed to upload image",
                });
            }
        }

        return(
            <>
            {link && (
                < Image className="rounded-lg w-full h-full mb-1 " src={link} 
                width={250} height={250} alt={'image'} />
            )}

            {!link && (
                <div className=" text-center bg-gray-300">
                   No Image
                </div>
            )}

            <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                    Edit
                </span>
            </label>
            </>
            
        )
}