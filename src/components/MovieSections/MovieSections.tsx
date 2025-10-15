"use client";
import React, { useEffect, useState } from "react";
import { Media, MovieSectionProps } from "@/types";
import { getMovie } from "@/utils/apiService";
import { Box, Typography } from "@mui/material";
import SliderButton from "../SliderButton/SliderButton";
import Cards from "../Cards/Cards";


const MovieSections: React.FC<MovieSectionProps> = ({
  heading,
  endpoint,
  loading,
  setLoading
}) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [error, setError] = useState<String | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const fetchMovies = async () => {
    if (setLoading) {
      setLoading(true);
    }
    const res = await getMovie(`${endpoint}`);
    if (res.error) {
      setError(res.error.message);
    } else {
      setMedia(res.data?.results || []);
    }

    if (setLoading) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [endpoint]);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const scrollLeft = (event.target as HTMLElement).scrollLeft;
    setIsScrolled(scrollLeft > 0);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textTransform: "capitalize",
        marginTop: "-9rem",
        zIndex: "-1",
      }}
    >
      {error && <Typography>{error}</Typography>}
      {!loading && !error && (
        <>
          <Typography
            component="strong"
            sx={{
              fontSize: "1.2rem",
              marginLeft: "3rem",
              padding: ".5rem 0",
              width: "fit-content",
              marginBottom: ".86rem",
              zIndex: "1",
            }}
          >
            {heading}
          </Typography>

          <Box
            className="scroll-container-parent"
            sx={{ display: "flex", alignItems: "center", position: "relative" }}
          >
            {isScrolled && <SliderButton isRight={false} />}
            <Box className="scroll-container" onScroll={handleScroll} sx={{ display: "flex", flexDirection: "row", padding: {xs: "3.2rem 6rem 12.5rem", overflowX: "auto",  overflowY: "hidden", marginTop: "-3rem", marginLeft: "-3rem", "&::-webkit-scrollbar": {display: "none"}}}}>
              {media?.filter(item=>item.poster_path !== null && item.backdrop_path !== null).map(
                (item, index)=>(
                  <Cards key={index} item={item} enableGenres={false}/>
                )
              )}
            </Box>
          </Box>
        </>
      )}                   
    </Box>
  );
};

export default MovieSections;
