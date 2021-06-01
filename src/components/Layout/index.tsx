import React, { FC } from "react";

type layoutProps = {
  children: React.ReactNode;
};

export const Layout: FC<layoutProps> = ({ children }) => {
  return <div className='app__layout'>{children}</div>;
};
