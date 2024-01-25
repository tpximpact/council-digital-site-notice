import Input from "@/components/input";
import { Button } from "@/components/button";
import PlanningApplications from "./app/planning-application";
import { ArrowIcon } from "../../public/assets/icons";
import {
  getActiveApplications,
  getActiveApplicationsPagination,
} from "../../util/client";
import Pagination from "./app/pagination";
import { useEffect, useState } from "react";
import { PaginationType, Data } from "../../util/type";
import { getLocationFromPostcode } from "../../util/geolocation";

export const itemsPerPage = 6;

export async function getStaticProps() {
  const dataId = await getActiveApplications();
  const data = await getActiveApplicationsPagination({ itemsPerPage });
  return {
    props: {
      dataId,
      data,
    },
  };
}

const Home = ({ dataId, data }: PaginationType) => {
  const [postcode, setPostcode] = useState("");
  const [location, setLocation] = useState<any>();
  const [displayData, setDisplayData] = useState<Data[]>();

  useEffect(() => {
    setDisplayData(data);
  }, [dataId, data]);

  async function onSelectPage({ _id }: any) {
    const res = await getActiveApplicationsPagination({ _id, itemsPerPage, location });
    setDisplayData(res);
  }

  const onSearchPostCode = async () => {

    let location;

    if(postcode != null) {
      location = await getLocationFromPostcode(postcode);
    }

    setLocation(location)
    const res = await getActiveApplicationsPagination({itemsPerPage, location});
    setDisplayData(res);
  };

  return (
    <div className="wrap-home">
      <h1 className="govuk-heading-l" role="heading">
        Find planning applications near you
      </h1>
      <p className="govuk-body">
        Find, review and leave your comments on planning applications in Lambeth
      </p>
      <section className="search-grid">
        <Input
          label="Enter a postcode to find planning applications nearby"
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e)}
        />
        <Button
          className="grid-button-search"
          content="Search"
          icon={<ArrowIcon />}
          onClick={() => onSearchPostCode()}
        />
        <Button
          className="grid-button-signup govuk-button--secondary"
          content="Sign up for alerts on applications near you "
        />
      </section>
      {displayData && <PlanningApplications data={displayData} searchLocation={location} />}

      {dataId?.length > itemsPerPage && (
        <Pagination
          data={dataId}
          onSelectPage={(value: any) => onSelectPage(value)}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default Home;
