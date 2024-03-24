'use client';

import { useState } from 'react';
import { Review } from '@/components/review';
import { ListItem } from '@/components/list-item';

const data = (() => {
  const arr = [];

  for (let i = 1; i <= 12; i++) {
    arr.push({
      id: i,
      firstname: `firstname-${ i }`,
      lastname: `lastname-${ i }`,
      email: `email-${ i }`,
      avatar: `avatar.svg`
    });
  }

  return arr;
})();

export const List = () => {
  const [ showInfo, setShowInfo ] = useState(false);

  const onSelectItem = () => {
    setShowInfo(true);
  }

  return (
    <div className={ `my-5 w-full ${ showInfo ? 'flex' : '' }` }>
      <ul className={ `ml-16 sm:ml-12 ${ showInfo ? 'mr-2.5 w-1/2' : 'mr-[27px]' } flex max-h-[calc(100vh-136px)] flex-col gap-4 overflow-y-auto pr-[${ showInfo ? 10 : 33 }px]` }>
        { data.map((data) => (
          <ListItem key={ data.id } data={ data } onClick={ onSelectItem }/>
        )) }
      </ul>

      { showInfo && <Review setShowInfo={ setShowInfo }/> }
    </div>
  );
}
