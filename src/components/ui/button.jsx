import { twMerge } from 'tailwind-merge'

export function Button({ variant = 'default', size = 'md', className = '', asChild = false, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md font-semibold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const variants = {
    default: 'bg-primary2 text-ink hover:bg-primary1',
    outline: 'border-2 border-primary2 text-primary2 hover:bg-primary2 hover:text-ink',
    secondary: 'bg-secondary2 text-ink hover:bg-secondary1',
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


