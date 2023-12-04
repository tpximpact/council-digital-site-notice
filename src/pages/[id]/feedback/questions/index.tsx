import { useState } from "react"
import Feeling from "./feelings"
import Impact from "./impact"
import Message from "../message"
import Comment from "./comment"
import PersonalDetails from "./personal-details"




const FeedbackQuestions = ({
    question, 
    onChangeQuestion, 
    selectedCheckbox, 
    setSelectedCheckbox, 
    label}: 
    {question:number, onChangeQuestion: () => void, selectedCheckbox: number[], setSelectedCheckbox: (value: number[]) => void, label: string}) => {

        const [feelingForm, setFeelingForm] = useState("")
        const [commentForm, setCommentForm] = useState("")
        const [personalDetailsForm, setPersonalDetailsForm] = useState({})

        const submit = () => {
            // submit feedback form function
            console.log('submited')
        }

        const switchComponent = () => {
            switch (question) {
                case 1:
                    return <Feeling onChange={() => onChangeQuestion()} feelingForm={feelingForm} setFeelingForm={setFeelingForm}/>
                case 2:
                    return <Impact 
                        onChange={() => onChangeQuestion()} 
                        selectedCheckbox={selectedCheckbox} 
                        setSelectedCheckbox={setSelectedCheckbox} 
                        />
                case 11:
                    return <PersonalDetails onChange={() => onChangeQuestion()} personalDetailsForm={personalDetailsForm} setPersonalDetailsForm={setPersonalDetailsForm} />
                case 12:
                    return <Message />
                default:
                    return <Comment onChange={() => {onChangeQuestion(), submit()}} label={label} commentForm={commentForm} setCommentForm={setCommentForm} />
                }
        }

    return(
        <section className="wrap-feedback-question">
            {switchComponent()}
        </section>
    )
}

export default FeedbackQuestions