import { useEffect } from "react";
import {
  fetchVisitor,
  loadVisitor,
} from "../../store/features/visitorSlice";
import { useDispatch, useSelector } from "react-redux";

function VisitorUser({ loading, setLoading }) {
  const { status } = useSelector((state) => state.visitor);
  const { status: bgStatus, page } = useSelector((state) => state.bg);
  const bgData = useSelector((state) => state?.bg?.data);
  const dispatch = useDispatch();

  // Retrieve page number from localStorage or set default value to 1
  const { data } = useSelector((state) => state.visitor);

  useEffect(() => {
    const visitorData = localStorage.getItem("visitor_data");
    const bgData = localStorage.getItem("bg_data"); // Get the background data from local storage
    if (!visitorData) {
      dispatch(fetchVisitor());
    } else {
      dispatch(loadVisitor());
    }
    if (bgData) {
      dispatch(loadBgData()); // Load background data if available in local storage
    }
  }, []);

  // fetch bg data, when visitor data is successed
  useEffect(() => {
    if (data) {
      dispatch(fetchBGData({ country: data.countryName, page: page }));
    }
  }, [data, page]); // Include page in dependency array

  // handle loading
  useEffect(() => {
    if (status === "success" && bgStatus === "success" && bgData) {
      setLoading(false);
    }
  }, [status, bgStatus, bgData]);

  return null;
}

export default VisitorUser;
