import TextArea from "@/components/text-area"
import {Button, BackLink} from "@/components/button"
import { useEffect, useState } from "react"

function CommentQuestion({
    onChange, 
    label,
    commentForm = {},
    setCommentForm, 
    setQuestion, 
    selectedCheckbox,
    question}: 
    {onChange: () => void, label: string, commentForm: any, setCommentForm: (value: any) => void, setQuestion: (value:number) => void, selectedCheckbox: any, question: number}) {
    const [defaultValue, setDefaultValue] = useState('')
        const indexComponent = selectedCheckbox.indexOf(question)
        const backComponent = indexComponent > 0 ? selectedCheckbox[indexComponent - 1] : 2

    useEffect(() => {
        const initialValue = localStorage.getItem("comment")
        if ( Object.keys(commentForm).length > 0  || initialValue === null) {
            setDefaultValue(commentForm[question] !== undefined ? commentForm[question] : "")
        } else {

        setDefaultValue(JSON.parse(initialValue)[question])
        setCommentForm(JSON.parse(initialValue))
        }
    }, [commentForm, question, setDefaultValue, setCommentForm])

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
                value={defaultValue}
                id={question}/>
            <Button content="Next" onClick={() => {onChange()}}/>
        </section>
    )
}

export default CommentQuestion