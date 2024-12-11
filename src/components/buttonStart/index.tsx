import React from "react";
import Link from "next/link";

interface ButtonStartProps {
  href?: string;
  onClick?: () => void;
  content?: string;
  noSpacing?: boolean;
}

const ButtonStart: React.FC<ButtonStartProps> = ({
  href,
  onClick,
  content = "Start now",
  noSpacing = false,
}) => {
  const commonProps: {
    className: string;
    draggable: boolean;
    children: React.ReactNode;
  } = {
    className: `govuk-button govuk-button--start ${noSpacing ? "govuk-!-margin-bottom-0" : ""}`,
    draggable: false,
    children: (
      <>
        {content}
        <svg
          className="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
        >
          <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
        </svg>
      </>
    ),
  };

  return href ? (
    <Link href={href} {...commonProps} />
  ) : (
    <button onClick={onClick} {...commonProps} />
  );
};

export default ButtonStart;
