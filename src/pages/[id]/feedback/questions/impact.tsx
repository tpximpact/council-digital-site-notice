import {useState} from "react"
import Link from "next/link"
import Button from "@/components/button"
import Checkbox from "@/components/checkbox"
import Details from "@/components/details"
import { descriptionDetail } from "@/help/description_detail"
import { questions } from "@/help/questions_info"

export const checkboxId:number[] = [3,4,5,6,7,8,9,10]

const ImpactQuestion = ({
        onChange, 
        setSelectedCheckbox, 
        selectedCheckbox
    }: {onChange: () => void, setSelectedCheckbox: (value: number[]) => void, selectedCheckbox: number[]}) => {
    const [isError, setIsError] = useState<boolean>(false)

    const onChecked = (e:any) => {
        const {id, checked} = e.target
        checked ? setSelectedCheckbox([...selectedCheckbox, id]) : setSelectedCheckbox([...selectedCheckbox?.filter(el => el !== id)])
    }

    const selectedCheckboxValidation = () => {
        selectedCheckbox.length > 0 ? onChange() : setIsError(true)
    }
    return(
        <section>
            <Link href="#" className="govuk-back-link">Back</Link>
            <h1 className="govuk-heading-l">What topics do you want to comment on?</h1>
            <p className="govuk-body">Help us understand what your comments on this development is about. Select all the topics that apply.</p>
            <Details summary="What happens to your comments" description={descriptionDetail['impact']}/>
                {
                    checkboxId.map(el => 
                        <Checkbox label={questions[el]} id={el.toString()} onChange={(e) => onChecked(e)} key={el}/>
                    )
                }
        {
            isError && (
        <div className="impact-validation">
            <p className="govuk-body-l govuk-!-font-weight-bold">There is a problem</p>
            <p className="govuk-body govuk-!-font-weight-bold">Please select at least one topic</p>
        </div>
            )
        }
        
        <Button content="Next" className="button-impact-question" onClick={() => selectedCheckboxValidation()}/>
        </section>
    )
}

export default ImpactQuestion;