import Link from "next/link"
import TextArea from "@/components/text-area"
import Button from "@/components/button"

const CommentQuestion = ({
    onChange, 
    label}: 
    {onChange: () => void, label: string}) => {
    return(
        <>
        <Link href="#" className="govuk-back-link">Back</Link>
        <h1 className="govuk-heading-l">Comment on:</h1>
            <TextArea label={label}/>
            <Button content="Next" onClick={() => {onChange()}}/>
        </>
    )
}

export default CommentQuestion