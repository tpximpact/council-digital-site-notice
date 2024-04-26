"use client";
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import Instructions from "./instructions";
import Questions from "../../../../../components/questions";
import { getLocalStorage } from "../../../../lib/application";
import { Data } from "../../../../lib/type";

const Feedback = () => {
  const [application, setApplication] = useState<Data>();
  const [question, setQuestion] = useState<number>(0);

  useEffect(() => {
    const getStorage = getLocalStorage({
      key: "application",
      defaultValue: {},
    });
    setApplication(getStorage);
  }, []);

  const onChangeQuestion = () => {
    const getStorageSelectedCheckbox = getLocalStorage({
      key: "topics",
      defaultValue: [],
    });
    const selectedCheckbox =
      application?._id == getStorageSelectedCheckbox?.id &&
      getStorageSelectedCheckbox?.value;

    if (
      question === 0 ||
      question === 1 ||
      question === 11 ||
      question === 12
    ) {
      setQuestion(question + 1);
    } else if (question === 2) {
      setQuestion(selectedCheckbox[0]);
    } else if (question === 13) {
      setQuestion(0);
    } else if (question === selectedCheckbox[selectedCheckbox.length - 1]) {
      setQuestion(11);
    } else {
      const questionIndex = selectedCheckbox?.indexOf(question);
      const newQuestion = selectedCheckbox[questionIndex + 1];
      setQuestion(newQuestion);
    }
  };

  const breadcrumbs_array = [
    {
      name: "Planning application",
      href: "/",
    },
    {
      name: application?.name || "",
      href: `/planning-applications/${application?._id}`,
    },
    {
      name: "Tell us what you think",
      href: "",
    },
  ];
  return (
    <>
      <Breadcrumbs breadcrumbs_info={breadcrumbs_array} />
      {question !== 0 && question !== 13 && <Instructions />}
      <Questions
        question={question}
        onChangeQuestion={() => onChangeQuestion()}
        setQuestion={setQuestion}
      />
    </>
  );
};

export default Feedback;
