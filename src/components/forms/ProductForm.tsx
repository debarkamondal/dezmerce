"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Product } from "@/lib/types";
import {
  addProduct,
  deleteProduct,
  revalidatepath,
  revalidatetag,
} from "@/lib/actions";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useOptimistic,
  useState,
} from "react";
import Image from "next/image";
import { DeleteIcon, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CategoryForm from "./CategoryForm";
import { useRouter } from "next/navigation";
import { getProductById } from "@/lib/utils";

const formSchema = z.object({
  title: z
    .string()
    .min(8, { message: "Username must be at least 8 characters." }),
  description: z
    .string()
    .min(32, {
      message: "Description should be atleast 32 characters long",
    })
    .max(2048, {
      message: "Max lenght reached.",
    }),
  category: z.string(),
  gender: z.enum(["male", "female"]),
  price: z.coerce.number().min(0, { message: "Invalid Price" }),
  images:
    typeof window === "undefined"
      ? z.any()
      : z.union([
          z.string().array(),
          z
            .instanceof(FileList)
            .refine((files) => files.length > 1, "Atleast 2 images required."),
        ]),
  thumbnail:
    typeof window === "undefined"
      ? z.any()
      : z.union([z.string(), z.instanceof(FileList)]),
  specs: z
    .array(
      z.object({
        key: z
          .string()
          .min(1, { message: "Specification key cannot be empty." }),
        value: z
          .string()
          .min(1, { message: "Specification value cannot be empty." }),
      }),
    )
    .optional(),
});

export function ProductForm({
  id,
  children,
  cats,
  setIsDialogOpen,
}: {
  id?: string;
  children?: ReactNode;
  cats: Record<string, string>;
  setIsDialogOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [initState, setInitState] = useState<Product & Record<string, any>>();
  const [categories, setCategories] = useOptimistic(
    Object.keys(cats).filter((e) => e !== "pk" && e !== "sk"),
    (currentState, optimisticValue: string[]) => [
      ...currentState,
      ...optimisticValue,
    ],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      gender: "male",
      price: 0,
      specs: [{ key: "", value: "" }],
    },
  });

  useEffect(() => {
    async function getData() {
      if (id) {
        const data: Product = await getProductById(id);
        setInitState(data);
        if (data) {
          form.reset({
            title: data.title ?? "",
            description: data.description ?? "",
            category: data.category.toLowerCase() ?? "",
            gender: data.gender ?? "male",
            price: data.price ?? 0,
            images: data.images,
            thumbnail: data.thumbnail,
            specs: Object.keys(data.specs).map((key) => ({
              key,
              value: data.specs[key],
            })),
          });
        }
      }
    }
    getData();
  }, [form, id]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "specs",
  });
  const imagesRef = form.register("images");
  const thumbnailRef = form.register("thumbnail");

  // 2. Define a submit handler.
  async function onSubmit(
    values: z.infer<typeof formSchema> & Record<string, any>,
  ) {
    let specs: Record<string, string> = {};

    //formating specs which are in form [{key:string, value:string}] to {key:value}
    values.specs?.forEach((spec) => {
      if (spec.key && spec.value) specs = { ...specs, [spec.key]: spec.value };
    });

    //TODO: Create update function

    // const updated: Partial<Product> & Record<string, any> = {};
    // if (initState) {
    //   for (const item in values) {
    //     if (values[item] === initState[item]) continue;
    //     if (item === "images" && values.images.length) {
    //       updated.images = [];
    //       for (let i = 0; i < values.images.length; i++) {
    //         if (
    //           values.images[i].name &&
    //           initState.images[i] !== values.images[i].name
    //         )
    //           updated.images?.push(values.images[i].name);
    //       }
    //       if (!updated.images?.length) delete updated.images;
    //       continue;
    //     }
    //     if (item === "specs") {
    //       if (values.specs?.length !== Object.keys(initState.specs).length) {
    //         updated.specs = specs;
    //         break;
    //       }
    //       for (const spec in initState.specs) {
    //         if (initState.specs[spec] !== specs[spec]) {
    //           updated.specs = specs;
    //           break;
    //         }
    //       }
    //       continue;
    //     }
    //     if (initState[item] !== values[item]) updated[item] = values[item];
    //   }
    //   console.log(updated);
    // }
    setIsLoading(true);
    let payload: Partial<Product> = {
      title: values.title,
      price: values.price,
      gender: values.gender,
      category: values.category,
      description: values.description,
      images: [],
      thumbnail: values.thumbnail[0].name,
      specs,
    };
    for (const image of values.images) {
      payload = {
        ...payload,
        images: payload.images ? [...payload.images, image.name] : [image.name],
      };
    }
    let product;
    if (!id) product = await addProduct(payload);
    else {
      //FIX: Make update work
    }

    await fetch(product.thumbnail, {
      method: "PUT",
      headers: { "Content-Type": values.thumbnail[0].type },
      body: values.thumbnail[0],
    });
    let imageRes = [];
    for (let i = 0; i < product.imageUrls.length; i++) {
      imageRes.push(
        await fetch(product.imageUrls[i], {
          method: "PUT",
          headers: { "Content-Type": values.images[i].type },
          body: values.images[i],
        }),
      );
    }
    imageRes = imageRes.filter((res) => res.status === 200);
    // TODO: Handle update product
    setIsLoading(false);
    revalidatepath("/admin/dashboard");
    revalidatetag("categories");
    if (setIsDialogOpen) setIsDialogOpen(false);
    router.back();
  }

  return (
    <Form {...form}>
      {children}
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
              <div className="flex gap-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="grow capitalize">
                      <SelectValue
                        placeholder={
                          field.value === "" ? "Select Category" : field.value
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem
                        className="capitalize"
                        key={category}
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <CategoryForm setCategories={setCategories} />
              </div>
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
                  <FormItem className="flex items-center space-y-0 space-x-3">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-y-0 space-x-3">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Dynamic Specifications Section */}
        <FormLabel>Specifications</FormLabel>
        {fields.map((item, index) => (
          <div key={item.id} className="mb-2 flex items-center gap-2 space-x-2">
            {/* Key Input */}
            <FormField
              control={form.control}
              name={`specs.${index}.key`} // Important: use dynamic name
              render={({ field }) => (
                <FormItem className="m-0 flex-1">
                  <FormControl>
                    <Input placeholder="e.g. Color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Value Input */}
            <FormField
              control={form.control}
              name={`specs.${index}.value`} // Important: use dynamic name
              render={({ field }) => (
                <FormItem className="m-0 flex-1">
                  {" "}
                  {/* Use flex-1 to take available space */}
                  <FormControl>
                    <Input placeholder="e.g. Red" {...field} />
                  </FormControl>
                  <FormMessage />{" "}
                  {/* Display errors for this specific value input */}
                </FormItem>
              )}
            />
            {/* Remove Button */}
            <Button
              type="button"
              size="icon"
              onClick={() => remove(index)}
              className="mt-auto" // Align button with inputs
            >
              <DeleteIcon className="h-4 w-4" /> {/* Use Trash icon */}
            </Button>
          </div>
        ))}
        {/* Add More Spec Button */}
        <Button
          type="button"
          size="sm"
          onClick={() => append({ key: "", value: "" })} // Append a new empty spec object
          className="mt-2"
        >
          Add <Plus />
        </Button>
        {/* Optional: Display error message for the entire specs array if needed */}
        {form.formState.errors.specs && (
          <p className="text-destructive mt-2 text-sm font-medium">
            {form.formState.errors.specs.message || "Invalid specifications"}
          </p>
        )}
        <FormField
          control={form.control}
          name="thumbnail"
          render={() => (
            <FormItem>
              <FormLabel>Product hero image</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Input type="file" {...thumbnailRef} />
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
                  <Input type="file" {...imagesRef} multiple />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center gap-2">
          <Button type="submit" disabled={isLoading} className="my-2 w-3/4">
            {isLoading ? (
              <Image
                src="/spinner.svg"
                height={20}
                width={20}
                alt="loading spinner"
                className="invert"
              />
            ) : (
              "Add Product"
            )}
          </Button>
          <Button
            type="button"
            variant={"outline"}
            className="gorw"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </div>
        {id && (
          <Button
            type="button"
            className="w-full"
            variant="destructive"
            onClick={() => {
              deleteProduct(id);
              revalidatepath("/admin/products");
            }}
          >
            Delete Product
          </Button>
        )}
      </form>
    </Form>
  );
}
