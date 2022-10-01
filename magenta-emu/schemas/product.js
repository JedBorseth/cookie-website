export default {
  name: "product",
  type: "document",
  title: "Products",
  fields: [
    { name: "name", type: "string", title: "Product Name" },
    { name: "short_desc", type: "string", title: "Short Description" },
    { name: "price", type: "number", title: "Price" },
    {
      title: "Description",
      name: "text",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Poster",
      name: "poster",
      type: "image",
      options: {
        hotspot: true, // <-- Defaults to false
        metadata: [
          "blurhash", // Default: included
          "lqip", // Default: included
          "palette", // Default: included
          "exif", // Default: not included
          "location", // Default: not included
        ],
      },
    },
    { title: "Featured", name: "featured", type: "boolean" },
  ],
};
