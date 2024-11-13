class SdkConnection {
    player = null;
    device_id = null;
    token = null;
    setErrorHandling() {
        this.player.addListener('ready', ({ device_id }) => {
            this.device_id = device_id;
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
            this.token = await fetch('/SdkToken').then(res => res.json());
            this.player = new Spotify.Player({
                name: 'Computador',
                getOAuthToken: cb => { cb(this.token); },
                volume: 1
            });
            this.setErrorHandling();
            await this.player.connect();
            document.body.dispatchEvent(new Event('yeah'));
        }
    }
    playSong(trackUri) {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({ uris: [trackUri] })
        }).then(response => {
            if (response.ok) {
                console.log('Track is playing!');
            } else {
                console.error('Failed to play the track:', response);
            }
        });
    }
    async init() {
        this.connectScript();
        this.readinessListener();
    }
}

export default SdkConnection;