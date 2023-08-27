import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/utils/axios'
import { useUser } from '@/store/user'

export default function CreateProduct() {
  const { state, dispatch } = useUser()
  const router = useRouter()
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || [])

    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/user')

        dispatch({ type: 'SET_USER', payload: response.data })
      } catch (error) {
        console.log(error)
        router.push('/login')
      }
    }

    fetchUser()
  }, [])

  const [formData, setFormData] = useState({
    userId: '',
    orderedProducts: cart,
    totalPrice: 0,
    deliveryOption: '',
    address: '',
    phone: '',
    description: '',
    isDelivered: false
  })

  useEffect(() => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    const orderedProductIds = cart.map(item => item.id)

    setFormData({
      ...formData,
      orderedProducts: orderedProductIds,
      totalPrice: totalPrice
    })
  }, [cart])

  useEffect(() => {
    setFormData({
      ...formData,
      userId: state?.userInfo?.id
    })
  }, [state])

  const handleInput = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await axios.post('/api/orders', {
        ...formData,
        totalPrice: parseFloat(formData.totalPrice)
      })
      router.push('/')
    } catch (error) {
      setErrorMessage(() => {
        const errorMessage = error.response.data.message

        if (typeof errorMessage === 'string') {
          return errorMessage
        } else if (typeof errorMessage === 'object') {
          return Object.values(errorMessage).flat()
        }

        localStorage.removeItem('accessToken')

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
    <div className='min-h-screen  '>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
          <form onSubmit={handleSubmit} className='w-full py-16 px-12'>
            <p className='text-2xl tracking-wide text-gray-900'>Checkout</p>
            <div className='mt-4 flex flex-col space-y-4'>
              {errorMessage && <div className='flex flex-col bg-red-700/10 px-2 py-1 rounded'>{showErrorMessage}</div>}

              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2' htmlFor='deliveryOption'>
                  Delivery Option:
                </label>
                <select id='deliveryOption' name='deliveryOption' className='w-full p-2 border rounded-md' value={formData.deliveryOption} onChange={handleInput}>
                  <option value='' disabled>
                    Select an option
                  </option>
                  <option value='shop pickup'>Shop Pick-up</option>
                  <option value='home deliver'>Home Delivery</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2' htmlFor='address'>
                  Address
                </label>
                <input type='text' name='address' id='address' className='w-full p-2 border rounded-md' value={formData.address} onChange={handleInput} />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2' htmlFor='phone'>
                  Phone:
                </label>
                <input type='tel' id='phone' name='phone' className='w-full p-2 border rounded-md' value={formData.phone} onChange={handleInput} />
              </div>
              <div className='flex items-center justify-end'>
                <button
                  type='button'
                  onClick={() => router.push('/cart')}
                  className='mt-3 inline-flex items-center px-4 py-2 border-2 text-gray-900 border-gray-900 rounded-md font-semibold text-xs hover:text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ml-4'
                >
                  Cancel
                </button>

                <button
                  type='submit'
                  className='mt-3 inline-flex items-center px-4 py-2 bg-[#F47458] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest 
                hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F47458] focus:ring-offset-2 transition ease-in-out duration-150 ml-4'
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
