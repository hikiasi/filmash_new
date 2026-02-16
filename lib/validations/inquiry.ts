import { z } from 'zod';

export const inquirySchema = z.object({
  trimId: z.string().uuid(),
  colorId: z.string().uuid(),
  wheelsId: z.string().uuid().optional().nullable(),
  interiorId: z.string().uuid().optional().nullable(),
  selectedOptions: z.array(z.any()),
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Некорректный номер телефона'),
  email: z.string().email('Некорректный email'),
  totalPriceCNY: z.number(),
  totalPriceRUB: z.number(),
  snapshot: z.any(),
});

export type InquiryValues = z.infer<typeof inquirySchema>;
