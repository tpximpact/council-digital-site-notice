import Feeling from "../feelings";
import Topics from "../topics";
import Comment from "../comment";
import PersonalDetails from "../personal-details";
import FeedbackInformation from "../feedback-information";
import CheckAnswers from "../check-answers";

const FeedbackQuestions = ({
  question,
  onChangeQuestion,
  setQuestion,
  applicationId,
}: {
  question: number;
  onChangeQuestion: () => void;
  setQuestion: (value: number) => void;
  applicationId: string;
}) => {
  const switchComponent = () => {
    switch (question) {
      case 0:
        return (
          <FeedbackInformation
            applicationId={applicationId}
            onChangeQuestion={onChangeQuestion}
          />
        );
      case 1:
        return (
          <Feeling
            applicationId={applicationId}
            onChangeQuestion={onChangeQuestion}
            setQuestion={setQuestion}
          />
        );
      case 2:
        return (
          <Topics
            applicationId={applicationId}
            onChangeQuestion={onChangeQuestion}
            setQuestion={setQuestion}
          />
        );
      case 11:
        return (
          <PersonalDetails
            applicationId={applicationId}
            onChangeQuestion={onChangeQuestion}
            setQuestion={setQuestion}
          />
        );
      case 12:
        return (
          <CheckAnswers
            applicationId={applicationId}
            onChangeQuestion={onChangeQuestion}
            setQuestion={setQuestion}
          />
        );
      case 13:
        return;
      default:
        return (
          <Comment
            applicationId={applicationId}
            onChangeQuestion={onChangeQuestion}
            setQuestion={setQuestion}
            question={question}
          />
        );
    }
  };

  return <section>{switchComponent()}</section>;
};

export default FeedbackQuestions;
