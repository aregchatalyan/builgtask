import { FC } from 'react';
import Image from 'next/image';

interface RateProps {
  rate: number;
}

export const Rate: FC<RateProps> = ({ rate }) => {
  const count = Array(5).fill('');

  return (
    <div className="flex gap-1.5">
      { count.map((_, i) => {
        return i < rate ? (
          <Image key={ `stared ${ i }` } src="/stared.svg" alt="avatar" width={ 18 } height={ 18 }/>
        ) : (
          <Image key={ `star ${ i }` } src="/star.svg" alt="avatar" width={ 18 } height={ 18 }/>
        );
      }) }
    </div>
  );
};
