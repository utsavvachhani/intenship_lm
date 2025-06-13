import React from 'react'
import { useParams } from 'react-router-dom';

function ProductDeatils() {
  const params = useParams();
  return (
    <div>
      {params.search}
    </div>
  )
}

export default ProductDeatils
