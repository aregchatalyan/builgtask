import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
import { ReviewItem } from '@/components/review-item';

const reviews = (() => {
  const arr = [];

  for (let i = 1; i <= 5; i++) {
    arr.push({
      id: i,
      name: `Name-${ i }`,
      surname: `Surname-${ i }`,
      avatar: `/avatar.svg`,
      service: `/google.svg`,
      rate: i,
      comment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid at delectus dicta distinctio dolor dolore doloremque doloribus fugit ipsum iusto mollitia nesciunt possimus, provident quis, ratione similique voluptas voluptates.`,
      createdAt: `A week ago`
    });
  }

  return arr;
})();

interface ReviewProps {
  setShowInfo: Dispatch<SetStateAction<boolean>>;
}

export const Review: FC<ReviewProps> = ({ setShowInfo }) => {
  return (
    <div className="w-1/2 rounded-tl-lg bg-white">
      <div className="flex flex-col gap-[26px] p-6 pr-16 sm:pr-[48px]">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold leading-[27px] text-color-6">
              Company Name
            </p>

            <div className="flex items-center">
              <Image src="/geo.svg" alt="geo" width={ 16 } height={ 16 }/>

              <span className="ml-0.5 text-sm font-medium sm:w-[210px] md:truncate">
                9793 High Street, Pickerington, OH 43147
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
          <ReviewItem key={ data.id } data={ data }/>
        )) }
      </ul>
    </div>
  );
}
