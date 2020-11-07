import moment from "moment";
import { Post } from "./types";

export const basePost: Post = {
    id: 1,
    title: 'Base Post',
    markdown: 'Content',
    html: '<p>Content</p>',
    authorId: 1,
    created: moment()
}

export const todayPost: Post = {
    ...basePost,
    title: 'Today'
}

export const thisWeek: Post = {
    ...basePost,
    title: 'This week',
    created: moment().subtract(2, 'days')
}

export const thisMonth: Post = {
    ...basePost,
    title: 'This month',
    created: moment().subtract(2, 'weeks')
}