'use server'
import { cookies } from 'next/headers'
import { CartItem, Product } from './types'

export const getCart = async () => {
    const cookieStore = await cookies()
    try {

        const data = await fetch(`https://api.dkmondal.in/test/cart`,
            {
                headers: {
                    Authorization: cookieStore.get('auth')?.value as string
                }
            })
        return await data.json()
    } catch (error) {
        if (error) return []
    }
}

export const setCart = async (cart: CartItem[]) => {
    const cookieStore = await cookies()
    const data = await fetch(`https://api.dkmondal.in/test/cart`,
        {
            headers: {
                Authorization: cookieStore.get('auth')?.value as string
            },
            method: 'POST',
            body: JSON.stringify({ items: cart })
        })
    console.log(await data.json())
    return 'test'
}

export const addProduct = async (product: Partial<Product>) => {

    const cookieStore = await cookies()
    const data = await fetch(`https://api.dkmondal.in/test/admin/products`,
        {
            headers: {
                Authorization: cookieStore.get('auth')?.value as string
            },
            method: 'POST',
            body: JSON.stringify(product)
        })
    return await data.json()
}

