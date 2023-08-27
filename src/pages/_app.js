import '@/styles/globals.css'
import { UserProvider } from '@/store/user'
import Layout from '@/components/reusable/Layout'

export default function App({ Component, pageProps, router }) {
  const excludedRoutes = ['/', '/login', '/register']

  if (excludedRoutes.includes(router.pathname)) {
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
