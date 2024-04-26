"use client";

import "../../styles/app.scss";
import { useEffect, useState } from "react";
import PlanningApplicationList from "@/components/planning-application-list";
import { SanityClient } from "../actions/sanityClient";
import { Data } from "../lib/type";
import ReactPaginate from "react-paginate";
import { NextIcon } from "../../../public/assets/icons";
import { PreviewIcon } from "../../../public/assets/icons";
import Input from "@/components/input";
import { Button } from "@/components/button";
import { ArrowIcon } from "../../../public/assets/icons";
import Link from "next/link";
import { getLocationFromPostcode } from "../actions/actions";
import { getGlobalContent } from "../actions/actions";

const dataClient = new SanityClient();
const Home = () => {
  const itemsPerPage = 6;

  const [postcode, setPostcode] = useState("");
  const [location, setLocation] = useState<any>();
  const [locationNotFound, setLocationNotFound] = useState<boolean>(false);
  const [displayData, setDisplayData] = useState<Data[]>();
  const [dynamicTotalResults, setDynamicTotalResults] = useState<number>(0);
  const [globalConfig, setGlobalConfig] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      const data = await dataClient.getActiveApplications(0, itemsPerPage);
      const fetchGlobalConfig = await getGlobalContent();
      setDisplayData(data.results as Data[]);
      setDynamicTotalResults(data.total);
      setGlobalConfig(fetchGlobalConfig);
    }
    fetchData();
  }, []);

  const pageCount = Math.ceil(dynamicTotalResults / itemsPerPage);

  const handlePageClick = async (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % dynamicTotalResults;
    const newTotalPagecount = dynamicTotalResults - newOffset;
    const totalPage =
      newTotalPagecount >= itemsPerPage ? itemsPerPage : newTotalPagecount;

    let newData;
    if (location) {
      newData = await dataClient.getActiveApplicationsByLocation(
        newOffset,
        location,
        totalPage,
      );
    } else {
      newData = await dataClient.getActiveApplications(newOffset, totalPage);
    }
    setDisplayData(newData?.results as Data[]);
    setDynamicTotalResults(newData?.total as number);
  };

  const onSearchPostCode = async () => {
    let location: any;
    if (!postcode) {
      setLocationNotFound(true);
      return;
    }
    location = await getLocationFromPostcode(postcode);
    if (!location) {
      setLocationNotFound(true);
      return;
    }
    setLocationNotFound(false);
    setLocation(location);

    // Fetching sorted applications based on lat/long
    const newData = await dataClient.getActiveApplicationsByLocation(
      0,
      location,
      itemsPerPage,
    );
    setDisplayData(newData?.results as Data[]);
    setDynamicTotalResults(newData?.total as number);
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
        {globalConfig?.councilName}
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
        {globalConfig?.signUpUrl && (
          <Link
            className="govuk-button grid-button-signup govuk-button--secondary"
            target="_blank"
            style={{ textDecoration: "none" }}
            href={`${globalConfig?.signUpUrl}`}
          >
            Sign up for alerts on applications near you
          </Link>
        )}
      </section>
      {displayData && (
        <PlanningApplicationList data={displayData} searchLocation={location} />
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
