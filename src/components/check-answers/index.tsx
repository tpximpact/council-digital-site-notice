import { useEffect, useContext, useState } from "react";
import { ContextApplication } from "@/context";
import { BackLink, Button, ButtonLink } from "@/components/button";
import Details from "@/components/details";
import { questions } from "../../../util/questionsInfo";
import { descriptionDetail } from "../../../util/description-detail";
import { addFeedback } from "../../../util/client";
import { healpLocalStorage } from "../../../util/helpLocalStorage";

export const questionId: number[] = [3, 4, 5, 6, 7, 8, 9, 10];

function CheckAnswers() {
  const {
    onChangeQuestion,
    selectedCheckbox,
    commentForm,
    setQuestion,
    setSelectedCheckbox,
    feelingForm,
    setCommentForm,
    contextCleaner,
  } = useContext(ContextApplication);
  const [id, setId] = useState();
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [postCode, setPostCode] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [consent, setConsent] = useState<boolean>(false);

  useEffect(() => {
    const applicationStorage = healpLocalStorage({
      key: "application",
      defaultValue: {},
    });

    setId(applicationStorage?.id);
    const initialValueName = healpLocalStorage({
      key: "name",
      defaultValue: name,
    });
    initialValueName?.id === applicationStorage?.id &&
      setName(initialValueName?.value);

    const initialValueAddress = healpLocalStorage({
      key: "address",
      defaultValue: address,
    });
    initialValueAddress?.id === applicationStorage?.id &&
      setAddress(initialValueAddress?.value);

    const initialValuePhone = healpLocalStorage({
      key: "phone",
      defaultValue: phone,
    });
    initialValuePhone?.id === applicationStorage?.id &&
      setPhone(initialValuePhone?.value);

    const initialValuePostcode = healpLocalStorage({
      key: "postcode",
      defaultValue: postCode,
    });
    initialValuePostcode?.id === applicationStorage?.id &&
      setPostCode(initialValuePostcode?.value);

    const initialValueEmail = healpLocalStorage({
      key: "email",
      defaultValue: email,
    });
    initialValueEmail?.id === applicationStorage?.id &&
      setEmail(initialValueEmail?.value);

    const initialValueConsent = healpLocalStorage({
      key: "consent",
      defaultValue: consent,
    });
    initialValueConsent?.id === applicationStorage?.id &&
      setConsent(initialValueConsent?.value);

    const initialValueComment = healpLocalStorage({
      key: "comment",
      defaultValue: {},
    });

    initialValueComment?.id == applicationStorage?.id &&
      setCommentForm(initialValueComment?.value);
  }, [address, consent, email, name, phone, postCode, setCommentForm]);

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
      personalDetailsForm: { name, address, postCode, email, phone, consent },
    });

    let formId = crypto.randomUUID();
    localStorage.setItem("formId", formId);

    let topics: any = [];
    let comment: any = {};

    selectedCheckbox?.map((el: any) => {
      topics.push(questions[el]);
      comment = { ...comment, [questions[el]]: commentForm[el] };
    });
    const application = healpLocalStorage({
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
      name: name,
      address: address,
      postcode: postCode,
      email: email,
      phone: phone,
      consent: consent,
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
        localStorage.removeItem("feeling");
        localStorage.removeItem("topics");
        localStorage.removeItem("comment");
        localStorage.removeItem("name");
        localStorage.removeItem("address");
        localStorage.removeItem("postcode");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("consent");

        contextCleaner();
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
        <p className="govuk-body">{name}</p>
        <ButtonLink content="Change" onClick={() => setQuestion(11)} />
      </div>
      <div className="wrap-answers">
        <h2 className="govuk-heading-s">Address</h2>
        <p className="govuk-body">{address}</p>
        <ButtonLink content="Change" onClick={() => setQuestion(11)} />
      </div>
      <div className="wrap-answers">
        <h2 className="govuk-heading-s">Postcode</h2>
        <p className="govuk-body">{postCode}</p>
        <ButtonLink content="Change" onClick={() => setQuestion(11)} />
      </div>
      {email && (
        <div className="wrap-answers">
          <h2 className="govuk-heading-s">Email</h2>
          <p className="govuk-body">{email}</p>
          <ButtonLink content="Change" onClick={() => setQuestion(11)} />
        </div>
      )}
      {phone && (
        <div className="wrap-answers">
          <h2 className="govuk-heading-s">Telephone number</h2>
          <p className="govuk-body">{phone}</p>
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
