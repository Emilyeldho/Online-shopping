import { Tooltip, Typography, Box } from "@mui/material";

const TitleWithTooltip = ({ title, children, ...props }) => {
  return (
    <Tooltip title={title} arrow>
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        {...props}
      >
        {children ? (
          children
        ) : (
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              cursor: "default",
            }}
          >
            {title}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};

export default TitleWithTooltip;
