import ApiData from "./src/spotify/ApiData.js";
import Ui from "./src/spotify/Ui.js";
import SdkConnection from "./src/spotify/SdkConnection.js";

const apiData = new ApiData();
const sdkConnection = new SdkConnection();
const ui = new Ui(apiData,sdkConnection);

apiData.init()
ui.init()
await sdkConnection.init();