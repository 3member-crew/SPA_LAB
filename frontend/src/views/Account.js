import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';

import '../App.css';
import './Auth.js';

function AccountPage() {    
    const navigate = useNavigate();

    function HandleLogout() {
        localStorage.clear();
        navigate('../');
    }

    return (
        <div>
            <Header />
            <div id="account-info-wrap">
                <div>
                    <button onClick={HandleLogout}>
                        logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AccountPage;