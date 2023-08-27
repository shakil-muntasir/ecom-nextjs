import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/utils/axios'

export default function CreateProduct() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: ''
  })

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
      await axios.post('/api/categories', formData)
      router.push('/categories')
    } catch (error) {
      console.log(error.response)
      setErrorMessage('An error occurred while submitting the form.')
    }
  }

  return (
    <div className='min-h-screen  '>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
          <form onSubmit={handleSubmit} className='w-full py-16 px-12'>
            <p className='text-2xl tracking-wide text-gray-900'>Create Category</p>
            <div className='mt-4 flex flex-col space-y-4'>
              {errorMessage && <p className='text-red-600 mt-2'>{errorMessage}</p>}
              <div>
                <label htmlFor='name' className='block font-medium text-sm text-gray-700'>
                  Name
                </label>
                <input type='text' name='name' id='name' value={formData.name} onChange={handleInput} placeholder='Category Name' autoFocus='on' className='px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' />
              </div>

              <div className='flex items-center justify-end'>
                <button
                  type='button'
                  onClick={() => router.push('/categories')}
                  className='mt-3 inline-flex items-center px-4 py-2 border-2 text-gray-900 border-gray-900 rounded-md font-semibold text-xs hover:text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ml-4'
                >
                  Cancel
                </button>

                <button
                  type='submit'
                  className='mt-3 inline-flex items-center px-4 py-2 bg-[#F47458] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest 
                hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F47458] focus:ring-offset-2 transition ease-in-out duration-150 ml-4'
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
