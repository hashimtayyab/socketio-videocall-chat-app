import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import { StatusContext } from "../Context/statusContext";

const Protected = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {adminStatus, setAdminStatus} = useContext(StatusContext)

  useEffect(() => {
    // console.log("adminStatus", adminStatus);
      isLoggedIn = true;
      if (!adminStatus) {
        navigate('/');
          //  <Navigate to="/" replace />;
        }
  }, [adminStatus, setAdminStatus, currentUser, setCurrentUser]);

    return children;
  };

export default Protected;