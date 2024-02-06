import React from "react";
import NavItems from "./NavItems";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu3Fill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

const MobileMenu = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <RiMenu3Fill size={25} />
        </SheetTrigger>
        <SheetContent className=" bg-slate-100">
          <SheetHeader>
            <SheetTitle className="pb-6">
              <div className="img-icon">
                <Link href={"/"}>
                  <Image
                    src={"/assets/images/logo.svg"}
                    width={130}
                    height={130}
                    alt="evently logo"
                  />
                </Link>
              </div>
            </SheetTitle>
          </SheetHeader>
          <hr className="m-4"/>
          <div>
            <NavItems/>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
