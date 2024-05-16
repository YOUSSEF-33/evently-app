import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.action";
import { auth } from "@clerk/nextjs";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);
  const eventId = event._id;
  //console.log(eventId);
  return (
    <div>
      <div className="bg-gray-50 bg-dotted-pattern bg-center">
        <h1 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h1>
      </div>
      <div className="p-5 md:p-10">
        <EventForm
          type="Update"
          userId={userId}
          eventId={event._id}
          event={event}
        />
      </div>
    </div>
  );
};

export default page;
