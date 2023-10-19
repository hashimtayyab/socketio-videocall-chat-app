const { useNavigate, Navigate } = require("react-router-dom");

const Logout = () => {
    localStorage.removeItem('token');
    // navigate('/');
    return <Navigate to="/" replace />;
}
export {Logout};