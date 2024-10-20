
import AuthScreen from "@/features/auth/components/auth-screen";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./features/auth/components/protectedRoute";
// import HomePage from "./pages/HomePage";
import { Authenticated, Unauthenticated } from "convex/react";
import { Toaster } from "./components/ui/sonner";
import { HomePage, WorkspaceIdPage } from "./pages";


function App() {

  return (

    // <BrowserRouter>

    //   <Unauthenticated>
    //     <AuthScreen />
    //   </Unauthenticated>
    //   <Authenticated>
    //     <HomePage />
    //   </Authenticated>


    //     <Routes>
    //       <Route path="/testing" element={<Authenticated>
    //         <Testing />
    //       </Authenticated>} />

    //     </Routes>

    
    // </BrowserRouter>

    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/auth" element={
          <>
            <Unauthenticated>
              <AuthScreen />
            </Unauthenticated>

            <Authenticated>
              <Navigate to="/" />
            </Authenticated>
          </>} />
        <Route path="/" element={<ProtectedRoute>
          <HomePage />
        </ProtectedRoute>} />

        <Route path="/workspace/:workspaceId" element={
          <ProtectedRoute>
            <WorkspaceIdPage />
          </ProtectedRoute>
        } />

        {/* <Route path="/testing" element={<ProtectedRoute>
          <Testing />
        </ProtectedRoute>} /> */}
      </Routes>
    
    
    
    </BrowserRouter>
   


  )

}
export default App
