import styles from "./UIButton.module.scss";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  href?: string;
}

const UIButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, href, className, ...props }, ref) => {
    const cls = `${styles.button} ${styles[`button--${variant}`]} ${
      className || ""
    }`;

    if (href) {
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} {...props} className={cls}>
        {children}
      </button>
    );
  },
);

UIButton.displayName = "UIButton";

export default UIButton;
