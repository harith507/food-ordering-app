'use client';
import { useState } from "react";
import UseProfile from "./UseProfile";

export default function UserForm({user,onSave }) {

    const [email, setEmail] = useState(user?.email ||"");
      const [password, setPassword] = useState( "");
      const [username, setUsername] = useState(user?.username || "");
      const [phone, setPhone] = useState(user?.phone || "");
      const [role, setRole] = useState(user?.role || "");
      const [active, setActive] = useState(user?.active || true);
      const {loading:profileLoading, role:profileRole} = UseProfile();
    
    return(
    <form className="block max-w-sm mx-auto" onSubmit={ev=>onSave(ev,{username,email,password,phone,role})}>
        <div className="my-4">
          <label>Email</label>
          <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} />
          <label>Username</label>
          <input type="text" placeholder="name" value={username} onChange={ev => setUsername(ev.target.value)} />
          <label>Change Password</label>
          <input type="password" placeholder="new password" value={password} onChange={ev => setPassword(ev.target.value)} />
          <label>Phone Number</label>
          <input type="text" minLength="10" placeholder="phone" value={phone} onChange={ev => setPhone(ev.target.value)} />
          <label className="flex flex-col">
                Account Status:
                <select value={active} onChange={ev => setActive(ev.target.value)}>
                <option value="true">Active</option>
                  <option value="false">Disable</option>
                </select>
              </label>
          {
            profileRole === "businessOwner"  ? (
              <label className="flex flex-col">
                Pick a role:
                <select value={role} onChange={ev => setRole(ev.target.value)}>
                <option value="businessOwner">Business Owner</option>
                  <option value="waiter">Waiter</option>
                  <option value="kitchenStaff">Kitchen Staff</option>
                  <option value="cashier">Cashier</option>
                </select>
              </label>
            ) : (<label className="flex flex-col">
                Role:
                <input type="text" value={role} readOnly />
              </label>)
          }
          
        </div>
        <button type="submit" >Save</button>
    </form>
    )
}