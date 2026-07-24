import '@testing-library/jest-dom'
import React from 'react'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    const { alt = '', ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...rest} />
  },
}))

jest.mock('framer-motion', () => {
  const passthrough = (Tag: string) => {
    const Component = React.forwardRef<HTMLElement, Record<string, unknown>>(
      (props, ref) => {
        const {
          children,
          initial: _initial,
          animate: _animate,
          exit: _exit,
          transition: _transition,
          whileHover: _whileHover,
          whileTap: _whileTap,
          ...rest
        } = props
        return React.createElement(Tag, { ...rest, ref }, children as React.ReactNode)
      },
    )
    Component.displayName = `motion.${Tag}`
    return Component
  }

  return {
    motion: new Proxy(
      {},
      {
        get: (_target, tag: string) => passthrough(tag),
      },
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useMotionValue: (initial: unknown) => ({
      get: () => initial,
      set: jest.fn(),
      on: jest.fn(),
    }),
    useTransform: (_value: unknown, transformer: unknown) => ({
      get: () => (typeof transformer === 'function' ? (transformer as (v: number) => unknown)(0) : 0),
      on: () => jest.fn(),
    }),
    animate: () => ({ stop: jest.fn() }),
  }
})

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    resolvedTheme: 'light',
    setTheme: jest.fn(),
  }),
}))

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }

  const params = {}
  const searchParams = new URLSearchParams()

  return {
    useRouter: () => router,
    useParams: () => params,
    useSearchParams: () => searchParams,
    usePathname: () => '/',
  }
})

jest.mock('@/lib/auth-client', () => ({
  authClient: {
    useSession: jest.fn(() => ({ data: null, isPending: false })),
    signIn: { email: jest.fn() },
    signOut: jest.fn(),
  },
}))