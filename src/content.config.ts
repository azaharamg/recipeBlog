// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `loader` and `schema` for each collection
const recipe = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/recipes" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    category: z.enum(["kids", "traditional", "desserts"]).optional().default("traditional"),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = { recipe };
