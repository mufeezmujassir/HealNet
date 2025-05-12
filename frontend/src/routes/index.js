import {createBrowserRouter, Route, Routes} from 'react-router-dom';




import App from '../App.js';
import Home from '../pages/home';
import Login from '../pages/Login'
import Register from '../pages/register'
import ForgotPassword from '../pages/forgotPassword'
const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',
                element:<Home/>
            },{
                path:'login',
                element:<Login/>
            },{
                path:'register',
                element:<Register/>
            }
            ,{
                path:'forgot-password',
                element:<ForgotPassword/>
            }
        ]
    }
]);


export default router;