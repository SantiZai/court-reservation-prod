"use client";

import { useState } from "react";
import DropdownMenu from "../pures/menu/DropdownMenu";
import Footer from "../pures/Footer";

const PrincipalContent = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hanldeIsOpen = (open: boolean) => setIsOpen(open);

  return (
    <div>
      <DropdownMenu handler={hanldeIsOpen} />
      <div className={`${isOpen && "[filter:blur(5px)]"}`}>
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default PrincipalContent;
