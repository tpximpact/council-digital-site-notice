import { Button, BackLink } from "@/components/button";
import { useEffect, useState } from "react";
import Checkbox from "@/components/checkbox";
import Details from "@/components/details";
import Validation from "@/components/validation";
import { descriptionDetail } from "@/app/lib/description";
import { questions } from "@/app/lib/application";
import { getLocalStorage } from "@/app/lib/application";

export const checkboxId: number[] = [3, 4, 5, 6, 7, 8, 9, 10];

const TopicsQuestion = ({
  onChangeQuestion,
  setQuestion,
}: {
  onChangeQuestion: () => void;
  setQuestion: (value: number) => void;
}) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [idApplication, setId] = useState();

  useEffect(() => {
    const getStorage = getLocalStorage({
      key: "topics",
      defaultValue: {},
    });
    const applicationStorage = getLocalStorage({
      key: "application",
      defaultValue: {},
    });

    setId(applicationStorage?._id);
    getStorage?.id === applicationStorage?._id &&
      setSelectedCheckbox(getStorage.value);
  }, [setSelectedCheckbox]);

  const onChecked = (e: any) => {
    const { id, checked } = e.target;
    checked
      ? (setSelectedCheckbox([...selectedCheckbox, parseInt(id)]),
        localStorage.setItem(
          "topics",
          JSON.stringify({
            id: idApplication,
            value: [...selectedCheckbox, parseInt(id)],
          }),
        ))
      : (setSelectedCheckbox([
          ...selectedCheckbox?.filter((el) => el !== parseInt(id)),
        ]),
        localStorage.setItem(
          "topics",
          JSON.stringify({
            id: idApplication,
            value: [...selectedCheckbox?.filter((el) => el !== parseInt(id))],
          }),
        ));
  };

  function onNextPage() {
    selectedCheckbox.length > 0 ? onChangeQuestion() : setIsError(true);
  }

  return (
    <section>
      <BackLink content="Back" onClick={() => setQuestion(1)} />

      <div
        className={`govuk-form-group ${isError && "govuk-form-group--error"}`}
      >
        <fieldset className="govuk-fieldset" aria-describedby="topics-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">
              What topics do you want to comment on?
            </h1>
          </legend>
          <p className="govuk-body">
            Help us understand what your comments on this development is about.
          </p>
          <Details
            summary="What happens to your comments"
            description={descriptionDetail["topics"]}
          />
          <div id="topics-hint" className="govuk-hint">
            Select all the topics that apply.
          </div>
          {isError && (
            <p id="countries-error" className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span> Please
              select at least one topic
            </p>
          )}
          <div className="govuk-checkboxes" data-module="govuk-checkboxes">
            {checkboxId.map((el) => (
              <Checkbox
                label={questions[el]}
                id="topics"
                value={el.toString()}
                onChange={(e) => onChecked(e)}
                key={el}
                checked={selectedCheckbox.includes(el)}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <Button content="Next" onClick={() => onNextPage()} />
    </section>
  );
};

export default TopicsQuestion;
