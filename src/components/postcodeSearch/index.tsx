import ButtonStart from "../buttonStart";

const PostcodeSearch = ({ postcode }: { postcode?: string }) => {
  return (
    <>
      <div className="govuk-form-group">
        <h2 className="govuk-label-wrapper">
          <label className="govuk-label govuk-label--l" htmlFor="postcode">
            Enter a postcode to find planning applications nearby
          </label>
        </h2>
        <input
          className="govuk-input"
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
