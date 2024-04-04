/* eslint-disable @next/next/no-async-client-component */
"use client";

import "../../styles/app.scss";
import { useEffect, useState } from "react";
import PlanningApplications from "../../components/planning-application";
import { SanityClient } from "../../lib/sanityClient";
import { Data } from "../../../util/helpers/type";
import { DataClient } from "../../lib/dataService";
import ReactPaginate from "react-paginate";
import { NextIcon } from "../../../public/assets/icons";
import { PreviewIcon } from "../../../public/assets/icons";
import Input from "@/components/input";
import { Button } from "@/components/button";
import { ArrowIcon } from "../../../public/assets/icons";
import Link from "next/link";
import { getLocationFromPostcode } from "../../../util/actions/actions";
import { getGlobalContent } from "../../../util/actions/actions";
import { siteNoticeResponse } from "../../lib/dataService";

const itemsPerPage = 6;

async function fetchData(): Promise<siteNoticeResponse> {
  const dataClient = new DataClient(new SanityClient());
  const data = await dataClient.getAllSiteNotices(0, itemsPerPage);
  return data;
}

export default async function Home() {
  console.log("Home");
  // const [postcode, setPostcode] = useState("");
  const [location, setLocation] = useState<any>();
  // const [locationNotFound, setLocationNotFound] = useState<boolean>(false);
  // const [displayData, setDisplayData] = useState<Data[]>();
  // const [dynamicTotalResults, setDynamicTotalResults] = useState<number>(0);
  // const [globalConfig, setGlobalConfig] = useState<any>();

  const testdata = await fetchData();

  // const pageCount = Math.ceil(dynamicTotalResults / itemsPerPage);

  // const handlePageClick = async (event: any) => {
  //   const newOffset = (event.selected * itemsPerPage) % dynamicTotalResults;
  //   const newTotalPagecount = dynamicTotalResults - newOffset;
  //   const totalPage =
  //     newTotalPagecount >= itemsPerPage ? itemsPerPage : newTotalPagecount;

  //   const newData = await dataClient.getAllSiteNotices(
  //     newOffset,
  //     totalPage,
  //     location,
  //   );
  //   setDisplayData(newData?.results as Data[]);
  //   setDynamicTotalResults(newData?.total as number);
  // };

  // const onSearchPostCode = async () => {
  //   let location: any;
  //   if (!postcode) {
  //     setLocationNotFound(true);
  //     return;
  //   }
  //   location = await getLocationFromPostcode(postcode);
  //   if (!location) {
  //     setLocationNotFound(true);
  //     return;
  //   }
  //   setLocationNotFound(false);
  //   setLocation(location);

  //   // Fetching sorted applications based on lat/long
  //   const newData = await dataClient.getAllSiteNotices(
  //     0,
  //     itemsPerPage,
  //     location,
  //   );
  //   setDisplayData(newData?.results as Data[]);
  //   setDynamicTotalResults(newData?.total as number);
  // };

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
      </p>
      <section className="search-grid">
        {/* <Input
          label="Enter a postcode to find planning applications nearby"
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e)}
          isError={locationNotFound}
          messageError="Please enter a valid postcode"
        /> */}
        <Button
          className="grid-button-search"
          content="Search"
          icon={<ArrowIcon />}
          // onClick={() => onSearchPostCode()}
        />
        {/* {globalConfig?.signUpUrl && (
          <Link
            className="govuk-button grid-button-signup govuk-button--secondary"
            target="_blank"
            style={{ textDecoration: "none" }}
            href={`${globalConfig?.signUpUrl}`}
          >
            Sign up for alerts on applications near you
          </Link>
        )} */}
      </section>
      {testdata && (
        <PlanningApplications
          data={testdata.results}
          searchLocation={location}
        />
      )}

      {/* <div className="wrap-pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<NextIcon />}
          // onPageChange={handlePageClick}
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
        /> */}
      {/* </div> */}
    </div>
  );
}
