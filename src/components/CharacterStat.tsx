import { useInView } from 'react-hook-inview';

type FillColorsType = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';
enum FillColors {
  red = 'bg-red-500',
  orange = 'bg-orange-500',
  yellow = 'bg-yellow-500',
  green = 'bg-green-500',
  blue = 'bg-blue-500',
  purple = 'bg-purple-500',
}

export const CharacterStat = ({ 
  value,
  label,
  animate,
  fillColor = 'red' 
}: { 
  value: number,
  label?: string,
  animate?: boolean,
  fillColor?: FillColorsType
}) => {
  const startValue = animate ? 0 : value;
  const [ viewRef, isVisible ] = useInView({
    threshold: 1,
  })

  const statDotStyle = {
    left: isVisible ? `${value}%` : `${startValue}%`,
    transform: 'translateX(-50%)',
  }
  const statClipPathStyle = {
    clipPath:  isVisible ? 
      `inset(2px calc(${100-value}% - 10px) 2px 2px round 9999px)` : 
      `inset(2px calc(${100-startValue}% - 10px) 2px 2px round 9999px)`,
  }

  return (
    <div className="grid grid-cols-[40px_auto] gap-4 items-center" ref={viewRef}>
      { label && 
        <span className="font-mono text-xl font-medium text-c-default !mb-0">
          {label}
        </span> 
      }
      <div className="w-full min-w-[125px] h-6 rounded-full bg-gray-700 relative">
        <div className="absolute top-[2px] left-[2px] h-[calc(100%-3px)] w-[calc(100%-4px)]">
          <div 
            className={`clip-path-1 w-full h-full absolute left-0 top-0 transition-all delay-300 duration-500 ${FillColors[fillColor]}`} 
            style={statClipPathStyle}
            role="presentation" 
          />
          <div className="absolute top-0 left-[10px] h-full w-[calc(100%-10px)]">
            <span 
              className="absolute h-5 w-5 bg-white rounded-full transition-all delay-300 duration-500"
              role="presentation"
              style={statDotStyle}
            />
            <span className="sr-only">{value}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}