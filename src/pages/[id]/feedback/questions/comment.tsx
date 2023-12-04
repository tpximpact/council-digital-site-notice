import TextArea from "@/components/text-area"
import {Button, BackLink} from "@/components/button"

function CommentQuestion({
    onChange, 
    label,
    commentForm,
    setCommentForm, 
    setQuestion, 
    selectedCheckbox,
    question}: 
    {onChange: () => void, label: string, commentForm: string, setCommentForm: (value: string) => void, setQuestion: (value:number) => void, selectedCheckbox: any, question: number}) {
    const indexComponent = selectedCheckbox.indexOf(question)
    const backComponent = indexComponent > 0 ? selectedCheckbox[indexComponent - 1] : 2
    return(
        <section>
            <BackLink content='Back'onClick={() => setQuestion(backComponent)}/>
            <h1 className="govuk-heading-l">Comment on:</h1>
            <TextArea label={label} onChange={(value:any) => setCommentForm(value)} value={commentForm}/>
            <Button content="Next" onClick={() => {onChange()}}/>
        </section>
    )
}

export default CommentQuestion