import { List } from '@/components/list';
import { getUsers } from '@/lib/user/getUsers';

const Page = async () => {
  const users = await getUsers();

  return <List data={ users }/>;
}

export default Page;
