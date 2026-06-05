"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchVisitor, loadVisitor } from "../../store/features/visitorSlice";

function VisitorUser({ setLoading }) {
  const dispatch = useDispatch();

  // SAFE SELECTORS (no destructuring crash)
  const visitorStatus = useSelector((state) => state.visitor?.status);
  const visitorData = useSelector((state) => state.visitor?.data);
  const isAllowed = useSelector((state) => state.visitor?.isAllowed);

  const bgStatus = useSelector((state) => state.bg?.status);
  const bgPage = useSelector((state) => state.bg?.page);
  const bgData = useSelector((state) => state.bg?.data);

  // 1️⃣ Load visitor
  useEffect(() => {
    if (typeof window === "undefined") return;

    const visitorDataLocal = localStorage.getItem("visitor_data");

    if (!visitorDataLocal) {
      dispatch(fetchVisitor());
    } else {
      dispatch(loadVisitor());
    }
  }, [dispatch]);

  

  // 3️⃣ Handle loading state
  useEffect(() => {
    if (
      visitorStatus === "success" 
    ) {
      setLoading(false);
    }
  }, [visitorStatus, bgStatus, bgData, setLoading]);

  return null;
}

export default VisitorUser;