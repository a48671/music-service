import React, { useRef } from 'react';

interface IProps {
  accept: string;
  setFile: Function;
  children: React.ReactNode;
}

export const FileLoader: React.FC<IProps> = ({ setFile, accept, children }: IProps): JSX.Element => {
  const ref = useRef<HTMLInputElement>();

  const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files[0]);
  }

  return (
    <div onClick={() => ref.current?.click()}>
      <input onChange={onChange} hidden ref={ref} type="file" accept={accept} />
      {children}
    </div>
  );
};
