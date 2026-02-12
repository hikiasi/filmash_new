import { z } from 'zod';

export const catalogFiltersSchema = z.object({
  brands: z.array(z.string()).optional(),
  bodyTypes: z.array(z.string()).optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  powerRange: z.tuple([z.number(), z.number()]).optional(),
  driveTypes: z.array(z.string()).optional(),
  engineTypes: z.array(z.string()).optional(),
  search: z.string().optional(),
});

export type CatalogFilters = z.infer<typeof catalogFiltersSchema>;
