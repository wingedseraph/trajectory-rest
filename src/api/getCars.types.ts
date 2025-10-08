import { z } from "zod";

export function getErrorMessageFromUnknown(error: unknown) {
  return error instanceof Error ? error.message : "Fetching data error";
}

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
  name: z.string().min(1, "Name is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1, "Year is required"),
  color: colorSchema,
  price: z.number().positive("Price must be greater than 0"),
  ...coordinatesSchema.shape,
});

export const carsSchema = z.array(carSchema);

export type Car = z.infer<typeof carSchema>;
