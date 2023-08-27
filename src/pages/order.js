import React from 'react'

const OrderPage = ({ cart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <main>
      <h1>Order Summary</h1>
      <div className='order-items'>
        {cart.map(item => (
          <div key={item.productId} className='order-item'>
            <img src={`/images/shirt.png`} alt={item.name} className='order-item-image' />
            <div className='order-item-details'>
              <h2>{item.name}</h2>
              <p>
                Price: ${item.price} | Quantity: {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='order-total'>
        <p>Total Price: ${totalPrice}</p>
      </div>
    </main>
  )
}

export default OrderPage
