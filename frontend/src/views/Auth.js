import '../App.css';
import { faVk, faGoogle, faCreativeCommonsBy } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../Url';

function Auth() {
    const navigate = useNavigate(); 

    const regUsernameRef = useRef(null);
    const regEmailRef = useRef(null);
    const regPasswordRef = useRef(null);

    const loginUsernameRef = useRef(null);
    const loginPasswordRef = useRef(null);
    
    function SelectLogin() {
        const container = document.getElementById('container');
        const loginBtn = document.getElementById('login');
        container.classList.remove("active");
    };
    
    function SelectRegister() {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        container.classList.add("active");
    };
    
    async function HandleLoginClick() { 
        const response = await client.post('/auth/login/', {
            username: loginUsernameRef.current.value,
            password: loginPasswordRef.current.value,
        })
        
        const token = response.data.token;
        localStorage.setItem('token', token);

        navigate('../');
    };
    
    async function HandleRegisterClick() {
        const response = await client.post('/auth/register/', {
            username: regUsernameRef.current.value,
            email: regEmailRef.current.value,
            password: regPasswordRef.current.value,
        })
        
        const token = response.data.token;
        
        localStorage.setItem('token', token);

        navigate('../');
    };

    return (
        <div className="container" id="container">
            <div className="form-container sign-up">
                <form>
                    <h1>Создайте аккаунт</h1>
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
                    <input type="email" placeholder="Имя" ref={regUsernameRef}></input>
                    <input type="email" placeholder="Email" ref={regEmailRef}></input>
                    <input type="password" placeholder="Пароль" ref={regPasswordRef}></input>
                    <button onClick={HandleRegisterClick}>Создать</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1>Войти в аккаунт</h1>
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
                    <input type="email" placeholder="Логин" ref={loginUsernameRef}></input>
                    <input type="password" placeholder="Пароль" ref={loginPasswordRef}></input>
                    <a href="#">Забыли пароль?</a>
                    <button onClick={HandleLoginClick}>Войти</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>С возвращением!</h1>
                        <p>Введите свои персональные данные, чтобы пользоваться полным функционалом сайта</p>
                        <button className="hidden" id="login" onClick={SelectLogin}>
                            Войти
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Привет, друг!</h1>
                        <p>Зарегистрируйтесь, введя свои персональные данные</p>
                        <button className="hidden" id="register" onClick={SelectRegister}>
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;