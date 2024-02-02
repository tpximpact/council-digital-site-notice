import { phoneRegex, postCodeRegex } from "../../../../../util/regex";

export function messageError(personalDetailsForm: any) {

    const name = personalDetailsForm['name'] === "" ? 'name' : ""
    const address = personalDetailsForm['address'] === "" ? 'address' : ""
    const postcode = personalDetailsForm['postcode'] === "" ? 'postcode' : ""

    let messageArr = [name, address, postcode].filter((el) => el !== "")
    const messageArrSize : any= {
        1:  messageArr[0],
        2: `${messageArr[0]} and ${messageArr[1]}`,
        3: `${messageArr[0]}, ${messageArr[1]} and ${messageArr[2]}`
    }

    return  !!messageArr.length && `${messageArrSize[messageArr.length]} can not be empty`
}

export function postcodeMessageError(personalDetailsForm: any) {
    const postcode = personalDetailsForm['postcode'] 
    const postcodeValid = postCodeRegex.test(postcode)

    return postcode !== "" && !postcodeValid && 'postcode is invalid'
}

export function optionalValidation(personalDetailsForm: any) {
    const phoneValidation = personalDetailsForm['phone'] !== "" ? phoneRegex.test(personalDetailsForm['phone']) == false ? 'telephone number' : '' : ''
    const emailValidation = personalDetailsForm['email'] !== "" ? personalDetailsForm['email'].includes('@') == false ? 'email' : '' : ''
    const validationMessageArr = [phoneValidation, emailValidation].filter((el) => el !== "")
  
    const messageValidationArrSize : any = {
        1: `${validationMessageArr[0]} is invalid`,
        2: `${validationMessageArr[0]} and ${validationMessageArr[1]} are invalid`
    } 
    return messageValidationArrSize[validationMessageArr.length]
}

export const isErrorValidation = (personalDetailsForm: any) => { 
    const postcode = personalDetailsForm['postcode']
    const validPostCode = postcode !== '' && postCodeRegex.test(postcode)

    return personalDetailsForm['name'] !== '' && personalDetailsForm['address'] !== '' && validPostCode} 

export const isConsentValidation = (personalDetailsForm: any) => { return personalDetailsForm['consent']}

export const isOptionValidation = (personalDetailsForm: any) => { 

    const phoneForm = personalDetailsForm['phone']
    const emailForm = personalDetailsForm['email'] 
    const phoneValidation = phoneForm !== "" && phoneRegex.test(phoneForm)
    const emailValidation = emailForm !== "" && emailForm.includes('@')

    return (phoneValidation === true || phoneForm == "" && emailValidation === true || emailForm == "") ? true : false

}