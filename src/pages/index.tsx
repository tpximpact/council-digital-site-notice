import Input from '@/components/input'
import Button from '@/components/button'
import PlanningApplications from './app/planning-application'
import {ArrowIcon} from "../../public/assets/icons"
import { getActiveApplications } from "../../util/client";

export async function getStaticProps() {
  const data = await getActiveApplications();
  return {
    props: {
      data,
    },
  };
}

const Home = ({ data }: any) => {

  return (
    <div className='wrap-home'>
      <h1 className="govuk-heading-l" role='heading'>Find planning applications near you</h1>
      <p className="govuk-body">Find, review and leave your comments on planning applications in Lambeth</p>
      <section className='search-grid'>
        <Input label="Enter a postcode to find planning applications nearby"/>
        <Button className="grid-button-search" content="Search" icon={<ArrowIcon/>}/>
        <Button className="grid-button-signup govuk-button--secondary" content="Sign up for alerts on applications near you "/>
      </section>
        <PlanningApplications data={data} />
    </div>
  )
}

export default Home;