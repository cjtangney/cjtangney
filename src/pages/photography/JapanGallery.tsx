import { Card } from "~/components/Card";
import { Container } from "~/components/Container";
import { Heading } from "~/components/typography/Heading";
import { PhotoGallery, PhotoGalleryPhoto } from "~/components/PhotoGallery";
import { Text } from "~/components/typography/Text";

const photos: PhotoGalleryPhoto[] = [
  {
    src: "/img/japan/0001.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0002.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0003.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0004.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0005.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0006.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0007.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0008.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0009.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0010.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0011.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0012.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0013.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0014.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0015.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0016.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0017.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/img/japan/0018.jpg",
    alt: "Placeholder image",
  },
];

function JapanGallery() {
  return (
    <Container
      className="grid gap-4 place-content-center h-full lg:mt-20"
    >
      <Card className={[
        "px-6 py-6",
        "md:px-8 md:py-8",
      ].join(" ")}>
        <div className="grid gap-4">
          <Heading level={1}>Japan</Heading>
          <Text className="text-lg !mb-0">
            Here are some pictures I've taken on my trips to Japan! 
            I'll update this as time and socioeconomic status allow
            for me to make more trips back!
          </Text>
        </div>
      </Card>

      <PhotoGallery className="md:pb-4 md:pr-4 md:max-h-[1200px] md:overflow-auto" rowHeight={300} photos={photos} />
    </Container>
  );
}

export default JapanGallery;