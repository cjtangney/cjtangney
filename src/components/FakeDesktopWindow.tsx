const FakeDesktopWindowMenu = () => {
  const desktopWindowMenuStyles = [
    'border-2 border-[var(--border-c-default)] absolute rounded-t-lg',
    'left-[-2px] top-[-2px] grid content-center px-3 w-[calc(100%+4px)] h-[48px]',
  ].join(' ');

  return (
    <div className={desktopWindowMenuStyles}>
      <div className="grid h-full w-full grid-cols-[20px_20px_20px] gap-2">
        <div className="close-button rounded-full h-[20px] w-[20px] bg-red-700">
        </div>
        <div className="big-button rounded-full h-[20px] w-[20px] bg-yellow-700">
        </div>
        <div className="min-button rounded-full h-[20px] w-[20px] bg-green-700">
        </div>
      </div>
    </div>
  )
}

const FakeDesktopWindowPane = ({ 
  children, 
  styles 
}: { 
  children: React.ReactElement, 
  styles?: string
}) => {
  const desktopWindowPaneStyles = [
    styles,
    'absolute grid items-center justify-center bg-[var(--bg-c-dark)]',
    'left-0 top-[46px] w-full h-[calc(100%-46px)]',
  ].join(' ');

  return (
    <div className={desktopWindowPaneStyles}>
      { children }
    </div>
  )
}

export const FakeDesktopWindow = ({
  children,
  windowPaneStyles 
}: { 
  children: React.ReactElement,
  windowPaneStyles?: string 
}) => {
  const desktopWindowStyles = [
    'border-2 border-[var(--border-c-default)]',
    'rounded-lg overflow-hidden relative',
    'h-[clamp(240px,_90%,_768px)] w-[clamp(320px,_95%,_1024px)]',
    'rounded-lg shadow-md shadow-c-default',
  ].join(' ');

  return (
    <div className={desktopWindowStyles}>
      <FakeDesktopWindowMenu />
      <FakeDesktopWindowPane 
        styles={windowPaneStyles}
      >
        { children }
      </FakeDesktopWindowPane>
    </div>
  )
}

// 