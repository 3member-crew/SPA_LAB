import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faU, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header({ roomName }) {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const HandleShow = () => setShow(!show);
    const room = roomName;

    function HandleHomeClick() {
        navigate('../');
    }

    function HandleUserClick() {
        navigate('/Account');
    }

    function HandleLoginRegClick() {
        navigate('./Auth');
    }

    return (
        <div id="nav-wrap">
            <div id="logo">
                <button onClick={HandleHomeClick}>W<span style={{ position: 'relative', top: '20px', }}>3</span>G</button>
            </div>
            <div id="navbar">
                {room ? (
                    <div style={{display: 'flex', alignItems: 'center', color: '#fff', marginRight: '20px', fontSize: '20px'}}>
                        Вы подключены к комнате: {room}
                    </div>
                )
                    :
                    (
                        <></>
                    )

                }
                <button onClick={HandleHomeClick}>
                    <FontAwesomeIcon icon={faHome} />
                </button>
                {sessionStorage.getItem('token') ? (
                    <button onClick={HandleUserClick}>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                ) : (
                    <button onClick={HandleLoginRegClick}>
                        Войти или зарегистрироваться
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header;