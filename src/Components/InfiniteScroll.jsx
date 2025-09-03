import { useEffect, useRef, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";

const InfiniteScroll = ({
  loading,
  hasMore,
  onLoadMore,
  children,
  loaderSize = 40,
  loaderThickness = 3,
  rootMargin = "200px",
}) => {
  const loaderRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        onLoadMore();
      }
    },
    [loading, hasMore, onLoadMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin,
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver, rootMargin]);

  return (
    <>
      {children}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress size={loaderSize} thickness={loaderThickness} />
        </Box>
      )}

      <div ref={loaderRef} />
    </>
  );
};

export default InfiniteScroll;
