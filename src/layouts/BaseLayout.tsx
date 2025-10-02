import { Page } from "~/components/Page";

import { DarkModeToggle } from "~/components/DarkModeToggle";
import { Text } from "~/components/typography/Text";
import { TopNav } from "~/components/TopNav";

import { useThemes } from "~/contexts/Theme";

function BaseLayout({ children }: { children: React.ReactNode }) {
  const { activeTheme } = useThemes();

  return (
    <Page className="bg-rainbow animated scrollbar-stable" theme={activeTheme}>
      <section className="w-full top-0 left-0 min-h-[75px] lg:absolute" aria-label="Site Navigation and Utils">
        <DarkModeToggle />
        <TopNav />
      </section>

      {children}

      <Text className="mt-12 text-center text-xs !mb-0">
        © Connor Tangney {new Date().getFullYear()}
      </Text>
    </Page>
  );
}

export default BaseLayout;
