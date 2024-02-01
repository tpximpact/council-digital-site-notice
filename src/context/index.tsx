import { createContext, useEffect, useState } from "react";
import { CommentForm, PersonalDetailsForm } from "../../util/type";

interface ContextApplicationProps {
    dataApplication: any;
    setDataApplication: (dataApplication : any) => void;
    question: number;
    setQuestion: (value: number) => void;
    selectedCheckbox: number[];
    setSelectedCheckbox: (value: any) => void;
    onChangeQuestion: () => void;
    feelingForm: string,
    setFeelingForm: (value: string) => void;
    commentForm: CommentForm;
    setCommentForm: (value: any) => void;
    personalDetailsForm : PersonalDetailsForm;
    setPersonalDetailsForm: (value: any) => void;
    clearContext: () => void
}

export const ContextApplication = createContext<ContextApplicationProps>({
    dataApplication: {}, 
    setDataApplication: () => {}, 
    question:0, 
    setQuestion: () => {},
    selectedCheckbox: [],
    setSelectedCheckbox: () => {},
    onChangeQuestion:() => {},
    feelingForm: "",
    setFeelingForm: () => {},
    commentForm: {},
    setCommentForm: () => {},
    personalDetailsForm: {name: "", address: "", email: "", phone: "", postcode:"", consent: false},
    setPersonalDetailsForm: () => {},
    clearContext: () => {}
});

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

        const clearContext = () => {
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
            question: question,
            setQuestion: setQuestion,
            selectedCheckbox: selectedCheckbox,
            setSelectedCheckbox: setSelectedCheckbox,
            onChangeQuestion: onChangeQuestion,
            feelingForm: feelingForm,
            setFeelingForm: setFeelingForm,
            commentForm: commentForm,
            setCommentForm: setCommentForm,
            personalDetailsForm: personalDetailsForm,
            setPersonalDetailsForm: setPersonalDetailsForm,
            clearContext: clearContext

        }}>
            {children}
        </ContextApplication.Provider>
    )
}

export default Context