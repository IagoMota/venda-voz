class SdkConnection {
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
    connectScript() {
        const script = document.createElement('script');
        script.type = "module";
        script.src = "https://sdk.scdn.co/spotify-player.js"
        document.body.appendChild(script)
    }
    readinessListener() {
        window.onSpotifyWebPlaybackSDKReady = async () => {
            const token = await fetch('/SdkToken').then(res => res.json());
            this.player = new Spotify.Player({
                name: 'Computador',
                getOAuthToken: cb => { cb(token); },
                volume: 1
            });
            this.setErrorHandling();
            this.player.connect();
            document.body.dispatchEvent(new Event('yeah'));
        }
    }

    async init() {
        this.connectScript();
        this.readinessListener();
    }
}

export default SdkConnection;