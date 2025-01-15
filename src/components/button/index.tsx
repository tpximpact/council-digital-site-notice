export const Button = ({
  content,
  className,
  onClick,
}: {
  content: string;

  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`govuk-button ${className ?? ""}`}
      data-module="govuk-button"
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export const BackLink = ({
  content,
  onClick,
}: {
  content: string;
  onClick?: () => void;
}) => {
  return (
    <nav>
      <button
        className={`govuk-back-link govuk-back-link--button`}
        data-module="govuk-button"
        onClick={onClick}
      >
        {content}
      </button>
    </nav>
  );
};

export const ButtonLink = ({
  content,
  onClick,
}: {
  content: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      className="govuk-body govuk-link dsn-button-link"
      data-module="govuk-button"
      onClick={onClick}
    >
      {content}
    </button>
  );
};
