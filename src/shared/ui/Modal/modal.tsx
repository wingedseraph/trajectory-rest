import type { ReactNode } from "react";

import { createPortal } from "react-dom";
import { useModal } from "@/shared/hooks/useModal";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  const modalRef = useModal(isOpen, onClose);

  if (!isOpen)
    return null;

  return createPortal(
    <div
      className="fixed inset-0 z-10 flex bg-overlay/70 items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative max-h-[90vh] w-1/2 overflow-y-auto rounded-base border-2 border-border bg-main p-6 shadow-shadow md:p-10"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
