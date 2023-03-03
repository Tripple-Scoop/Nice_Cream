
//import API_URL
import { API_URL } from "./url";

export const register = async (username, password) => {
  const response = await fetch(`${APIURL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
  });
  const json = await response.json();
  if (json.success === false) {
    throw json.error.message;
  }
  return json.data.token;
};


const login = ({ setToken }) => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${APIURL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username,
            password,
          },
        }),
      });
      const json = await response.json();
      if (json.success === false) {
        throw json.error.message;
      }

      alert("Login successful");
      setToken(json.data.token);
      history.push("/Posts");
    } catch (e) {
      console.error(e);
      setError(e);
    }

    setUsername("");
    setPassword("");
  }};