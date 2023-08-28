import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/utils/axios'
import Link from 'next/link'

const ProductShow = () => {
  const router = useRouter()
  const [product, setProduct] = useState({})
  const { id } = router.query

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  return (
    <main className='flex items-center justify-center '>
      <div className='w-full max-w-3xl px-4 py-3 '>
        <div className='mb-6'>
          {product.id ? (
            <>
              <img src={`/images/product.png`} alt={product.name} className='w-64 h-64 object-cover' />
              <h2 className='text-lg font-semibold'>{product.name}</h2>
              <p className='text-gray-600'>Price: ${product.price}</p>
              <p className='text-gray-600'>Quantity: {product.quantity}</p>
              <p className='text-gray-600'>Description: {product.description}</p>
            </>
          ) : (
            <p>Loading product details...</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default ProductShow
