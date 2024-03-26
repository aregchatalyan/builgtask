import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
import { ReviewItem } from '@/components/review-item';

export interface ReviewData {
  author_id: string,
  author_title: string,
  author_image: string,
  review_text: null | string;
  review_rating: number;
  review_timestamp: number;
}

interface ReviewProps {
  name: string;
  full_address: string;
  reviews: ReviewData[];
  setShowInfo: Dispatch<SetStateAction<boolean>>;
}

export const Review: FC<ReviewProps> = ({ name, full_address, reviews, setShowInfo }) => {
  return (
    <div className="w-1/2 rounded-tl-lg bg-white">
      <div className="flex flex-col gap-[26px] p-6 pr-16 sm:pr-[48px]">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold leading-[27px] text-color-6">
              { name }
            </p>

            <div className="flex items-center">
              <Image src="/geo.svg" alt="geo" width={ 16 } height={ 16 }/>

              <span className="ml-0.5 text-sm font-medium sm:w-[210px] md:truncate">
                { full_address }
              </span>
            </div>
          </div>

          <Image className="cursor-pointer mr-3" src="/close.svg" alt="close" width={ 18 } height={ 18 }
                 onClick={ () => setShowInfo(false) }/>
        </div>
        <hr/>
      </div>

      <ul
        className="mr-5 flex max-h-[calc(100vh-280px)] flex-col gap-8 overflow-y-auto pl-6 pr-10 sm:mr-[10px] sm:pr-[34px]">
        { reviews.map((data) => (
          <ReviewItem key={ data.author_id } data={ data }/>
        )) }
      </ul>
    </div>
  );
}
