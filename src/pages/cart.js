import React from 'react'
import Link from 'next/link'

const CartPage = () => {
  const cart = [
    {
      productId: 1,
      name: 'Shirt',
      price: 20,
      quantity: 1
    },
    {
      productId: 2,
      name: 'Pants',
      price: 40,
      quantity: 2
    }
  ]

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <main>
      <div className='bg-white h-17 border-b-2 border-gray-200'>
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
              <h1 className='text-2xl font-bold text-[#F47458] ml-2'>Your Cart</h1>
            </div>
          </Link>
        </div>
        <div className='cart-items container mx-auto py-4 flex justify-between items-center'>
          {cart.map(item => (
            <div key={item.productId} className='cart-item'>
              <img src={`/images/shirt.png`} alt={item.name} className='cart-item-image' />
              <div className='cart-item-details'>
                <h2>{item.name}</h2>
                <p>
                  Price: ${item.price} | Quantity: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='cart-total'>
          <p>Total Price: ${totalPrice}</p>
          <Link href='/login'>
            <button className='checkout-button'>Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default CartPage
