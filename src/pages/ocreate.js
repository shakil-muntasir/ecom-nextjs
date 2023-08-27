import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/utils/axios'

export default function CreateProduct() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    userId: '',
    totalPrice: '',
    deliveryOption: '',
    address: '',
    description: '',
    isDelivered: ''
  })

  useEffect(() => {}, [])

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
    <div className='min-h-screen  '>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
          <form onSubmit={handleSubmit} className='w-full py-16 px-12'>
            <p className='text-2xl tracking-wide text-gray-900'>Checkout</p>
            <div className='mt-4 flex flex-col space-y-4'>
              {errorMessage && <div className='flex flex-col bg-red-700/10 px-2 py-1 rounded'>{showErrorMessage}</div>}
              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2' htmlFor='userId'>
                  User ID:
                </label>
                <input type='text' id='userId' className='w-full p-2 border rounded-md' value={formData.userId} onChange={handleInput} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2' htmlFor='totalPrice'>
                  Total Price:
                </label>
                <input type='number' id='totalPrice' className='w-full p-2 border rounded-md' value={formData.totalPrice} onChange={handleInput} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2' htmlFor='deliveryOption'>
                  Delivery Option:
                </label>
                <select id='deliveryOption' className='w-full p-2 border rounded-md' value={formData.deliveryOption} onChange={handleInput}>
                  <option value=''>Select an option</option>
                  <option value='standard'>Standard</option>
                  <option value='express'>Express</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2' htmlFor='address'>
                  Address:
                </label>
                <textarea id='address' className='w-full p-2 border rounded-md' value={formData.address} onChange={handleInput} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2' htmlFor='phone'>
                  Phone:
                </label>
                <input type='tel' id='phone' className='w-full p-2 border rounded-md' value={formData.phone} onChange={handleInput} />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-semibold mb-2' htmlFor='isDelivered'>
                  Is Delivered:
                </label>
                <input type='checkbox' id='isDelivered' className='mr-2' checked={formData.isDelivered} onChange={handleInput} />
              </div>
              <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'>
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
