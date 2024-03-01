import Feeling from "../feelings"
import Topics from "../topics"
import Message from "../../pages/planning-applications/[id]/feedback/message"
import Comment from "../comment"
import PersonalDetails from "../personal-details"
import FeedbackInformation from "../feedback-information"
import CheckAnswers from "../check-answers"

const FeedbackQuestions = ({ question }: { question: number }) => {
  const switchComponent = () => {
    switch (question) {
      case 0:
        return <FeedbackInformation />;
      case 1:
        return <Feeling />;
      case 2:
        return <Topics />;
      case 11:
        return <PersonalDetails />;
      case 12:
        return <CheckAnswers />;
      case 13:
        return <Message />;
      default:
        return <Comment />;
    }
  };

  return (
    <section className="wrap-feedback-question">{switchComponent()}</section>
  );
};

export default FeedbackQuestions;
