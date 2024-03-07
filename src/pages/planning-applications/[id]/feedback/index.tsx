import { useEffect, useState, useContext } from "react";
import { ContextApplication } from "@/context";
import Breadcrumbs from "@/components/breadcrumbs";
import Instructions from "./instructions";
import Questions from "../../../../components/questions";
import { getLocalStorage } from "../../../../../util/helpLocalStorage";
import { Data } from "../../../../../util/type";

const Feedback = () => {
  const { question } = useContext(ContextApplication);
  const [application, setApplication] = useState<Data>();

  useEffect(() => {
    const getStorage = getLocalStorage({
      key: "application",
      defaultValue: {},
    });
    setApplication(getStorage);
  }, []);

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
      <Questions question={question} />
    </>
  );
};

export default Feedback;
