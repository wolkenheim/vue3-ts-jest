import { reactive, readonly } from "vue"
import { Post } from "./types";
import axios from "axios";

import { todayPost, thisWeek, thisMonth } from "./Mocks";

interface PostState {
    ids: string[],
    all: Record<string, Post>,
    loaded: boolean
}

const initialPostState = (): PostState => ({
    ids: [
        todayPost.id.toString(),
        thisWeek.id.toString(),
        thisMonth.id.toString()
    ],
    all: {
        [todayPost.id]: todayPost,
        [thisWeek.id]: thisWeek,
        [thisMonth.id]: thisMonth
    },
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

    async fetchPosts() {
        const response = await axios.get<Post[]>('/posts');
        const ids: string[] = [];
        const all: Record<string, Post> = {}
        response.data.forEach(post => {
            ids.push(post.id.toString())
            all[post.id] = post;
        })

        this.state.posts = {
            ids,
            all,
            loaded: true
        }
    }
}

const store = new Store(initialState());
store.getState();

export const useStore = () => store;
