import { ButtonLink } from "~/components/ButtonLink";
import { Card } from "~/components/Card";
import { Container } from "~/components/Container";

import { Heading } from "~/components/typography/Heading";
import { Text } from "~/components/typography/Text";

function GalleryPage() {
  return (
    <Container
      className={[
        "px-6 py-6",
        "md:px-8 md:py-8",
        "grid place-content-center h-full"
      ].join(" ")}
    >
      <Card className="max-w-screen-lg grid gap-4 md:grid-cols-2 lg:mt-20">
        <div className="grid gap-4">
          <Heading level={1}>Photo Gallery</Heading>
          <Text className="text-lg">
            Sometimes I take pictures. I don't usually share them to social media, but every once in awhile
            someone will ask me what I like to take pictures of.
          </Text>
          <Text className="text-lg">
            These pages should hopefully answer that question!
          </Text>
          <Text className="text-lg">
            Unless otherwise specified, all of the photograpy on this section of the site was taken by me.
            I ask that you do not reuse, replicate, redistribute, or otherwise commercialize any of the
            images on this site in any way.
          </Text>
          <Text className="text-lg !mb-0">
            If you are, for whatever reason, interested in obtaining one of the full-resultion versions
            of these photographs, please contact me directly 👍
          </Text>
        </div>
        <div className="flex flex-col gap-4">
          <Heading level={2} className="!text-2xl">Gallery Pages</Heading>
          <ul className="grid gap-4 md:grid-cols-2">
            <li>
              <ButtonLink href="japan" variant="inverted" className="block text-center !px-2 !py-1" >
                Japan
              </ButtonLink>
            </li>
          </ul>
        </div>
      </Card>
    </Container>
  );
}

export default GalleryPage;
