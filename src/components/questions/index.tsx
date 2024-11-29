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
}: {
  question: number;
  onChangeQuestion: () => void;
  setQuestion: (value: number) => void;
}) => {
  const switchComponent = () => {
    switch (question) {
      case 0:
        return <FeedbackInformation onChangeQuestion={onChangeQuestion} />;
      case 1:
        return (
          <Feeling
            onChangeQuestion={onChangeQuestion}
            setQuestion={setQuestion}
          />
        );
      case 2:
        return (
          <Topics
            onChangeQuestion={onChangeQuestion}
            setQuestion={setQuestion}
          />
        );
      case 11:
        return (
          <PersonalDetails
            onChangeQuestion={onChangeQuestion}
            setQuestion={setQuestion}
          />
        );
      case 12:
        return (
          <CheckAnswers
            onChangeQuestion={onChangeQuestion}
            setQuestion={setQuestion}
          />
        );
      case 13:
        return;
      default:
        return (
          <Comment
            onChangeQuestion={onChangeQuestion}
            setQuestion={setQuestion}
            question={question}
          />
        );
    }
  };

  return <>{switchComponent()}</>;
};

export default FeedbackQuestions;
