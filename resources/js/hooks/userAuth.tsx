import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  role: string;
}

const userAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<User>("/api/user", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user data", error))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
};

export default userAuth;
