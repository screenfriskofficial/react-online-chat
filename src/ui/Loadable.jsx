import { Suspense } from "react";
import { CircularProgress } from "@mui/material";

export const Loadable = (Component) => {
  return function fn(props) {
    return (
      <Suspense fallback={<CircularProgress />}>
        <Component {...props} />
      </Suspense>
    );
  };
};
