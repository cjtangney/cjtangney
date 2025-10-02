import { Card } from "~/components/Card";
import { Container } from "~/components/Container";
import { Heading } from "~/components/typography/Heading";
import { PhotoGallery, PhotoGalleryPhoto } from "~/components/PhotoGallery";
import { Text } from "~/components/typography/Text";

const photos: PhotoGalleryPhoto[] = [
  {
    src: "/japan/0001.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0002.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0003.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0004.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0005.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0006.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0007.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0008.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0009.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0010.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0011.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0012.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0013.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0014.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0015.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0016.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0017.jpg",
    alt: "Placeholder image",
  },
  {
    src: "/japan/0018.jpg",
    alt: "Placeholder image",
  },
];

function JapanGallery() {
  return (
    <Container
      className="grid place-content-center h-full mt-8 lg:mt-48"
      viewportRenderConfig={{
        threshold: .025,
        viewportSlideGap: 5,
      }}
    >
      <Card>
        <div className="flex flex-col items-center">
          <Heading level={1}>Japan</Heading>
          <Text className="text-lg text-center !mb-0">
            Back in 2020, right before the Pandemic, I went to Japan. Here are some of the pictures I took when I went. Unfortunately
            these are the only ones I have remaining, as the hard drives which had all the others failed on me ☹
          </Text>
        </div>
      </Card>

      <PhotoGallery className="md:pb-4 md:pr-4 md:max-h-[1200px] md:overflow-auto" rowHeight={300} photos={photos} />
    </Container>
  );
}

export default JapanGallery;