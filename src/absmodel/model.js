export default class Model {
    constructor(seed) {
        this._seed = seed;
        this._running = True;
        this._schedule = null;
    }

    run() {
        while (this._running) {
            this._step()
        }
    }

    step() {

    }
};