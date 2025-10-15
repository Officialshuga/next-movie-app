import { ButtonProps } from "@/types";
import React from "react";
import { Box } from "@mui/material";

const Button = (props: ButtonProps): React.ReactElement | null => {
  const { filled, label, Icon, rounded, onClick, hidden } = props;

  const backgroundColor = filled ? "white" : "#6d6d6db3";
  const fontColor = filled ? "black" : "white";

  if (hidden) {
    return null;
  }

  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        zIndex: 10,
        color: fontColor,
        backgroundColor: backgroundColor,
        width: rounded ? "min-content" : "fit-content",
        padding: rounded ? ".4rem" : ".7rem 1.8rem",
        borderRadius: rounded ? "50%" : ".3rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: rounded ? ".2rem" : ".4rem",
        outline: "none",
        border: filled ? "none" : "2.2px solid #ffffff80",
        fontSize: rounded ? "1rem" : "inherit",
        "&:hover": {
          opacity: 0.8,
          backgroundColor: filled ? "tomato" : backgroundColor,
        },
        "@media(max-width: 600px": {
          backgroundColor: filled ? "tomato" : backgroundColor,
          padding: rounded ? ".3rem" : ".5rem 1.2rem",
        },
      }}
    >
      <Box component={Icon} sx={{fontSize: rounded? "1rem" : "1.1rem", marginTop: !rounded ? ".8rem" : "0"}}>
        {!rounded && (
          <Box component="span" sx={{fontWeight: "bold", fontSize: "1rem", marginLeft: ".8rem", "@media(max-width: 600px":{
            marginLeft: ".6rem"
          }}}>{label}</Box>
        )}
        
      </Box>
    </Box>
  );
};

export default Button;
