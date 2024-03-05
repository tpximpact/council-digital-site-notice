import { useEffect, useState, useContext } from "react";
import PlanningApplications from "../components/planning-application";
import { SanityClient } from "../../util/sanityClient";
import { PaginationType, Data } from "../../util/type";
import { ContextApplication } from "@/context";
import { DataClient } from "../../util/dataService";
import { OpenDataClient } from "../../util/openDataClient";
import ReactPaginate from "react-paginate";
import { NextIcon } from "../../public/assets/icons";
import { PreviewIcon } from "../../public/assets/icons";
import Input from "@/components/input";
import { Button } from "@/components/button";
import { ArrowIcon } from "../../public/assets/icons";
import Link from "next/link";
import { getLocationFromPostcode } from "../../util/geolocation";
import { distanceInMiles } from "../../util/geolocation";
import { getGlobalContent } from "../../util/client";

const globalContent = await getGlobalContent();

export const itemsPerPage = 6;
const dataClient = new DataClient(new SanityClient(), new OpenDataClient());

export async function getStaticProps() {
  const data = await dataClient.getAllSiteNotices();
  return {
    props: {
      data: data.results,
      resultsTotal: data.total,
    },
  };
}

const Home = ({ data, globalContent }: PaginationType) => {
  const { setGlobalInfo } = useContext(ContextApplication);
  const [postcode, setPostcode] = useState("");
  const [location, setLocation] = useState<any>();
  const [locationNotFound, setLocationNotFound] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState<Data[]>();
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setDisplayData(data);
    setGlobalInfo(globalContent);
    localStorage.setItem("globalInfo", JSON.stringify(globalContent));
  }, [data, globalContent, setGlobalInfo]);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  const onSearchPostCode = async () => {
    let location;

    if (postcode != null) {
      setLocationNotFound(false);
      location = await getLocationFromPostcode(postcode);

      if (location == null) {
        setLocationNotFound(true);
      }
    }
    setLocation(location);

    if (location) {
      const sortedData = data.sort((a, b) => {
        const distanceA = distanceInMiles(
          location.latitude,
          location.longitude,
          a.latitude,
          a.longitude,
        );
        const distanceB = distanceInMiles(
          location.latitude,
          location.longitude,
          b.latitude,
          b.longitude,
        );
        return distanceA - distanceB;
      });
      setDisplayData(sortedData);
      setItemOffset(0);
    }
  };

  return (
    <div className="wrap-home">
      <h1
        className="govuk-heading-xl"
        role="heading"
        style={{ display: "inline-block" }}
      >
        Find planning applications near you
      </h1>
      <p className="govuk-body-m">
        Find, review and leave your comments on planning applications in{" "}
        {globalContent?.councilName}
      </p>
      <section className="search-grid">
        <Input
          label="Enter a postcode to find planning applications nearby"
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e)}
          isError={locationNotFound}
          messageError="Please enter a valid postcode"
        />
        <Button
          className="grid-button-search"
          content="Search"
          icon={<ArrowIcon />}
          onClick={() => onSearchPostCode()}
        />
        {globalContent?.signUpUrl && (
          <Link
            className="govuk-button grid-button-signup govuk-button--secondary"
            target="_blank"
            style={{ textDecoration: "none" }}
            href={`${globalContent?.signUpUrl}`}
          >
            Sign up for alerts on applications near you
          </Link>
        )}
      </section>
      {displayData && (
        <PlanningApplications data={currentItems} searchLocation={location} />
      )}

      <div className="wrap-pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<NextIcon />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel={<PreviewIcon />}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination govuk-body"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Home;
