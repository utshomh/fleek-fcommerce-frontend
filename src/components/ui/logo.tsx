import { ShoppingBag } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="h-6 w-6 text-primary" />
      <h1 className="text-xl font-bold tracking-tight">Fleek FCommerce</h1>
    </div>
  );
}
