import Link from "next/link"
import TextArea from "@/components/text-area"
import Button from "@/components/button"

const CommentQuestion = ({
    onChange, 
    label,
    commentForm,
    setCommentForm}: 
    {onChange: () => void, label: string, commentForm: string, setCommentForm: (value: string) => void}) => {

    return(
        <section>
        <Link href="#" className="govuk-back-link">Back</Link>
        <h1 className="govuk-heading-l">Comment on:</h1>
            <TextArea label={label} onChange={(value:any) => {setCommentForm(value), console.log(value)}} value={commentForm}/>
            <Button content="Next" onClick={() => {onChange()}}/>
        </section>
    )
}

export default CommentQuestion