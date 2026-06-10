import { request_lamda1 } from "@/lib/service";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IPBlockWrapper from "./IPBlockWrapper";

/**
 * Checks the visitor IP is blocked or not
 * if it is blocked then show block screen, otherwise show normal screens
 * must be used in _app.js component
 * visitor must be present in visitor slice, with data object which will contain the visitor details
 */
function IPBlockProvider({ children }) {
  const [isBlocked, setIsBlocked] = useState(false);
  // global
  const { data } = useSelector((state) => state.visitor);

  useEffect(() => {
    if (data) {
      request_lamda1
        .post(`/api/ip-address`, {
          ip_address: data.ip_address,
        })
        .then(({ data }) => {
          if (data.error) setIsBlocked(true);
        });
    }
  }, [data]);

  if (isBlocked) return <IPBlockWrapper />;

  return children;
}
export default IPBlockProvider;
