class SdkConnection {
    constructor(Auth) {
        this.auth = Auth;
    }
    player = null;
    setErrorHandling() {
        this.player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });
        // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        this.player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });

        this.player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });

        this.player.addListener('account_error', ({ message }) => {
            console.error(message);
        });
    }
    readinessListener() {
        window.onSpotifyWebPlaybackSDKReady = async () => {
            const token = "BQBvgLZFmUwSBEDqKnAyDsd-zTa0i_ZHrZys2GMBIXxNyR6jv17zmlQppsXt7cFrsmekMYmyHJS2wmwixmmQwaa-lBxXvZtKLqfZK2dnX-Wb5nTHZiNRxCYr_pz-IO0-352Wxl-07o8ezvLVit9gFBIUtL2FeE-GkjU_bf_prnPMdJoplFq4_Rb_rXfiZ2NB0NvNG2ErqOeK7_Kw3QxqbEiJwUXsD1yFt345"
            this.player = new Spotify.Player({
                name: 'Computador',
                getOAuthToken: cb => { cb(token); },
                volume: 1
            });
            this.setErrorHandling();
            this.player.connect();
        }
    }
    connectScript() {
        const script = document.createElement('script');
        script.type = "module";
        script.src = "https://sdk.scdn.co/spotify-player.js"
        document.body.appendChild(script)
    }
    init() {
        this.connectScript();
        this.readinessListener();
    }
}

export default SdkConnection;