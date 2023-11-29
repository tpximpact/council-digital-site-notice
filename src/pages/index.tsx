import Input from '@/components/input'
import Button from '@/components/button'
import PlanningApplications from './app/planning-application'
import {ArrowIcon} from "../../public/assets/icons"

export default function Home() {

  return (
    <div className='wrap-home'>
      <h1 className="govuk-heading-l">Find planning applications near you</h1>
      <p className="govuk-body">Find, review and leave your comments on planning applications in Lambeth</p>
      <section className='search-grid'>
        <Input label="Enter a postcode to find planning applications nearby"/>
        <Button className="grid-button-search" content="Search" icon={<ArrowIcon/>}/>
        <Button className="grid-button-signup govuk-button--secondary" content="Sign up for alerts on applications near you "/>
      </section>
        <PlanningApplications />
    </div>
  )
}
