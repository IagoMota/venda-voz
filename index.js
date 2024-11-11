import Auth from "./src/spotify/Auth.js";
import GetData from "./src/spotify/GetData.js";
import Ui from "./src/spotify/PlayerUi.js";
import SearchUi from "./src/spotify/SearchUi.js";
import SdkConnection from "./src/spotify/SdkConnection.js";



const auth = new Auth();
const sdkConnection = new SdkConnection(auth);
const getData = new GetData(auth);
const ui = new Ui(auth, getData);
const search = new SearchUi();


await auth.setToken();
sdkConnection.init()