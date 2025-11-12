interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "danger";
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ variant = "primary", children, ...props }: ButtonProps) => {
  switch (variant) {
    case "danger":
      return (
        <button
          type="button"
          className="font-main font-bold text-white bg-gradient-to-br from-[#fdab9e] to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
          {...props}
        >
          {children}
        </button>
      );

    case "primary":
    default:
      return (
        <button
          type="button"
          className="font-main font-bold text-white bg-gradient-to-r from-[#78c841] to-[#59AC77] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
          {...props}
        >
          {children}
        </button>
      );
  }
};

export default Button;
