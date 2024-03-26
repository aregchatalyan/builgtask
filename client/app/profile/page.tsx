import { me } from '@/lib/user/me';
import { ProfileEdit } from '@/components/profile';

const Profile = async () => {
  const user = await me();

  return <ProfileEdit data={ user }/>;
}

export default Profile;
