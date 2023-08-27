import { useState } from 'react'
import Link from 'next/link'

const Card = ({ products, addToCart }) => {
  const [quantities, setQuantities] = useState({})

  const handleQuantityChange = (productId, event) => {
    const newQuantities = { ...quantities, [productId]: parseInt(event.target.value) }

    setQuantities(newQuantities)
  }
  const handleAddToCart = product => {
    const totalPrice = product.price * (quantities[product.id] || 1)
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    addToCart(product.id, quantities[product.id])
  }

  return (
    <div className='bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {products.map(product => (
        <div key={product.id} className='bg-white rounded-md p-4 shadow-xl'>
          <Link href={`/products/details/${product.id}`}>
            <img src={`/images/shirt.png`} alt={product.name} className='w-fill h-50 object-cover' />
          </Link>

          <Link href={`/products/details/${product.id}`}>
            <h2 className='text-lg font-semibold'>{product.name}</h2>
          </Link>

          <p className='text-gray-600'>Price: ${product.price}</p>

          <div className='flex gap-4 mt-4'>
            <Link href={`/products/details/${product.id}`}>
              <button className='bg-orange-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-orange-600'>View</button>
            </Link>
            <div className='flex gap-2'>
              <input type='number' min='1' value={quantities[product.id] || ''} onChange={e => handleQuantityChange(product.id, e)} className='border rounded-md px-2 py-1 w-16' />
              <button onClick={() => handleAddToCart(product)} className='bg-orange-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-orange-600'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card
