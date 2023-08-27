import { useState } from 'react'
import axios from '@/utils/axios'
import { useUser } from '@/store/user'
import { useRouter } from 'next/router'

const Cart = () => {
  const { state } = useUser()
  const router = useRouter()
  const [cart, setCart] = useState([])

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0)
  }

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.id !== productId)
    setCart(updatedCart)
  }

  const checkout = () => {
    axios.post('/api/orders', {
      products: cart.map(product => product.id),
      total: calculateTotalPrice()
    })
    .then(response => {
      setCart([])
      alert('Order placed successfully!')
    })
    .catch(error => {
      console.error(error)
      alert('Error placing order')
    })
  }

  return (
    <main>
      <div className='min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100'>
        <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>
        <div className='bg-white px-4 py-3 shadow-md rounded-lg'>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map(product => (
                <div key={product.id} className='flex items-center justify-between border-b border-gray-200 py-2'>
                  <div>
                    <p className='text-lg font-semibold'>{product.name}</p>
                    <p className='text-gray-600'>Price: ${product.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className='text-red-600 font-semibold'>Remove</button>
                </div>
              ))}
              <p className='mt-4 font-semibold'>Total: ${calculateTotalPrice()}</p>
              <button onClick={checkout} className='mt-4 bg-[#F47458] text-white py-2 px-4 rounded-md font-semibold hover:bg-red-700'>Checkout</button>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default Cart
