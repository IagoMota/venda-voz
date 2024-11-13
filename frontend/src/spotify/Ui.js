class Ui {
    constructor(ApiData, SdkConnection) {
        this.sdkConnection = SdkConnection;
        this.apiData = ApiData;
    }
    list = this.get("#list")
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
    get(selector) {
        return document.querySelector(selector);
    }
    setBackButton = () => {
        this.get("#back").addEventListener('click', async () => {
            this.player.previousTrack().then(() => { })
        })

    }
    setToggleButton = () => {
        this.get("#toggle").addEventListener('click', async () => {
            this.player.togglePlay().then(() => { })
            this.player.getCurrentState().then(state=>console.log(state));
        })
    }
    setNextButton = () => {
        this.get("#next").addEventListener('click', async () => {
            this.player.nextTrack().then(() => { })
        })
    }
    setSearch() {
        const input = this.get("#searchInput");
        input.addEventListener('keydown', (e) => {
            const key = e.key;
            if (key !== "Enter") {
                return;
            }
            this.list.innerHTML = '';
            this.inputHandler(input.value, input)
        })
        this.get("#searchButton").addEventListener('click', (e) => {
            this.list.innerHTML = '';
            this.inputHandler(input.value, input)
        })
    }
    listTracks(tracks) {
        this.list.style.display = "flex";
        tracks.items.forEach((item) => {
            const { name, href, images, album, uri, ...rest } = item;
            const container = this.create({ tag: 'div', cla: 'listItem', par: this.list });
            this.create({ tag: 'img', cla: 'album-picture', par: container, src: album.images[0].url });
            this.create({ tag: 'h4', cla: 'trackName', txt: name, par: container });

            container.addEventListener('click', () => {
                console.log(uri)
                this.sdkConnection.playSong(uri)
            })
        });
    }
    inputHandler = async (string, input) => {
        if (!string) {
            return;
        }
        input.setAttribute('disabled', 'true')
        const { tracks } = await this.apiData.query(string);
        this.listTracks(tracks);
        input.removeAttribute('disabled')
    }
    init() {
        document.body.addEventListener("yeah", () => {
            this.player = this.sdkConnection.player
            this.setBackButton();
            this.setToggleButton();
            this.setNextButton();
            this.setSearch();
        })
    }
}

export default Ui;