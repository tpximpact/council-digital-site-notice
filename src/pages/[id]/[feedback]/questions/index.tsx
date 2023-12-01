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

        const switchComponent = () => {
            switch (question) {
                case 1:
                    return <Feeling onChange={() => onChangeQuestion()}/>
                case 2:
                    return <Impact onChange={() => onChangeQuestion()} selectedCheckbox={selectedCheckbox} setSelectedCheckbox={setSelectedCheckbox}/>
                case 11:
                    return <PersonalDetails onChange={() => onChangeQuestion()}/>
                case 12:
                    return <Message />
                default:
                    return <Comment onChange={() => onChangeQuestion()} label={label}/>
                }
        }

    return(
        <section className="wrap-feedback-question">
            {switchComponent()}
        </section>
    )
}

export default FeedbackQuestions