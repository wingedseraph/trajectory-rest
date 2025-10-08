import type { EditCarFormData } from "./useCarForm";
import type { isOpenType } from "@/shared/ui/Modal/modal";
import { useCarsState } from "@/app/store";
import { useValidationError } from "@/shared/hooks/useValidationError";
import { Button } from "@/shared/ui/Button/button";
import { Error } from "@/shared/ui/Error/error";
import { Input } from "@/shared/ui/Input/input";
import Modal from "@/shared/ui/Modal/modal";
import { useEditCarForm } from "./useCarForm";

type Props = isOpenType & {
  onClose: () => void;
  onSubmit: (name: string, price: number) => void;
  initialName?: string;
  initialPrice?: number;
};

export default function EditCarModal({
  isOpen,
  onClose,
  onSubmit,
  initialName = "",
  initialPrice = 0,
}: Props) {
  const state = useCarsState();
  const { error, setValidationError, clearError } = useValidationError();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useEditCarForm({
    name: initialName,
    price: initialPrice,
  });

  const onFormSubmit = (data: EditCarFormData) => {
    clearError();
    const carExists = state.cars.some(car => car.name === data.name);
    if (!carExists) {
      setValidationError(`Car with name "${data.name}" not found`);
      return;
    }
    onSubmit(data.name, data.price);
    onClose();
  };

  const handleClose = () => {
    clearError();
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-main-foreground">Edit car</h2>
        {error && <Error>{error}</Error>}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="edit-name" className="text-sm font-medium text-main-foreground">
              Name *
            </label>
            <Input
              id="edit-name"
              type="text"
              placeholder="Enter car name"
              {...register("name")}
            />
            <Error>{errors.name?.message}</Error>
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-price" className="text-sm font-medium text-main-foreground">
              Price *
            </label>
            <Input
              id="edit-price"
              type="number"
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
              Update car
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
