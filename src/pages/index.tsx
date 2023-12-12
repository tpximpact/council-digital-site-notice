import Input from '@/components/input'
import {Button} from '@/components/button'
import PlanningApplications from './app/planning-application'
import {ArrowIcon} from "../../public/assets/icons"
import { getActiveApplications, getActiveApplicationsPagination } from "../../util/client";
import Pagination from './app/pagination';
import { useEffect, useState } from 'react';

export const itemsPerPage = 6

export async function getStaticProps() {
  const data = await getActiveApplications();
  const paginationData = await getActiveApplicationsPagination({itemsPerPage})
  return {
    props: {
      data,
      paginationData
    },
  };
}

const Home = ({ data, paginationData }: any) => {
  const [displayData, setDisplayData] = useState([])

useEffect(() => {
    setDisplayData(paginationData)
}, [data, paginationData])

async function onSelectPage({_id}: any) {
  const res  = await getActiveApplicationsPagination({_id, itemsPerPage})
  setDisplayData(res)

}

  return (
    <div className='wrap-home'>
      <h1 className="govuk-heading-l" role='heading'>Find planning applications near you</h1>
      <p className="govuk-body">Find, review and leave your comments on planning applications in Lambeth</p>
      <section className='search-grid'>
        <Input label="Enter a postcode to find planning applications nearby" onChange={() => {}} type='text'/>
        <Button className="grid-button-search" content="Search" icon={<ArrowIcon/>}/>
        <Button className="grid-button-signup govuk-button--secondary" content="Sign up for alerts on applications near you "/>
      </section>
        <PlanningApplications data={displayData} />
        {
          data.length > itemsPerPage && <Pagination data={data} onSelectPage={(value: any) => onSelectPage(value)} itemsPerPage={itemsPerPage}/>
        }
    </div>
  )
}

export default Home;