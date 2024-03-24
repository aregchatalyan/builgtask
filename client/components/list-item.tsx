import { FC } from 'react';
import Image from 'next/image';

interface Item {
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
}

interface ItemProps {
  data: Item
  onClick: () => void;
}

export const ListItem: FC<ItemProps> = ({ data, onClick }) => {
  return (
    <li
      className="flex min-h-[70px] mr-2.5 cursor-pointer items-center justify-between rounded-md border-2 border-transparent bg-white pl-2 pr-[21px] hover:border-color-5"
      onClick={ onClick }
    >
      <div className="flex items-center gap-4.5">
        <Image src={ data.avatar ? data.avatar : '/avatar.svg' } alt="avatar" width={ 50 } height={ 50 }/>

        <div>
          <p className="text-base font-semibold text-color-6">
            { `${ data.firstname } ${ data.lastname }` }
          </p>

          <p className="text-xs font-medium text-color-4">
            { `${ data.email }` }
          </p>
        </div>
      </div>

      <div className="flex h-6 w-6 items-center justify-center">
        <Image src="/arrow.svg" alt="arrow" width={ 10 } height={ 18 }/>
      </div>
    </li>
  );
}
