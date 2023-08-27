import Link from 'next/link'

const Card = ({ products }) => {
   const addToCart = async (productId) => {

   }
  return (
    <div className="bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-md p-4 shadow-xl">
            <img src={`/images/shirt.png`} alt={product.name} className="w-fill h-50 object-cover" />
           
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">Price: ${product.price}</p>
            

          <div className="flex gap-4 mt-4">
            <Link href={`/products/details/${product.id}`}>
              <button className="bg-orange-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-orange-600">View</button>
            </Link>
            <button onClick={() => addToCart(product.id)} className="bg-orange-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-orange-600">Add to Cart</button>

            </div>
           
          </div>
        ))}
      </div>
  )

}

export default Card
