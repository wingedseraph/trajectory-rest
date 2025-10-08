import type { DeleteCarFormData } from "./useCarForm";
import type { isOpenType } from "@/shared/ui/Modal/modal";
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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useDeleteCarForm();

  const onFormSubmit = (data: DeleteCarFormData) => {
    onDelete(data.id);
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
        <h2 className="text-xl font-semibold text-main-foreground">Delete car</h2>
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
