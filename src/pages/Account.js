import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Account() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-4 text-light">
      <h2 className="mb-4">
        <br /><br />
        Welcome, {user?.email}
      </h2>

      <div className="row g-4">
        <h3>
          <br />
          Thank you so much for checking out and using this project!
          <br /><br />
          This app provides personalized movie browsing and recommendations.
          <br /><br />
          📧 sankarspillai77@gmail.com
          <br /><br />
          Built with love, code, and lots of coffee ☕💻
        </h3>
      </div>
    </div>
  );
}

export default Account;