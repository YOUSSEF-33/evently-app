import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
        <div className="flex-col items-center justify-between p-5 sm:flex">
           <Link href="/" className="m-1">
              <Image 
                alt=""
                src={"/assets/images/logo.svg"}
                width={128}
                height={128}
              />
           </Link>
           <h1>2024 Evently. All rights reserved</h1>
        </div>
    </footer>
  );
}

export default Footer;