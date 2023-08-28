import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '@/utils/axios'

const ProductEdit = () => {
  const router = useRouter()
  const { id } = router.query
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    quantity: '',
    description: '',
    categoryId: ''
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
      try {
        const response = await axios.get('/api/categories')

        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/products/${id}`)
          setFormData(response.data)
        } catch (error) {
          console.log(error.response)
          setErrorMessage('Error fetching product data.')
        }
      }
    }

    fetchProduct()
    fetchCategories()
  }, [id])

  const handleUpdate = async e => {
    e.preventDefault()

    try {
      const response = await axios.patch(`/api/products/${id}`, {
        ...formData,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId)
      })
      console.log('Update response:', response.data) // Log the response from the API
      router.push('/products')
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

  const handleCategoryChange = e => {
    setFormData({
      ...formData,
      categoryId: e.target.value
    })
  }
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
          <form onSubmit={handleUpdate} className='w-full py-16 px-12'>
            <p className='text-3xl mb-4'>Edit products</p>
            <div className='mt-4 space-y-4'>
              {errorMessage && <div className='flex flex-col bg-red-700/10 px-2 py-1 rounded'>{showErrorMessage}</div>}
              <div>
                <label htmlFor='name' className='block font-medium text-sm text-gray-700'>
                  Name
                </label>
                <input type='text' name='name' id='name' value={formData.name} onChange={handleInput} placeholder='Product name' autoFocus={true} className='px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' autoComplete='off' />
              </div>

              <div className='mt-5'>
                <label htmlFor='price' className='block font-medium text-sm text-gray-700'>
                  Price
                </label>
                <input type='text' name='price' id='price' value={formData.price} onChange={handleInput} placeholder='$99.99' className='px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' autoComplete='off' />
              </div>

              <div className='mt-5'>
                <label htmlFor='quantity' className='block font-medium text-sm text-gray-700'>
                  Quantity
                </label>
                <input type='text' name='quantity' id='quantity' value={formData.quantity} onChange={handleInput} placeholder='quantity' className='px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' autoComplete='off' />
              </div>
              <div>
                <label htmlFor='description' className='block font-medium text-sm text-gray-700'>
                  Description
                </label>
                <input type='text' name='description' id='description' value={formData.description} onChange={handleInput} placeholder='Enter Description' className='px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' />
              </div>

              <div>
                <label htmlFor='image' className='block font-medium text-sm text-gray-700'>
                  Image URL
                </label>
                <input type='text' name='image' id='image' value={formData.image} onChange={handleInput} placeholder='Image URL' className='px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' />
              </div>

              <div>
                <label htmlFor='category-id' className='block font-medium text-sm text-gray-700'>
                  Category ID
                </label>

                <select value={formData.categoryId} onChange={handleCategoryChange} className='px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full'>
                  <option value=''>Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex items-center justify-end'>
                <button
                  type='button'
                  onClick={() => router.push('/products')}
                  className='mt-3 inline-flex items-center px-4 py-2 border-2 text-gray-900 border-gray-900 rounded-md font-semibold text-xs hover:text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ml-4'
                >
                  Cancel
                </button>

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
export default ProductEdit
