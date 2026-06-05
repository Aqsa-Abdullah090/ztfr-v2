"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function Loading({ setLoading }) {
  const router = useRouter();

  const isAllowed = useSelector(
    (state) => state.visitor?.isAllowed
  );

  useEffect(() => {
    if (isAllowed === false) {
      router.replace("/unavailable");
      setLoading(false);
    }
  }, [isAllowed, router, setLoading]);

  return null;
}

export default Loading;