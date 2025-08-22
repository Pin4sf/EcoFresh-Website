import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from './utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export function DialogContent({ className = '', children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/80" />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-ink w-full max-w-lg rounded-2xl border p-6 shadow-xl',
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function DialogHeader({ className = '', ...props }) {
  return <div className={cn('mb-4 flex items-center justify-between', className)} {...props} />
}

export function DialogTitle({ className = '', ...props }) {
  return <DialogPrimitive.Title className={cn('text-lg font-semibold', className)} {...props} />
}

export function DialogDescription({ className = '', ...props }) {
  return <DialogPrimitive.Description className={cn('text-ink-light', className)} {...props} />
}



