import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { MILLIS_IN_S } from "../constants/time";

dayjs.extend(duration);

export const Countdown: React.FC = () => {
  const [now, setNow] = useState(Date.now());

  // will be either 0 or a timestamp, if 0 we want to return null in our return statement
  const eventTimestamp = +(process.env.VITE_EVENT_TS || "0");
  // we can use this to check if the event is already over by referencing !isEventInFuture, and return null accordingly
  const isEventInFuture = dayjs(now).isBefore(dayjs(eventTimestamp));

  // get a dayjs duration class
  // note: we multiply by negative one because
  // the difference between the now and a future timestamp is negative
  const timeUntilEvent = dayjs.duration(
    +dayjs(now).diff(dayjs(eventTimestamp)) * -1
  );

  // countdown
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1 * MILLIS_IN_S);

    // cleanup
    return () => clearInterval(interval);
  }, []);

  return !eventTimestamp || !isEventInFuture ? null : (
    <div className="w-full flex flex-col items-center justify-center mt-8">
      <p className="font-bold text-xl mb-4">Tournament starts in:</p>
      <div className="lg:flex grid grid-cols-2 grid-rows-2 gap-6">
        <div className="bg-white p-6 rounded-md text-xl font-bold text-center">
          <p>{timeUntilEvent.days()}</p>
          <p>days</p>
        </div>
        <div className="bg-white p-6 rounded-md text-xl font-bold text-center">
          <p>{timeUntilEvent.hours()}</p>
          <p>hours</p>
        </div>
        <div className="bg-white p-6 rounded-md text-xl font-bold text-center">
          <p>{timeUntilEvent.minutes()}</p>
          <p>minutes</p>
        </div>
        <div className="bg-white p-6 rounded-md text-xl font-bold text-center">
          <p>{timeUntilEvent.seconds()}</p>
          <p>seconds</p>
        </div>
      </div>
    </div>
  );
};
