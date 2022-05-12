const QuizMessage = (props: { className: string; head: string; children: string }) => {
  return (
    <blockquote className={`admonition ${props.className}`}>
      <strong className="heading">{props.head}</strong>
      <p>{props.children}</p>
    </blockquote>
  );
};

const Failure = () => (
  <QuizMessage className="warn" head="Whoops">
    Check and retry!
  </QuizMessage>
);

const Success = () => (
  <QuizMessage className="remember" head="Hooray">
    You made it!!
  </QuizMessage>
);

export const Messages = {
  Failure,
  Success,
};
