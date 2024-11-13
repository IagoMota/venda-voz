class Timer {

    now = new Date(new Date().getTime()).toTimeString().split(' ')[0]
    schedule = {

    }
    addToSchedule({ then, uri = null, tts = null, func }) {
        this.schedule[then] = {
            playing: false,
            played: false,
            tts,
            uri,
            func
        };
    }
    checkSchedule() {
        const appointment = this.schedule[this.now];

        if (!appointment) {
            return;
        }
        if (appointment.playing) {
            return;
        }
        if (appointment.played) {
            return;
        }
        if (appointment.uri) {
            appointment.func(appointment.uri);
            appointment.playing = true;
            return;
        }
        appointment.func(appointment.tts);
        appointment.playing = true;
    }
    formatTime(time) {
        return time + ':00'
    }
    startLooping = () => {
        setInterval(() => {
            const broken = new Date(new Date().getTime()).toTimeString().split(' ')[0].split(":")
            
            this.now = broken[0] + ":" + broken[1] + ":" + "00";
            
            this.checkSchedule();

        }, 1000);
    }
    init() {
        this.startLooping();
    }
}


export default Timer;