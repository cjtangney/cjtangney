import { Card } from "~/components/Card";
import { Container } from "~/components/Container";

import { Heading } from "~/components/typography/Heading";
import { Text } from "~/components/typography/Text";

function Blog() {
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
        <div className="flex flex-col items-center md:items-start">
          <Heading>This is another page.</Heading>
          <Text className="text-lg !mb-0">What I'mma put on it?</Text>
        </div>
      </Card>
    </Container>
  );
}

export default Blog;
