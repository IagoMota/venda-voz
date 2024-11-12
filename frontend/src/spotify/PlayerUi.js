class PlayerUi {

    constructor(SdkConnection) {
        this.sdkConnection = SdkConnection;
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
        })
    }
    setNextButton = () => {
        this.get("#next").addEventListener('click', async () => {
            this.player.nextTrack().then(() => { })
        })
    }

    setUp() {
        document.body.addEventListener("yeah", () => {            
            this.player = this.sdkConnection.player
            this.setBackButton();
            this.setToggleButton();
            this.setNextButton();
        })
    }

    init() {
        this.setUp();
    }
}

export default PlayerUi;