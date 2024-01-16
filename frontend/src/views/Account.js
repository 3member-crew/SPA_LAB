import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import axios from 'axios';

import '../App.css';
import './Auth.js';

function AccountPage() {    
    const navigate = useNavigate();

    async function HandleLogout() {
        await axios.post('http://127.0.0.1:8000/api/auth/logout');
        sessionStorage.clear();
        navigate('../');
    }

    function HandleLoginRegClick() {
        navigate('../Auth');
    }

    return (
        <div>
            {sessionStorage.getItem('token') ? ([
                <Header />,
                <div id="introduction-wrap">
                    <div>
                    </div>
                    <div style={{fontSize: '40px', fontStyle: 'bold', marginBottom: '50px'}}>
                        
                    </div>
                    <div>
                        <button onClick={HandleLogout}>
                            Выйти из аккаунта
                        </button>
                    </div>
                </div>
            ]) : (
                <div id="introduction-wrap">
                    <div>
                        <button onClick={HandleLoginRegClick}>
                            Зайти в аккаунт
                        </button>
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default AccountPage;