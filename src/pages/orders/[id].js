import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/utils/axios'
import Link from 'next/link'
import { useUser } from '@/store/user'
const OrderShow = () => {
  const router = useRouter()
  const [order, setOrder] = useState({})
  const { id } = router.query
  const { state } = useUser()

  useEffect(() => {
    const fetchOrder = async () => {
      let url = `/api/orders/user/${state.userInfo?.id}/${id}`

      try {
        const response = await axios.get(url)
        setOrder(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOrder()

    if (id) {
    }
  }, [id])

  return (
    <main className='bg-gray-100 min-h-screen'>
      <div className='mt-4 flex flex-col justify-between items-center'>
        <div className='flex mb-4 flex-col w-2/4 font-semibold text-xl uppercase'>
          <h1>Orders: {order.id}</h1>
        </div>
        {order?.products?.map(item => (
          <div key={item.id} className='mx-16 flex flex-col  gap-y-2 h-24 w-2/4'>
            <div className='flex items-center justify-start bg-white p-3'>
              <img src={`/images/shirt.png`} alt={item.name} className='w-16 h-16 object-cover' />
              <div className=''>
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          </div>
        ))}

        <div className='mx-16 mt-4 flex flex-col  gap-y-2 h-24 w-2/4'>
          <div className='flex flex-col items-start justify-start'>
            <p className='font-semibold text-xl'>Total Price: ${order.totalPrice}</p>
            <p className='font-semibold text-xl'>Address: {order.address}</p>
            <p className='font-semibold text-xl'>Phone: {order.phone}</p>
          </div>
        </div>
      </div>
    </main>
    // <div></div>
  )
}

export default OrderShow
