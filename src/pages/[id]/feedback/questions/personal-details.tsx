import { useEffect, useState, useContext } from "react";
import { ContextApplication } from "@/context";
import {Button, BackLink} from "@/components/button"
import Details from "@/components/details";
import Input from "@/components/input";
import Validation from "@/components/validation"
import Checkbox from "@/components/checkbox";
import { descriptionDetail } from "../../../../../util/description_detail";
import { phoneRegex, postCodeRegex } from "../../../../../util/regex";

const PersonalDetails = () => {
    const { onChangeQuestion, setQuestion, selectedCheckbox, personalDetailsForm, setPersonalDetailsForm } = useContext(ContextApplication);
    const [isError, setIsError] = useState<boolean>(false)
    const [isConsentError, setIsConsentError] = useState<boolean>(false)
    const [checkErrorArr, setCheckErrorArr] = useState<string[]>([])
    
    const backComponent = selectedCheckbox && selectedCheckbox[selectedCheckbox?.length - 1]

    useEffect(() => {
        
        const initialValueName = localStorage.getItem("name") || ''
        const initialValueAddress = localStorage.getItem("address") || ''
        const initialValueEmail = localStorage.getItem("email") || ''
        const initialValuePhone = localStorage.getItem("phone") || ''
        const initialValuePostcode = localStorage.getItem("postcode") || ''
        const initialValueConsent = Boolean(localStorage.getItem("consent")) || false

        setPersonalDetailsForm({
            name: initialValueName,
            address: initialValueAddress,
            email: initialValueEmail,
            phone: initialValuePhone,
            postcode: initialValuePostcode,
            consent: initialValueConsent
        })

    }, [setPersonalDetailsForm])

    const onChangeDetails = (value:any, key:any) => {
        setPersonalDetailsForm({...personalDetailsForm, [key]: value})
        localStorage.setItem(key, value)
        setCheckErrorArr([...checkErrorArr, key])
        localStorage.setItem(key, value)
        }

    const nextPage = () => {
        const nameForm = personalDetailsForm['name'];
        const addressForm = personalDetailsForm['address']
        const postcodeForm = personalDetailsForm['postcode'];
        const phoneForm = personalDetailsForm['phone'];
        const emailForm = personalDetailsForm['email'];
        const consentForm = personalDetailsForm['consent'];


        if(nameForm !== "" && postCodeRegex.test(postcodeForm) && addressForm !== "") {
            const phoneValidation = phoneForm !== "" ? phoneRegex.test(phoneForm) : true
            const emailValidation = emailForm !== "" ? emailForm.includes('@'): true
            if(phoneValidation && emailValidation) {
                onChangeQuestion()
            } else {
                !phoneRegex.test(phoneForm) && setCheckErrorArr([...checkErrorArr, 'phone'])
                !emailForm.includes('@') && setCheckErrorArr([...checkErrorArr, 'email'])
                setIsError(true)
            }
                setIsError(false)
        } else {

            setIsError(true)

        }

            consentForm === false ? setIsConsentError(true) : setIsConsentError(false)
        }
// validation error message
const name = personalDetailsForm['name'] === "" ? 'name' : ""
const address = personalDetailsForm['address'] === "" ? 'address' : ""
const postcode = personalDetailsForm['postcode'] === "" ? 'postcode' : ""
const postcodeValid = postCodeRegex.test(postcode)

const messageError = () => {
    let messageArr = [name, address, postcode].filter((el) => el !== "")
    const messageArrSize : any= {
        1:  messageArr[0],
        2: `${messageArr[0]} and ${messageArr[1]}`,
        3: `${messageArr[0]}, ${messageArr[1]} and ${messageArr[2]}`
    }
    return `${messageArrSize[messageArr.length]} can not be empty` 
}

function optionalValidation() {
    const phoneValidation = personalDetailsForm['phone'] !== "" ? phoneRegex.test(personalDetailsForm['phone']) == false ? 'telephone number' : '' : ''
    const emailValidation = personalDetailsForm['email'] !== "" ? personalDetailsForm['email'].includes('@') == false ? 'email' : '' : ''
    const validationMessageArr = [phoneValidation, emailValidation].filter((el) => el !== "")
  
    const messageValidationArrSize : any = {
        1: `${validationMessageArr[0]} is invalid`,
        2: `${validationMessageArr[0]} and ${validationMessageArr[1]} are invalid`
    } 
    return messageValidationArrSize[validationMessageArr.length]
}

messageError()
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
        label='I consent to Lambeth Council using my data for the purposes of assessing this planning application' 
        id='consent' 
        onChange={(e) => {setPersonalDetailsForm({...personalDetailsForm, consent: e.target.checked}), localStorage.setItem('consent', e.target.checked)}} checked={personalDetailsForm?.consent}/>
        </div>

        {
            (isError || isConsentError) && <Validation 
            message={messageError()} 
            invalidPostCode={(personalDetailsForm['postcode'] !== "" && !postcodeValid) && 'postcode is invalid'} 
            optionalValidation={optionalValidation()}
            consentError={isConsentError && `you need to check the consent box`}
            />   
        }

        <Details summary="How we handle your data" description={descriptionDetail['consent']} />
        <Button content="Next" onClick={() => nextPage()}/>
        </section>
        )
}

export default PersonalDetails;