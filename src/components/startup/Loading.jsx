import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

/* eslint-disable @next/next/no-img-element */
function Loading({ setLoading }) {
  const { isAllowed } = useSelector((state) => state.visitor);
  const router = useRouter();

  useEffect(() => {
    if (isAllowed === false) {
      router.replace("/unavailable");
      setLoading(false);
    }
  }, [isAllowed, router]);

  return null;
}
export default Loading;
