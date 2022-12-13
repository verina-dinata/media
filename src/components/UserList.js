import { useEffect  } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store";

function UserList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return(
    <div>
      UserList
    </div>
  );
};

export default UserList;
