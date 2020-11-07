import { reactive, readonly } from "vue"
import { Post } from "./types";

interface PostState {
    ids: string[],
    all: Record<string, Post>,
    loaded: boolean
}

const initialPostState = (): PostState => ({
    ids: [],
    all: {},
    loaded: false,
})

const initialState = (): State => ({
    posts: initialPostState()
})

interface State {
    posts: PostState
}

class Store {
    protected state: State
    constructor(initialState: State) {
        this.state = reactive(initialState);
    }

    public getState() {
        return readonly(this.state);
    }
}

const store = new Store(initialState());
store.getState();