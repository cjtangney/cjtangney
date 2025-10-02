import { Card } from "~/components/Card";
import { Container } from "~/components/Container";
import { Image } from "~/components/Image";
import { SocialMediaLinks } from "~/components/SocialMediaLinks";

import { Heading } from "~/components/typography/Heading";
import { Text } from "~/components/typography/Text";

function HomePage() {
  return (
    <Container
      className="grid place-content-center h-full"
    >
      <Card
        className={[
          "px-6 !py-6",
          "md:px-8 md:!py-8",
          "max-w-screen-md grid gap-8",
          "md:grid-cols-[1fr_2fr]",
          "lg:mt-20",
        ].join(" ")}
      >
        <div className="grid gap-4">
          <Image
            srcSet={[
              "img/kyle-image-for-me_300x300.jpg 300w",
              "img/kyle-image-for-me_600x600.jpg 600w",
              "img/kyle-image-for-me_900x900.jpg 900w",
            ].join(", ")}
            alt="Illustration of Connor Tangney"
            className="object-cover mx-auto"
            height={215}
            aspectRatio="1/1"
          />
          <div>
            <Text className="text-lg">🧔 Connor (that's me)</Text>
            <Text className="text-lg">👔 Software Engineer</Text>
            <Text className="text-lg">🏙 Boston, MA</Text>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-1 items-start text-left">
          <div>
            <Heading level={1}>Hey</Heading>
            <Text className="md:text-lg mt-2">That's me.</Text>
            <Text className="md:text-lg mt-2">Click the hamburger to learn more.</Text>
          </div>

          <div className="flex flex-col mt-auto">
            <Text className="text-sm">Check me out at...</Text>
            <SocialMediaLinks className="grid grid-cols-[repeat(6,_24px)] items-center gap-[12px]" />
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default HomePage;
