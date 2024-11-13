class Ui {
    constructor(ApiData, SdkConnection, Timer, TTS) {
        this.sdkConnection = SdkConnection;
        this.apiData = ApiData;
        this.timer = Timer;
        this.tts = TTS;
    }
    list = this.get("#list")
    chosenURI = null;
    chosenTTS = null;
    thingToPlay = null;
    counter = 1;
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
            this.player.getCurrentState().then(state => console.log(state));
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
    setScheduling = () => {
        const scheduleButton = this.get('#scheduleButton');
        scheduleButton.addEventListener('click', () => {
            const then = this.timer.formatTime(this.get('#time').value);
            if (this.thingToPlay === "song") {
                this.timer.addToSchedule({ then, uri: this.chosenURI, func: this.sdkConnection.playSong })
                return;
            }
            if (this.thingToPlay === "tts") {
                const inputText = this.get("#announcementInput").value;
                this.timer.addToSchedule({ then, tts: inputText, func: this.readText })
                return;
            }
         
        })
    }
    readText = (text) => {
        console.log(text)
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';  // Set language to Brazilian Portuguese
        window.speechSynthesis.speak(utterance);
    }
    listTracks(tracks) {
        this.list.style.display = "flex";
        tracks.items.forEach((item) => {
            const { name, href, images, album, uri, ...rest } = item;
            const container = this.create({ tag: 'div', cla: 'listItem', par: this.list });
            this.create({ tag: 'img', cla: 'album-picture', par: container, src: album.images[0].url });
            this.create({ tag: 'h4', cla: 'trackName', txt: name, par: container });

            container.addEventListener('click', () => {
                this.chosenURI = uri;
                this.list.innerHTML = "";
                this.list.style.display = 'none';
                // this.sdkConnection.playSong(uri)
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
    setTypeChoice() {
        const container = this.get("#song-tts");
        this.get("#song").addEventListener("click", () => {
            container.style.display = "none";
            this.get("#searchBarContainer").style.display = "flex";
            this.thingToPlay = "song";
        })
        this.get("#announcement").addEventListener("click", () => {
            container.style.display = "none";
            this.get("#announcementContainer").style.display = "flex";
            this.thingToPlay = "tts";
        })
    }
    init() {
        document.body.addEventListener("yeah", () => {
            this.player = this.sdkConnection.player
            this.setBackButton();
            this.setToggleButton();
            this.setNextButton();
            this.setSearch();
            this.setTypeChoice()
            this.setScheduling();
        })
    }
}

export default Ui;
