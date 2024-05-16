import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import {
  getEventById,
  getRelatedEventsBycategory,
} from "@/lib/actions/event.action";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
//import {Params}  from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";

const page = async (searchParams: any) => {
  const eventId: string = searchParams.params.id;
  //console.log(eventId)
  const event = await getEventById(eventId);
  //console.log(event);
  const shortLocation = event.location.split(",");
  //console.log(shortLocation[0]);
  const isEventOngoing = new Date(event.startDateTime).getTime();
  //console.log(isEventOngoing)
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id;
  //console.log(isEventCreator)

  const relatedEvents = await getRelatedEventsBycategory({
    eventId: event._id,
    categoryId: event.category._id,
    limit: 3,
    page: 1,
  });
  //console.log(relatedEvents);

  return (
    <div className="bg-center bg-primary-50 bg-dotted-pattern space-5  md:p-10">
      <div className="flex flex-col md:flex-row md:gap-10 gap-5">
        <div className="rounded w-full sm:w-[50%]">
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={300}
            height={300}
            className="w-full md:rounded-xl"
          />
        </div>
        <div className="mx-5 md:my-3">
          <div>
            <h1 className="text-3xl font-bold mb-3">{event.title}</h1>
            <p className="text-lg bg-green-600/30 inline px-2 rounded-xl text-green-950">
              {event.isFree ? `Free` : `$${event.price}`}
            </p>
            <div className="text-lg mx-4 bg-pink-600/40 inline px-2 rounded-xl ">
              {/* <Image
                src={`/assets/icons/location.svg`}
                alt="location"
                width={20}
                height={20}
                className="inline"
              /> */}
              {shortLocation[0]}
            </div>
            <p className="inline rounded-xl bg-grey-500/10 px-2 text-lg text-grey-500">
              {event.category.name}
            </p>
            <div className="my-5 flex gap-6 sm:gap-10">
              <div className="text-lg mb-4">
                <h3 className="text-xl font-semibold">Starts on: </h3>
                <p className="mt-2">
                  {formatDateTime(event.startDateTime).dateOnly}
                </p>
                <p className="mt-2">
                  {formatDateTime(event.startDateTime).timeOnly}
                </p>
              </div>
              <div className="text-lg">
                <h3 className="text-xl font-semibold">Ends on: </h3>
                <p className="mt-2">
                  {formatDateTime(event.endDateTime).dateOnly}
                </p>
                <p className="mt-2">
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>
            {isEventCreator ? (
              <div className="mb-5">
                <p className="text-xl font-semibold my-5 text-red-600">
                  {" "}
                  You are Organizer
                </p>{" "}
              </div>
            ) : (
              <div>
                {Date.now() < isEventOngoing ? (
                  <div className="mb-5">
                    <p className="text-xl font-semibold my-5 text-lime-600">
                      {" "}
                      You can Book your Tiket now
                    </p>{" "}
                    <Link href={""}>
                      <Button>Book Now</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="mb-5">
                    <p className="text-xl font-semibold my-5 text-red-600">
                      {" "}
                      This Event has ended
                    </p>{" "}
                    <Link href={"#"}>
                      <Button disabled>Book Now</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
            <div className="mb-5">
              <p className="text-xl font-semibold inline pr-2"> Organizer:</p>{" "}
              {event.organizer.firstName + " " + event.organizer.lastName}
            </div>
            <div>
              <p className="text-xl font-semibold inline pr-2"> location:</p>{" "}
              {event.location}
            </div>
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-20 px-5 ">
          <div className="w-[80%] md:w-[30%] ">
            <p className="text-xl font-semibold"> What will you learn:</p>{" "}
            {event.description}
            <div className="my-3">
            <p className="text-xl font-semibold">You can know more here:</p>
              <Link className=" text-blue-500" href={event.url}>{event.url}</Link>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full">
            <p className="text-2xl font-semibold mb-5 w-full"> Related Events </p>
              <div>
                <Collection
                  data={relatedEvents?.data}
                  emptyTitle="There is not a Event"
                  emptyState="Come back later"
                  page={1}
                  totalPages={2}
                  limit={6}
                  collectionType="all_events"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
