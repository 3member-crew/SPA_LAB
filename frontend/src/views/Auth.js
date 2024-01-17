import '../App.css';
import { faVk, faGoogle, faCreativeCommonsBy } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createClient from '../Url';

function Auth() {
    const navigate = useNavigate(); 

    const regUsernameRef = useRef(null);
    const regEmailRef = useRef(null);
    const regPasswordRef = useRef(null);

    const loginUsernameRef = useRef(null);
    const loginPasswordRef = useRef(null);

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    function selectLogin() {
        const container = document.getElementById('container');
        container.classList.remove("active");
    };
    
    function selectRegister() {
        const container = document.getElementById('container');
        container.classList.add("active");
    };
    
    const handleLoginClick = async(e) => { 
        e.preventDefault();
        const client = createClient();

        const response = await client.post('/auth/login/', {
            username: user,
            password: pass,
        }).then(response => {
            const token = response.data.token;
            sessionStorage.setItem('token', token);
    
            console.log(`current user token: ${token}`);
    
            navigate('../');
        })
    };
    
    const handleRegisterClick = async(e) => {
        e.preventDefault();
        const client = createClient();

        const response = await client.post('/auth/register/', {
            username: user,
            email: email,
            password: pass,
        }).then(response => {
            const token = response.data.token;
            sessionStorage.setItem('token', token);
    
            console.log(`current user token: ${token}`);
    
            navigate('../');
        })
    };

    const renderLoginForm = (
        <div className="form-container sign-in">
                <form onSubmit={handleLoginClick}>
                    <h1>Войти в аккаунт</h1>
                    {/*
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faVk} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                    </div>
                    <span>
                        или используйте Email и пароль
                    </span>
                    */}
                    <input type="text" placeholder="Имя" onChange={(e) => setUser(e.target.value)} />
                    <input type="password" placeholder="Пароль" onChange={(e) => setPass(e.target.value)} />
                    {/*<a href="#">Забыли пароль?</a>*/}
                    <button>Войти</button>
                </form>
            </div>
    )

    return (
        <div className="container" id="container">
            <div className="form-container sign-up">
                <form onSubmit={handleRegisterClick}>
                    <h1>Создайте аккаунт</h1>
                    {/*
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faVk} />
                        </a>
                        <a href="#" className="icon">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                    </div>
                    
                    <span>
                        или используйте Email для регистрации
                    </span>
                    */}
                    <input type="text" placeholder="Имя" onChange={(e) => setUser(e.target.value)} />
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Пароль" onChange={(e) => setPass(e.target.value)} />
                    {/*<a href="#">Забыли пароль?</a>*/}
                    <button>Войти</button>
                </form>
            </div>
            {renderLoginForm}
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>С возвращением!</h1>
                        <p>Введите свои персональные данные, чтобы пользоваться полным функционалом сайта</p>
                        <button type="button" className="hidden" id="login" onClick={selectLogin}>
                            Войти
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Привет, друг!</h1>
                        <p>Зарегистрируйтесь, введя свои персональные данные</p>
                        <button type="button" className="hidden" id="register" onClick={selectRegister}>
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;