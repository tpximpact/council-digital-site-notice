import Breadcrumbs from "@/components/breadcrumbs"
import Instructions from "./instructions"
import Questions from "./questions"
import { useState } from "react"
import { questions } from "../../../help/questions_info"
import { getActiveApplications, getActiveApplicationById } from "../../../../util/client";

  export async function getStaticProps(context: any) {
    const {id} = context.params;
    const data = await getActiveApplicationById(id)
    return {
      props: {
        data: data[0],
      },
    };
  }

  export async function getStaticPaths() {
    const data = await getActiveApplications();
    return {
    paths: data.map((doc: any) => ({params: {data: doc, id: doc._id}})),
    fallback: false,
    }
  }



const Feedback = ({data}: any) => {
    const [question, setQuestion] = useState<number>(1)
    const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([])

    const {name, _id} = data

    const onChangeQuestion = () => {

        if(question === 1 || question === 11) 
        {setQuestion(question + 1)}

        else if(question === 2){
            setQuestion(selectedCheckbox[0])
        } 

        else if(question === 12) {
            setQuestion(1)
        } 

        else if(question === selectedCheckbox[selectedCheckbox.length -1 ]) {
            setQuestion(11)
        }
        else {
            const questionIndex = selectedCheckbox?.indexOf(question)
            const newQuestion = selectedCheckbox[questionIndex + 1]
            setQuestion(newQuestion)
            } 
        }


    const breadcrumbs_array = [
        {
            name: "Planning application", href: "/"
        },
        {
            name: name, href: `/${_id}`
        },
        {
            name: "Tell us what you think", href:""
        }
    ]
    return(
        <>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        {question !== 12 && <Instructions data={data}/>}
        <Questions 
            question={question} 
            onChangeQuestion={onChangeQuestion} 
            selectedCheckbox={selectedCheckbox} 
            setSelectedCheckbox={setSelectedCheckbox}
            label={questions[question]}
            />
        </>
    )
}

export default Feedback