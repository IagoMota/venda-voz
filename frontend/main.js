import ApiData from "./src/spotify/ApiData.js";
import Ui from "./src/spotify/Ui.js";
import SdkConnection from "./src/spotify/SdkConnection.js";
import Timer from "./src/spotify/Timer.js";


const apiData = new ApiData();
const sdkConnection = new SdkConnection();
const timer = new Timer();
const ui = new Ui(apiData, sdkConnection, timer);

apiData.init()
ui.init()
timer.init()
await sdkConnection.init();