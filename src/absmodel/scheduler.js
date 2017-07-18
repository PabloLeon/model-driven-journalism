export class SimpleScheduler {
    // update each agent one step at a time in order they were added
    // This seems to be like in MASON
    constructor(seed) {
    }
};
export class RandomScheduler {
    // update each agent one step at a time in random order
    // this is like in NetLogo
    constructor(seed) {
    }
};


export class SimultaneousScheduler {
    // update each agent simultaneously, but do not updated yet
    // requires agents to have advance function
    constructor(seed) {
    }
};


export class StagedActivation {
    // agents activations are divided into stages, all agents execute each of these
    // before executing the next
    constructor(seed) {
    }
};