import { BackLink, Button } from "@/components/button"
import { questions } from "../../../../../util/questions_info"
import Link from "next/link"
import { useState, useEffect } from "react"
import { CommentForm } from "../../../../../util/type"

export const questionId:number[] = [3,4,5,6,7,8,9,10]

function CheckAnswers({setQuestion, commentForm, personalDetailsForm, onChange}: {setQuestion:(value:any) => void, commentForm:any, personalDetailsForm: any, onChange: any }) {
   const [ name, setName] = useState<string>('')
   const [ postCode, setPostCode] = useState<string>('')
   const [ email, setEmail] = useState<string>()
   const [ phone, setPhone] = useState<string>()
   const [comment, setComment] = useState<CommentForm>({})

    useEffect(() => {
        const initialValueName = localStorage.getItem("name") || ''
        const initialValueEmail = localStorage.getItem("email") || ''
        const initialValuePhone = localStorage.getItem("phone") || ''
        const initialValuePostcode = localStorage.getItem("postcode") || ''
        const initialValueComment = localStorage.getItem('comment')

        const {name, email, phone, postcode} = personalDetailsForm

        setName(name || initialValueName)
        setPostCode(postcode || initialValuePostcode)
        setEmail(email || initialValueEmail)
        setPhone(phone || initialValuePhone)
        setComment(commentForm || initialValueComment)

    }, [personalDetailsForm, commentForm])

return(
    <section>
        <BackLink content='Back'onClick={() => setQuestion(11)}/>
        <h1 className="govuk-heading-xl">Check your responses before submitting</h1>
        <h2 className="govuk-heading-l">Your Comments</h2>
        {questionId.map((label:any) => {
            return (
                <div key={label} style={{marginBottom: '10px', borderBottom: '1px solid #B1B4B6', padding: '15px 0'}}>
                <p className="govuk-body govuk-body govuk-!-font-weight-bold">{questions[label]}</p>
                <p className="govuk-body">{comment[label] ? comment[label] : 'No comment'}</p>
                <Link href="" className="govuk-link">Change</Link>
                </div>
            )
        }
        )}
        <h2 className="govuk-heading-m">Your Details</h2>
        <div style={{marginBottom: '10px', borderBottom: '1px solid #B1B4B6', padding: '15px 0'}}>
            <h2 className="govuk-heading-s">Name</h2>
            <p className="govuk-body">{name}</p>
            <Link href="" className="govuk-link">Change</Link>
        </div>
        {/* <div>
            <h2 className="govuk-heading-s">Address</h2>
            <p className="govuk-body">{name}</p>
            <Link href="" className="govuk-link">Change</Link>
        </div> */}
                <div style={{marginBottom: '10px', borderBottom: '1px solid #B1B4B6', padding: '15px 0'}}>
            <h2 className="govuk-heading-s">Postcode</h2>
            <p className="govuk-body">{postCode}</p>
            <Link href="" className="govuk-link">Change</Link>
        </div>
        {
            email &&                 <div style={{marginBottom: '10px', borderBottom: '1px solid #B1B4B6', padding: '15px 0'}}>
            <h2 className="govuk-heading-s">Email</h2>
            <p className="govuk-body">{email}</p>
            <Link href="" className="govuk-link">Change</Link>
        </div>
        }
        {
            phone &&                 <div style={{marginBottom: '10px', borderBottom: '1px solid #B1B4B6', padding: '15px 0'}}>
            <h2 className="govuk-heading-s">Telephone number</h2>
            <p className="govuk-body">{phone}</p>
            <Link href="" className="govuk-link">Change</Link>
        </div>
        }

<Button content="Submit your comments" onClick={() => onChange()}/>
        
    </section>
)
}

export default CheckAnswers