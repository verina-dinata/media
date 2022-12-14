import { useFetchAlbumsQuery } from "../store";
import Skeleton from './Skeleton'
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user); // when this is called, it will fetch data

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />
  } else if (error) {
    content = <div>Error loading albums.</div>
  } else {
    content = data.map(album => {
      const header = <div>{album.title}</div>
      return <ExpandablePanel key={album.id} header={header}>
        List of photos in album
      </ExpandablePanel>
    });
  }

  return(
    <div>
      <div>Album for {user.name}</div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
