class ApiData {
    clientId = '10df49166beb41dda09fbd342a9b0e84';
    clientSecret = '7c73c2adf2b14d7da406308cedbfad03';
    token = null;
    tokenType = null;
    tokenExpire = null;
    list = document.querySelector("#list");

    async setToken() {
        const url = 'https://accounts.spotify.com/api/token';
        const payload = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`,
        };
        const response = await fetch(url, payload).then(response => response.json());

        this.token = response.access_token;
        this.tokenType = response.token_type;
        this.tokenExpire = response.expires_in;
    }
    async query(normalString) {
        const encoded = encodeURIComponent(normalString);
        const finalString = `https://api.spotify.com/v1/search?q=${encoded}&type=track&market=BR&limit=20&include_external=audio`;
        const payload = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }
        return fetch(finalString, payload).then(response => response.json());
    }
    
    async init() {
        await this.setToken();
    }
}

export default ApiData;