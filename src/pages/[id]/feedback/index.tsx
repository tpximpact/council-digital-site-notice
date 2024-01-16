import Breadcrumbs from "@/components/breadcrumbs"
import Instructions from "./instructions"
import Questions from "./questions"
import { useEffect, useState } from "react"
import { questions } from "../../../../util/questions_info"
import { useContext } from "react";
import { ContextApplication } from "@/context";



const Feedback = () => {
    const { dataApplication } = useContext(ContextApplication);
    const [question, setQuestion] = useState<number>(0)
    const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        const getStorage = localStorage.getItem("application")
        if(Object.keys(dataApplication).length > 0 || getStorage === null) {
            const {name, _id} = dataApplication
            setName(name)
            setId(_id)
    }else {
        const {name, id} = JSON.parse(getStorage)
        setName(name)
        setId(id)
    }
    }, [dataApplication])

    const onChangeQuestion = () => {

        if(question === 0 || question === 1 || question === 12) 
        {setQuestion(question + 1)}

        else if(question === 2){ 
            setQuestion(selectedCheckbox[0])
        } 

        else if(question === 13) {
            setQuestion(0)
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
            name: name, href: `/${id}`
        },
        {
            name: "Tell us what you think", href:""
        }
    ]
    return(
        <>
        <Breadcrumbs breadcrumbs_info={breadcrumbs_array}/>
        {(question !== 0 && question !== 13) && <Instructions data={dataApplication}/>}
        <Questions 
            setQuestion={setQuestion}
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