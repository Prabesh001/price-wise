"use client";
import { addUserEmailToProduct } from "@/lib/actions";
import { IDProps } from "@/type/ProductType";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { FormEvent, Fragment, useState } from "react";

const Modal = ({ id }: IDProps) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addUserEmailToProduct(id, email);

      setIsSubmitting(false);
      setEmail("");
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn mx-auto min-w-[200px] w-full"
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

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            ></span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3 rounded-10 border-l border-b border-gray-200">
                      <Image
                        src="/assets/icons/logo.svg"
                        alt="Logo"
                        height={28}
                        width={28}
                      />
                    </div>

                    <Image
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>
                  <h4 className="dialog-head_text">
                    Stay updated with product pricing alerts right in your inbox
                  </h4>

                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain with our timely alerts!
                  </p>
                </div>
                <form action="flex flex-col mt-5" onSubmit={handleSubmit}>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  ></label>
                  <div className="dialog-input_container">
                    <Image
                      src={"/assets/icons/mail.svg"}
                      alt="mail"
                      height={18}
                      width={18}
                    />
                    <input
                      required
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="dialog-input"
                    />
                  </div>

                  <button className="dialog-btn" type="submit">
                    {isSubmitting ? "Submitting..." : "Track"}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
