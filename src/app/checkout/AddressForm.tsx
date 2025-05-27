"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCartContext } from "@/components/providers/CartProvider";
import { initiateOrder } from "@/lib/actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  addressLine1: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  addressLine2: z.string(),
  city: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  state: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  pincode: z.coerce.number().min(100000, { message: "Enter a valid PIN code" }),
  phone: z.coerce
    .number()
    .min(1000000000, { message: "Enter a valid phone number" }),
});

export function AddressForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      email: "",
      phone: 0,
      pincode: 0,
    },
  });

  const cart = useCartContext();
  const items: Record<string, { category: string; qty: number }> = {};
  cart.forEach((item) => {
    items[item.id] = {
      category: item.category,
      qty: item.qty,
    };
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await initiateOrder({
      user: {
        name: values.name,
        email: values.email,
        address: {
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
        },
        phone: values.phone,
      },
      items,
    });
    redirect("/public/order");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-2 mt-4 space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="Address Line 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Input placeholder="Address Line 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Pincode"
                  {...field}
                  value={field.value === 0 ? "" : (field.value as number)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Phone number"
                  {...field}
                  value={field.value === 0 ? "" : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
export default AddressForm;
