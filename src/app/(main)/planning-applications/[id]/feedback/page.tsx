"use client";
import { useEffect, useState } from "react";
import Instructions from "./instructions";
import Questions from "../../../../../components/questions";
import { getSessionStorage } from "../../../../lib/application";
import { PlanningApplication } from "../../../../../../sanity/sanity.types";
import { getGlobalContent } from "@/app/actions/sanityClient";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/pageWrapper";
import PageCenter from "@/components/pageCenter";

export const dynamic = "force-dynamic";

const Feedback = ({ params }: { params: { id: string } }) => {
  const { id: applicationId } = params;
  const [application, setApplication] = useState<PlanningApplication>();
  const [question, setQuestion] = useState<number>(0);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializePage = async () => {
      const globalConfig = await getGlobalContent();
      const storedApplication = getSessionStorage({
        key: `application_${applicationId}`,
        defaultValue: {},
      });

      // if we've been sent a link to /feedback and don't have an application stored, redirect to the application page
      if (
        Object.keys(storedApplication).length === 0 &&
        storedApplication.constructor === Object
      ) {
        console.info(
          "Redirecting back to application as no application data stored",
        );
        router.push(`/planning-applications/${applicationId}`);
        return;
      }

      if (globalConfig.globalEnableComments === false) {
        router.push(`/planning-applications/${storedApplication?._id}`);
        return;
      }

      setApplication(storedApplication);
      setInitialized(true);
    };

    initializePage();
  }, [router, applicationId]);

  const onChangeQuestion = () => {
    const getStorageSelectedCheckbox = getSessionStorage({
      key: `topics_${applicationId}`,
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
      {question !== 0 && question !== 13 && (
        <Instructions applicationId={applicationId} />
      )}
      <PageCenter>
        <Questions
          question={question}
          onChangeQuestion={() => onChangeQuestion()}
          setQuestion={setQuestion}
          applicationId={applicationId}
        />
      </PageCenter>
    </PageWrapper>
  );
};

export default Feedback;
