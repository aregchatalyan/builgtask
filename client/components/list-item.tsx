import { FC, MouseEventHandler } from 'react';
import Image from 'next/image';
import { User } from '@/components/profile';

interface ItemProps {
  data: User;
  onClick: MouseEventHandler<HTMLLIElement>;
}

export const ListItem: FC<ItemProps> = ({ data, onClick }) => {
  const name = !data.firstname || !data.lastname
    ? 'Need to update'
    : data.firstname + ' ' + data.lastname

  return (
    <li
      id={ String(data.id) }
      className={ `${ !data.company ? 'cursor-not-allowed' : '' } flex min-h-[70px] mr-2.5 cursor-pointer items-center justify-between rounded-md border-2 border-transparent bg-white pl-2 pr-[21px] hover:border-color-5` }
      onClick={ data.company ? onClick : undefined }
    >
      <div className="flex items-center gap-4.5">
        <Image src={ '/avatar.svg' } alt="avatar" width={ 50 } height={ 50 }/>

        <div>
          <p className="text-base font-semibold text-color-6">
            { name }
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
