"use server";
import { cookies } from "next/headers";
import { CartItem, order, Product } from "./types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const url = `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}`;
export const getCart = async () => {
  const cookieStore = await cookies();
  try {
    const data = await fetch(`${url}/user/cart`, {
      headers: {
        Authorization: cookieStore.get("auth")?.value as string,
      },
    });
    return await data.json();
  } catch (error) {
    return error;
  }
};

export const setCart = async (cart: CartItem[]) => {
  const cookieStore = await cookies();
  try {
    await fetch(`${url}/user/cart`, {
      headers: {
        Authorization: cookieStore.get("auth")?.value as string,
      },
      method: "POST",
      body: JSON.stringify({ items: cart }),
    });
  } catch (error) {
    return error;
  }
};
export const getCartValue = async (cart: CartItem[]) => {
  try {
    const data = await fetch(`${url}/cart`, {
      method: "PUT",
      body: JSON.stringify({ items: cart }),
    });
    const cartValue = await data.json();
    return cartValue;
  } catch (error) {
    return error;
  }
};

export const addProduct = async (product: Partial<Product>) => {
  const cookieStore = await cookies();
  const data = await fetch(`${url}/admin/products`, {
    headers: {
      Authorization: cookieStore.get("auth")?.value as string,
    },
    method: "POST",
    body: JSON.stringify(product),
  });
  return await data.json();
};

export const deleteProduct = async (category: string, id: string) => {
  const cookieStore = await cookies();
  await fetch(`${url}/admin/products`, {
    headers: {
      Authorization: cookieStore.get("auth")?.value as string,
    },
    method: "DELETE",
    body: JSON.stringify({ category, id }),
  });
};

export const addCategory = async (category: string, image: string) => {
  const cookieStore = await cookies();
  const data = await fetch(`${url}/admin/categories`, {
    headers: {
      Authorization: cookieStore.get("auth")?.value as string,
    },
    method: "POST",
    body: JSON.stringify({
      category: category.toLowerCase(),
      image: `${category}.${image.split(".")[image.split(".").length - 1]}`,
    }),
  });
  return (await data.json()).imgUrl;
};

export const updateCategory = async (
  initCategory: string,
  updated: { category?: string; image?: string },
) => {
  const cookieStore = await cookies();
  const data = await fetch(`${url}/admin/categories`, {
    headers: {
      Authorization: cookieStore.get("auth")?.value as string,
    },
    method: "PATCH",
    body: JSON.stringify({
      initCategory: initCategory.toLowerCase(),
      updated,
    }),
  });

  return await data.json();
};
export const initiateOrder = async (body: order) => {
  const cookieStore = await cookies();

  const payload: Record<string, any> = {
    method: "POST",
    body: JSON.stringify(body),
  };
  const authToken = cookieStore.get("auth")?.value;
  if (authToken) {
    payload.headers = {
      Authorization: authToken,
    };
  }
  try {
    const data = await fetch(`${url}/orders`, payload);
    let cookie: string | null = data.headers.get("Set-Cookie");
    if (!cookie) throw new Error("backend responded with no cookie");
    cookie = cookie?.substring(cookie.indexOf("=") + 1, cookie.indexOf(";"));
    cookieStore.set("order", cookie, {
      httpOnly: true,
      secure: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const initiatePayment = async () => {
  const cookieStore = await cookies();
  try {
    const data = await fetch(`${url}/payments`, {
      headers: {
        order: cookieStore.get("order")?.value as string,
      },
    });
    return await data.json();
  } catch (err) {
    console.log(err);
  }
};

export const revalidatepath = async (path: string) => revalidatePath(path);
export const revalidatetag = async (tag: string) => revalidateTag(tag);
