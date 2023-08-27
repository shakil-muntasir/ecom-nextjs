import Loading from '@/components/reusable/Loading'
import { useUser } from '@/store/user'
import axios from '@/utils/axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Layout = ({ children }) => {
  const { state, dispatch } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [userRoles, setUserRoles] = useState('')

  const excludedPaths = ['/', '/products/details/{id}', '/categories/{id}', '/categories/{id]/products']

  const isRouteExcluded = excludedPaths.some(path => {
    const regexPattern = path.replace('{id}', '[^/]+')
    const regex = new RegExp(`^${regexPattern}$`)

    return regex.test(router.pathname)
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/user')

        dispatch({ type: 'SET_USER', payload: response.data })

        setUser(response.data)
        setUserRoles(response.data?.roles?.join(', '))
      } catch (error) {
        router.push('/login')
      }
    }
    fetchUser()

    setTimeout(() => setLoading(false), 1000)
  }, [children])

  const submitLogout = async e => {
    try {
      localStorage.removeItem('accessToken')
      dispatch({ type: 'SET_USER', payload: null })

      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const isActive = href => {
    const { pathname } = router
    return pathname === href
  }

  return !loading ? (
    <main className='flex'>
      <aside className='w-2/12 bg-white h-screen'>
        <Link href='/dashboard'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='mx-auto h-16 w-16 text-[#F47458] mb-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
            />
          </svg>
        </Link>

        {/* <!-- Navigation routes --> */}
        <nav className='mt-14 flex flex-col gap-y-6'>
          <Link href='/dashboard' className={`flex items-center mx-6 hover:bg-slate-100 px-7 py-1 rounded-md ${isActive('/dashboard') ? 'bg-slate-100' : ''}`}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
              />
            </svg>

            <span className='ml-7 text-gray-900 text-lg'>Dashboard</span>
          </Link>
          <Link href='/categories' className={`flex items-center mx-6 hover:bg-slate-100 px-7 py-1 rounded-md ${isActive('/categories') ? 'bg-slate-100' : ''}`}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' />
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 6h.008v.008H6V6z' />
            </svg>

            <span className='ml-7 text-gray-900 text-lg'>Category</span>
          </Link>

          <Link href='/products' className={`flex items-center mx-6 hover:bg-slate-100 px-7 py-1 rounded-md ${isActive('/products') ? 'bg-slate-100' : ''}`}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'
              />
            </svg>

            <span className='ml-7 text-gray-900 text-lg'>Products</span>
          </Link>

          <button onClick={submitLogout} className='flex items-center mx-6 hover:bg-slate-100 px-7 py-1 rounded-md'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75' />
            </svg>

            <span className='ml-7 text-gray-900 text-lg'>Logout</span>
          </button>
        </nav>
      </aside>

      <main className='bg-gray-50 flex-1 p-3'>
        <header className='ml-12 flex justify-between items-center'>
          <h1 className='font-semibold text-3xl tracking-wide uppercase text-gray-900'>ECOMMERCE APP</h1>

          <div className='flex flex-col items-center justify-center'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='h-28 w-28 text-cyan-800 rounded-full'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>

            <p className='mt-2 font-semibold tracking-wide'>{user?.name}</p>
            <span className='text-sm font-light'>{userRoles}</span>
          </div>
        </header>

        {children}
      </main>
    </main>
  ) : (
    <Loading />
  )
}

export default Layout
