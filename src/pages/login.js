import { useEffect, useState } from 'react'
import axios from '@/utils/axios'
import { useRouter } from 'next/router'
import { useUser } from '@/store/user'

export default function Login() {
  const { state, dispatch } = useUser()
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (localStorage.getItem('accessToken') && state.userInfo) {
      router.push('/dashboard')
    }
  }, [router])

  const handleInput = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = async e => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/auth/login', formData)

      localStorage.setItem('accessToken', response.data.accessToken)

      const userResponse = await axios.get('/api/auth/user')
      localStorage.setItem('userInfo', JSON.stringify(userResponse.data))
      dispatch({ type: 'SET_USER', payload: userResponse.data })

      router.push('/dashboard')
    } catch (error) {
      setErrorMessage(() => {
        const errorMessage = error.response.data.message

        if (typeof errorMessage === 'string') {
          return errorMessage
        } else if (typeof errorMessage === 'object') {
          return Object.values(errorMessage).flat()
        }

        localStorage.removeItem('accessToken')
        localStorage.removeItem('userInfo')

        return ''
      })
    }
  }

  if (typeof errorMessage === 'string') {
    var showErrorMessage = <p className='text-red-600 text-sm'>{errorMessage}</p>
  } else if (typeof errorMessage === 'object') {
    var showErrorMessage = errorMessage.map((errorMessage, index) => (
      <p key={index} className='text-red-600 text-sm'>
        {errorMessage}
      </p>
    ))
  }

  return (
    <main>
      <div className='min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100'>
        <form onSubmit={submitLogin} className='w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='mx-auto h-16 w-16 text-[#F47458] mb-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
            />
          </svg>

          <p className='text-gray-900'>Welcome to Ecommerce Store!</p>
          <p className='mt-2 text-xs text-gray-900'>Please sign in to continue</p>

          <div className='mt-4 flex flex-col space-y-4'>
            {errorMessage && <div className='flex flex-col bg-red-700/10 px-2 py-1 rounded'>{showErrorMessage}</div>}

            <div>
              <label htmlFor='email' className='block font-medium text-sm text-gray-700'>
                Email
              </label>
              <input type='text' name='email' id='email' value={formData.email} onChange={handleInput} placeholder='your@email.com' autoFocus='on' className='px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' />
            </div>

            <div>
              <label htmlFor='password' className='block font-medium text-sm text-gray-700'>
                Password
              </label>
              <input type='password' name='password' id='password' value={formData.password} onChange={handleInput} placeholder='********' className='px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' />
            </div>

            <div className='flex items-center justify-between'>
              <p className='underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'> Forgot your password? </p>

              <button
                type='submit'
                className='inline-flex items-center px-4 py-2 bg-[#F47458] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F47458] focus:ring-offset-2 transition ease-in-out duration-150 ml-4'
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
