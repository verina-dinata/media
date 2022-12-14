import { useFetchAlbumsQuery } from "../store";
import Skeleton from './Skeleton'
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user); // when this is called, it will fetch data

  return(
    <div>
      Album for {user.name}
    </div>
  );
};

export default AlbumsList;
