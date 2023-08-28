import Table from '@/components/reusable/Table'
import axios from '@/utils/axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products')

        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [])

  const tableFields = [
    { name: 'id', header: 'ID', alignment: 'left' },
    { name: 'name', header: 'Name', alignment: 'left' },
    // { name: 'description', header: 'Description', alignment: 'right' },
    { name: 'price', header: 'Price', alignment: 'right' },
    { name: 'quantity', header: 'Quantity', alignment: 'right' },
    { name: 'actions', header: 'Actions', alignment: 'right' }
  ]

  const handleDelete = async id => {
    try {
      const isConfirmed = confirm('Are you sure you want to delete this product?')
      if (!isConfirmed) return

      await axios.delete(`/api/products/${id}`)

      const newProducts = products.filter(product => product.id !== id)
      setProducts(newProducts)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='mt-12'>
      <Link href='/products/create' className='px-4 sm:px-6 lg:px-12 mb-2 inline-block'>
        <button
          className='inline-flex items-center px-4 py-2 bg-[#F47458] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest 
                hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F47458] focus:ring-offset-2 transition ease-in-out duration-150'
        >
          Add new Product
        </button>
      </Link>
      <Table fields={tableFields} data={products} source='products' handleDelete={handleDelete} clickable='name' />
    </div>
  )
}

export default Products
