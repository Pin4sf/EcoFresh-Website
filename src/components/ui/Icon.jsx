import { cn } from './utils'

const sizeMap = {
  sm: 'w-5 h-5',    // 20px
  md: 'w-6 h-6',    // 24px
  lg: 'w-8 h-8',    // 32px
  xl: 'w-10 h-10',  // 40px
}

const variantStyles = {
  default: 'text-current',
  primary: 'text-eco',
  muted: 'text-ink-muted',
  inverse: 'text-white',
}

const containerStyles = {
  none: '',
  circle: 'rounded-full',
  rounded: 'rounded-xl',
}

const containerBgStyles = {
  eco: 'bg-eco/10',
  solid: 'bg-eco',
  glass: 'bg-white/10 backdrop-blur-sm',
  sand: 'bg-sand',
  mist: 'bg-mist',
}

const containerPadding = {
  sm: 'p-2',
  md: 'p-2.5',
  lg: 'p-3',
  xl: 'p-4',
}

export function Icon({
  icon: IconComponent,
  size = 'md',
  variant = 'default',
  container = 'none',
  containerBg = 'eco',
  strokeWidth = 1.5,
  className,
  containerClassName,
  ...props
}) {
  const iconElement = (
    <IconComponent
      className={cn(
        sizeMap[size],
        variantStyles[variant],
        className
      )}
      strokeWidth={strokeWidth}
      {...props}
    />
  )

  if (container === 'none') {
    return iconElement
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center transition-all duration-300',
        containerStyles[container],
        containerBgStyles[containerBg],
        containerPadding[size],
        containerClassName
      )}
    >
      {iconElement}
    </span>
  )
}

export default Icon
