import "./button.css";

export const Button = ({
  primary,
  children,
  extraClass,
}: {
  primary: boolean;
  children: React.ReactNode;
  extraClass?: string;
}) => {
  return (
    <button className={`px-3 py-1 ${primary ? "primary" : "secondary"} ${extraClass}`}>
      {children}
    </button>
  );
};
