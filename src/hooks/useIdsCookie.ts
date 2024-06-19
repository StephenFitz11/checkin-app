"use client";

import { getCookie, setCookie } from "@/actions/cookies";
import { useEffect, useState } from "react";

const useCounter = (initialValue: number[] = []) => {
  const [ids, setIds] = useState<number[]>(initialValue);

  const increment = (value: number) => setCookie([...ids, value]);

  const reset = () => setIds(initialValue);

  useEffect(() => {
    const fetchInitialIds = async () => {
      const cookieIds = await getCookie();
      if (cookieIds) {
        setIds(cookieIds);
      }
    };

    fetchInitialIds();
  }, []);

  //   useEffect(() => {
  //     console.log(ids); // Log the state whenever it changes
  //     setCookie(ids); // Save the state to a cookie (or localStorage, etc.
  //   }, [ids]);

  return { ids, increment, reset };
};

export default useCounter;
