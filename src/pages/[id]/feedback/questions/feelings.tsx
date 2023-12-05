import { useState } from "react"
import Button from "@/components/button"
import Details from "@/components/details"
import { Love, Neutral, Opposed } from "../../../../../public/assets/icons"
import {descriptionDetail} from "../../../../help/description_detail"

const Feeling = ({onChange}: {onChange: () => void}) => {
    const [feeling, setFeeling] = useState("")

    const onChangeFeeling = (value:string) => {
        if(feeling === value) {
            setFeeling("")
        }else {
            setFeeling(value)
        }
    }

    const colors = {
        "Opposed": feeling === "Opposed" ? "#AA2A16" : "white",
        "Neutral": feeling === "Neutral" ? "#1D70B8" : "white",
        "inFavor": feeling === "inFavor" ? "#D53880" : "white"
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
            <Button content="Next" onClick={() => onChange()}/>
        </section>
    )
}

export default Feeling;