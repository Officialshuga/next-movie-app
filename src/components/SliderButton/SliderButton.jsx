import { SliderButtonProps } from "@/types";
import { Button } from "@mui/material";
const SliderButton: React.FC<SliderButtonProps> = ({ isRight }) => {
  const handleScroll = (event: React.MouseEvent<HTMLButtonElement>) => {
    const parent = event.currentTarget.closest(".scroll-container-parent");
    const scrollContainer = parent?.querySelector(".scroll-container");

    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: isRight ? 300 : -300,
        behavior: "smooth",
      });
    } else {
      console.log("scrol container not found");
    }
  };
  return (
    <div>
      <Button
        onClick={handleScroll}
        sx={{
          display: { xs: "none", md: "block" },
          color: "white",
          position: "absolute",
          right: isRight ? "0" : "auto",
          left: isRight ? "0" : "auto",
          top: "0",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,.5",
          padding: "3.7rem 1rem",
          fontSize: "2rem",
        }}
      >
        {isRight ? <Next /> : <Previous />}
      </Button>
    </div>
  );
};
export default SliderButton;
