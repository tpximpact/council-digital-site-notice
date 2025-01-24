import { slugify } from "@/util";

const Checkbox = ({
  label,
  id,
  value,
  onChange,
  checked,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: any) => void;
  checked: boolean;
}) => {
  return (
    <div className="govuk-checkboxes__item">
      <input
        className="govuk-checkboxes__input"
        id={value}
        name={id}
        type="checkbox"
        data-testid="checkbox"
        onChange={(e) => onChange(e)}
        checked={checked}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={value}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
