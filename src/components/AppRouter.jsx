import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import {routes, publickRoutes} from "../router";
import { v4 } from 'uuid';
import { AuthContext } from "../context";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
const {isAuth, isLoading} = useContext(AuthContext)
console.log(isAuth)
const routeComponents = routes.map(({path, element}) => <Route exact path={path} element={element} key={v4()} />);  
const publickRoutesComponents = publickRoutes.map(({path, element}) => <Route exact path={path} element={element} key={v4()} />);  

if (isLoading) {
    return <Loader/>
}
    return (
        isAuth
            ?
                <Routes>
                {routeComponents}
                <Route path="*" element={<Navigate to="/error"/>}/>
                
                </Routes> 
            :
                <Routes>
                {publickRoutesComponents}         
                <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes> 

    

    );
};
export default AppRouter;

            {//<Route path="/about" element={<About/>}/>
            //<Route exact path="/posts" element={<Posts/>}/>
            //<Route exact path="/posts/:id" element={<PostIdPage/>}/>   
            //<Route path="/error" element={<Error/>}/>
         
        } 