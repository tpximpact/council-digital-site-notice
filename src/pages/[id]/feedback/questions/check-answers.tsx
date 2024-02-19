import { useEffect, useContext } from "react"
import { ContextApplication } from "@/context";
import { BackLink, Button, ButtonLink } from "@/components/button"
import Details from "@/components/details";
import { questions } from "../../../../../util/questionsInfo"
import { descriptionDetail } from "../../../../../util/descriptionDetail";
import {addFeedback} from "../../../../../util/client"
import { savefeedbackToGoogleSheet } from "../../../../../util/google";

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

const submit = async () => {
    // submit feedback form function

    addFeedback({feelingForm, commentForm, personalDetailsForm})

    let formId = crypto.randomUUID();
    localStorage.setItem('formId', formId)

const localhostImpact:any = JSON.parse(localStorage.getItem('impact') || '[]')
const localhostComment:any = JSON.parse(localStorage.getItem('comment') || '{}')
let impact:any = []
let comment:any = {}

localhostImpact?.map((el:any) => {
    impact.push(questions[el])
    comment = {...comment,[questions[el]]: localhostComment[el]}
})
const application = localStorage.getItem("application");
const applicationNumber = JSON.parse(application || '{}').applicationNumber;
    let data = {
        'id' : formId,
        'applicationNumber': applicationNumber,
        'feeling' : localStorage.getItem('feeling'),
        'impact' : JSON.stringify(impact),
        'comment' : JSON.stringify(comment),
        'name' : localStorage.getItem('name'),
        'address' : localStorage.getItem('address'),
        'postcode' : localStorage.getItem('postcode'),
        'email' : localStorage.getItem('email'),
        'phone' : localStorage.getItem('phone'),
        'consent' : localStorage.getItem('consent'),
    }

    try {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            onChangeQuestion()
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
            
        } else {
            console.log('Error fetching data');
        }
    } catch (error) {
        console.log('Error processing comments:', error);
    }
    
    // let dataSavedToGoogle = await savefeedbackToGoogleSheet(data);
    // if(dataSavedToGoogle) {
    //     onChangeQuestion()
    //     localStorage.removeItem('feeling')
    //     localStorage.removeItem('impact')
    //     localStorage.removeItem('comment')
    //     localStorage.removeItem('name')
    //     localStorage.removeItem('address')
    //     localStorage.removeItem('postcode')
    //     localStorage.removeItem('email')
    //     localStorage.removeItem('phone')
    //     localStorage.removeItem('consent')
    
    //     contextCleaner()
    // } else {
    //     console.log("error saving form")
    // }


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