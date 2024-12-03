// components/Layout.js
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

const Layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div>{children}</div>
    </ProtectedRoute>
  );
};

export default Layout;
