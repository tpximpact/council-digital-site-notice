import Link from "next/link";
import Button from "@/components/button";
import Details from "@/components/details";
import Input from "@/components/input";
import { descriptionDetail } from "../../../../../util/description_detail";

const PersonalDetails = ({onChange}: {onChange: () => void}) => {
    return(
        <section className="wrap-personal-details">
        <Link href="#" className="govuk-back-link">Back</Link>
        <h1 className="govuk-heading-l" >Your details</h1>
        <p className="govuk-body-s">If the your comment relates to an issue that will affect you personally (for example, the development will block light coming into your home or affect your privacy), we need some of your details.</p>
        <p className="govuk-body-s">This is because we can only formally explore comments coming from people who live close to the proposed development.</p>
        <Details summary="How we handle your data" description={descriptionDetail['personal-details']}/>
        <Input label="Your name" hint="Optional"/>
        <Input label="Your email address" hint="Optional"/>
        <Input label="Your telephone number" hint="Optional"/>
        <Input label="Your postcode" hint="Optional"/>
        <Button content="Submit your comments" onClick={() => {onChange()}}/>
        </section>
        )
}

export default PersonalDetails;