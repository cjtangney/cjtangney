import { Card } from "~/components/Card";
import { Container } from "~/components/Container";

import { Heading } from "~/components/typography/Heading";
import { CharacterStat } from "~/components/CharacterStat";
import { Text } from "~/components/typography/Text";

function BioPage() {
  return (
    <Container
      className="grid place-content-center h-full mt-8 lg:mt-48"
      viewportRenderConfig={{
        threshold: 0,
        viewportSlideGap: 5,
      }}
    >
      <Card className="max-w-screen-md !my-0">
        <Heading className="text-center" level={1}>Bio</Heading>
        <Text className="text-lg">
          I'm never really 100% sure what to put in these things. I always feel like whatever 
          information people put on pages like this is chronically out of date by the
          time someone "real" visits.
        </Text>
        <Text className="text-lg">
          I guess, instead of hitting you with a wall of text about my philospohy as a developer 
          (as Chat GPT might suggest me to do), my aim is to show you all what kind of things are 
          important to me through the content that I post on my site.
        </Text>
        <Text className="text-lg mb-0">
          Consider this page to be less of a "bio" and more of a Character Sheet to help you all
          figure out a little bit more about the kind of person I am and what I'm good (or bad) at.
        </Text>
      </Card>

      <Card className="max-w-screen-lg !my-0">
        <Heading><span>Name:</span> Connor Tangney</Heading>

        <div className="grid md:grid-cols-2">
          <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
            <Heading level={3} className="text-xl font-mono uppercase">Race</Heading>
            <Text>Human (Couch)</Text>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
            <Heading level={3} className="text-xl font-mono uppercase">Class</Heading>
            <Text>Software Developer</Text>
          </div>
        </div>

        <div className="grid gap-2 items-start">
          <Heading level={3} className="text-xl font-mono uppercase !mb-0">Backstory</Heading>
          <Text className="text-lg">
            Born and raised in New England, learned and schooled in 
            New York. Three decades experience being a person, one decade of
            experience slinging code. Married (n-2018) years to my loving partner.
            Enjoyer of solving complicated problems. Passionate about accessibility
            and creating usable, intuitive interfaces. Aspiring Sim Racer and
            hobby photographer. 
          </Text>
        </div>

        {/** Core Stats */}
        <div>
          <Heading level={3} className="text-xl font-mono uppercase !mb-2 md:!mb-5">Stats</Heading>
          <ul className="grid md:grid-cols-2 gap-4 text-c-default">
            <li><CharacterStat label="INT" fillColor="green" value={90} animate={true} /></li>
            <li><CharacterStat label="DEX" fillColor="green" value={85} animate={true} /></li>
            <li><CharacterStat label="STR" fillColor="blue" value={65} animate={true} /></li>
            <li><CharacterStat label="LUK*" fillColor="red" value={25} animate={true} /></li>
          </ul>
          <Text className="my-2 text-xs md:text-right">* yes, i am chronically unlucky.</Text>
        </div>

        {/** Skills */}
        <div>
          <Heading level={3} className="text-xl font-mono uppercase !mb-2 md:mb-5">Skills</Heading>
          <ul className="grid md:grid-cols-2 gap-4 text-c-default items-center">
            <li><CharacterStat label="JS" fillColor="green" value={95} animate={true} /></li>
            <li><CharacterStat label="HTML" fillColor="green" value={95} animate={true} /></li>
            <li><CharacterStat label="CSS" fillColor="green" value={90} animate={true} /></li>
            <li><CharacterStat label="TS" fillColor="green" value={80} animate={true} /></li>
            <li><CharacterStat label="PHP" fillColor="blue" value={65} animate={true} /></li>
            <li><CharacterStat label="AWS" fillColor="blue" value={60} animate={true} /></li>
            <li><CharacterStat label="SQL" fillColor="orange" value={50} animate={true} /></li>
            <li><CharacterStat label="PY" fillColor="orange" value={45} animate={true} /></li>
          </ul>
        </div>
      </Card>
    </Container>
  );
}

export default BioPage;
