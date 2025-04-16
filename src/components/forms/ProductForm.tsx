"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Product } from "@/lib/types"
import { addProduct } from "@/lib/actions"
import { useState } from "react"
import Image from "next/image"
import { redirect } from "next/navigation"

const formSchema = z.object({
    title: z.string().min(8, {
        message: "Username must be at least 8 characters.",
    }),
    description: z.string().min(32, {
        message: "Description should be atleast 32 characters long"
    }).max(2048, {
        message: "Max lenght reached."
    }),
    category: z.string(),
    gender: z.enum(['male', 'female']),
    price: z.coerce.number().min(0, { message: "Invalid Price" }),
    images: z
        .instanceof(FileList)
        .refine((files) => files.length > 1, "Atleast 2 images required."),
    thumbnail: z.instanceof(FileList)
})

export function ProductForm() {

    // 1. Define your form.
    const [isLoading, setIsLoading] = useState(false)
    const [productId, setProductId] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            gender: "male",
            price: 0,
        },
    })
    const imagesRef = form.register("images");
    const thumbnailRef = form.register("thumbnail");

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        let payload: Partial<Product> = {
            title: values.title,
            price: values.price,
            gender: values.gender,
            category: values.category,
            description: values.description,
            images: [],
            thumbnail: values.thumbnail[0].name
        }
        for (const image of values.images) {
            payload = { ...payload, images: payload.images ? [...payload.images, image.name] : [image.name] }
        }
        const product = await addProduct(payload)
        const thumbnailRes = await fetch(product.thumbnail, { method: 'PUT', headers: { 'Content-Type': values.thumbnail[0].type }, body: values.thumbnail[0] })
        // let imageRes = preSignedUrls.imageUrls.map(async (imageUrl: string) => { return await fetch(preSignedUrls.thumbnail, { method: 'PUT', headers: { 'Content-Type': values.thumbnail[0].type }, body: imageUrl }) })
        // imageRes = await Promise.all(imageRes)
        let imageRes = [];
        for (let i = 0; i < product.imageUrls.length; i++) {
            imageRes.push(await fetch(product.imageUrls[i], { method: 'PUT', headers: { 'Content-Type': values.images[i].type }, body: values.images[i] }))

        }
        imageRes = imageRes.filter((res) => res.status === 200)
        if (imageRes.length === values.images.length && thumbnailRes.status === 200) {
            setProductId(product.id)
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter category" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter price" {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Select Gender:</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Male
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="female" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Female
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={() => (
                        <FormItem>
                            <FormLabel>Product hero image</FormLabel>
                            <FormControl>
                                <div className="flex flex-col gap-2">
                                    <Input
                                        type="file"
                                        {...thumbnailRef}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="images"
                    render={() => (
                        <FormItem>
                            <FormLabel>Product Images</FormLabel>
                            <FormControl>
                                <div className="flex flex-col gap-2">
                                    <Input
                                        type="file"
                                        {...imagesRef}
                                        multiple
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center items-center gap-2">
                    <Button type="submit" className="w-3/4 my-2">{isLoading ? <Image src="/spinner.svg" height={20} width={20} alt="loading spinner" className="invert" /> : "Add Product"}</Button>
                    <Button type="button" variant={"outline"} className="w-1/4" onClick={() => form.reset()}>Reset</Button>
                </div>
                {productId && <Button className="w-full" onClick={()=>redirect(`/products/${productId}`)}>Go to Product</Button>}
            </form>
        </Form>
    )
}
