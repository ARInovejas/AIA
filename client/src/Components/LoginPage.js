

// https://medium.com/javascript-in-plain-english/add-google-login-to-your-react-apps-in-10-mins-c45315c93db0
// https://www.npmjs.com/package/react-google-login

import autoBind from 'auto-bind';
import React, { Component } from 'react';
import './css/LoginPage.css';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';

const clientId = "269624764057-hkcano4fqdrlg1upme538aqt8l0prvv9.apps.googleusercontent.com";
//refresh token setup
const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    const refreshToken = async() => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        console.log("newAuthRes: ", newAuthRes);
        // saveUserToken(newAuthRes.access_token);
        console.log("new auth token: ", newAuthRes.id_token);

        setTimeout(refreshToken, refreshTiming);
    }

    setTimeout(refreshToken, refreshTiming);
}

// Login Page
class LoginPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            accessToken:"",
            loggedIn: false
        }
        autoBind(this);
    }

    

    Login(){
        const onSuccess = (res) => {
            console.log("Login Success: ", res.profileObj);
            this.setState({
                user: res.profileObj,
                loggedIn:true,
                accessToken: res.accessToken
            });
            refreshTokenSetup(res);
        };
    
        const onFailure = (res) => {
            console.log("Login Fail: ", res);
        };
    
       return(
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px'}}
                isSignedIn={true}
            />
        )
    }

    logoutHandler(){
        console.log("Logout Success");
        this.setState({
            loggedIn: false,
            accessToken: ""
          });
          
        window.gapi.auth2.getAuthInstance().disconnect();
        
    }

    Logout(){
       return(
            <button onClick={this.logoutHandler}>Logout</button>
        )
    }

    NotLogged(){
        return(
        <div class="titlePage">
            <h1><b>Automated Item Analysis for Teachers</b></h1>
            <h5>Create and merge your Item Analyses</h5>
            <h6>(Based on Commonwealth High School's Item Analysis Format)</h6>
            <br></br><br></br>
            <p> Login through Google </p>
            {this.Login()}
            <br></br>
            <br></br>
        </div>
        )
    }

    LoggedIn(){
        return(
        <div class="titlePage">
            <h3>Welcome {this.state.user.name}</h3>
            <img src={this.state.user.imageUrl} alt={this.state.user.name}></img>
            <br></br>
            <button><Link to="/ItemAnalysis"> Create New Item Analysis </Link> </button>
            <button><Link to="/CombineItemAnalysis"> Merge Item Analyses </Link> </button>
            <br></br>
            <br></br>
            {this.Logout()}
        </div>
        )
    }

    render(){
        let PageStyle;
        if (this.state.loggedIn) {
            PageStyle = this.LoggedIn();
        }else{
            PageStyle = this.NotLogged();
        }
        return(
            <div>
                {PageStyle}
            </div>
        )
    }
}

export default LoginPage;