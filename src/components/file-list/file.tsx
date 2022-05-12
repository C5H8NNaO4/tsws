import clsx from 'clsx';

export type FileTabProps = {
  active?: boolean;
  fileName?: string;
  label?: string;
  onClick?: any;
};

export const File = (props: FileTabProps) => {
  return (
    <li
      onClick={props.onClick}
      className={clsx({
        'm-0 p-0': true,
        'items-center font-sans leading-snug': true,
        'border-solid border-blue-800': true,
        'bg-gray-100 bg-opacity-30 hover:bg-opacity-100': true,
        'bg-opacity-80': !!props.active,
        'border-b-2 border-opacity-100': !!props.active,
      })}
    >
      <button
        type="button"
        className="mb-0.5 cursor-pointer py-2 px-3 focus:outline-none"
      >
        {props.label ?? props.fileName}
      </button>
    </li>
  );
};
