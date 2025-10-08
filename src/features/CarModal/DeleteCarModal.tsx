import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/button";
import { Input } from "@/shared/ui/Input/input";
import Modal from "@/shared/ui/Modal/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
};

export default function DeleteCarModal({ isOpen, onClose, onDelete }: Props) {
  const [id, setId] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const carId = Number(id);
    if (!Number.isNaN(carId) && carId > 0) {
      onDelete(carId);
      onClose();
    }
  };

  const handleClose = () => {
    setId("");
    onClose();
  };

  const isFormValid = id.trim() && !Number.isNaN(Number(id)) && Number(id) > 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-main-foreground">Delete car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="delete-id" className="text-sm font-medium text-main-foreground">
              Car ID *
            </label>
            <Input
              id="delete-id"
              type="number"
              placeholder="Enter car ID to delete"
              value={id}
              onChange={e => setId(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 justify-between pt-4">
            <Button type="button" variant="reverse" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={!isFormValid}>
              Delete car
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
