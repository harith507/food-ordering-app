'use client';
import { useSession} from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Tabs from "@/components/layout/Tabs";
import UserForm from "@/components/UserForm";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [user,setUser] = useState(null);

  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          setUser(data);
          setProfileFetched(true);
        })
      });
    }
  }, [session, status]);

  async function handleProfileUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('api/profile', {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Saved",
      error: "Failed",
    });
  }

    if (status === 'loading' || !profileFetched) {
      return 'Loading...';
    }
  
  
    if (status === 'unauthenticated') {
      return redirect('/login');
    }


  return (
    <section className="mt-8">
      <Tabs role={user.role} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileUpdate}/>
      </div>
   
      
    </section>
  );
}