import { createApp } from 'vue'
import axios from 'axios'
import * as mockData from './Mocks'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// @ts-ignore
axios.get = async (url: string) => {
    if (url === '/posts') {
        await delay(2000);
        return Promise.resolve({
            data: [
                mockData.todayPost,
                mockData.thisMonth,
                mockData.thisWeek
            ]
        })
    }
}

import App from './App.vue'
console.log(App)

createApp(App).mount('#app')

