import { useEffect, useState } from "react";
import { useAppDispatch } from "../_hooks";
import { incrementMinute } from "./generalSlice";

export default function Updater() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementMinute());
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
}
