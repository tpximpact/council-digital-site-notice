import { useEffect, useState } from "react";
import { BackLink, Button, ButtonLink } from "@/components/button";
import Details from "@/components/details";
import { questions } from "../../../util/questionsInfo";
import { descriptionDetail } from "../../../util/description-detail";
import { addFeedback } from "../../../util/client";
import { useRouter } from "next/router";
import { getLocalStorage } from "../../../util/helpLocalStorage";
import { PersonalDetailsForm, CommentForm } from "../../../util/type";

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
    addFeedback({
      feelingForm,
      commentForm,
      personalDetailsForm,
    });

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
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        onChangeQuestion();
        router.push(`/planning-applications/${id}/thank-you`);
        localStorage.removeItem("feeling");
        localStorage.removeItem("topics");
        localStorage.removeItem("comment");
        localStorage.removeItem("name");
        localStorage.removeItem("address");
        localStorage.removeItem("postcode");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("consent");
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log("Error processing comments:", error);
    }
  };

  return (
    <div style={{ maxWidth: "64rem" }}>
      <BackLink content="Back" onClick={() => setQuestion(11)} />
      <h1 className="govuk-heading-xl">
        Check your responses before submitting
      </h1>
      <h2 className="govuk-heading-l">Your Comments</h2>
      {questionId.map((label: any) => {
        return (
          <div key={label} className="wrap-answers">
            <p className="govuk-body govuk-body govuk-!-font-weight-bold">
              {questions[label]}
            </p>
            <p className="govuk-body">
              {commentForm[label] ? commentForm[label] : "No comment"}
            </p>
            <ButtonLink
              content="Change"
              onClick={() => onChangeQuestions(label)}
            />
          </div>
        );
      })}
      <h2 className="govuk-heading-m">Your Details</h2>
      <div className="wrap-answers">
        <h2 className="govuk-heading-s">Name</h2>
        <p className="govuk-body">{personalDetailsForm?.name}</p>
        <ButtonLink content="Change" onClick={() => setQuestion(11)} />
      </div>
      <div className="wrap-answers">
        <h2 className="govuk-heading-s">Address</h2>
        <p className="govuk-body">{personalDetailsForm?.address}</p>
        <ButtonLink content="Change" onClick={() => setQuestion(11)} />
      </div>
      <div className="wrap-answers">
        <h2 className="govuk-heading-s">Postcode</h2>
        <p className="govuk-body">{personalDetailsForm?.postcode}</p>
        <ButtonLink content="Change" onClick={() => setQuestion(11)} />
      </div>
      {personalDetailsForm?.email && (
        <div className="wrap-answers">
          <h2 className="govuk-heading-s">Email</h2>
          <p className="govuk-body">{personalDetailsForm?.email}</p>
          <ButtonLink content="Change" onClick={() => setQuestion(11)} />
        </div>
      )}
      {personalDetailsForm?.phone && (
        <div className="wrap-answers">
          <h2 className="govuk-heading-s">Telephone number</h2>
          <p className="govuk-body">{personalDetailsForm?.phone}</p>
          <ButtonLink content="Change" onClick={() => setQuestion(11)} />
        </div>
      )}
      <Details
        summary="How we handle your data"
        description={descriptionDetail["consent"]}
      />

      <Button content="Submit your comments" onClick={() => submit()} />
    </div>
  );
}

export default CheckAnswers;
