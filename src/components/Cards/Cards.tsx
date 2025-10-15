import React, { useEffect } from "react";
import { Media, MediaItem, Video } from "@/types"; // Make sure this path is correct
import { CardProps, Genre } from "@/types";
import { Box, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import Button from "../Button/Button";
import Image from "next/image";
import { title } from "process";
import { useRouter } from "next/navigation";
import handleAddToLocalStorage, {
  handleRemoveFromLocalStorage,
  isItemInLocalStorage,
} from "@/utils/LocalStorage";
import { getMovie } from "@/utils/apiService";
import RenderGenre from "../RenderGenre/RenderGenre";

const Cards: React.FC<CardProps> = ({ item, enableGenres, removeMovie }) => {
  const [genre, setGenre] = React.useState<Genre[]>([]);
  const [trailerKey, setTrailerkey] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isMute, setIsMute] = React.useState<boolean>(true);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [isInLocalStorage, setIsInLocalStorage] =
    React.useState<boolean>(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const router = useRouter();
  const { original_title, vote_average, genre_ids, id, backdrop_path } = item;

  useEffect(() => {
    setIsMounted(true);
    setIsInLocalStorage(isItemInLocalStorage(item.id, item.original_title));
    if (enableGenres) {
      setGenre(item.genres || []);
    }
  }, [item, enableGenres]);

  const handlePlayCLick = () => {
    if (item?.id && isMounted) {
      router.push(`/movie/${item.id}`);
    }
  };

  const fetchTrailer = async () => {
    const res = await getMovie(`/movie/${id}/videos`);
    if (res.error) {
      setError(res.error.message);
    } else {
      const trailer = (res.data?.results as unknown as Video[]).find(
        (video) => video.type === item.type
      );
      setTrailerkey(trailer ? trailer.key : null);
    }
  };

  useEffect(() => {
    if (isHovered) {
      fetchTrailer();
    }
  }, [isHovered]);

  const toggleMute = () => {
    setIsMute((prev) => !prev);
  };

  const handleFavoriteToogle = () => {
    const mediaItem: MediaItem = {
      id,
      title,
      type: item.original_title ? "movie" : "tv",
    };
    if (isInLocalStorage) {
      handleRemoveFromLocalStorage(mediaItem);
      setIsInLocalStorage(false);
      removeMovie?.(mediaItem.id);
    } else {
      handleAddToLocalStorage(mediaItem);
      setIsInLocalStorage(true);
    }
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        width: "14rem",
        height: "9rem",
        borderRadius: ".28rem",
        marginRight: ".3rem",
        cursor: "pointer",
        transition: "all 300ms ease",
        backgroundColor: "#252525",
        zIndex: isHovered ? 10 : 1,
        "&:hover": {
          transform: "scale(1.45)",
          boxShadow: "0 0 1rem rgba(0,0,0,.6), 0 6px 6px rgba(0,0,0,.5)",
        },
      }}
      onMouseEnter={()=> setIsHovered(true)}
       onMouseLeave={()=> setIsHovered(false)}
    >
      {isHovered && trailerKey ? (
        <Box>
          <ReactPlayer />
          <Box>
            <Button />
          </Box>
        </Box>
      ) : (
        <>
          <p>help</p>
        </>
      )}

      <Box>
        <Box>
          <Typography>{original_title}</Typography>
          <Box>
            <Button />
            <Button />
            <Button />
          </Box>
          <Button />
        </Box>
        <Box>
          <Box>
            <Typography>
              {`${Math.round(vote_average * 10)} % match`}
            </Typography>
          </Box>
          <Box>
            <Typography>Genres:</Typography>
            {enableGenres ? (
              <Typography sx={{ fontSize: "10px" }}>
                {genres.slice(0, 5).map(({ name }, index) => (
                  <span key={name}>
                    {name}
                    {index < genres.length - 1 && <span> &bull; </span>}
                  </span>
                ))}
              </Typography>
            ) : (
              <RenderGenre genreIds={genre_ids} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Cards;
