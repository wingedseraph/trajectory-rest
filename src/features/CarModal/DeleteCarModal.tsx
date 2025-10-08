import type { DeleteCarFormData } from "./useCarForm";
import type { isOpenType } from "@/shared/ui/Modal/modal";
import { useCarsState } from "@/app/store";
import { useValidationError } from "@/shared/hooks/useValidationError";
import { Button } from "@/shared/ui/Button/button";
import { Error } from "@/shared/ui/Error/error";
import { Input } from "@/shared/ui/Input/input";
import Modal from "@/shared/ui/Modal/modal";
import { useDeleteCarForm } from "./useCarForm";

type Props = isOpenType & {
  onClose: () => void;
  onDelete: (id: number) => void;
};

export default function DeleteCarModal({ isOpen, onClose, onDelete }: Props) {
  const state = useCarsState();
  const { error, setValidationError, clearError } = useValidationError();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useDeleteCarForm();

  const onFormSubmit = (data: DeleteCarFormData) => {
    clearError();
    const carExists = state.cars.some(car => car.id === data.id);
    if (!carExists) {
      setValidationError(`Car with ID "${data.id}" not found`);
      return;
    }
    onDelete(data.id);
    reset();
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
        <h2 className="text-xl font-semibold text-main-foreground">Delete car</h2>
        {error && <Error>{error}</Error>}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="delete-id" className="text-sm font-medium text-main-foreground">
              Car ID *
            </label>
            <Input
              id="delete-id"
              type="number"
              placeholder="Enter car ID to delete"
              {...register("id", { valueAsNumber: true })}
            />
            <Error>{errors.id?.message}</Error>
          </div>
          <div className="flex gap-2 justify-between pt-4">
            <Button type="button" variant="reverse" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={!isValid}>
              Delete car
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
