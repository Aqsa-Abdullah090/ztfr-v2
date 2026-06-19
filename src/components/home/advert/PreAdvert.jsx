import { useSelector } from "react-redux";
import PreAdvertContent from "./PreAdvertContent";

function PreAdvert() {
  const { data } = useSelector((state) => state.bg);

  if (data) return <PreAdvertContent />;

  return null;
}
export default PreAdvert;
