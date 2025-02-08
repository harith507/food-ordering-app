import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {

    const [confirmation, setConfirmation] = useState(false);

    if (confirmation) {
        return (
            <>
                <div className="fixed bg-black/80 inset-0 items-center flex h-full justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <div className="font-semibold mb-2">Are you sure you want to delete?</div>
                        <div className="flex gap-2 ">

                            <button className=" bg-red-500" onClick={() => onDelete()}>Yes</button>
                            <button onClick={() => setConfirmation(false)}>No</button>
                        </div>

                    </div>

                </div>

            </>

        )
    }

    return (
        <button type="button" onClick={() => setConfirmation(true)} >{label}</button>

    )
}