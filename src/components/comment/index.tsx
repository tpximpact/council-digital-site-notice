import { useEffect, useState } from "react";
import TextArea from "@/components/text-area";
import Validation from "@/components/validation";
import { Button, BackLink } from "@/components/button";
import { questions } from "@/app/lib/application";
import { getLocalStorage } from "@/app/lib/application";
import { CommentForm } from "@/app/lib/type";

function CommentQuestion({
  onChangeQuestion,
  setQuestion,
  question,
}: {
  onChangeQuestion: () => void;
  setQuestion: (value: number) => void;
  question: number;
}) {
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([]);
  const [commentForm, setCommentForm] = useState<CommentForm>({});
  const [isError, setIsError] = useState(false);
  const [id, setId] = useState();
  const indexComponent = selectedCheckbox?.indexOf(question);
  const backComponent =
    indexComponent > 0 ? selectedCheckbox[indexComponent - 1] : 2;
  const label = questions[question];

  useEffect(() => {
    const commentStorage = getLocalStorage({
      key: "comment",
      defaultValue: {},
    });
    const selectedCheckboxStorage = getLocalStorage({
      key: "topics",
      defaultValue: {},
    });
    const applicationStorage = getLocalStorage({
      key: "application",
      defaultValue: {},
    });
    setId(applicationStorage?._id);
    commentStorage?.id == applicationStorage?._id &&
      setCommentForm(commentStorage?.value);
    selectedCheckboxStorage?.id == applicationStorage?._id &&
      setSelectedCheckbox(selectedCheckboxStorage?.value);
  }, []);

  const onComment = (value: string) => {
    setCommentForm((prev) => ({ ...prev, [question]: value }));
    localStorage.setItem(
      "comment",
      JSON.stringify({ id, value: { ...commentForm, [question]: value } }),
    );
    if (value.trim() !== "") {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  function onNextPage() {
    if (commentForm[question] !== undefined && commentForm[question] !== "") {
      setIsError(false);
      onChangeQuestion();
    } else {
      setIsError(true);
    }
  }

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
      <Button content="Next" onClick={() => onNextPage()} />
    </section>
  );
}

export default CommentQuestion;
