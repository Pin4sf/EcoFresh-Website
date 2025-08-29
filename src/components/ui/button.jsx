import { twMerge } from 'tailwind-merge'

export function Button({ variant = 'default', size = 'md', className = '', asChild = false, ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const variants = {
    default: 'rounded-md bg-primary2 text-ink hover:bg-primary1',
    outline: 'rounded-md border-2 border-primary2 text-primary2 hover:bg-primary2 hover:text-ink',
    secondary: 'rounded-md bg-secondary2 text-ink hover:bg-secondary1',
    cta: 'rounded-xl bg-white text-[#124170] shadow-md hover:bg-white/90',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }
  const cls = twMerge(base, variants[variant], sizes[size], className)
  if (asChild && props.href) {
    return <a className={cls} {...props} />
  }
  return <button className={cls} {...props} />
}


