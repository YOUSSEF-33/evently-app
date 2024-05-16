import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.action";
import { IEvent } from "@/lib/database/models/event.model";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const events = await getAllEvents({
    query: "",
    page: 1,
    category: "",
    limit: 3,
});
  //console.log(events)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern py-5 md:py-10 bg-contain">
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 2xl:gap-0 gap-5">
          <div className="flex flex-col gap-8 ">
            <h1 className="h1-bold">
              Host, Connect, Celeprate: Your Events, Out Platform.
            </h1>
            <p className=" p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors and class
              campanies with out glopal comunity.
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
      <div className="flex flex-col md:py-8 md:px-5 bg-slate-100 py-4 px-3">
        <div className="m-6">search and filter TODO:</div>
        <div>
          <Collection
            data={events?.data}
            emptyTitle="There is not a Event"
            emptyState="Come back later"
            page={1}
            totalPages={2}
            limit={6}
            collectionType="all_events"
          />
        </div>
      </div>
    </>
  );
}
