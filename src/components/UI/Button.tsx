type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
};

export function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant} ${disabled ? "button-disabled" : ""}`}
    >
      {children}
    </button>
  );
}

