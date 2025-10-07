import { z } from "zod";

const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

const colorSchema = z.union([
  z.literal("red"),
  z.literal("black"),
  z.literal("white"),
  z.literal("blue"),
  z.literal("silver"),
]);

export const carSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1),
  color: colorSchema,
  price: z.number().positive(),
  ...coordinatesSchema.shape,
});

export const carsSchema = z.array(carSchema);

export type Car = z.infer<typeof carSchema>;
