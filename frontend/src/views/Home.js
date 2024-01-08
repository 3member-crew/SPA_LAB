import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faU, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
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
        navigate('./Home');
    }
    
    return (
        <div>
            <div id="nav-wrap">
                <div id="header-wrap">
                    <div id="logo">
                        W<span style={{position: 'relative', top: '20px', }}>3</span>G
                    </div>
                    <div id="navbar">
                        <button onClick={HandleHomeClick}>
                            <FontAwesomeIcon icon={faHome} size='50px'/>
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
            <div id="introduction-wrap">
                <div style={{fontSize: '60px'}}>
                    Watch3Gether
                </div>
                <div> 
                    Сайт для совместного
                </div>
                <div style={{marginBottom: '25px'}}> 
                    просмотра видео
                </div>
                <div id="room-creation-wrap">
                    {localStorage.getItem('token') != null || localStorage.getItem('token') != undefined ? (
                        <button onClick={HandleRoomCreateClick}>
                            Создать комнату
                        </button>
                    ) : (
                        <button onClick={HandleLoginRegClick}>
                            Зарегистрируйтесь или войдите, чтобы создать комнату
                        </button>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;