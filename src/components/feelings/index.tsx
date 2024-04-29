import { useEffect, useState } from "react";
import { Button, BackLink } from "@/components/button";
import { Happy, Neutral, Opposed } from "../../../public/assets/icons";
import Validation from "@/components/validation";
import { getLocalStorage } from "@/app/lib/application";

function Feeling({
  onChangeQuestion,
  setQuestion,
}: {
  onChangeQuestion: () => void;
  setQuestion: (value: number) => void;
}) {
  const [feelingForm, setFeelingForm] = useState<string>("");
  const [id, setId] = useState();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const applicationStorage = getLocalStorage({
      key: "application",
      defaultValue: {},
    });
    const feelingStorage = getLocalStorage({
      key: "feeling",
      defaultValue: feelingForm,
    });

    setId(applicationStorage?._id);

    feelingStorage?.id === applicationStorage?._id &&
      setFeelingForm(feelingStorage.value);
  }, [feelingForm]);

  const onChangeFeeling = (value: string) => {
    if (feelingForm === value) {
      setFeelingForm("");
      localStorage.setItem("feeling", JSON.stringify({ id, value: "" }));
    } else {
      setFeelingForm(value);
      localStorage.setItem("feeling", JSON.stringify({ id, value }));
    }
  };

  const colors = {
    Opposed: feelingForm === "Opposed" ? "#AA2A16" : "white",
    Neutral: feelingForm === "Neutral" ? "#1D70B8" : "white",
    Support: feelingForm === "Support" ? "#00703C" : "white",
  };

  function onNextPage() {
    if (feelingForm !== "") {
      setIsError(false);
      onChangeQuestion();
    } else {
      setIsError(true);
    }
  }

  return (
    <section>
      <BackLink content="Back" onClick={() => setQuestion(0)} />
      <h1 className="govuk-heading-l">
        How do you feel about this development?
      </h1>
      <div className="wrap-icons-feeling">
        <button
          onClick={() => {
            onChangeFeeling("Opposed");
          }}
          className="sentimental-button"
        >
          <Opposed color={colors["Opposed"]} />
          <span className="govuk-body">Opposed</span>
        </button>
        <button
          onClick={() => {
            onChangeFeeling("Neutral");
          }}
          className="sentimental-button"
        >
          <Neutral color={colors["Neutral"]} />
          <span className="govuk-body">Neutral</span>
        </button>
        <button
          onClick={() => {
            onChangeFeeling("Support");
          }}
          className="sentimental-button"
        >
          <Happy color={colors["Support"]} />
          <span className="govuk-body">Support</span>
        </button>
      </div>
      {isError && <Validation message="Please select one" />}
      <Button content="Next" onClick={() => onNextPage()} />
    </section>
  );
}

export default Feeling;
