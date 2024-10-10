import { useState, useRef, useId, type ElementType } from 'react'
import {
  useFloating,
  FloatingPortal,
  arrow,
  shift,
  offset,
  type Placement,
  flip,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon
} from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen = false,
  placement = 'bottom-end'
}: Props) {
  const [open, setOpen] = useState(initialOpen)
  const arrowRef = useRef<HTMLElement>(null)
  const data = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    placement,
    transform: false
  })
  const { refs, floatingStyles, context } = data
  const hover = useHover(context, { handleClose: safePolygon() })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])
  const id = useId()

  return (
    <Element
      className={className}
      ref={refs.setReference}
      {...getReferenceProps()}
      aria-describedby={open ? id : undefined}
    >
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              id={id}
              aria-hidden={!open}
              style={{
                ...floatingStyles,
                transformOrigin: `${data.middlewareData.arrow?.x}px top`,
                zIndex: 9999
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='absolute z-[9999] translate-y-[-95%] border-[11px] border-x-transparent border-t-transparent border-b-black'
                style={{
                  left: data.middlewareData.arrow?.x,
                  top: data.middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
