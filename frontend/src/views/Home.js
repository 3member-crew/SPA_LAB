import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Auth.js';

import Header from '../components/Header.js';

function Home() {
    const navigate = useNavigate();

    function HandleLoginRegClick() {
        navigate('./Auth');
    }

    function HandleRoomCreateClick() {
        navigate('./Home');
    }
    
    return (
        <div>
            <Header />
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
                    {localStorage.getItem('token') !== null || localStorage.getItem('token') !== undefined ? (
                        <button onClick={HandleRoomCreateClick}>
                            Создать комнату
                        </button>
                    ) : (
                        <button onClick={HandleLoginRegClick}>
                            Зарегистрируйтесь или войдите, чтобы создать комнату
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;