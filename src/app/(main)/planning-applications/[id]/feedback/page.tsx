"use client";
import { useEffect, useState } from "react";
import Instructions from "./instructions";
import Questions from "../../../../../components/questions";
import { getLocalStorage } from "../../../../lib/application";
import { PlanningApplication } from "../../../../../../sanity/sanity.types";
import { getGlobalContent } from "@/app/actions/sanityClient";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const Feedback = () => {
  const [application, setApplication] = useState<PlanningApplication>();
  const [question, setQuestion] = useState<number>(0);
  const [globalConfig, setGlobalConfig] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getStorage = getLocalStorage({
      key: "application",
      defaultValue: {},
    });
    setApplication(getStorage);
  }, []);

  useEffect(() => {
    const fetchGlobalConfig = async () => {
      try {
        const config = await getGlobalContent();
        setGlobalConfig(config);
      } catch (error) {
        console.error("Failed to fetch global config:", error);
      }
    };

    fetchGlobalConfig();
  }, []);

  useEffect(() => {
    if (globalConfig && globalConfig.globalEnableComments === false) {
      router.push(`/planning-applications/${application?._id}`);
    }
  }, [globalConfig, router, application]);
  const isEnabled = globalConfig?.globalEnableComments;
  console.log(isEnabled);

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

  return (
    <>
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
