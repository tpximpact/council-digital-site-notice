import Breadcrumbs from "@/components/breadcrumbs"
import Instructions from "./instructions"
import Questions from "./questions"
import { useState } from "react"
import { questions } from "../../help/questions_info"



const Feedback = () => {
    const [question, setQuestion] = useState<number>(1)
    const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([])

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
            name: "Murphy's Yard", href: "/1"
        },
        {
            name: "Tell us what you think", href:""
        }
    ]
    return(
        <>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        {question !== 12 && <Instructions />}
        <Questions 
            question={question} 
            onChangeQuestion={onChangeQuestion} 
            selectedCheckbox={selectedCheckbox} 
            setSelectedCheckbox={setSelectedCheckbox}
            label={questions[question]}/>
        </>
    )
}

export default Feedback