import "./button.css";

export const Button = ({
  type,
  children,
  extraClass,
  click,
}: {
  type: string;
  children: React.ReactNode;
  extraClass?: string;
  click?: () => void
}) => {
  return (
    <button className={`px-3 py-1 ${type === "primary" ? "primary" : type === "secondary" ? "secondary" : "danger"} ${extraClass}`} onClick={click}>
      {children}
    </button>
  );
};
