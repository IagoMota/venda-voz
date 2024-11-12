import Auth from "./src/spotify/ApiAuth.js";
import GetData from "./src/spotify/GetData.js";
import PlayerUi from "./src/spotify/PlayerUi.js";
import SearchUi from "./src/spotify/SearchUi.js";
import SdkConnection from "./src/spotify/SdkConnection.js";


const sdkConnection = new SdkConnection();
const playerUi = new PlayerUi(sdkConnection);

playerUi.init()
await sdkConnection.init();
