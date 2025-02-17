'use client';
import { toast } from "react-hot-toast";
import Tabs from "@/components/layout/Tabs";
import UseProfile from "@/components/UseProfile";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteButton from "@/components/DeleteButton";


export default function CategoriesPage() {

    const { loading: profileLoading, role: profileRole } = UseProfile();
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);

 

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
               
            })
        })
    }

    if (profileLoading) {
        return <p>Loading...</p>;
    }

    if (profileRole === "waiter" || profileRole === "kitchenStaff" || profileRole === "cashier" || profileRole === " ") {
        return redirect("/login");
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName };
            if (editingCategory) {
                data._id = editingCategory._id;
            }

            const response = await fetch("/api/categories", {
                method: editingCategory ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            setCategoryName("");
            fetchCategories();
            setEditingCategory(null);
            if (response.ok) {
                setCategoryName("");
                resolve();
            }
            else {
                reject();
            }
        });

        await toast.promise(creationPromise, {
            loading: editingCategory ? "Updating..." : "Creating your new category ...",
            success: editingCategory ? "Updated !" : "New category created",
            error: "Error",
        });
    }

    async function handleCategoryDelete(_id) {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE',
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error',
        });

        fetchCategories();
    }



    return (
        <section className="mt-8 ">
            <Tabs role={profileRole} />
            <h1 className="text-center text-primary text-4xl mt-4">Categories</h1>
            <form className="mt-8 max-w-md mx-auto" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editingCategory ? "Edit Category" : "Add New Category"}
                            {editingCategory && (<> : {editingCategory.name} </>)}

                        </label>
                        <input type="text" value={categoryName}
                            onChange={ev => setCategoryName(ev.target.value)} />

                    </div>
                    <div className="pb-2 flex gap-2">
                        <button type="submit">
                            {editingCategory ? "Update" : "Create"}
                        </button>
                        <button type="button"
                            onClick={() => {
                                setEditingCategory(null);
                                setCategoryName("");
                            }}>
                            Cancel
                        </button>

                    </div>


                </div>
            </form>

            <div className="max-w-md mx-auto">
                <h2 className="mt-8 text-gray-500">Categories :</h2>
                {categories?.length > 0 &&
                    categories.map((c) => (
                        <div
                            key={c._id} // <-- Or whatever unique field you have in c

                            className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 my-2 "
                        >
                            <div className="cursor-pointer hover:underline font-semibold grow"
                                onClick={() => {
                                    setEditingCategory(c);
                                    setCategoryName(c.name);
                                }}>{c.name}</div>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => {
                                    setEditingCategory(c);
                                    setCategoryName(c.name);
                                }} >
                                    Edit
                                </button>
                                <DeleteButton label="Delete" onDelete={() => handleCategoryDelete(c._id)} />
                            </div>

                        </div>
                    ))}

            </div>
        </section>
    );
}
