'use server'
import { cookies } from 'next/headers'
import { CartItem, Product } from './types'
import { revalidatePath } from 'next/cache'

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
        return error
    }
}

export const setCart = async (cart: CartItem[]) => {
    const cookieStore = await cookies()
    try {

        await fetch(`https://api.dkmondal.in/test/cart`,
            {
                headers: {
                    Authorization: cookieStore.get('auth')?.value as string
                },
                method: 'POST',
                body: JSON.stringify({ items: cart })
            })
    } catch (error) {
        return error
    }
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

export const deleteProduct = async (id: string) => {
    const cookieStore = await cookies()
    const data = await fetch(`https://api.dkmondal.in/test/admin/products`,
        {
            headers: {
                Authorization: cookieStore.get('auth')?.value as string
            },
            method: 'DELETE',
            body: JSON.stringify({ id })
        })
    console.log(await data.json())
    return
}
export const getCategories = async () => {

    const cookieStore = await cookies()
    const data = await fetch(`https://api.dkmondal.in/test/admin/categories`,
        {
            headers: {
                Authorization: cookieStore.get('auth')?.value as string
            },
        })
    return await data.json()
}

export const revalidate = async (path: string) => revalidatePath(path)

