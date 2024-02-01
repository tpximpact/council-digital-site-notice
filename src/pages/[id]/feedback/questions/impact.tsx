
import {Button, BackLink} from "@/components/button"
import {useEffect, useState} from "react"
import Checkbox from "@/components/checkbox"
import Details from "@/components/details"
import Validation from "@/components/validation"
import { descriptionDetail } from "../../../../../util/description_detail"
import { questions } from "../../../../../util/questions_info"
import { useContext } from "react";
import { ContextApplication } from "@/context";

export const checkboxId:number[] = [3,4,5,6,7,8,9,10]

const ImpactQuestion = () => {
    const { onChangeQuestion, setQuestion, selectedCheckbox, setSelectedCheckbox } = useContext(ContextApplication);
    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        const getStorage = localStorage.getItem("impact") || '[]'
        const initialValue = JSON.parse(getStorage)
        setSelectedCheckbox(initialValue)
},[setSelectedCheckbox])


    const onChecked = (e:any) => {
        const {id, checked} = e.target
        checked ? 
            (setSelectedCheckbox([...selectedCheckbox, parseInt(id)]), localStorage.setItem('impact', JSON.stringify([...selectedCheckbox, parseInt(id)]))): 
            (setSelectedCheckbox([...selectedCheckbox?.filter(el => el !== parseInt(id))]), localStorage.setItem('impact', JSON.stringify([...selectedCheckbox?.filter(el => el !== parseInt(id))])))
    }

    return(
        <section>
            <BackLink content='Back'onClick={() => setQuestion(1)}/>
            <h1 className="govuk-heading-l">What topics do you want to comment on?</h1>
            <p className="govuk-body">Help us understand what your comments on this development is about. Select all the topics that apply.</p>
            <Details summary="What happens to your comments" description={descriptionDetail['impact']}/>
                {
                    checkboxId.map(el => 
                        <Checkbox label={questions[el]} id={el.toString()} onChange={(e) => onChecked(e)} key={el} checked={selectedCheckbox.includes(el)}/>
                    )
                }
        {
            isError && <Validation message="Please select at least one topic"/>
        }
        <Button content="Next" className="button-impact-question" onClick={() => {selectedCheckbox.length > 0 ? onChangeQuestion() : setIsError(true)}}/>
        </section>
    )
}

export default ImpactQuestion;