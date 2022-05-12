export interface IAnswer {
  label: string;
  correct: boolean;
}

export interface IQuestion {
  label: string;
  answers: IAnswer[];

  answered: boolean;
  correct: boolean;
  markError: boolean;
}
