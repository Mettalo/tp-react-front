const config = "prod"; //local, prod

let API_ROOT = "";

switch (config) {
  case "local":
    API_ROOT = "http://localhost:3000";
    break;
  case "prod":
    API_ROOT = "https://tp-react-back.herokuapp.com";
}

export default API_ROOT;
