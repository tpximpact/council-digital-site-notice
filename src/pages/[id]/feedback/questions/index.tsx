import { useState } from "react"
import Feeling from "./feelings"
import Impact from "./impact"
import Message from "../message"
import Comment from "./comment"
import PersonalDetails from "./personal-details"
import {addFeedback} from "../../../../../util/client"
import { PersonalDetailsForm, CommentForm, FeedbackQuestionType } from "../../../../../util/type"

const FeedbackQuestions = ({
    question, 
    setQuestion,
    onChangeQuestion, 
    selectedCheckbox, 
    setSelectedCheckbox, 
    label}: 
    FeedbackQuestionType) => {

        const [feelingForm, setFeelingForm] = useState<string>("")
        const [commentForm, setCommentForm] = useState<CommentForm>({})
        const [personalDetailsForm, setPersonalDetailsForm] = useState<PersonalDetailsForm>({name: "", email: "", phone: "", postcode:""})

        const submit = () => {
            // submit feedback form function
            console.log('submited')
            onChangeQuestion()
            addFeedback({feelingForm, commentForm, personalDetailsForm})
            localStorage.clear()
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
                        setQuestion={setQuestion}
                        />
                case 11:
                    return <PersonalDetails 
                            onChange={() => submit()} 
                            personalDetailsForm={personalDetailsForm} 
                            setPersonalDetailsForm={setPersonalDetailsForm} 
                            setQuestion={setQuestion} 
                            selectedCheckbox={selectedCheckbox}/>
                case 12:
                    return <Message />
                default:
                    return <Comment 
                            onChange={() => onChangeQuestion()} 
                            label={label} 
                            commentForm={commentForm} 
                            setCommentForm={setCommentForm} 
                            setQuestion={setQuestion} 
                            selectedCheckbox={selectedCheckbox}
                            question={question} />
                }
        }

    return(
        <section className="wrap-feedback-question">
            {switchComponent()}
        </section>
    )
}

export default FeedbackQuestions