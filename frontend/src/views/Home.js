import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faU, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Auth.js';

function Home() {
    const navigate = useNavigate();

    function HandleHomeClick() {
        navigate('./');
    }

    function HandleUserClick() {
        navigate('/Account');
    }

    function HandleLoginRegClick() {
        navigate('./Auth');
    }

    function HandleRoomCreateClick() {
        navigate('./Room');
    }
    
    return (
        <div>
            <div id="nav-wrap">
                <div id="header-wrap">
                    <div id="logo">
                        здесь картинка
                    </div>
                    <div id="navbar">
                        <button onClick={HandleHomeClick}>
                            <FontAwesomeIcon icon={faHome} />
                        </button>
                        {localStorage.getItem('token') != null ? (
                            <button onClick={HandleUserClick}>
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                        ) : (
                            <button onClick={HandleLoginRegClick}>
                                Войти или зарегистрироваться
                            </button>
                        )
                        }
                    </div>
                </div>
            </div>
            <div>
                <button onClick={HandleRoomCreateClick}>создать комнату</button>
            </div>
        </div>
    )
}

export default Home;