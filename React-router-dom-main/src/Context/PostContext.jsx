import { createContext, useState, useContext } from 'react';

const PostContext = createContext();

// eslint-disable-next-line react/prop-types
export const PostProvider = ({ children }) => {
    const [ posts, setPosts ] = useState([]);

    const data = {
        posts,
        setPosts
    }

    return (
        <PostContext.Provider value={data}>
            {children}
        </PostContext.Provider>
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export const usePost = () => {
    return useContext(PostContext);
};