import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { carSchema } from "@/api/getCars.types";

const colors = ["red", "black", "white", "blue", "silver"] as const;
type Color = typeof colors[number];

const nameSchema = carSchema.shape.name.refine(val => Number.isNaN(Number(val)), "Name must be text, not numbers");
const modelSchema = carSchema.shape.model.refine(val => Number.isNaN(Number(val)), "Model must be text, not numbers");
const priceSchema = z.number({
  message: "Price must be a number",
}).positive("Price must be greater than 0");

const idSchema = z.number({
  message: "ID must be a number",
}).positive("ID must be a positive number");

const createCarSchema = carSchema.omit({ id: true, latitude: true, longitude: true }).extend({
  name: nameSchema,
  model: modelSchema,
});

const editCarSchema = z.object({
  name: nameSchema,
  price: priceSchema,
});

const deleteCarSchema = z.object({
  id: idSchema,
});

export type CreateCarFormData = z.infer<typeof createCarSchema>;
export type EditCarFormData = z.infer<typeof editCarSchema>;
export type DeleteCarFormData = z.infer<typeof deleteCarSchema>;

export function useCreateCarForm() {
  return useForm<CreateCarFormData>({
    mode: "onChange",
    resolver: zodResolver(createCarSchema),
  });
}

export function useEditCarForm(defaultValues?: Partial<EditCarFormData>) {
  return useForm<EditCarFormData>({
    mode: "onChange",
    resolver: zodResolver(editCarSchema),
    defaultValues: {
      name: "",
      price: 0,
      ...defaultValues,
    },
  });
}

export function useDeleteCarForm() {
  return useForm<DeleteCarFormData>({
    mode: "onChange",
    resolver: zodResolver(deleteCarSchema),
  });
}

export { type Color, colors };
