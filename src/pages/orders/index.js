import Table from '@/components/reusable/Table'
import axios from '@/utils/axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUser } from '@/store/user'
const Orders = () => {
  const [orders, setOrders] = useState([])
  const { state, dispatch } = useUser()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let url = '/api/orders/user/' + state.userInfo?.id
        if (state.userInfo?.roles?.includes('admin')) {
          url = '/api/orders'
        }
        const response = await axios.get(url)

        setOrders(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOrders()
  }, [])

  const tableFields = [
    { name: 'id', header: 'ID', alignment: 'right' },
    { name: 'totalPrice', header: 'Price', alignment: 'right' },
    { name: 'address', header: 'Address', alignment: 'right' },
    { name: 'phone', header: 'Phone', alignment: 'right' },
    { name: 'isDelivered', header: 'Delivered', alignment: 'right' }
    // { name: 'actions', header: 'Actions', alignment: 'right' }
  ]

  const handleDelete = async id => {
    try {
      const isConfirmed = confirm('Are you sure you want to delete this product?')
      if (!isConfirmed) return

      await axios.delete(`/api/orders/${id}`)

      const newOrders = orders.filter(order => order.id !== id)
      setOrders(newOrders)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='mt-12'>
      {/* <Link href='/products/create' className='px-4 sm:px-6 lg:px-12 mb-2 inline-block'>
        <button
          className='inline-flex items-center px-4 py-2 bg-[#F47458] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest 
                hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F47458] focus:ring-offset-2 transition ease-in-out duration-150'
        >
          Add new Product
        </button>
      </Link> */}
      <Table fields={tableFields} data={orders} source='orders' handleDelete={handleDelete} clickable='id' />
    </div>
  )
}

export default Orders
