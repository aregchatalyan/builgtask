'use client';

import { FC, SetStateAction, useState } from 'react';
import { User } from '@/components/profile';
import { Review } from '@/components/review';
import { ListItem } from '@/components/list-item';

interface ListProps {
  data: User[]
}

export const List: FC<ListProps> = ({ data }) => {
  const [ showInfo, setShowInfo ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState<User>(data[0]);

  const onSelectItem = (e: { currentTarget: { id: SetStateAction<{}>; }; }) => {
    const user = data.find(user => user.id === +e.currentTarget.id) as User;
    setSelectedUser(user);
    setShowInfo(true);
  }

  return (
    <div className={ `my-5 w-full ${ showInfo ? 'flex' : '' }` }>
      <ul
        className={ `ml-16 sm:ml-12 ${ showInfo ? 'mr-2.5 w-1/2' : 'mr-[27px]' } flex max-h-[calc(100vh-136px)] flex-col gap-4 overflow-y-auto pr-[${ showInfo ? 10 : 33 }px]` }>
        { data.map((data) => (
          <ListItem key={ data.id } data={ data } onClick={ onSelectItem }/>
        )) }
      </ul>

      { showInfo && selectedUser.company && selectedUser.company.reviews &&
        <Review name={ selectedUser.company.name } full_address={ selectedUser.company.address }
                reviews={ selectedUser.company.reviews }
                setShowInfo={ setShowInfo }/>
      }
    </div>
  );
}
