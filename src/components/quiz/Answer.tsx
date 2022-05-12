import React from 'react';
import { IAnswer } from './types';

interface Input {
  question: any;
  onSelect: any;
}

export function Answer(props: IAnswer & Input) {
  return (
    <li className="answer">
      <label>
        <input
          className="mr-3"
          type="radio"
          id={props.label}
          name={props.question}
          value={props.label}
          onChange={props.onSelect}
        />
        {props.label}
      </label>
    </li>
  );
}
