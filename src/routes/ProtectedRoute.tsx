import { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { selectIsLogged, useUserStore } from "../contexts/AuthContext";

/**
 tenta buscar o usuário e bloqueia rotas privadas se não estiver logado.
 */
function ProtectedRoute() {
  const location = useLocation();
  const hasTriedFetch = useRef(false);

  const userIsLoading = useUserStore((s) => s.userIsLoading);
  const isFetchDataUser = useUserStore((s) => s.isFetchDataUser);
  const isLogged = useUserStore(selectIsLogged);
  const fetchUser = useUserStore((s) => s.fetchUser);

  useEffect(() => {
    if (hasTriedFetch.current || isLogged) return;

    hasTriedFetch.current = true;
    fetchUser().catch(() => {});
  }, [isLogged, fetchUser]);

  if (userIsLoading || isFetchDataUser) {
    return null;
  }

  if (!isLogged) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ redirect: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
