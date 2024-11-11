import Auth from "./Auth.js";
import GetData from "./GetData.js";


const auth = new Auth();
const getData = new GetData(auth);


await auth.getToken();




const input = document.querySelector('input');
input.addEventListener("keydown", getData.inputHandler)