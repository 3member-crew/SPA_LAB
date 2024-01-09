import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faU, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const HandleShow = () => setShow(!show);

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
            <div id="header-wrap">
                <div id="logo">
                    <button onClick={HandleHomeClick}>W<span style={{position: 'relative', top: '20px', }}>3</span>G</button>
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
    )
}

export default Header;