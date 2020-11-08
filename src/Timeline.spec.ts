import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import Home from "./Home.vue"
import flushPromises from 'flush-promises';
import * as mockData from './mocks'

jest.mock('axios', () => ({
    get: (url: string) => ({
        data: [mockData.thisWeek, mockData.todayPost, mockData.thisMonth]
    })
}))

describe('Home', () => {
    it('renders a progress bar', () => {
        const wrapper = mount(Home)
        expect(wrapper.find('progress').exists()).toBe(true)
    })

    it('renders 3 time periods', async () => {
        const wrapper = mount(Home)
        await flushPromises();

        const periods = wrapper.findAll('[data-test="period"]');
        expect(periods).toHaveLength(3)
    })

    it('updates the period when clicked', async () => {
        const wrapper = mount(Home)
        await flushPromises();

        const $today = wrapper.findAll('[data-test="period"]')[0]
        expect($today.classes()).toContain('is-active')

        const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
        await $thisWeek.trigger('click')

        expect($today.classes()).not.toContain('is-active');
        expect($thisWeek.classes()).toContain('is-active');

        const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
        $thisMonth.trigger('click')

        await nextTick()

        expect($thisWeek.classes()).not.toContain('is-active')
        expect($thisMonth.classes()).toContain('is-active')
    })

    it('renders todays post by default', async () => {
        const wrapper = mount(Home)
        await flushPromises();

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(1)

        const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
        await $thisWeek.trigger('click')

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(2)

        const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
        await $thisMonth.trigger('click')

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(3)
    })

    it('should render a headline', async () => {
        const wrapper = mount(Home)
        await flushPromises();

        expect(wrapper.findAll('[data-test="post-headline"]')).toHaveLength(1)

        const postHeadline = wrapper.find('[data-test="post-headline"]')

        expect(postHeadline.text()).toBe("Today")
    })


})
