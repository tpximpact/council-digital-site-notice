import { useEffect, useContext } from "react"
import { ContextApplication } from "@/context";
import TextArea from "@/components/text-area"
import {Button, BackLink} from "@/components/button"
import { questions } from "../../../../../util/questions_info";

function CommentQuestion() {
        const { onChangeQuestion, commentForm, setCommentForm, setQuestion, selectedCheckbox, question } = useContext(ContextApplication);
        const indexComponent = selectedCheckbox?.indexOf(question)
        const backComponent = indexComponent > 0 ? selectedCheckbox[indexComponent - 1] : 2
        const label = questions[question]

    useEffect(() => {
        const initialValue = localStorage.getItem("comment") || ""
        setCommentForm(JSON.parse(initialValue))
    }, [setCommentForm])

    const onComment = (value:any) => {
        setCommentForm({...commentForm,[question]: value})
        localStorage.setItem('comment', JSON.stringify({...commentForm,[question]: value}))
    }

    return(
        <section>
            <BackLink content='Back'onClick={() => setQuestion(backComponent)}/>
            <h1 className="govuk-heading-l">Comment on:</h1>
            <TextArea 
                label={label} 
                onChange={(value:any) => onComment(value)} 
                value={commentForm[question] || ""}
                id={question}/>

            <Button content="Next" onClick={() => onChangeQuestion()}/>
        </section>
    )
}

export default CommentQuestion