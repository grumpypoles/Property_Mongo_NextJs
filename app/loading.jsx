"use client";

import ClipLoader from "react-spinners/ClipLoader";

const spinnerColor = "#3b82f6";
const override = {
  display: "block",
  margin: "100px auto",
};
function LoadingPage({loading}) {
   return (
    <ClipLoader
      color={spinnerColor}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
}

export default LoadingPage;
