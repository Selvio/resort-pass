import { Menu, ChevronDown, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import logo from "@/images/logo.svg";

const Header = () => {
  return (
    <header className="w-ful border-b border-gray-light flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <Button variant="ghost" size="icon">
          <Menu className="size-6 text-secondary" />
        </Button>

        <div className="flex-1 flex justify-center">
          <Image
            src={logo}
            alt="ResortPass"
            width={160}
            height={14}
            className="h-4 w-auto"
            priority
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" rounded="full">
          Login
          <ChevronDown className="size-4" />
        </Button>

        <Button size="icon" aria-label="Shopping cart" rounded="full">
          <ShoppingCart className="size-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
