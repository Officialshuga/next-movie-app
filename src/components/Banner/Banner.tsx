import { Box } from '@mui/material'
import React from 'react'
import { Media } from '@/types';
import { useRouter } from 'next/navigation';

const Banner = () => {
  const [media, setMedia] = React.useState<Media | null>(null);
  const [trailerKey, setTrailerKey] = React.useState<string | null>(null);
  const [isMuted, setIsMuted] = React.useState<boolean>(true);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const router = useRouter();
  const handlePlayClick=()=>{
    if(media?.id){
      router.push(`/movie/${media.id}`);
    }
  }

  const toggleMute =()=>{
    setIsMuted((prev) => !prev)
  };
 
  const loadMedia= async()=>{
    const
  }
  return (
    <Box>

    </Box>
  )
}

export default Banner