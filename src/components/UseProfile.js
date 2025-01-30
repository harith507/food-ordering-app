import { useEffect, useState } from "react";

export default function UseProfile() {
   const [role, setRole] = useState("");
     const [loading, setLoading] = useState(false);
   
     useEffect(() => {
       setLoading(true);
       fetch('/api/profile').then(response => {
         response.json().then(data => {
           setRole(data.role);
           setLoading(false);
         });
       });
     }, []);

     return{loading, role};
}