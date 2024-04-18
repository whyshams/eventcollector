"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

import { createOrder } from "@/lib/actions/order.actions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { getOrdersByUser } from "@/lib/actions/order.actions";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const [orderedData, setOrderedData] = useState(null);

  const getOrderOfUser = async () => {
    const orders = await getOrdersByUser({ userId, page: 1 });
    setOrderedData(orders?.data);
  };

  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const router = useRouter();
  useEffect(() => {
    if (orderedData !== null) {
      router.push("/profile");
    }
  }, [orderedData]);
  const createAnOrder = async (event: any) => {
    if (!userId) {
      router.push("/sign-up");
    } else {
      console.log(event);
      console.log(userId);
      const order = {
        event: event._id,
        buyer: userId,

        eventTitle: event.title,
        totalAmount: event.price,
      };

      await createOrder(order);
      getOrderOfUser();
    }
  };

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Log in to Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            {userId === event.organizer._id ? (
              <div className="flex gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                <Link href={`/events/${event._id}/update`}>
                  <Image
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  />
                </Link>

                <DeleteConfirmation eventId={event._id} />
              </div>
            ) : (
              <Button onClick={() => createAnOrder(event)}>Get Ticket</Button>
            )}
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
