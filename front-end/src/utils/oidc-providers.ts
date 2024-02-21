/* eslint-disable prettier/prettier */
/* eslint-disable no-async-promise-executor */
import {UserManager, UserManagerSettings} from 'oidc-client-ts';
import {sleep} from './helpers';
// import { string } from 'yup';

const GOOGLE_CONFIG: UserManagerSettings = {
    authority: 'https://accounts.google.com',
    client_id: '',
    client_secret: '',
    redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
    scope: 'openid email profile',
    loadUserInfo: true
};

export const GoogleProvider = new UserManager(GOOGLE_CONFIG);

export const authLogin = (email: string, password: string, _level: string) => {
    return new Promise(async (res, rej) => {
        await sleep(500);

        const url = 'http://localhost:8000/api/login';

        fetch(url, {
            method: 'post',
            body: JSON.stringify({'username': email, 'password': password, 'level': _level}),
            headers: {
                'content-type' : 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                try {
                    email = resp.data.username;
                    _level = resp.data;
                    
                    if (email != '') {
                        localStorage.setItem(
                            'authentication',
                            JSON.stringify({
                                                profile: {email: email},
                                                level : resp.data.id_level
                                            })
                        );
                        return res({profile: {email: email}, 
                                                level : resp.data.id_level, 
                                                sts : resp.data});
                    }
                    return rej({message: 'Credentials are wrong!'});
                } catch (error) {
                    return rej({message: 'Credentials are wrong!'});
                }
               
        }); 
        
        // if (email != '') {
        //     localStorage.setItem(
        //         'authentication',
        //         JSON.stringify({
        //                             profile: {email: email},
        //                             level : {we: "dd"}
        //                         })
        //     );
        //     return res({profile: {email: email}, level : length});
        // }
        // return rej({message: 'Credentials are wrong!'});

        // if (email === 'admin@example.com' && password === 'admin') {
        //     localStorage.setItem(
        //         'authentication',
        //         JSON.stringify({profile: {email: 'admin@example.com'}})
        //     );
        //     return res({profile: {email: 'admin@example.com'}});
        // }
        // return rej({message: 'Credentials are wrong!'});
    });
};

export const getAuthStatus = () => {
    return new Promise(async (res) => {
        await sleep(500);
        try {
            let authentication = localStorage.getItem('authentication');
            if (authentication) {
                authentication = JSON.parse(authentication);
                return res(authentication);
            }
            return res(undefined);
        } catch (error) {
            return res(undefined);
        }
    });
};
