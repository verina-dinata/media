import { useFetchAlbumsQuery } from "../store";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user); // when this is called, it will fetch data

  console.log(data, error, isLoading);

  return(
    <div>
      Album for {user.name}
    </div>
  );
};

export default AlbumsList;
