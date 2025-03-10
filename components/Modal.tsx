"use client";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment, useState } from "react";

const Modal = () => {
  let [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn mx-auto min-w-[200px]"
        onClick={openModal}
      >
        Track
      </button>

      <Transition show={isOpen} as={Fragment} appear>
        <Dialog
          as="div"
          open={isOpen}
          onClose={closeModal}
          className="dialog-container relative z-50"
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              enterFrom="opacity-0"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50"></div>
            </Transition.Child>
            <Transition.Child>
              
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
