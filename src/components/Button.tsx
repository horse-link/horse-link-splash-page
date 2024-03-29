import * as React from "react";
import classnames from "classnames";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loaderSize?: number;
  loaderColor?: string;
  baseStyleOverride?: boolean;
};

export const Button: React.FC<Props> = props => {
  const {
    className,
    title,
    loading,
    disabled,
    onClick,
    loaderSize,
    baseStyleOverride,
    loaderColor,
    children,
    ...restOfProps
  } = props;

  const baseButtonStyles =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm " +
    "bg-indigo-600 hover:bg-indigo-700 focus:outline-none";

  return (
    <button
      className={classnames("text-sm font-medium text-white", className, {
        "opacity-50 hover:bg-indigo-600": disabled,
        [baseButtonStyles]: !baseStyleOverride
      })}
      disabled={loading || disabled}
      {...restOfProps}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
