import { createContext, useState } from "react";
import { CommentForm, PersonalDetailsForm } from "../../util/type";
import { ContextApplicationProps } from "../../util/type";
import { defaultValue } from "./helper";


export const ContextApplication = createContext<ContextApplicationProps>(defaultValue);

function Context({children}:any) {
    const [currentData, setCurrentData] = useState({})
    const [question, setQuestion] = useState<number>(0)
    const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([])
    const [feelingForm, setFeelingForm] = useState<string>("")
    const [commentForm, setCommentForm] = useState<CommentForm>({})
    const [personalDetailsForm, setPersonalDetailsForm] = useState<PersonalDetailsForm>({name: "", address: "", email: "", phone: "", postcode:"", consent: false})

    const onChangeQuestion = () => {
        if(question === 0 || question === 1 || question === 11 || question === 12) 
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

    function contextCleaner() {
        setSelectedCheckbox([])
        setFeelingForm("")
        setCommentForm({})
        setPersonalDetailsForm({
            name: "", address: "", email: "", phone: "", postcode:"", consent: false
        })
    }

    return(
        <ContextApplication.Provider value={{
            dataApplication: currentData,
            setDataApplication: setCurrentData,
            question,
            setQuestion,
            selectedCheckbox,
            setSelectedCheckbox,
            onChangeQuestion,
            feelingForm,
            setFeelingForm,
            commentForm,
            setCommentForm,
            personalDetailsForm,
            setPersonalDetailsForm,
            contextCleaner

        }}>
            {children}
        </ContextApplication.Provider>
    )
}

export default Context