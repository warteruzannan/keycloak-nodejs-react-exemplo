const loadFiends = async (userToken = "") => {
  return fetch(`${process.env.REACT_APP_URL_API}/friends`, {
    headers: {
      authorization: `Bearer ${userToken}`,
    },
  }).then((result) => result.json());
};

export default loadFiends;
