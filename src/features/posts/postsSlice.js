import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = {
    posts: [
        {
            id: 1, 
            title: 'Learn Redux', 
            content: 'this redux toolikit is a state management library essential for react.',
            date: sub(new Date(), { minutes: 10 }).toISOString(),
            reactions: {
                thumbsUp: 2,
                heart: 0,
                laughing: 0,
                wow: 0,
                prayingHands: 0
            }
        },
        {
            id: 2, 
            title: 'Frontend vs Backend', 
            content: 'frontend vs backend is a long debated argument which has valid points on both the sides.',
            date: sub(new Date(), { minutes: 5 }).toISOString(),
            reactions: {
                thumbsUp: 0,
                heart: 0,
                laughing: 0,
                wow: 1,
                prayingHands: 0
            }
        }
    ],
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            heart: 0,
                            laughing: 0,
                            wow: 0,
                            prayingHands: 0
                        }
                    }
                }
            }
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload) 
        },
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find((post) => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts.posts;

export const { addPost, removePost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;