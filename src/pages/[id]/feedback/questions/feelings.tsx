import { useEffect, useContext } from "react"
import { ContextApplication } from "@/context";
import Details from "@/components/details"
import {Button} from "@/components/button"
import { Love, Neutral, Opposed } from "../../../../../public/assets/icons"
import {descriptionDetail} from "../../../../../util/description_detail"


function Feeling(){
    const { onChangeQuestion, feelingForm, setFeelingForm } = useContext(ContextApplication);

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
        "inFavor": feelingForm === "inFavor" ? "#D53880" : "white"
    }

    return(
        <section>
        
            <h1 className="govuk-heading-l">How do you feel about this development?</h1>
            <div className="wrap-icons-feeling">
            <div><Opposed onClick={() => {onChangeFeeling('Opposed')}} color={colors['Opposed']}/><span className="govuk-body">Opposed</span></div>
            <div><Neutral onClick={() => {onChangeFeeling('Neutral')}} color={colors['Neutral']}/><span className="govuk-body">Neutral</span></div>
            <div><Love onClick={() => {onChangeFeeling('inFavor')}} color={colors['inFavor']}/><span className="govuk-body">In favor</span></div>
            </div>
            <Details summary="Why your feedback is important" description={descriptionDetail['feeling']}/>
        
            <Button content="Next" onClick={() => onChangeQuestion()}/>
        </section>
    )
}

export default Feeling;