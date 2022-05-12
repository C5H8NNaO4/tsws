import { useWindowDimensions } from 'hooks/useWindowDimensions';
import { For } from 'lib/flow';
import React, { useMemo, useState } from 'react';
import Confetti from 'react-confetti';
import { Messages } from './Messages';
import { Question } from './Question';
import type { IAnswer, IQuestion } from './types';

let timeout;

const buildQuestion = (label: string): IQuestion => ({
  label,
  correct: false,
  markError: false,
  answered: false,
  answers: [],
});

const buildAnswer = (label: string): IAnswer => ({
  label: label.substring(2),
  correct: label.startsWith('+'),
});

export function Quiz({ children }: { children: string }) {
  const { height, width } = useWindowDimensions();
  const [didAnswer, setDidAnswer] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);

  const questions: IQuestion[] = useMemo(() => {
    let currentQuestion!: IQuestion;

    const questions: IQuestion[] = [];

    children
      .trim()
      .split(/\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((label: string) => {
        if (label.match(/^\d\./)) {
          currentQuestion = buildQuestion(label);

          questions.push(currentQuestion);
        } else {
          currentQuestion.answers.push(buildAnswer(label));
        }
      });

    questions.forEach((q) => q.answers);

    return questions;
  }, [children]);

  const resolve = () => {
    clearTimeout(timeout);
    setDidAnswer(true);

    const correctCount = questions.map((q) => q.correct).filter(Boolean).length;
    questions.forEach((q) => (q.markError = !q.correct));

    if (correctCount == questions.length) {
      setAllCorrect(true);
    } else {
      timeout = setTimeout(() => setDidAnswer(false), 2000);
    }
  };

  const setAnswer = (q: IQuestion, a: IAnswer) => {
    if (allCorrect) {
      return false;
    }

    q.correct = a.correct;
    q.answered = true;

    setDidAnswer(false);
  };

  // @ts-ignore
  return (
    <div id="quiz" className="bg-white pl-5">
      {allCorrect && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={1000}
          recycle={false}
          onConfettiComplete={(confetti) => confetti!.reset()}
        />
      )}

      <div className="prose-docs lg:prose-md prose max-w-[90%] pt-5">
        <For each={questions}>
          {(question) => (
            <Question
              key={question.label}
              {...question}
              onSelect={(answer) => setAnswer(question, answer)}
            />
          )}
        </For>

        {didAnswer && allCorrect && <Messages.Success />}
        {didAnswer && !allCorrect && <Messages.Failure />}
        {!didAnswer && (
          <button
            className="inline-flex rounded bg-unicorn-primary py-2 px-3 text-white hover:bg-unicorn-accent"
            onClick={resolve}
          >
            Check your answers!
          </button>
        )}
      </div>
    </div>
  );
}
