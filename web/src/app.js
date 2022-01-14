import "./app.css";
import keycloak from "./keycloak";
import { useState, useEffect } from "react";
import Loading from "./loading";
import loadFriends from "./load-friends";

function App() {
  const [user, setUser] = useState();
  const [friends, setFiends] = useState([]);
  useEffect(() => {
    const auth = async () => {
      console.log("[app.js] loading user....");
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
        window.alert(error.message);
      }
    };
    auth();
  }, []);

  useEffect(() => {
    const load = async () => {
      console.log("[app.js] loading friends....");
      try {
        const friends = await loadFriends(user.token);

        setFiends(friends);
      } catch (error) {
        window.alert(error.message);
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
        <span> Bem vindo, {user.userInfo.preferred_username}</span>
        {friends && (
          <>
            <span>Olhe os seus amigos</span>

            <ul>
              {friends.map((friend, index) => (
                <li key={`${index}-friend`}>
                  {friend.name} {friend.family_name}{" "}
                </li>
              ))}
            </ul>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
