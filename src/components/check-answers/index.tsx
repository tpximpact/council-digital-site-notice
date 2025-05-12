"use client";
import { useEffect, useState } from "react";
import { BackLink, Button, ButtonLink } from "@/components/button";
import Details from "@/components/details";
import { questions, getSessionStorage } from "@/app/lib/application";
import { descriptionDetail } from "@/app/lib/description";
import { useRouter } from "next/navigation";
import { PersonalDetailsForm, CommentForm } from "@/app/lib/type";
import { saveComments } from "@/app/actions/actions";

export const questionId: number[] = [3, 4, 5, 6, 7, 8, 9, 10];

function CheckAnswers({
  applicationId,
  onChangeQuestion,
  setQuestion,
}: {
  applicationId: string;
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
    const applicationStorage = getSessionStorage({
      key: `application_${applicationId}`,
      defaultValue: {},
    });

    setId(applicationStorage?._id);

    const initialPersonalDetails = getSessionStorage({
      key: `personalDetails_${applicationId}`,
      defaultValue: {},
    });
    initialPersonalDetails?.id === applicationStorage?._id &&
      setPersonalDetailsForm(initialPersonalDetails?.value);

    const initialValueComment = getSessionStorage({
      key: `comment_${applicationId}`,
      defaultValue: {},
    });

    const initialValueCheckbox = getSessionStorage({
      key: `topics_${applicationId}`,
      defaultValue: {},
    });

    const initialValueFeeling = getSessionStorage({
      key: `feeling_${applicationId}`,
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
      sessionStorage.setItem(
        `topics_${applicationId}`,
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
    sessionStorage.setItem(`formId_${applicationId}`, formId);

    let topics: any = [];
    let comment: any = {};

    selectedCheckbox?.map((el: any) => {
      topics.push(questions[el]);
      comment = { ...comment, [questions[el]]: commentForm[el] };
    });
    const application = getSessionStorage({
      key: `application_${applicationId}`,
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
        sessionStorage.removeItem(`feeling_${applicationId}`);
        sessionStorage.removeItem(`topics_${applicationId}`);
        sessionStorage.removeItem(`comment_${applicationId}`);
        sessionStorage.removeItem(`personalDetails_${applicationId}`);
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
                aria-label={`Change comment on ${questions[label]}`}
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
            <ButtonLink
              content="Change"
              aria-label="Change name"
              onClick={() => setQuestion(11)}
            />
          }
        />
        <SummaryRow
          label="Address"
          value={personalDetailsForm?.address}
          action={
            <ButtonLink
              content="Change"
              aria-label="Change address"
              onClick={() => setQuestion(11)}
            />
          }
        />
        <SummaryRow
          label="Postcode"
          value={personalDetailsForm?.postcode}
          action={
            <ButtonLink
              content="Change"
              aria-label="Change postcode"
              onClick={() => setQuestion(11)}
            />
          }
        />

        {personalDetailsForm?.email && (
          <SummaryRow
            label="Email"
            value={personalDetailsForm?.email}
            action={
              <ButtonLink
                content="Change"
                aria-label="Change email"
                onClick={() => setQuestion(11)}
              />
            }
          />
        )}

        {personalDetailsForm?.phone && (
          <SummaryRow
            label="Telephone number"
            value={personalDetailsForm?.phone}
            action={
              <ButtonLink
                content="Change"
                aria-label="Change telephone number"
                onClick={() => setQuestion(11)}
              />
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
