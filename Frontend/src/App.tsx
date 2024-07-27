import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { lazy, Suspense } from "react";

//Page Imports
import Home from "./pages/Home";
// import MarketPlace from "./pages/MarketPlace";
const MarketPlace = lazy(() => import("./pages/MarketPlace"));
const Profile = lazy(() => import("./pages/Profile"));
import { GameDetailsPage } from "./pages/Details";

// import Profile from "./pages/Profile";

//Context Providers

//Protected Logic
// import { ProtectedRoutes } from "./components/ProtectedRoutes";
import Loading from "./components/Loading";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getGames } from "./api/games/getGames";
import ForResale from "./components/PreownedGames/ForResale";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  useQuery({
    queryKey: ["game-query"],
    queryFn: getGames,
    staleTime: 100000,
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/market"
          element={
            <Suspense
              fallback={
                <Loading className="h-screen w-screen flex justify-center items-center" />
              }
            >
              {" "}
              <MarketPlace />
            </Suspense>
          }
        />

        <Route path="/resales" element={<ForResale />} />

        <Route path="/game/:id" element={<GameDetailsPage />} />

        <Route
          path="/profile"
          element={
            <Suspense
              fallback={
                <Loading className="h-screen w-screen flex justify-center items-center" />
              }
            >
              {/* <ProtectedRoutes> */}
                <Profile />
              {/* </ProtectedRoutes> */}
            </Suspense>
          }
        />
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        expand={true}
        position="bottom-right"
        theme="dark"
        richColors={true}
        visibleToasts={2}
        toastOptions={{
          classNames: {
            toast: "bg-gray-700/55",
            title: "text-white",
            description: "text-red-400",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
