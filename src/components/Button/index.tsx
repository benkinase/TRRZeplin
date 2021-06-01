import React, { FC } from "react";
import "./Button.css";

type ButonProps = {
  variant: String;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button: FC<ButonProps> = (props) => {
  const { variant = "primary", children, ...rest } = props;

  return (
    <button className={`button ${variant}`} {...rest}>
      {children}
    </button>
  );
};
