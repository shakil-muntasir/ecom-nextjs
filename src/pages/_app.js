import '@/styles/globals.css'
import { UserProvider } from '@/store/user'
import Layout from '@/components/reusable/Layout'

export default function App({ Component, pageProps, router }) {
  const excludedPaths = ['/', '/login', '/products/details/{id}', '/categories/{id}', '/categories/{id]/products', '/signup', '/cart', '/orders']

  const isRouteExcluded = excludedPaths.some(path => {
    const regexPattern = path.replace('{id}', '[^/]+')
    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(router.pathname)
  })

  if (isRouteExcluded) {
    return (
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    )
  }

  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}
