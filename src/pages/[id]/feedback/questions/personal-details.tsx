import {Button, BackLink} from "@/components/button"
import Details from "@/components/details";
import Input from "@/components/input";
import { descriptionDetail } from "../../../../../util/description_detail";
import { useEffect, useState } from "react";
import { PersonalDetailsForm } from ".";
import Validation from "@/components/validation"

function PersonalDetails({
        onChange, 
        setPersonalDetailsForm, 
        personalDetailsForm,
        setQuestion,
        selectedCheckbox = []
    }: {onChange: () => void, personalDetailsForm: PersonalDetailsForm, setPersonalDetailsForm: (value: any) => void, setQuestion:(value:any) => void, selectedCheckbox: number[]}) {
        const [defaultValue, setDefaultValue] = useState({name: '', email: '', phone: '', postcode: ''})
        const [isError, setIsError] = useState<boolean>(false)
    
        const backComponent = selectedCheckbox[selectedCheckbox.length - 1]

        useEffect(() => {
            const initialValueName = localStorage.getItem("name") || ''
            const initialValueEmail = localStorage.getItem("email") || ''
            const initialValuePhone = localStorage.getItem("phone") || ''
            const initialValuePostcode = localStorage.getItem("postcode") || ''

            const {name, email, phone, postcode} = personalDetailsForm

            setDefaultValue({
                name: name || initialValueName,
                email: email || initialValueEmail,
                phone: phone || initialValuePhone,
                postcode: postcode || initialValuePostcode
            })
        }, [personalDetailsForm])

        const onChangeDetails = (value:any, key:any) => {
            setPersonalDetailsForm({...personalDetailsForm, [key]: value})
            localStorage.setItem(key, value)
        }

    return(
        <section className="wrap-personal-details">
        <BackLink content='Back'onClick={() => setQuestion(backComponent)}/>
        <h1 className="govuk-heading-l" >Your details</h1>
        <p className="govuk-body-s">If the your comment relates to an issue that will affect you personally (for example, the development will block light coming into your home or affect your privacy), we need some of your details.</p>
        <p className="govuk-body-s">This is because we can only formally explore comments coming from people who live close to the proposed development.</p>
        <Details summary="How we handle your data" description={descriptionDetail['personal-details']}/>
        <Input label="Your name" onChange={(value: any) => onChangeDetails(value, 'name')} value={defaultValue?.name} type='text'/>
        <Input label="Your email address" hint="Optional" onChange={(value: any) => onChangeDetails(value, 'email')} value={defaultValue?.email} type='email'/>
        <Input label="Your telephone number" hint="Optional" onChange={(value: any) => onChangeDetails(value, 'phone')} value={defaultValue?.phone} type='tel'/>
        <Input label="Your postcode" onChange={(value: any) => onChangeDetails(value, 'postcode')} value={defaultValue?.postcode} type='text'/>
        {
            isError && <Validation message='Name, address and postcode can not be empty'/>

            
        }
        <Button content="Submit your comments" onClick={() => {(personalDetailsForm['name'] === '' || personalDetailsForm['postcode'] === '') ? setIsError(true) : onChange()}}/>
        </section>
        )
}

export default PersonalDetails;