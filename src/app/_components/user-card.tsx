"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth-provider";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
};

export default function UserCard() {
  const { accessToken } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        setUser(response.data.data);
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [accessToken]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    setUpdating(true);
    try {
      const formData = new FormData();
      if (username) formData.append("name", username);
      if (password) formData.append("password", password);
      if (image) formData.append("photo", image);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setUser(response.data.data);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-100">
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error || !user) {
    return (
      <Card className="w-100">
        <CardContent className="py-6 text-center text-sm text-red-500">
          {error || "No user found"}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-100 shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={user.photoUrl} alt={user.name} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button
            className="ml-auto"
            onClick={() => setIsModalOpen(true)}
            variant="outline"
          >
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
        </CardContent>
      </Card>

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Update User
                  </Dialog.Title>
                  <div className="mt-4 flex flex-col gap-4">
                    <Input
                      placeholder="Fullname"
                      defaultValue={user.name}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      defaultValue={user.email}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {preview && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview}
                        alt="Preview"
                        className="mt-2 h-24 w-24 object-cover rounded-md"
                      />
                    )}
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdate} disabled={updating}>
                      {updating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
