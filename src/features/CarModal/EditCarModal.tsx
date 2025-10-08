import { useState } from "react";
import { Button } from "@/shared/ui/Button/button";
import { Input } from "@/shared/ui/Input/input";
import Modal from "@/shared/ui/Modal/modal";

type Props = {
  isOpen: boolean;
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
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice.toString());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const priceNumber = Number(price);
    if (name.trim() && !Number.isNaN(priceNumber) && priceNumber > 0) {
      onSubmit(name.trim(), priceNumber);
      onClose();
    }
  };

  const isFormValid = name.trim() && !Number.isNaN(Number(price)) && Number(price) > 0;

  const handleClose = () => {
    setName(initialName);
    setPrice(initialPrice.toString());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-main-foreground">Edit car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="edit-name" className="text-sm font-medium text-main-foreground">
              Name
            </label>
            <Input
              id="edit-name"
              type="text"
              pattern="[A-Za-z]*"
              placeholder="Enter car name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-price" className="text-sm font-medium text-main-foreground">
              Price
            </label>
            <Input
              id="edit-price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 justify-between pt-4">
            <Button type="button" variant="neutral" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={!isFormValid}>
              Update car
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
