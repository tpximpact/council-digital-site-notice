import TextArea from "@/components/text-area"
import {Button, BackLink} from "@/components/button"
import { useEffect, useState } from "react"
import Validation from "@/components/validation"
import { CommentType } from "../../../../../util/type"

function CommentQuestion({
    onChange, 
    label,
    commentForm,
    setCommentForm, 
    setQuestion, 
    selectedCheckbox,
    question}: 
    CommentType) {
    const [defaultValue, setDefaultValue] = useState('')
    const [isError, setIsError] = useState<boolean>(false)
        const indexComponent = selectedCheckbox?.indexOf(question)
        const backComponent = indexComponent > 0 ? selectedCheckbox[indexComponent - 1] : 2

    useEffect(() => {
        const initialValue = localStorage.getItem("comment")
        if ( Object.keys(commentForm)?.length > 0  || initialValue === null) {
            setDefaultValue(commentForm[question] !== undefined ? commentForm[question] : "")
        } else {

        setDefaultValue(JSON.parse(initialValue)[question])
        setCommentForm(JSON.parse(initialValue))
        }
    }, [commentForm, question, setDefaultValue, setCommentForm])

    const onComment = (value:any) => {
        setCommentForm({...commentForm,[question]: value})
        setIsError(false)
        localStorage.setItem('comment', JSON.stringify({...commentForm,[question]: value}))
    }

    const nextPage = () => {
        let entries = Object.entries(commentForm)
        const data = entries.filter(([key, val]) => {
            return parseInt(key) === question && val !== ""
        })
        data.length > 0 ? onChange() : setIsError(true)
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

{
            isError && <Validation message='Please write a comment'/>

            
        }

            <Button content="Next" onClick={() => nextPage()}/>
        </section>
    )
}

export default CommentQuestion