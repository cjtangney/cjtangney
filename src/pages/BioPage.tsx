import { Card } from "~/components/Card";
import { Container } from "~/components/Container";

import { Heading } from "~/components/typography/Heading";
import { CharacterStat } from "~/components/CharacterStat";
import { Text } from "~/components/typography/Text";

function BioPage() {
  return (
    <Container
      className="grid place-content-center h-full"
    >
      <Card className={[
        "px-6 !py-6",
        "md:px-8 md:!py-8",
        "max-w-screen-lg lg:mt-20",
        "grid gap-4"
        ].join(" ")}
      >
        <Heading><span>Name:</span> Connor Tangney</Heading>

        <div className="grid md:grid-cols-2">
          <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
            <Heading level={3} className="text-xl uppercase">Race:</Heading>
            <Text>Human (Couch)</Text>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
            <Heading level={3} className="text-xl uppercase">Class:</Heading>
            <Text>Software Developer</Text>
          </div>
        </div>

        <div className="grid gap-2 items-start mt-4">
          <Heading level={3} className="text-xl uppercase !mb-0">Backstory:</Heading>
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
