import { useEffect, useState, useContext } from "react";
import { ContextApplication } from "@/context";
import Breadcrumbs from "@/components/breadcrumbs";
import Instructions from "./instructions";
import Questions from "../../../../components/questions";
import { getLocalStorage } from "../../../../../util/helpLocalStorage";

const Feedback = () => {
  const { question } = useContext(ContextApplication);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getStorage = getLocalStorage({
      key: "application",
      defaultValue: {},
    });
    setName(getStorage?.name);
    setId(getStorage?.id);
  }, []);

  const breadcrumbs_array = [
    {
      name: "Planning application",
      href: "/",
    },
    {
      name: name,
      href: `/planning-applications/${id}`,
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
