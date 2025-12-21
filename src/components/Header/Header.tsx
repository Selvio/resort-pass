import { Menu, ChevronDown, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import logo from "@/images/logo.svg";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-light">
      <div className="max-w-7xl mx-auto px-4 py-3 md:px-6 xl:px-0 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="size-6 text-secondary" />
          </Button>

          <div className="flex-1 flex justify-start md:flex-none">
            <Image
              src={logo}
              alt="ResortPass"
              width={160}
              height={14}
              className="h-4 w-auto md:h-5"
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
      </div>
    </header>
  );
};

export default Header;
