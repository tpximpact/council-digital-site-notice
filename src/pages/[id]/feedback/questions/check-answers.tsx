import { useEffect, useContext } from "react"
import { ContextApplication } from "@/context";
import { BackLink, Button, ButtonLink } from "@/components/button"
import Details from "@/components/details";
import { questions } from "../../../../../util/questionsInfo"
import { descriptionDetail } from "../../../../../util/descriptionDetail";
import {addFeedback} from "../../../../../util/client"

export const questionId:number[] = [3,4,5,6,7,8,9,10]

function CheckAnswers() {
    const { onChangeQuestion,   
            selectedCheckbox, 
            commentForm, 
            personalDetailsForm, 
            setQuestion, 
            setSelectedCheckbox, 
            feelingForm, 
            setPersonalDetailsForm, 
            setCommentForm, contextCleaner } = useContext(ContextApplication);


    useEffect(() => {
        const initialValueName = localStorage.getItem("name") || ''
        const initialValueEmail = localStorage.getItem("email") || ''
        const initialValuePhone = localStorage.getItem("phone") || ''
        const initialValuePostcode = localStorage.getItem("postcode") || ''
        const initialValueAddress = localStorage.getItem("address") || ''
        const initialValueComment = localStorage.getItem('comment')

        setPersonalDetailsForm({
            name: initialValueName,
            address: initialValueAddress,
            email: initialValueEmail,
            phone: initialValuePhone,
            postcode: initialValuePostcode,
            consent: personalDetailsForm?.consent
        })
if (initialValueComment !== null) setCommentForm(JSON.parse(initialValueComment))

    }, [personalDetailsForm?.consent, setCommentForm, setPersonalDetailsForm])

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

    contextCleaner()
}

return(
    <div style={{maxWidth: '64rem'}}>
        <BackLink content='Back'onClick={() => setQuestion(11)}/>
        <h1 className="govuk-heading-xl">Check your responses before submitting</h1>
        <h2 className="govuk-heading-l">Your Comments</h2>
        {questionId.map((label:any) => {
            return (
                <div key={label} className="wrap-answers">
                <p className="govuk-body govuk-body govuk-!-font-weight-bold">{questions[label]}</p>
                <p className="govuk-body">{commentForm[label] ? commentForm[label] : 'No comment'}</p>
                <ButtonLink content="Change" onClick={() => onChangeQuestions(label)}/>
                </div>
            )
        }
        )}
        <h2 className="govuk-heading-m">Your Details</h2>
        <div className="wrap-answers">
            <h2 className="govuk-heading-s">Name</h2>
            <p className="govuk-body">{personalDetailsForm?.name}</p>
            <ButtonLink content="Change" onClick={() => setQuestion(11)}/>
        </div>
        <div className="wrap-answers">
            <h2 className="govuk-heading-s">Address</h2>
            <p className="govuk-body">{personalDetailsForm?.address}</p>
            <ButtonLink content="Change" onClick={() => setQuestion(11)}/>
        </div>
                <div className="wrap-answers">
            <h2 className="govuk-heading-s">Postcode</h2>
            <p className="govuk-body">{personalDetailsForm?.postcode}</p>
            <ButtonLink content="Change" onClick={() => setQuestion(11)}/>
        </div>
        {
            personalDetailsForm?.email &&                 <div className="wrap-answers">
            <h2 className="govuk-heading-s">Email</h2>
            <p className="govuk-body">{personalDetailsForm?.email}</p>
            <ButtonLink content="Change" onClick={() => setQuestion(11)}/>
        </div>
        }
        {
            personalDetailsForm?.phone &&  <div className="wrap-answers">
            <h2 className="govuk-heading-s">Telephone number</h2>
            <p className="govuk-body">{personalDetailsForm?.phone}</p>
            <ButtonLink content="Change" onClick={() => setQuestion(11)}/>
        </div>
        }
        <Details summary="How we handle your data" description={descriptionDetail['consent']} />

<Button content="Submit your comments" onClick={() => submit()}/>
        
    </div>
)
}

export default CheckAnswers