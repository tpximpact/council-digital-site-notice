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

export const itemsPerPage = 2;
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

  return (
    <div className="wrap-home">
      <h1>Planning Applications</h1>
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
