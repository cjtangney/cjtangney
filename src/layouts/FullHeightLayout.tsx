import { Page } from "~/components/Page";

import { DarkModeToggle } from "~/components/DarkModeToggle";
import { TopNav } from "~/components/TopNav";

import { useThemes } from "~/contexts/Theme";

function BaseLayout({ children }: { children: React.ReactNode }) {
  const { activeTheme } = useThemes();

  return (
    <Page className="bg-rainbow animated scrollbar-stable h-full !p-0 !m-0" theme={activeTheme}>
      <section className="w-full top-0 left-0 min-h-[75px] lg:absolute" aria-label="Site Navigation and Utils">
        <DarkModeToggle />
        <TopNav />
      </section>

      {children}
    </Page>
  );
}

export default BaseLayout;
