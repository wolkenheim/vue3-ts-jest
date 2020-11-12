import { mount } from '@vue/test-utils'
import PostWriter from './PostWriter.vue'
import { basePost } from './mocks'
import { wrap } from 'lodash'

describe('PostWriter', () => {
    it.only('composes a post and emits new data', (done) => {
        const wrapper = mount(PostWriter, {
            props: {
                post: {
                    ...basePost
                }
            }
        })

        const newPostTitle = 'Test Post Title'
        const htmlContent = '<h3 id="test-content">Test Content</h3>\n'
        const markdownContent = '### Test Content'

        wrapper.find('[data-test="title"]').setValue(newPostTitle)
        wrapper.find<HTMLDivElement>('[data-test="markdown"]').element.innerText = markdownContent
        wrapper.find<HTMLDivElement>('[data-test="markdown"]').trigger('input')


        // there is debounce in the method
        setTimeout(() => {
            wrapper.find('[data-test="submit-post"]').trigger('click')
            expect(wrapper.emitted().save[0][0].title).toBe(newPostTitle)
            expect(wrapper.emitted().save[0][0].markdown).toBe(markdownContent)
            expect(wrapper.emitted().save[0][0].html).toBe(htmlContent)
            done()
        }, 550)

    })
})