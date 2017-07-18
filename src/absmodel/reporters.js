// interface that collects modle data at different levels

// needs to contain the model_variable id or agent id and a function that
// specifies which variable to collect

export default class Reporter {
    constructor() {
        this.model_reporters = {};
        this.agent_reporters = {};
    }

    collectReports() {

    }

    getReports() {

    }
};