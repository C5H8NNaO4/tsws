import clsx from 'clsx';
import type { IAnswer, IQuestion } from 'components/quiz/types';
import React from 'react';
import { Answer } from './Answer';

interface Input {
  onSelect: (a: IAnswer) => void;
}

export function Question(props: IQuestion & Input) {
  const { answers } = props;

  const [order, setOrder] = React.useState(answers.map((_, i) => i));

  React.useEffect(() => {
    const sortOrder = answers.map((o, i) => i).shuffle();
    setOrder(sortOrder);
  }, [answers]);

  return (
    <>
      <strong className={clsx({ error: props.markError })}>{props.label}</strong>
      <ol className="mb-8 block">
        {order
          .map((i) => answers[i])
          .map((answer) => (
            <Answer
              key={answer.label}
              {...answer}
              question={props.label}
              onSelect={() => props.onSelect(answer)}
            />
          ))}
      </ol>
    </>
  );
}
