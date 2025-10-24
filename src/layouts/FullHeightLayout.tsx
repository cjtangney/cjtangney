import { Page } from "~/components/Page";

import { useThemes } from "~/contexts/Theme";

function BaseLayout({ children }: { children: React.ReactNode }) {
  const { activeTheme } = useThemes();

  return (
    <Page className="bg-rainbow animated scrollbar-stable h-full !p-0 !m-0" theme={activeTheme}>
      {children}
    </Page>
  );
}

export default BaseLayout;
