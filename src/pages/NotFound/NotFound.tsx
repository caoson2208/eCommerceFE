import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center'>
      <h1 className='text-9xl font-extrabold tracking-widest text-gray-900'>404</h1>
      <div className='absolute transform rotate-12 rounded bg-orange-500 px-2 text-sm text-white'>Page Not Found</div>
      <Link
        to='/'
        className='mt-5 relative inline-block text-sm font-medium text-white focus:outline-none focus:ring group'
      >
        <span className='absolute inset-0 transform translate-x-1 translate-y-1 bg-orange-500 transition-transform group-hover:translate-x-0 group-hover:translate-y-0' />
        <span className='relative block border border-current bg-orange-500 px-8 py-3'>Go Home</span>
      </Link>
    </main>
  )
}
