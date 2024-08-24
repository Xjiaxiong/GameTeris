import React, { forwardRef } from "react";
import cn from "classnames";

import style from "./index.module.less";
import { transform } from "../../../unit/const";

interface ButtonProps {
  color: string;
  size: string;
  top: number;
  left: number;
  label: string;
  position?: boolean;
  arrow?: string;
  active: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
}

const Button: React.FC<ButtonProps> = forwardRef<HTMLDivElement, ButtonProps>(({
  active,
  color,
  size,
  top,
  left,
  label,
  position,
  arrow,
}, ref ) => {
  return (
    <div
      className={cn({
        [style.button]: true,
        [style[color]]: true,
        [style[size]]: true,
      })}
      style={{ top, left }}
    >
      <i
        className={cn({ [style.active]: active })}
        ref={ref}
      />
      {size === "s1" && (
        <em
          style={{
            [transform]: `${arrow} scale(1,2)`,
          }}
        />
      )}
      <span className={cn({ [style.position]: position })}>{label}</span>
    </div>
  );
});

export default Button;
