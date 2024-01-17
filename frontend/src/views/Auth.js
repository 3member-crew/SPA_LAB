import '../App.css';
import { faVk, faGoogle, faCreativeCommonsBy } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import createClient from '../Url';

function Auth() {
    const navigate = useNavigate(); 

    const regUsernameRef = useRef(null);
    const regEmailRef = useRef(null);
    const regPasswordRef = useRef(null);

    const loginUsernameRef = useRef(null);
    const loginPasswordRef = useRef(null);
    
    function selectLogin() {
        const container = document.getElementById('container');
        container.classList.remove("active");
    };
    
    function selectRegister() {
        const container = document.getElementById('container');
        container.classList.add("active");
    };
    
    async function handleLoginClick() { 
        const client = createClient();

        const response = await client.post('/auth/login/', {
            username: loginUsernameRef.current.value,
            password: loginPasswordRef.current.value,
        })
        
        const token = response.data.token;
        sessionStorage.setItem('token', token);

        console.log(`current user token: ${token}`);

        navigate('../');
    };
    
    async function handleRegisterClick() {
        const client = createClient();

        const response = await client.post('/auth/register/', {
            username: regUsernameRef.current.value,
            email: regEmailRef.current.value,
            password: regPasswordRef.current.value,
        })
        
        const token = response.data.token;
        
        sessionStorage.setItem('token', token);

        console.log(`current user token: ${token}`);

        navigate('../');
    };

    return (
        <div className="container" id="container">
            <div className="form-container sign-up">
                <form>
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
                    <input type="username" placeholder="Имя" ref={regUsernameRef}></input>
                    <input type="email" placeholder="Email" ref={regEmailRef}></input>
                    <input type="password" placeholder="Пароль" ref={regPasswordRef}></input>
                    <button onClick={handleRegisterClick}>Создать</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
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
                    <input type="email" placeholder="Email" ref={loginUsernameRef}></input>
                    <input type="password" placeholder="Пароль" ref={loginPasswordRef}></input>
                    {/*<a href="#">Забыли пароль?</a>*/}
                    <button onClick={handleLoginClick}>
                        Войти
                    </button>
                </form>
            </div>
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