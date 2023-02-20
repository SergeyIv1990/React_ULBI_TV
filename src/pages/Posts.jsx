import React, { useEffect, useRef } from 'react';
import {useState, useMemo} from 'react';

import Сounter from '../components/Сounter';
import ClassCounter from '../components/ClassCounter';
import '../styles/App.css'
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';



function Posts() {
    const [posts, setPosts] = useState( [
     // {id:1, title:"azJavaScript", body:"bDecription 1"},
     // {id:2, title:"dJavaScript", body:"aDecription 2"},
     // {id:3, title:"cJavaScript", body:"cDecription 3"}   
    ])

    const [posts2, setPosts2] = useState( [
      {id:1, title:"React", body:"Decription 1"},
      {id:2, title:"React", body:"Decription 2"},
      {id:3, title:"React", body:"Decription 3"},
    ])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p=> p.id !== post.id))
    }

    const [filter, setFilter] = useState( {sort: '', query: ''})
    const [modal, setModal] = useState( false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();
    
    console.log(lastElement)

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
      setPage(page +1);
    })

    useEffect( () => {
      fetchPosts(limit, page)
    }, [page, limit])

    const changePage = (page) => {
      setPage(page)     
    }

return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{marginTop: 30}}onClick={() => setModal(true)}>
          Создать Пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        <h1>Выбор колличества отображаемых постов</h1>
        <MySelect
            value={limit}
            onChange={value => setLimit(value)}
            defaultValue="колличество элементов на странице"
            options={[
                {value: 5, name: "5"},
                {value: 10, name: "10"},
                {value: 25, name: "25"},
                {value: -1, name: "Показать все"},
            ]}
        />
        {postError &&
            <h1>Произошла ошибка ${postError}</h1>
        }
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Посты по JS"}/>
        <div ref={lastElement} style={{height:20, background: 'red'}}/>
        {isPostsLoading &&
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
        }    
        
        
        <Pagination 
            page={page} 
            changePage={changePage} 
            totalPages={totalPages}
        />
    
    <hr style={{margin: '15px 0'}}/>      
      <Сounter/>
      <ClassCounter/>
      <hr style={{margin: '15px 0'}}/>

    <PostList posts={posts2} title={"Посты по React"}/>

    

   </div>
    
    );
}

export default Posts;
