"use client";
import { useState } from "react";
import DropdownMenu from "../pures/DropdownMenu";

const PrincipalContent = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hanldeIsOpen = (open: boolean) => setIsOpen(open);

  return (
    <div>
      <DropdownMenu handler={hanldeIsOpen} />
      <div>{children}</div>
    </div>
  );
};

export default PrincipalContent;
