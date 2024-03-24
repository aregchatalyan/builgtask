import { FC } from 'react';
import Image from 'next/image';
import { Rate } from '@/components/rate';

interface ReviewItem {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  service: string;
  rate: number;
  comment: string;
  createdAt: string;
}

interface ReviewItemProps {
  data: ReviewItem
}

export const ReviewItem: FC<ReviewItemProps> = ({ data }) => {
  return (
    <li key={ data.id } className="cursor-pointer">
      <div className="mb-[15px] flex justify-between">
        <div className="flex items-center">
          <Image src={ data.avatar } alt="avatar" width={ 40 } height={ 40 }/>

          <div className="pl-3.5 text-sm font-semibold text-color-6">
            <p>{ `${ data.name } ${ data.surname }` }</p>

            <div className="flex">
              <Image className="mr-1.5" src={ data.service } alt="avatar" width={ 16 } height={ 16 }/>
              <Rate rate={ data.rate }/>
            </div>
          </div>
        </div>

        <span className="text-xs font-medium text-color-4">
          { data.createdAt }
        </span>
      </div>

      <p className="text-sm text-color-4">
        { data.comment }
      </p>
    </li>
  );
}
