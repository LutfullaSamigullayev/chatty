import { useState } from "react";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const [image, setImage] = useState("/default-avatar.jpg");
  const [name] = useState("Davron Nurmahammadov");
  const [email] = useState("davron01@mail.ru");
  const [memberSince] = useState("2025-07-13");
  const [status] = useState("Active");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

      <div className="flex flex-col items-center gap-4 mb-8 relative">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={image} alt="avatar" />
            </div>
          </div>
          <input
            type="file"
            id="avatar-upload"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
          <span className="absolute bottom-2 right-2 bg-base-100 p-1 rounded-full shadow-md">
            <Pencil size={16} />
          </span>
        </label>
      </div>

      <div className="mb-4">
        <label className="label">Full Name</label>
        <input type="text" value={name} readOnly className="input input-bordered w-full" />
      </div>

      <div className="mb-4">
        <label className="label">Email Address</label>
        <input type="email" value={email} readOnly className="input input-bordered w-full" />
      </div>

      <div className="mb-4">
        <label className="label">Member Since</label>
        <input type="text" value={memberSince} readOnly className="input input-bordered w-full" />
      </div>

      <div>
        <label className="label">Account Status</label>
        <input type="text" value={status} readOnly className="input input-bordered w-full" />
      </div>
    </div>
  );
}
