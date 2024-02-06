import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-5 md:px-10 bg-slate-50">
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
      <div className="hidden md:flex-center">
        <NavItems />
      </div>
      <div className=" flex items-center justify-between">
        <div className="px-4">
          <SignedOut>
            <Button asChild className="text-xl rounded-2xl" size="lg">
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Header;
