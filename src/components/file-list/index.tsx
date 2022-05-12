import { Plus } from 'components/icon/plus';

export const FileList = (props: any = { editable: false }) => {
  return (
    <nav className={`${props.className ?? ''} border-b-2 border-slate-200`}>
      <ul ref={props.ref} className="m-0 flex list-none bg-white">
        {props.children}

        {props.editable && (
          <li className="m-0 inline-flex items-center border-b-2 border-transparent">
            <button className="focus:outline-none">
              <Plus />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
