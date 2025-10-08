import { memo, useState } from "react";
import { useCarsDispatch } from "@/app/store";
import CreateCarModal from "@/features/CarModal/CreateCarModal";
import DeleteCarModal from "@/features/CarModal/DeleteCarModal";
import EditCarModal from "@/features/CarModal/EditCarModal";
import { Button } from "@/shared/ui/Button/button";

type Props = {
  onCreate: (data: { name: string; model: string; year: number; color: "red" | "black" | "white" | "blue" | "silver"; price: number }) => void;
};

function CarActions({ onCreate }: Props) {
  const dispatch = useCarsDispatch();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editName] = useState("");
  const [editPrice] = useState(0);

  const handleEditSubmit = (name: string, price: number) => {
    dispatch({ type: "editByName", payload: { name, price } });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "delete", payload: { id } });
  };

  return (
    <>
      <div className="flex flex-wrap flex-col gap-2">
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create a new car
        </Button>

        <Button onClick={() => setIsEditModalOpen(true)}>
          Edit car (by name, price)
        </Button>

        <Button onClick={() => setIsDeleteModalOpen(true)}>
          Delete car (by id)
        </Button>
      </div>

      <CreateCarModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={onCreate}
      />

      <EditCarModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialName={editName}
        initialPrice={editPrice}
      />

      <DeleteCarModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
}

export default memo(CarActions);
