import type { CreateCarFormData } from "./useCarForm";
import type { isOpenType } from "@/shared/ui/Modal/modal";
import { Button } from "@/shared/ui/Button/button";
import { Error } from "@/shared/ui/Error/error";
import { Input } from "@/shared/ui/Input/input";
import Modal from "@/shared/ui/Modal/modal";
import { Select } from "@/shared/ui/Select/select";
import { colors, useCreateCarForm } from "./useCarForm";

type Props = isOpenType & {
  onClose: () => void;
  onSubmit: (data: CreateCarFormData) => void;
};

export default function CreateCarModal({ isOpen, onClose, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useCreateCarForm();

  const onFormSubmit = (data: CreateCarFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-main-foreground">Create a new car</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="create-name" className="text-sm font-medium text-main-foreground">
              Name *
            </label>
            <Input
              id="create-name"
              type="text"
              placeholder="Enter car name"
              {...register("name")}
            />
            <Error>{errors.name?.message}</Error>
          </div>
          <div className="space-y-2">
            <label htmlFor="create-model" className="text-sm font-medium text-main-foreground">
              Model *
            </label>
            <Input
              id="create-model"
              type="text"
              placeholder="Enter car model"
              {...register("model")}
            />
            <Error>{errors.model?.message}</Error>
          </div>
          <div className="space-y-2">
            <label htmlFor="create-year" className="text-sm font-medium text-main-foreground">
              Year *
            </label>
            <Input
              id="create-year"
              type="number"
              placeholder="Enter year"
              {...register("year", { valueAsNumber: true })}
            />
            <Error>{errors.year?.message}</Error>
          </div>
          <div className="space-y-2">
            <label htmlFor="create-color" className="text-sm font-medium text-main-foreground">
              Color *
            </label>
            <Select
              id="create-color"
              {...register("color")}
            >
              {colors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </Select>
            <Error>{errors.color?.message}</Error>
          </div>
          <div className="space-y-2">
            <label htmlFor="create-price" className="text-sm font-medium text-main-foreground">
              Price *
            </label>
            <Input
              id="create-price"
              type="number"
              step="0.01"
              placeholder="Enter price"
              {...register("price", { valueAsNumber: true })}
            />
            <Error>{errors.price?.message}</Error>
          </div>
          <div className="flex gap-2 justify-between pt-4">
            <Button type="button" variant="reverse" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={!isValid}>
              Create car
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
