import Input from "@/components/input";
import ButtonStart from "@/components/buttonStart";
import Link from "next/link";

const FormSearch = ({
  locationNotFound,
  onSearchPostCode,
  setPostcode,
  postcode,
  signUpUrl,
}: {
  locationNotFound: boolean;
  onSearchPostCode: () => void;
  setPostcode: React.Dispatch<React.SetStateAction<string>>;
  signUpUrl?: string;
  postcode?: string;
}) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-half">
        <Input
          id="search-postcode"
          label="Enter a postcode to find planning applications nearby"
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e)}
          isError={locationNotFound}
          messageError="Please enter a valid postcode"
          autocomplete="postal-code"
        />
        <ButtonStart content="Search" onClick={() => onSearchPostCode()} />
      </div>
      <div className="govuk-grid-column-one-half">
        {signUpUrl && (
          <Link
            className="govuk-button govuk-button--secondary"
            target="_blank"
            href={`${signUpUrl}`}
          >
            Sign up for alerts on applications near you
          </Link>
        )}
      </div>
    </div>
  );
};

export default FormSearch;
