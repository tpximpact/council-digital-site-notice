"use client";
import { useEffect, useState } from "react";
import Instructions from "./instructions";
import Questions from "../../../../../components/questions";
import { getLocalStorage } from "../../../../lib/application";
import { PlanningApplication } from "../../../../../../sanity/sanity.types";
import { getGlobalContent } from "@/app/actions/sanityClient";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/pageWrapper";
import PageCenter from "@/components/pageCenter";

export const dynamic = "force-dynamic";

const Feedback = () => {
  const [application, setApplication] = useState<PlanningApplication>();
  const [question, setQuestion] = useState<number>(0);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializePage = async () => {
      const globalConfig = await getGlobalContent();
      const storedApplication = getLocalStorage({
        key: "application",
        defaultValue: {},
      });

      if (globalConfig.globalEnableComments === false) {
        router.push(`/planning-applications/${storedApplication?._id}`);
        return;
      }

      setApplication(storedApplication);
      setInitialized(true);
    };

    initializePage();
  }, [router]);

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

  if (!initialized) {
    return null;
  }

  return (
    <PageWrapper isCentered={false}>
      {question !== 0 && question !== 13 && <Instructions />}
      <PageCenter>
        <Questions
          question={question}
          onChangeQuestion={() => onChangeQuestion()}
          setQuestion={setQuestion}
        />
      </PageCenter>
    </PageWrapper>
  );
};

export default Feedback;
