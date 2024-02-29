import { useEffect, useContext, useState } from "react";
import { ContextApplication } from "@/context";
import TextArea from "@/components/text-area";
import Validation from "@/components/validation";
import { Button, BackLink } from "@/components/button";
import { questions } from "../../../../../../util/questionsInfo";

function CommentQuestion() {
  const {
    onChangeQuestion,
    commentForm,
    setCommentForm,
    setQuestion,
    selectedCheckbox,
    question,
  } = useContext(ContextApplication);
  const [isError, setIsError] = useState(false);
  const [id, setId] = useState();
  const indexComponent = selectedCheckbox?.indexOf(question);
  const backComponent =
    indexComponent > 0 ? selectedCheckbox[indexComponent - 1] : 2;
  const label = questions[question];

  useEffect(() => {
    const initialValue = localStorage.getItem("comment") || "{}";
    const applicationStorage = localStorage.getItem("application") || "{}";
    const applicationIdStorage = JSON.parse(applicationStorage).id;
    setId(applicationIdStorage);
    if (initialValue !== "" && initialValue !== null) {
      JSON.parse(initialValue).id === applicationIdStorage
        ? setCommentForm(JSON.parse(initialValue).value)
        : setCommentForm({});
    }
  }, [setCommentForm]);

  const onComment = (value: any) => {
    setCommentForm({ ...commentForm, [question]: value });
    localStorage.setItem(
      "comment",
      JSON.stringify({ id, value: { ...commentForm, [question]: value } }),
    );
    commentForm[question] !== "" && commentForm[question] !== undefined
      ? setIsError(false)
      : setIsError(true);
  };

  return (
    <section>
      <BackLink content="Back" onClick={() => setQuestion(backComponent)} />
      <TextArea
        hint={`${selectedCheckbox?.indexOf(question) + 1} of ${selectedCheckbox?.length}`}
        label={label}
        onChange={(value: any) => onComment(value)}
        value={commentForm[question] || ""}
        id={question}
      />

      {isError && <Validation message="Please leave a comment" />}
      <Button
        content="Next"
        onClick={() => {
          commentForm[question] !== undefined && commentForm[question] !== ""
            ? onChangeQuestion()
            : setIsError(true);
        }}
      />
    </section>
  );
}

export default CommentQuestion;
