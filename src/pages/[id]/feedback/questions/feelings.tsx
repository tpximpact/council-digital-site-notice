import { useEffect, useContext, useState } from "react"
import { ContextApplication } from "@/context";
import {Button} from "@/components/button"
import { Happy, Neutral, Opposed } from "../../../../../public/assets/icons"
import Validation from "@/components/validation";


function Feeling(){
    const { onChangeQuestion, feelingForm, setFeelingForm } = useContext(ContextApplication);
    const [isError, setIsError] = useState(false)

    useEffect(() => {
            const initialValue = localStorage.getItem("feeling") || ''
            setFeelingForm(initialValue)
    },[setFeelingForm])

    const onChangeFeeling = (value:string) => {
        if(feelingForm === value) {
            setFeelingForm("")
            localStorage.setItem('feeling', "")
        }else {
            setFeelingForm(value)
            localStorage.setItem('feeling', value)
        }
    }

    const colors = {
        "Opposed": feelingForm === "Opposed" ? "#AA2A16" : "white",
        "Neutral": feelingForm === "Neutral" ? "#1D70B8" : "white",
        "Support": feelingForm === "Support" ? "#00703C" : "white"
    }

function onNextPage() {
    if(feelingForm !== ""){
        setIsError(false)
        onChangeQuestion()
    } else {
        setIsError(true)
    }
}

    return(
        <section>
        
            <h1 className="govuk-heading-l">How do you feel about this development?</h1>
            <div className="wrap-icons-feeling">
            <div><Opposed onClick={() => {onChangeFeeling('Opposed')}} color={colors['Opposed']}/><span className="govuk-body">Opposed</span></div>
            <div><Neutral onClick={() => {onChangeFeeling('Neutral')}} color={colors['Neutral']}/><span className="govuk-body">Neutral</span></div>
            <div><Happy onClick={() => {onChangeFeeling('Support')}} color={colors['Support']}/><span className="govuk-body">Support</span></div>
            </div>
            {
                isError && <Validation message="Please select one"/>
            }
            <Button content="Next" onClick={() => onNextPage()}/>
        </section>
    )
}

export default Feeling;