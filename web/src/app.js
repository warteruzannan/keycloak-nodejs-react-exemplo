import "./app.css";
import keycloak from "./keycloak";
import { useState, useEffect } from "react";
import Loading from "./loading";
import loadFriends from "./load-friends";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const auth = async () => {
      try {
        const isAutenticated = await keycloak.init({
          onLoad: "login-required",
        });

        await keycloak.loadUserInfo();
        setUser({
          isAutenticated,
          token: keycloak.token,
          idToken: keycloak.idToken,
          userInfo: keycloak.userInfo,
        });
      } catch (error) {
        console.log(error);
      }
    };
    auth();
  }, []);

  useEffect(() => {
    const load = async () => {
      console.log("Carregando user");
      try {
        const friends = await loadFriends(user.token);
        console.log(friends);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      load();
    }
  }, [user]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="App">
      <header className="App-header">
        Bem vindo, {user.userInfo.preferred_username}
      </header>
    </div>
  );
}

export default App;
