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

export type orderStatus =
  | "initiated"
  | "paid"
  | "shipped"
  | "cancelled"
  | "delivered";

export type orderBody = {
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
  items: Record<string, { title?: string; category: string; qty: number }>;
};
interface order {
  total: number;
  gwOrderId: string;
  payment_id: string;
  refundId?: string;
  trackingId?: string;
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
  items: Record<string, { title?: string; price: number; qty: number }>;
}
export interface adminOrder extends order {
  sk: string;
  lsi: orderStatus;
}
export interface userOrder extends order {
  id: string;
  status: orderStatus;
}
