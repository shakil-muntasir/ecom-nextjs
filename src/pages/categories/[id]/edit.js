import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '@/utils/axios'

const CategoryEdit = () => {
  const router = useRouter()
  const { id } = router.query

  const [formData, setFormData] = useState({
    name: ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  const handleInput = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const fetchCategories = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/categories/${id}`)
          setFormData(response.data)
        } catch (error) {
          console.log(error.response)
          setErrorMessage('Error fetching product data.')
        }
      }
    }

    fetchCategories()
  }, [id])

  const handleUpdate = async e => {
    e.preventDefault()
    console.log('submit')
    try {
      const response = await axios.patch(`/api/categories/${id}`, formData)
      console.log('Update response:', response.data) // Log the response from the API
      router.push('/categories')
    } catch (error) {
      console.log('Update error:', error.response)
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Error updating product.')
      } else {
        setErrorMessage('An error occurred while updating the product.')
      }
    }
  }

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
          <form onSubmit={handleUpdate} className='w-full py-16 px-12'>
            <p className='text-3xl mb-4'>Edit Category</p>
            <div className='mt-4 space-y-4'>
              {errorMessage && (
                <p>
                  <span className='text-red-600 mt-2'>{errorMessage}</span>
                </p>
              )}
              <div>
                <label htmlFor='name' className='block font-medium text-sm text-gray-700'>
                  Name
                </label>
                <input type='text' name='name' id='name' value={formData.name} onChange={handleInput} placeholder='Category name' autoFocus={true} className='px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' autoComplete='off' />
              </div>

              <div className='flex items-center justify-end'>
                <a
                  href='/products'
                  className='mt-3 inline-flex items-center px-4 py-2 border-3 text-gray-900 border-gray-900 rounded-md font-semibold text-xs hover:text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ml-4'
                >
                  Cancel
                </a>

                <button
                  type='submit'
                  className='mt-3 inline-flex items-center px-4 py-2 bg-[#F47458] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest 
                  hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F47458] focus:ring-offset-2 transition ease-in-out duration-150 ml-4'
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default CategoryEdit
