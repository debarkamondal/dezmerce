export type CartItem = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  qty: number;
  category: string;
};
export type Product = {
  category: string;
  id: string;
  gender: "male" | "female";
  thumbnail: string;
  title: string;
  defaultDelivery: string;
  price: number;
  ratings: Array<number>;
  images: Array<string>;
  variants?: Array<Array<string>>;
  description: string;
  specs: {
    [key: string]: string;
  };
};
export type productMetadata = {
  category: string;
  id: string;
  thumbnail: string;
  price: number;
  title: string;
  gender: "male" | "female";
};

export type category = {
  qty: number;
  image: string;
};

export type order = {
  id?: string;
  items?: Record<string, { category: string; qty: number }>;
  user: {
    name: string;
    email?: string;
    phone?: number;
    address: {
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      pincode: number;
    };
  };
};
