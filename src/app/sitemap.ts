import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dkmondal.in",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://dkmondal.in/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 2,
    },
    {
      url: "https://dkmondal.in/support",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://dkmondal.in/shipping-and-delivery",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: "https://dkmondal.in/terms-and-conditions",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: "https://dkmondal.in/cancellation-and-refund",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
    {
      url: "https://dkmondal.in/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
  ];
}
