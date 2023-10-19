import LoginModal from "@/components/Modals/LoginModal";
import RegisterModal from "@/components/Modals/ReigsterModal";
import React from "react";

type Props = {};

function ModalProvider({}: Props) {
  return (
    <>
      <RegisterModal />
      <LoginModal />
    </>
  );
}

export default ModalProvider;
