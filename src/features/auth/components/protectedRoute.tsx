// import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';
import { Navigate } from 'react-router-dom'; 
import { ReactNode } from 'react';
import { Unauthenticated } from 'convex/react';

interface ProtectedRouteProps {
    children: ReactNode;
    
    

  }
  
  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
         const Navig = () => {
        return <Navigate to="/auth" />
     }
     
    return (
      
      <>
        <Unauthenticated>
          {Navig()}
        </Unauthenticated>

      

        { children}
      </>
    )

    
    // if (!isAuthenticated) {
    //     return <Navigate to="/auth" />;
    // }

    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }
   
  
    // return <>{children}</>;
  };
  
  export default ProtectedRoute;
