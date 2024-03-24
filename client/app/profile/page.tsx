import { fetchMe } from '@/lib/user/me';
import { ProfileEdit } from '@/components/profile';

const Profile = async () => {
  const user = await fetchMe();

  return <ProfileEdit data={ user }/>;
}

export default Profile;
