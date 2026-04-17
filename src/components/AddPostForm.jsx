import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPost } from "../features/posts/postsSlice";
import { selectAllUsers } from "../features/users/usersSlice";

function AddPostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch();

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value)

    const handleAddPost = (e) => {
        e.preventDefault();
        if (title && content) {
            dispatch(
                addPost(title, content, userId)
            );
            setTitle('');
            setContent('');
        }
    }

    const canSave = Boolean(title) && Boolean(userId) && Boolean(content);
 
    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Add a Post</h2>
            <form onSubmit={handleAddPost}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    // name="title"
                    placeholder='Enter your post title'
                    value={title}
                    onChange={onTitleChanged} />
                <label htmlFor="author">Author</label>
                <select name="author" id="author" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="content">Content</label>
                <textarea
                    type="text"
                    id="content"
                    // name="content"
                    placeholder='Enter your post content'
                    value={content}
                    onChange={onContentChanged} />
                <button 
                    type='submit'
                    disabled={!canSave}    
                >Add Post</button>
            </form>
        </section>
    )
}

export default AddPostForm;