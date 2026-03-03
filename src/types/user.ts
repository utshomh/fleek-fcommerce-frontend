export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  photoUrl?: string;
  role: "ADMIN" | "USER";
  status: "ACTIVE" | "INACTIVE";
};
