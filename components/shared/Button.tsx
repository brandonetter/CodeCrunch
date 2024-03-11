import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const baseClass = "px-4 py-2 rounded-md text-white bg-slate-500";
const variants = {
  plus: `hover:bg-red-500 gap-x-2`,
  social: `bg-secondary-500 hover:bg-secondary-600 text-lg text-black-500`,
  primary: `bg-danger-500 hover:bg-danger-600 text-xl text-white-500`,
  gradient: `bg-gradient-to-r from-primary-500 to-primary-600 text-xl text-white-500`,
};

const OurButton = ({ children, ...props }: ButtonProps) => {
  const combinedClass = `${baseClass} ${props.className}`;
  return (
    <Button {...props} className={combinedClass}>
      {children}
    </Button>
  );
};

OurButton.Plus = function OurButtonPlus({ children, ...props }: ButtonProps) {
  return (
    <OurButton {...props} className={variants["plus"]}>
      <PlusIcon />
      {children}
    </OurButton>
  );
};

export default OurButton;
