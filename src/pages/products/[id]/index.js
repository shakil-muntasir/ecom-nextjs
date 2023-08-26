import { useRouter } from 'next/router'

const ProductShow = () => {
  const router = useRouter()
  const { id } = router.query

  return <div>Product ID: {id}</div>
}

export default ProductShow
