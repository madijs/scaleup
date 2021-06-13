import './App.css';
import React, {useEffect, useState} from 'react'
import AuthContainer from "./pages/AuthContainer";
import AppContainer from "./pages/AppContainer";
import {useDispatch, useSelector} from "react-redux";
import {getMeInfoAction} from "./redux/actions/getMeInfo";
import axios from './plugins/axios'
import {useHistory,useLocation} from 'react-router-dom'
import UnauthorizedSharedDocuments from "./pages/UnauthorizedSharedDocuments";
import AuthHeader from "./components/OtherComponents/AuthHeader";
import {Route} from "react-router-dom";
import UnauthorizedSharedDocumentDetail from "./pages/admin/UnauthorizedSharedDocumentDetail";
import PreviewDocumentDetail from "./pages/admin/PreviewDocumentDetail";
import MorePreviewDocument from "./pages/admin/MorePreviewDocument";

function App() {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.AuthPage);
  const history = useHistory();
  const location = useLocation();


  useEffect(()=>{
    if (localStorage.getItem('token')){
      axios.defaults.headers = {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      };
      const response = dispatch(getMeInfoAction(localStorage.getItem('token')));
      response.then(res=>{
        console.log(res.data);
        if (res.data.payment && res.data.roles[0].name === "client"){
            if (res.data.payment.payment_status_id ===1){
              history.push('/payment')
            }
        }
      });
      response.catch(err=>{
          localStorage.clear();
          history.push('/');
      })
    }
  },[]);

  if (location.pathname.includes('/shared')){
    return (
        <>
          <AuthHeader/>
          <Route exact path={'/shared'} render={()=><UnauthorizedSharedDocuments/>}/>
          <Route exact path={'/shared/detail/:name'} render={()=><PreviewDocumentDetail/>}/>
          <Route exact path={'/shared/detail/:name/more/:name2'} render={()=><MorePreviewDocument/>}/>
        </>
    )
  }

  if(!userData && !localStorage.getItem('token')){
    return (
        <AuthContainer/>
    )
  }
    return (
        <div className="App">
          <AppContainer userData={userData}/>
        </div>
    );
}

export default App;
