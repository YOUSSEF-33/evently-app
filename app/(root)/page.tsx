import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function Home() {                   
  return (                                         
    <section className="bg-primary-50 bg-dotted-pattern py-5 md:py-10 bg-contain">                 
      <div className="wrapper grid grid-cols-1 md:grid-cols-2 2xl:gap-0 gap-5">
       <div className="flex flex-col gap-8 ">
          <h1 className="h1-bold">
            Host, Connect, Celeprate: Your Events, Out Platform.
          </h1>
          <p className=" p-regular-20 md:p-regular-24">
            Book and learn helpful tips from 3,168+ 
            mentors and class campanies with out glopal comunity.
          </p>
          <Button>
            <Link href={"#events"} className="sm:w-fit w-full">
              Explore Now
            </Link>
          </Button>
       </div>
        <Image
          src={"/assets/images/hero.png"}
          alt="hero"
          width={1000}
          height={1000}
          className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
        />
      </div>
    </section>                                  
  );                                         
}                                             
