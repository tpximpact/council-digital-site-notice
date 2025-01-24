"use client";
import { useEffect, useState } from "react";
import { BackLink, Button, ButtonLink } from "@/components/button";
import Details from "@/components/details";
import { questions, getLocalStorage } from "@/app/lib/application";
import { descriptionDetail } from "@/app/lib/description";
import { useRouter } from "next/navigation";
import { PersonalDetailsForm, CommentForm } from "@/app/lib/type";
import { saveComments } from "@/app/actions/actions";

export const questionId: number[] = [3, 4, 5, 6, 7, 8, 9, 10];

function CheckAnswers({
  onChangeQuestion,
  setQuestion,
}: {
  onChangeQuestion: () => void;
  setQuestion: (value: number) => void;
}) {
  const [id, setId] = useState();
  const [personalDetailsForm, setPersonalDetailsForm] =
    useState<PersonalDetailsForm>({
      name: "",
      address: "",
      postcode: "",
      email: "",
      phone: "",
      consent: false,
    });
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);
  const [commentForm, setCommentForm] = useState<CommentForm>({});
  const [feelingForm, setFeelingForm] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const applicationStorage = getLocalStorage({
      key: "application",
      defaultValue: {},
    });

    setId(applicationStorage?._id);

    const initialPersonalDetails = getLocalStorage({
      key: "personalDetails",
      defaultValue: {},
    });
    initialPersonalDetails?.id === applicationStorage?._id &&
      setPersonalDetailsForm(initialPersonalDetails?.value);

    const initialValueComment = getLocalStorage({
      key: "comment",
      defaultValue: {},
    });

    const initialValueCheckbox = getLocalStorage({
      key: "topics",
      defaultValue: {},
    });

    const initialValueFeeling = getLocalStorage({
      key: "feeling",
      defaultValue: {},
    });
    initialValueCheckbox?.id === applicationStorage?._id &&
      setSelectedCheckbox(initialValueCheckbox?.value);

    initialValueFeeling?.id === applicationStorage?._id &&
      setFeelingForm(initialValueFeeling?.value);

    initialValueComment?.id == applicationStorage?._id &&
      setCommentForm(initialValueComment?.value);
  }, []);

  const onChangeQuestions = (label: number) => {
    const selected = selectedCheckbox?.filter((el: any) => el === label);
    if (selected.length > 0) {
      setQuestion(label);
    } else {
      setQuestion(label);
      setSelectedCheckbox([...selectedCheckbox, label]);
      localStorage.setItem(
        "topics",
        JSON.stringify({ id, value: [...selectedCheckbox, label] }),
      );
    }
  };

  const submit = async () => {
    // addFeedback({
    //   feelingForm,
    //   commentForm,
    //   personalDetailsForm,
    // });

    let formId = crypto.randomUUID();
    localStorage.setItem("formId", formId);

    let topics: any = [];
    let comment: any = {};

    selectedCheckbox?.map((el: any) => {
      topics.push(questions[el]);
      comment = { ...comment, [questions[el]]: commentForm[el] };
    });
    const application = getLocalStorage({
      key: "application",
      defaultValue: {},
    });
    const applicationNumber = application?.applicationNumber;
    let data = {
      id: formId,
      applicationNumber: applicationNumber,
      feeling: feelingForm,
      topics: JSON.stringify(topics),
      comment: JSON.stringify(comment),
      ...personalDetailsForm,
    };

    try {
      const response = await saveComments(data);
      if (response.ok) {
        onChangeQuestion();
        router.push(`/planning-applications/${id}/thank-you`);
        localStorage.removeItem("feeling");
        localStorage.removeItem("topics");
        localStorage.removeItem("comment");
        localStorage.removeItem("personalDetails");
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log("Error processing comments:", error);
    }
  };

  const SummaryRow = ({
    label,
    value,
    action,
  }: {
    label: string;
    value: string;
    action: React.ReactNode;
  }) => {
    return (
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">{label}</dt>
        <dd className="govuk-summary-list__value">{value}</dd>
        <dd className="govuk-summary-list__actions">{action}</dd>
      </div>
    );
  };

  return (
    <div>
      <BackLink content="Back" onClick={() => setQuestion(11)} />
      <h1 className="govuk-heading-xl">
        Check your responses before submitting
      </h1>

      <h2 className="govuk-heading-l">Your Comments</h2>

      <dl className="govuk-summary-list">
        {questionId.map((label: any) => (
          <SummaryRow
            key={label}
            label={questions[label]}
            value={commentForm[label] ? commentForm[label] : "No comment"}
            action={
              <ButtonLink
                content="Change"
                onClick={() => onChangeQuestions(label)}
              />
            }
          />
        ))}
      </dl>

      <h2 className="govuk-heading-m">Your Details</h2>
      <dl className="govuk-summary-list">
        <SummaryRow
          label="Name"
          value={personalDetailsForm?.name}
          action={
            <ButtonLink content="Change" onClick={() => setQuestion(11)} />
          }
        />
        <SummaryRow
          label="Address"
          value={personalDetailsForm?.address}
          action={
            <ButtonLink content="Change" onClick={() => setQuestion(11)} />
          }
        />
        <SummaryRow
          label="Postcode"
          value={personalDetailsForm?.postcode}
          action={
            <ButtonLink content="Change" onClick={() => setQuestion(11)} />
          }
        />

        {personalDetailsForm?.email && (
          <SummaryRow
            label="Email"
            value={personalDetailsForm?.email}
            action={
              <ButtonLink content="Change" onClick={() => setQuestion(11)} />
            }
          />
        )}

        {personalDetailsForm?.phone && (
          <SummaryRow
            label="Telephone number"
            value={personalDetailsForm?.phone}
            action={
              <ButtonLink content="Change" onClick={() => setQuestion(11)} />
            }
          />
        )}
      </dl>

      <Details
        summary="How we handle your data"
        description={descriptionDetail["consent"]}
      />

      <Button content="Submit your comments" onClick={() => submit()} />
    </div>
  );
}

export default CheckAnswers;
