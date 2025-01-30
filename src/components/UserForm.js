'use client';
import { useState } from "react";

export default function UserForm({user,onSave }) {

    console.log("user",user?.email);
    const [email, setEmail] = useState(user?.email ||"");
      const [password, setPassword] = useState(user?.password || "");
      const [username, setUsername] = useState(user?.username || "");
      const [phone, setPhone] = useState(user?.phone || "");
      const [role, setRole] = useState(user?.role || "");
    
    return(
    <form className="block max-w-sm mx-auto" onSubmit={ev=>onSave(ev,{username,email,password,phone,role})}>
        <div className="my-4">
          <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} />
          <input type="text" placeholder="name" value={username} onChange={ev => setUsername(ev.target.value)} />
          <input type="password" placeholder="new password" value={password} onChange={ev => setPassword(ev.target.value)} />
          <input type="text" placeholder="phone" value={phone} onChange={ev => setPhone(ev.target.value)} />
          <label className="flex flex-col">
            Pick a role:
            <select value={role} onChange={ev => setRole(ev.target.value)}>
              <option value="businessOwner">Business Owner</option>
              <option value="waiter">Waiter</option>
              <option value="kitchenStaff">Kitchen Staff</option>
              <option value="cashier">Cashier</option>
            </select>
          </label>
        </div>
        <button type="submit" >Save</button>
    </form>
    )
}