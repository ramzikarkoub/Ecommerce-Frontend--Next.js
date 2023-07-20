import Center from "@/components/Center";
import Header from "@/components/Header";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import styled from "styled-components";

export default function about() {
  return (
    <div>
      <Header />
      <Center>
        <GalleryContainer>
          <Gallery images={images} />
        </GalleryContainer>
        <TextContainer>
          <p>
            Welcome to [Drummer's Name] official website! With a rhythm that
            moves souls and beats that ignite passion, [Drummer's Name] is an
            exceptional talent behind the kit. With a deep-rooted love for
            percussion and an insatiable drive for musical excellence,
            [Drummer's Name] brings an unparalleled energy and skill to every
            performance. With a career spanning [number of years] years,
            [Drummer's Name] has collaborated with renowned artists across
            various genres, leaving an indelible mark on the music industry.
            From explosive rock beats to grooving jazz rhythms, [Drummer's Name]
            effortlessly weaves together a tapestry of sounds, captivating
            audiences worldwide. Explore this site to discover [Drummer's
            Name]'s discography, upcoming shows, and insights into their
            creative process. Prepare to be mesmerized by the pulsating
            heartbeat of music as [Drummer's Name] takes you on an unforgettable
            rhythmic journey.
          </p>
        </TextContainer>
      </Center>
    </div>
  );
}

const images = [
  {
    src: "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695170/pexels-cottonbro-studio-5648527_enfd0x.jpg",
    original:
      "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695170/pexels-cottonbro-studio-5648527_enfd0x.jpg",
    width: 420,
    height: 512,
    caption: "Boats (Jeshu John - designerspics.com)",
  },

  {
    src: "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695168/pexels-josh-sorenson-995301_vsolwo.jpg",
    original:
      "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695168/pexels-josh-sorenson-995301_vsolwo.jpg",
    width: 520,
    height: 313,
    caption: "Red Apples with other Red Fruit (foodiesfeed.com)",
  },
  {
    src: "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695168/pexels-cottonbro-studio-5650909_oqjawg.jpg",
    original:
      "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695168/pexels-cottonbro-studio-5650909_oqjawg.jpg",
    width: 520,
    height: 283,
    caption: "37H (gratispgraphy.com)",
  },
  {
    src: "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695657/pexels-tima-miroshnichenko-5045881_crnaj5.jpg",
    original:
      "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695657/pexels-tima-miroshnichenko-5045881_crnaj5.jpg",
    width: 400,
    height: 220,
  },
  {
    src: "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695160/pexels-ricardo-rojas-3608804_obcetr.jpg",
    original:
      "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695160/pexels-ricardo-rojas-3608804_obcetr.jpg",
    width: 320,
    height: 190,
  },
  {
    src: "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695170/pexels-matthew-baur-2614942_j4wjnb.jpg",
    original:
      "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695170/pexels-matthew-baur-2614942_j4wjnb.jpg",
    width: 220,
    height: 312,
    caption: "Color Pencils (Jeshu John - designerspics.com)",
  },
  {
    src: "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695651/pexels-artem-podrez-6270151_hgrqsw.jpg",
    original:
      "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695651/pexels-artem-podrez-6270151_hgrqsw.jpg",
    width: 320,
    height: 148,
  },
  {
    src: "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695650/pexels-antoni-shkraba-production-8044195_k4i7wg.jpg",
    original:
      "https://res.cloudinary.com/dkyzsx1az/image/upload/v1689695650/pexels-antoni-shkraba-production-8044195_k4i7wg.jpg",
    width: 320,
    height: 213,
  },
];

const GalleryContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  margin-top: 30px;
`;

const TextContainer = styled.div`
  margin-top: 20px;
`;
