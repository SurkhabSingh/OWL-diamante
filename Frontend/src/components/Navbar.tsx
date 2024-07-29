import { useEffect, useState } from "react";

import CreateWallet from "./Home/ImportWallet";
import owl from "../assets/owl.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { createUser, getAllUsers } from "@/api/user/createUser";
import { MdShoppingCart } from "react-icons/md";
import { useSidebarStore, useCartStore } from "@/store/store";
import { Button } from "@nextui-org/react";
import { IoIosChatbubbles } from "react-icons/io";
import { toast } from "react-toastify";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export function NavbarComp() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { cart } = useCartStore();
  const { setButtonIndex } = useSidebarStore();
  const [publicAddress, setPublicAddress] = useState();

  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Marketplace",
      href: "/market",
      description: "Explore what we offer",
    },
    {
      title: "Profile",
      href: "/profile",
      description: "Login/check out your user dashboard",
    },
  ];

  // const handleWalletConnect = async () => {
  //   let public_address = "";
  //   if (!window.diam) {
  //     toast.error("Please install Diam Wallet extension.");
  //     return;
  //   }
  //   window.diam
  //     .connect()
  //     .then((result) => {
  //       toast.success(`Wallet connected succesfully`);
  //       public_address = result.message[0];
  //       console.log(result);
  //       sessionStorage.setItem("public_address", public_address);
  //       setPublicAddress(public_address);
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };

  // const handleDisconnect = () => {
  //   sessionStorage.removeItem("public_address");
  // };


  return (
    <NavigationMenu
      className=" flex justify-between  items-center  mb-16  px-12 py-4"
      style={{ width: "100%" }}
    >
      <NavigationMenuList>
        <div className="inline-flex items-center space-x-2">
          <Link to="/">
            <span>
              <img width={40} height={40} src={owl} alt="owl_logo" />
            </span>
          </Link>
        </div>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuTrigger className="tracking-tighter">
              Home
            </NavigationMenuTrigger>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/market">
            <NavigationMenuTrigger>Marketplace</NavigationMenuTrigger>
          </Link>
        </NavigationMenuItem>

        {sessionStorage.getItem("publicKey") === null ? (
          <div></div>
        ) : (
          <NavigationMenuItem>
            <Link to="/profile">
              <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
      <NavigationMenuList>
        {
          <div className="flex gap-x-2">
            <Button
              className="flex -px-6 bg-inherit hover:bg-[rgba(255,255,255,0.09)] "
              onClick={() => {
                navigate("/profile");
                setButtonIndex(2);
              }}
              variant="solid"
            >
              <MdShoppingCart className=" text-xl text-white" />
              {cart.length === 0 ? (
                <div></div>
              ) : (
                <div className="absolute top-0 right-3 font-urbanist bg-red-500 text-white rounded-full w-5 h-4 flex items-center justify-center ">
                  {cart.length}
                </div>
              )}

              {/* <div className="absolute top-0 bg-red-500 text-white rounded-full w-5 h-4 flex items-center justify-center">
              {cart.length}
            </div> */}
            </Button>
            <Button
              className="flex -px-6 bg-inherit hover:bg-[rgba(255,255,255,0.09)] "
              onClick={() => {
                navigate("/profile");
                setButtonIndex(1);
              }}
              variant="solid"
            >
              <IoIosChatbubbles className=" text-xl text-white" />
            </Button>
          </div>
        }
        <div className="flex gap-x-5 items-center justify-center">
          {sessionStorage.getItem("publicKey") === null ? (
            <div className="flex gap-x-5">
              <CreateWallet />
              {/* <Button
                variant="shadow"
                onClick={handleWalletConnect}
                className="font-bold font-urbanist text-lg text-black bg-violet-400 shadow-gray-600"
              >
                Connect Wallet
              </Button> */}
            </div>
          ) : (
            <Dropdown className="bg-black text-white">
              <DropdownTrigger>
                <Button
                  className="flex p-3 bg-inherit hover:bg-[rgba(255,255,255,0.09)]"
                  onClick={() => setButtonIndex(0)}
                >
                  <span className="font-urbanist tracking-wider font-bold text-white  rounded-md">
                    {sessionStorage.getItem("publicKey").slice(0, 15) + "..."}
                  </span>
                  <RiAccountCircleFill className="text-3xl text-white rounded-lg" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="disconnect"
                  className="font-urbanist  text-xl tracking-wider hover:bg-[rgba(255,255,255,0.3)] hover:text-white"
                >
                  Disconnect
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>

        {/* <w3m-button /> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
