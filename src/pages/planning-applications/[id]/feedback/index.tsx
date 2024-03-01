import { useEffect, useState, useContext } from "react";
import { ContextApplication } from "@/context";
import Breadcrumbs from "@/components/breadcrumbs"
import Instructions from "./instructions"
import Questions from "../../../../components/questions"


const Feedback = () => {
  const { dataApplication, question } = useContext(ContextApplication);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getStorage = localStorage.getItem("application");
    if (Object.keys(dataApplication).length > 0 || getStorage === null) {
      const { name, _id } = dataApplication;
      setName(name);
      setId(_id);
    } else {
      const { name, id } = JSON.parse(getStorage);
      setName(name);
      setId(id);
    }
  }, [dataApplication]);

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
      {question !== 0 && question !== 13 && (
        <Instructions data={dataApplication} />
      )}
      <Questions question={question} />
    </>
  );
};

export default Feedback;
