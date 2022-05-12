export * from './console';
export * from './js-code';

export interface ReplPlugin {
  name: string;
  reset: (any?) => void;
  setValue: (any?) => void;
  render: () => JSX.Element;
  onInit?: (any?) => void;

  [key: string]: any;
}

export type ReplPluginsType = {
  [key: string]: ReplPlugin;
};
