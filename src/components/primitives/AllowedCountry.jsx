import { useSelector } from "react-redux";
import Unavailable from "./Unavailable";

function AllowedCountry({ children }) {
  const { isAllowed } = useSelector((state) => state.visitor);

  if (!isAllowed) return <Unavailable />;
  return children;
}
export default AllowedCountry;
