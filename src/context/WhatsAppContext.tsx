import React, { createContext, useContext, useState, ReactNode } from "react";
import { WhatsAppJoinModal } from "@/components/site/WhatsAppJoinModal";

interface WhatsAppContextType {
  openWhatsAppModal: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export const WhatsAppProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsAppModal = () => setIsOpen(true);
  const closeWhatsAppModal = () => setIsOpen(false);

  return (
    <WhatsAppContext.Provider value={{ openWhatsAppModal }}>
      {children}
      <WhatsAppJoinModal isOpen={isOpen} onClose={closeWhatsAppModal} />
    </WhatsAppContext.Provider>
  );
};

export const useWhatsApp = () => {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error("useWhatsApp must be used within a WhatsAppProvider");
  }
  return context;
};
