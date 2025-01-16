import ButtonStart from "../buttonStart";

const PostcodeSearch = ({
  postcode,
  error,
}: {
  postcode?: string;
  error?: string;
}) => {
  return (
    <>
      <div
        className={`govuk-form-group ${error ? "govuk-form-group--error" : ""}`}
      >
        <h2 className="govuk-label-wrapper">
          <label className="govuk-label govuk-label--l" htmlFor="postcode">
            Enter a postcode to find planning applications nearby
          </label>
        </h2>
        {error && (
          <p id="event-name-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {error}
          </p>
        )}
        <input
          className={`govuk-input ${error ? "govuk-input--error" : ""}`}
          id="postcode"
          name="postcode"
          type="text"
          defaultValue={postcode}
        />
      </div>
      <ButtonStart type="submit" content="Search" />
    </>
  );
};

export default PostcodeSearch;
