import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users")
      .then(res => setUsers(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>All Users</h2>

      {users.map(user => (
        <div key={user._id}>
          <p>
            {user.name} - {user.email} - {user.role}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;