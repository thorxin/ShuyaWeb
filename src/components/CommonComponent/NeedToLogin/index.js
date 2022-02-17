import React from 'react'
import { useHistory,useLocation } from 'react-router'
import { saveLastRoute } from '../../../util/storage'

export default () => {

    const location = useLocation();
    const history = useHistory();

    const goToAuth = () => {
        const currentPath = location.pathname;
        
        if(currentPath){
            saveLastRoute(currentPath)
        }

        history.push({
            pathname: '/login'
        })
    }
        return (
            <div>
                <div onClick={goToAuth} className="text-primary-color font-weight-bold text-center">
                    <p>LOGIN</p>
                    <p className="small">သို့မဟုတ်</p>
                    <p>REGISTER လုပ်ရန်လိုအပ်ပါသည်။</p>
                </div>
            </div>
        )
}