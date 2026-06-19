import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBGData, setPage } from "../../store/features/bgSlice";
import { useSelector } from "react-redux";

const APIPagination = () => {
  const dispatch = useDispatch();
  const bgData = useSelector((state) => state?.bg);
  const [shouldContinue, setShouldContinue] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (bgData && shouldContinue) {
        // Get the current page or default to 1
        const currentPage = bgData.page || 1;

        // Get imagePages from localStorage
        const localStorageData = JSON.parse(localStorage.getItem("bg_data"));
        const imagePages = localStorageData?.total?.imagePages || 1;
        if (currentPage <= imagePages) {
          // Dispatch action to update page in Redux
          dispatch(setPage(currentPage + 1));

          // Fetch background data with the next page
          dispatch(
            fetchBGData({ country: bgData.country, page: currentPage + 1 })
          );
        } else {
          clearInterval(interval); // Stop the interval once currentPage exceeds imagePages
          setShouldContinue(false); // Set shouldContinue to false to stop further iterations
        }
      }
    }, 5 * 60 * 1000); // Run every 5 minutes

    return () => clearInterval(interval);
  }, [bgData, dispatch, shouldContinue]);

  return null;
};

export default APIPagination;
