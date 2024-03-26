import { FC } from 'react';
import Image from 'next/image';
import { Rate } from '@/components/rate';
import { ReviewData } from '@/components/review';
import { relativeTime } from '@/utils/relative-time';

interface ReviewItemProps {
  data: ReviewData
}

export const ReviewItem: FC<ReviewItemProps> = ({ data }) => {
  return (
    <li className="cursor-pointer">
      <div className="mb-[15px] flex justify-between">
        <div className="flex items-center">
          <Image src={ data.author_image || '/avatar.svg' } alt="avatar" width={ 40 } height={ 40 }/>

          <div className="pl-3.5 text-sm font-semibold text-color-6">
            <p>{ data.author_title }</p>

            <div className="flex">
              <Image className="mr-1.5" src="/google.svg" alt="avatar" width={ 16 } height={ 16 }/>
              <Rate rate={ data.review_rating }/>
            </div>
          </div>
        </div>

        <span className="text-xs font-medium text-color-4">
          { relativeTime(data.review_timestamp) }
        </span>
      </div>

      <p className="text-sm text-color-4">
        { data.review_text }
      </p>
    </li>
  );
}
