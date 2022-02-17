import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const DialogBox = (props) => {

  return (
    <section>
      <Transition appear show={props.isOpen}>
        <Dialog
          as="div"
          initialFocus={props.focusElement}
          className="primary-dialog-box z-30"
          onClose={props.closeModal}
        >
          <div className="w-full h-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {props.children}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

export default DialogBox;
