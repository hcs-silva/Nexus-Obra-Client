import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const MasterDashboard = () => {
  const nav = useNavigate();
  const { user } = useAuth();

  function toClientList() {
    nav("/allclients");
  }

  function toObraList() {
    if (!user?.clientId) {
      nav("/masterdash");
      return;
    }

    nav(`/${user.clientId}/allobras`);
  }

  return (
    <div>
      <h1>Master Dashboard</h1>
      <button onClick={() => nav("/addclient")}>Add Client</button>
      <button onClick={toClientList}>Client List</button>
      <button onClick={toObraList}>Obras List</button>
    </div>
  );
};
export default MasterDashboard;
