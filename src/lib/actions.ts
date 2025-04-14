'use server'
import { cookies } from 'next/headers'
import { cartItem } from './types'

export const getCart = async () => {
    const cookieStore = await cookies()
    try{

        const data = await fetch(`https://api.dkmondal.in/test/cart`,
                                 {
            headers: {
                Authorization: cookieStore.get('auth')?.value as string
            }
        })
        return await data.json()
    }catch(error){
        if(error) return [] 
    }
}

export const setCart = async (cart: cartItem[]) => {
    const cookieStore = await cookies()
    console.log(cart)
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

