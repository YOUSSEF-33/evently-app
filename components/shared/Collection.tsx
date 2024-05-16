import React from "react";
import Card from "./Card";
import { IEvent } from "@/lib/database/models/event.model";

type collectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyState: string;
  page: number;
  totalPages?: number;
  limit: number;
  collectionType?: "my_tickets" | "event_organized" | "all_events";
  urlParamName?: string;
};

const Collection = ({
  data,
  emptyTitle,
  emptyState,
  page,
  totalPages,
  limit,
  collectionType,
  urlParamName,
}: collectionProps) => {
  return (
    <div>
      <div>
        {data.length > 0 ? (
          <div className="flex flex-col items-center gap-10">
            <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {data.map((event) => {
                const hasOrderLink = collectionType === "event_organized";
                const hidePrice = collectionType === "my_tickets";

                return (
                  <li key={event._id} className="flex justify-center">
                    <Card
                      event={event}
                      hasOrderLink={hasOrderLink}
                      hidePrice={hidePrice}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="bg-gray-400">
            <h1 className="h1-bold">{emptyTitle}</h1>
            <p className=" p-regular-20 md:p-regular-24">{emptyState}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
