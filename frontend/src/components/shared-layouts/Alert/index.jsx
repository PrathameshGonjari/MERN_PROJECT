import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetToast } from "@redux/features/toast-slice";

const Alert = () => {
  const dispatch = useDispatch();

  const { showToast, message, type } = useSelector(
    (state) => state.toastappreducer
  );

  const alertClasses = {
    success: "bg-palette-success",
    error: "bg-palette-error",
  };

  const alertClass = alertClasses[type] || alertClasses.success;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(resetToast());
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  const handleClose = () => {
    dispatch(resetToast());
  };

  return (
    <>
      {showToast && (
        <div className="fixed inset-0 flex justify-center items-end z-50 mb-8">
          <div
            className={`px-4 py-2 rounded-md shadow-md ${alertClass} text-palette-white relative`}
          >
            <button
              className="absolute top-0 right-0 p-2"
              onClick={handleClose}
            >
              X
            </button>
            <div className="mr-4">{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
