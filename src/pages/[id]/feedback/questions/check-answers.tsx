import { BackLink, Button, ButtonLink } from "@/components/button"
import { questions } from "../../../../../util/questions_info"
import { useState, useEffect } from "react"
import { CommentForm } from "../../../../../util/type"
import Details from "@/components/details";
import { descriptionDetail } from "../../../../../util/description_detail";
import { useContext } from "react";
import { ContextApplication } from "@/context";
import {addFeedback} from "../../../../../util/client"

export const questionId:number[] = [3,4,5,6,7,8,9,10]

function CheckAnswers() {
    const { onChangeQuestion, selectedCheckbox, commentForm, personalDetailsForm, setQuestion, setSelectedCheckbox, feelingForm } = useContext(ContextApplication);
    const [ name, setName] = useState<string>('')
   const [ postCode, setPostCode] = useState<string>('')
   const [ email, setEmail] = useState<string>()
   const [ address, setAddress] = useState<string>()
   const [ phone, setPhone] = useState<string>()
   const [comment, setComment] = useState<CommentForm>({})

    useEffect(() => {
        const initialValueName = localStorage.getItem("name") || ''
        const initialValueEmail = localStorage.getItem("email") || ''
        const initialValuePhone = localStorage.getItem("phone") || ''
        const initialValuePostcode = localStorage.getItem("postcode") || ''
        const initialValueAddress = localStorage.getItem("address") || ''
        const initialValueComment = localStorage.getItem('comment')

        const {name, email, phone, postcode, address} = personalDetailsForm

        setName(name || initialValueName)
        setPostCode(postcode || initialValuePostcode)
        setEmail(email || initialValueEmail)
        setPhone(phone || initialValuePhone)
        setAddress(address || initialValueAddress)

        setComment(commentForm || initialValueComment)

    }, [personalDetailsForm, commentForm])

const onChangeQuestions = (label:number) => {
    const selected = selectedCheckbox?.filter((el:any) => el === label)
    if(selected.length > 0) {
        setQuestion(label)
    } else {
        setQuestion(label)
        setSelectedCheckbox([...selectedCheckbox, label])
        localStorage.setItem('impact', JSON.stringify([...selectedCheckbox, label]))
    }
    
}

const submit = () => {
    // submit feedback form function
    console.log('submited')
    onChangeQuestion()
    addFeedback({feelingForm, commentForm, personalDetailsForm})
    localStorage.removeItem('feeling')
    localStorage.removeItem('impact')
    localStorage.removeItem('comment')
    localStorage.removeItem('name')
    localStorage.removeItem('address')
    localStorage.removeItem('postcode')
    localStorage.removeItem('email')
    localStorage.removeItem('phone')
    localStorage.removeItem('consent')
}

return(
    <section>
        <BackLink content='Back'onClick={() => setQuestion(11)}/>
        <h1 className="govuk-heading-xl">Check your responses before submitting</h1>
        <h2 className="govuk-heading-l">Your Comments</h2>
        {questionId.map((label:any) => {
            return (
                <div key={label} className="wrap-answers">
                <p className="govuk-body govuk-body govuk-!-font-weight-bold">{questions[label]}</p>
                <p className="govuk-body">{comment[label] ? comment[label] : 'No comment'}</p>
                <ButtonLink content="Change" onClick={() => onChangeQuestions(label)}/>
                </div>
            )
        }
        )}
        <h2 className="govuk-heading-m">Your Details</h2>
        <div className="wrap-answers">
            <h2 className="govuk-heading-s">Name</h2>
            <p className="govuk-body">{name}</p>
            <ButtonLink content="Change" onClick={() => setQuestion(11)}/>
        </div>
        <div className="wrap-answers">
            <h2 className="govuk-heading-s">Address</h2>
            <p className="govuk-body">{address}</p>
            <ButtonLink content="Change" onClick={() => setQuestion(11)}/>
        </div>
                <div className="wrap-answers">
            <h2 className="govuk-heading-s">Postcode</h2>
            <p className="govuk-body">{postCode}</p>
            <ButtonLink content="Change" onClick={() => setQuestion(11)}/>
        </div>
        {
            email &&                 <div className="wrap-answers">
            <h2 className="govuk-heading-s">Email</h2>
            <p className="govuk-body">{email}</p>
            <ButtonLink content="Change" onClick={() => setQuestion(11)}/>
        </div>
        }
        {
            phone &&  <div className="wrap-answers">
            <h2 className="govuk-heading-s">Telephone number</h2>
            <p className="govuk-body">{phone}</p>
            <ButtonLink content="Change" onClick={() => setQuestion(11)}/>
        </div>
        }
        <Details summary="How we handle your data" description={descriptionDetail['consent']} />

<Button content="Submit your comments" onClick={() => submit()}/>
        
    </section>
)
}

export default CheckAnswers