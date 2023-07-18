import Center from "@/components/Center";
import Header from "@/components/Header";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import styled from "styled-components";

export default function about() {
  const [index, setIndex] = useState(-1);
  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index) => {
    setIndex(index);
  };

  const handleClose = () => setIndex(-1);

  const handleMovePrev = () => setIndex(prevIndex);

  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <div>
      <Header />
      <Center>
        <GalleryContainer>
          <Gallery images={images} onClickThumbnail={handleClick} />
        </GalleryContainer>
        <TextContainer>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
            aliquid earum eius unde, harum ad, ratione similique enim ab ipsa
            esse ullam architecto pariatur illum porro nisi magni molestiae
            itaque quibusdam atque. Facere laborum, temporibus magni
            voluptatibus quis sint enim consequuntur dicta inventore, quasi,
            dolorem corporis. Corporis assumenda delectus labore consequatur
            repellat unde qui nihil accusamus eaque minus voluptate dolore,
            tempore voluptatum voluptatem laborum architecto nam optio, alias
            ipsum hic at maiores. Itaque quaerat ipsa eveniet minima eum nisi
            eligendi cupiditate provident natus quos quasi repudiandae
            voluptatem aliquid quod fugit mollitia alias similique quam,
            necessitatibus in excepturi sed, minus tenetur.
          </p>
        </TextContainer>
      </Center>
    </div>
  );
}

const images = [
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    original: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 920,
    height: 512,
    caption: "Boats (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    original: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 620,
    height: 312,
    caption: "Color Pencils (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
    original: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
    width: 520,
    height: 313,
    caption: "Red Apples with other Red Fruit (foodiesfeed.com)",
  },
  {
    src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    original: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    width: 520,
    height: 283,
    caption: "37H (gratispgraphy.com)",
  },
  {
    src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
    original: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
    width: 440,
    height: 520,
  },
  {
    src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
    original: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
    width: 320,
    height: 190,
  },
  {
    src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
    original: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
    width: 320,
    height: 148,
  },
  {
    src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    original: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
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
