import { Card } from "~/components/Card";
import { Container } from "~/components/Container";
import { Image } from "~/components/Image";
import { SocialMediaLinks } from "~/components/SocialMediaLinks";

import { Heading } from "~/components/typography/Heading";
import { Text } from "~/components/typography/Text";

function HomePage() {
  return (
    <Container
      className="grid place-content-center h-full mt-8 lg:mt-48"
      viewportRenderConfig={{
        threshold: .4,
        viewportSlideGap: 5,
      }}
    >
      <Card
        className={[
          "max-w-screen-lg grid gap-8 text-center !my-0",
          "md:grid-cols-[300px_auto] md:text-left",
        ].join(" ")}
      >
        <div>
          <Image
            srcSet={[
              "kyle-image-for-me_300x300.jpg 300w",
              "kyle-image-for-me_600x600.jpg 600w",
              "kyle-image-for-me_900x900.jpg 900w",
            ].join(", ")}
            alt="Illustration of Connor Tangney"
            className="object-cover mx-auto"
            height={300}
            aspectRatio="1/1"
          />
        </div>

        <div className="flex flex-col items-center md:items-start">
          <Heading level={1}>Hey</Heading>
          <Text className="text-lg !mb-0">🧔 Connor (that's me)</Text>
          <Text className="text-lg !mb-0">👔 Software Engineer</Text>
          <Text className="text-lg">🏙 Boston, MA</Text>

          <div className="mt-auto">
            <Text className="mt-4 !mb-0">Check me out at...</Text>
            <SocialMediaLinks />
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default HomePage;
