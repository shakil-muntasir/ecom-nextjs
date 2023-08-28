import { useEffect, useState } from 'react'
import { useUser } from '@/store/user'
import axios from '@/utils/axios'
import Link from 'next/link'
import Card from '@/components/products/Card'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || [])
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0))

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories')

        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0))
  }, [cart])

  useEffect(() => {
    const fetchProducts = async () => {
      let productsApiUrl = '/api/products'

      if (selectedCategoryId) {
        productsApiUrl = `/api/categories/${selectedCategoryId}/products`
      }

      try {
        const response = await axios.get(productsApiUrl)

        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [selectedCategoryId])

  const addToCart = (productId, quantity) => {
    const selectedProduct = products.find(product => product.id === productId)

    // Check if the selected product is already in the cart
    const existingCartItemIndex = cart.findIndex(item => item.id === productId)

    let updatedCart = []
    if (existingCartItemIndex !== -1) {
      // If the product is already in the cart, update the quantity
      updatedCart = cart.map((item, index) => {
        if (index === existingCartItemIndex) {
          return { ...item, quantity: item.quantity + quantity }
        }
        return item
      })

      setCart(updatedCart)
    } else {
      // If the product is not in the cart, add it as a new entry
      updatedCart = [...cart, { ...selectedProduct, quantity }]
      setCart(updatedCart)
    }

    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0))

    localStorage.setItem('cart', JSON.stringify(updatedCart || []))
  }

  return (
    <main>
      <nav className='bg-white h-17 border-b-2 border-gray-200'>
        <div className='container mx-auto py-4 flex justify-between items-center'>
          <Link href='/'>
            <div className='flex items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='h-16 w-16 text-[#F47458]'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
                />
              </svg>
              <h1 className='text-2xl font-bold text-[#F47458] ml-2'>E-commerce Website</h1>
            </div>
          </Link>
          <div className='ml-auto space-x-4 flex items-center'>
            <Link href='/login'>
              <button className='text-[#F47458] text-orange px-3 py-2 rounded-md font-semibold hover:bg-gray-200'>Login</button>
            </Link>
            <Link href='/signup'>
              <button className='text-[#F47458] text-orange px-3 py-2 rounded-md font-semibold hover:bg-gray-200'>Sign Up</button>
            </Link>
            <Link href='/cart'>
              <button className='flex items-center justify-between gap-x-1.5 text-[#F47458] text-orange px-3 py-2 rounded-md font-semibold hover:bg-gray-200'>
                <span>Cart</span>
                <span className='text-xs border border-gray-700 rounded-full w-6 h-6 inline-flex items-center justify-center'>{cartCount}</span>
              </button>
            </Link>
            <Link href='/dashboard'>
              <button className='text-[#F47458] text-orange px-3 py-2 rounded-md font-semibold hover:bg-gray-200'>Dashboard</button>
            </Link>
          </div>
        </div>
      </nav>

      <div className='container mt-4 ml-4 '>
        <select value={selectedCategoryId} onChange={e => setSelectedCategoryId(e.target.value)} className='bg-white border-2 border-[#F47458] rounded-md py-2 px-4'>
          <option value=''>All Categories</option>

          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <Card products={products} addToCart={addToCart} />
    </main>
  )
}

export default HomePage
