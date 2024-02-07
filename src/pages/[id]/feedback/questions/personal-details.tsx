import { useEffect, useState, useContext } from "react";
import { ContextApplication } from "@/context";
import {Button, BackLink} from "@/components/button"
import Details from "@/components/details";
import Input from "@/components/input";
import Validation from "@/components/validation"
import Checkbox from "@/components/checkbox";
import { descriptionDetail } from "../../../../../util/descriptionDetail";
import { messageError, optionalValidation, isErrorValidation, isConsentValidation, isOptionValidation, postcodeMessageError } from "../../../../../util/feedbackHelper";

const PersonalDetails = () => {
    const { onChangeQuestion, setQuestion, selectedCheckbox, personalDetailsForm, setPersonalDetailsForm, globalInfo } = useContext(ContextApplication);
    const [isError, setIsError] = useState<boolean>(false)
    const [isConsentError, setIsConsentError] = useState<boolean>(false)
    const [councilName, setCouncilName] = useState()
    
    const backComponent = selectedCheckbox && selectedCheckbox[selectedCheckbox?.length - 1]

    useEffect(() => {

        const initialGlobalValue = localStorage.getItem("globalInfo")
        
        if(initialGlobalValue !== null) {
            setCouncilName(JSON.parse(initialGlobalValue).councilName)
        } else {
            setCouncilName(globalInfo.councilName)
        }
        
    const initialValueName = localStorage.getItem("name") || ''
    const initialValueAddress = localStorage.getItem("address") || ''
    const initialValueEmail = localStorage.getItem("email") || ''
    const initialValuePhone = localStorage.getItem("phone") || ''
    const initialValuePostcode = localStorage.getItem("postcode") || ''
    const consentStorageValue = localStorage.getItem("consent")
    let initialValueConsent = false
    if(consentStorageValue !== null) initialValueConsent = JSON.parse(consentStorageValue) || false

    setPersonalDetailsForm({
        name: initialValueName,
        address: initialValueAddress,
        email: initialValueEmail,
        phone: initialValuePhone,
        postcode: initialValuePostcode,
        consent: initialValueConsent
    })

}, [globalInfo.councilName, setPersonalDetailsForm])

const onChangeDetails = (value: any, key: string) => {
    setPersonalDetailsForm({...personalDetailsForm, [key]: value})
    localStorage.setItem(key, value)

}

const nextPage = () => {
    const errorValidation = isErrorValidation(personalDetailsForm)
    const errorConsent = isConsentValidation(personalDetailsForm)
    const optionValidation = isOptionValidation(personalDetailsForm)

    errorValidation ? setIsError(false) : setIsError(true)
    errorConsent ? setIsConsentError(false) : setIsConsentError(true)
    optionValidation ? setIsError(false) : setIsError(true)

    errorConsent && errorConsent && optionValidation && onChangeQuestion()

}




    return(
        <section className="wrap-personal-details">
        <BackLink content='Back'onClick={() => setQuestion(backComponent)}/>
        <h1 className="govuk-heading-l" >Your details</h1>
        <Input label="Name" onChange={(value: any) => onChangeDetails(value, 'name')} value={personalDetailsForm?.name} type='text'/>
        <Input label="Address" onChange={(value: any) => onChangeDetails(value, 'address')} value={personalDetailsForm?.address} type='text'/>
        <Input label="Postcode" onChange={(value: any) => onChangeDetails(value, 'postcode')} value={personalDetailsForm?.postcode} type='text'/>
        <Input label="Email address" hint="Optional" onChange={(value: any) => onChangeDetails(value, 'email')} value={personalDetailsForm?.email} type='email'/>
        <Input label="Telephone number" hint="Optional" onChange={(value: any) => onChangeDetails(value, 'phone')} value={personalDetailsForm?.phone} type='tel'/>
        <div >
        <Checkbox labelClass='consent-label' 
        label={`I consent to ${councilName} Council using my data for the purposes of assessing this planning application`}
        id='consent' 
        onChange={(e) => onChangeDetails(e.target.checked, 'consent')} checked={personalDetailsForm?.consent}/>
        </div>
        {
            (isError || isConsentError) && <Validation 
            message={messageError(personalDetailsForm)} 
            invalidPostCode={postcodeMessageError(personalDetailsForm)} 
            optionalValidation={optionalValidation(personalDetailsForm)}
            consentError={isConsentError && `you need to check the consent box`}
            />   
        }

        <Details summary="How we handle your data" description={descriptionDetail['consent']} />
        <Button content="Next" onClick={() => nextPage()}/>
        </section>
        )
}

export default PersonalDetails;