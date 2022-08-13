interface IIconButtonProps extends React.BaseHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string;
}

export function IconButton({
  children,
  className,
  onClick,
  ...props
}: IIconButtonProps) {
  return (
    <button
      className={`${className} signUpBtn rounded-lg bg-white bg-opacity-20 h-8 w-8 flex justify-center items-center text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 scale-100 active:scale-95 transition-all`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
