import Table from '@/components/reusable/Table'
import axios from '@/utils/axios'
import { useEffect, useState } from 'react'

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
    { name: 'id', header: 'ID', alignment: 'right' },
    { name: 'name', header: 'Name', alignment: 'right' },
    { name: 'description', header: 'Description', alignment: 'right' },
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
      <Table fields={tableFields} data={products} handleDelete={handleDelete} clickable='name' />
    </div>
  )
}

export default Products
