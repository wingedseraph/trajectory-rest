import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/button";
import { Input } from "@/shared/ui/Input/input";
import Modal from "@/shared/ui/Modal/modal";
import { Select } from "@/shared/ui/Select/select";

const colors = ["red", "black", "white", "blue", "silver"] as const;
type Color = typeof colors[number];
const isColor = (value: string): value is Color => (colors as readonly string[]).includes(value);

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; model: string; year: number; color: Color; price: number }) => void;
};

export default function CreateCarModal({ isOpen, onClose, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [color, setColor] = useState<Color>("red");
  const [price, setPrice] = useState(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && model.trim() && year > 0 && price > 0) {
      onSubmit({ name: name.trim(), model: model.trim(), year, color, price });
      onClose();
    }
  };

  const handleClose = () => {
    setName("");
    setModel("");
    setYear(0);
    setColor("red");
    setPrice(0);
    onClose();
  };

  const isFormValid = name.trim() && model.trim() && year > 0 && price > 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-main-foreground">Create a new car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="create-name" className="text-sm font-medium text-main-foreground">
              Name *
            </label>
            <Input
              id="create-name"
              type="text"
              pattern="[A-Za-z]*"
              placeholder="Enter car name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="create-model" className="text-sm font-medium text-main-foreground">
              Model *
            </label>
            <Input
              id="create-model"
              type="text"
              pattern="[A-Za-z]*"
              placeholder="Enter car model"
              value={model}
              onChange={e => setModel(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="create-year" className="text-sm font-medium text-main-foreground">
              Year *
            </label>
            <Input
              id="create-year"
              type="number"
              placeholder="Enter year"
              value={year}
              onChange={e => setYear(Number(e.target.value) || 0)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="create-color" className="text-sm font-medium text-main-foreground">
              Color *
            </label>
            <Select
              id="create-color"
              value={color}
              onChange={e => (isColor(e.target.value) ? setColor(e.target.value) : undefined)}
              required
            >
              {colors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="create-price" className="text-sm font-medium text-main-foreground">
              Price *
            </label>
            <Input
              id="create-price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={e => setPrice(Number(e.target.value) || 0)}
              required
            />
          </div>
          <div className="flex gap-2 justify-between pt-4">
            <Button type="button" variant="neutral" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={!isFormValid}>
              Create car
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
