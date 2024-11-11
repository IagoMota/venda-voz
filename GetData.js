class GetData {
    constructor(Auth) {
        this.auth = Auth;
    }
    artistData = null;

    async getArtist() {

        const url = "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb"
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.auth.token}`
            }
        });
        this.artistData = await response.json();
    }

    async query(normalString) {
        const encoded = encodeURIComponent(normalString);
        const finalString = `https://api.spotify.com/v1/search?q=${encoded}&type=album%2Cartist%2Ctrack&market=BR&limit=10&include_external=audio`;
        const payload = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.auth.token}`
            }
        }
        return fetch(finalString, payload).then(response => response.json());
    }

    inputHandler = async (inputEvent) => {
        const key = inputEvent.key;
        const string = inputEvent.target.value;
        if (key !== "Enter") {
            return;
        }
        if (!string) {
            return;
        }
        inputEvent.target.setAttribute('disabled', 'true')
        const list = document.querySelector("#list");
        list.innerHTML = '';
        const { albums, artists, tracks } = await this.query(string);
        albums.items.forEach(({ name, href, images, ...rest }) => {
            const container = this.create({ tag: 'div', cla: 'album-container', par: list });
            this.create({ tag: 'span', cla: 'album-name', txt: name, par: container });
            this.create({ tag: 'img', cla: 'album-picture', src: images[0].url, par: container });
        });
        tracks.items.forEach(({ name, href, images, ...rest }) => {
            const container = this.create({ tag: 'div', cla: 'album-container', par: list });
            this.create({ tag: 'span', cla: 'album-name', txt: name, par: container });
            this.create({ tag: 'img', cla: 'album-picture', par: container });
        });
        inputEvent.target.removeAttribute('disabled')
    }

    create({ tag = 'div', cla = [], txt = '', src = '', par } = {}) {
        const el = document.createElement(tag);
        if (Array.isArray(cla)) {
            cla.forEach(className => el.classList.add(className));
        } else if (typeof cla === 'string') {
            el.classList.add(cla);
        }

        txt ? el.textContent = txt : null;
        src ? el.src = src : null;

        if (par) {
            if (typeof par === 'string') {
                document.querySelector(par)?.appendChild(el);
            } else if (par instanceof HTMLElement) {
                par.appendChild(el);
            }
        }

        return el; // Return the element in case you need to reference it
    }

}

export default GetData;