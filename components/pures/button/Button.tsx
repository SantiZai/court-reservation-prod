import "./button.css";

export const Button = ({
  primary,
  children,
  extraClass,
  click,
}: {
  primary: boolean;
  children: React.ReactNode;
  extraClass?: string;
  click?: () => void
}) => {
  return (
    <button className={`px-3 py-1 ${primary ? "primary" : "secondary"} ${extraClass}`} onClick={click}>
      {children}
    </button>
  );
};
