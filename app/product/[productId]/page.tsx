import prisma from '@/app/db'
import React from 'react'
import Image from 'next/image'
type Props = {
    params: {
        productId: string
    }
}

async function ProductPage({ params: { productId } }: Props) {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) {
        return <div>Product not Found</div>
    }
    return (

        <div className='flex flex-col items-center justify-center p-3 rounded-lg space-y-3 border border-gray-200 '>
            <Image alt={product.title} width={200} height={300} className='object-contain rounded-md w-48 h-60' src={product.imageUrl!} />
            <p className='text-sm font-light'>
                ${product.price}
            </p>
            <h1 className='text-lg font-semibold'>
                {product.title}
            </h1>
        </div>
    )
}

export default ProductPage

