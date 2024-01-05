import '../App.css';
import { faVk, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

function Auth() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const email = 'test@test.test';
    const username = 'test';
    const password = 'test';

    function handleLoginClick() {
        const respone = axios.post('http://127.0.0.1:8000/api/auth/login/', {
            username: username,
            password: password,
        })

        const token = '70d78f8ecb656fd3a3987b8451be05e330c05612';
        localStorage.setItem('token', respone.data.token);
        localStorage.getItem('token').console.log();

    };

 
    return(
        <div class="container" id="container">
            <div class="form-container sign-up">
                <form>
                    <h1>Создайте аккаунт</h1>
                    <div class="social-icons">
                        <a href="#" class="icon">
                            <FontAwesomeIcon icon={faVk} />
                        </a>
                        <a href="#" class="icon">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                    </div>
                    <span>
                        или используйте Email для регистрации
                    </span>
                    <input type="username" placeholder="Имя"></input>
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Пароль"></input>
                    <button>Создать</button>
                </form>
            </div>
            <div class="form-container sign-in">
                <form>
                    <h1>Войти в аккаунт</h1>
                    <div class="social-icons">
                        <a href="#" class="icon">
                            <FontAwesomeIcon icon={faVk} />
                        </a>
                        <a href="#" class="icon">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                    </div>
                    <span>
                        или используйте Email и пароль
                    </span>
                    <input type="username" placeholder="Логин"></input>
                    <input type="password" placeholder="Пароль"></input>
                    <a href="#">Забыли пароль?</a>
                    <button onClick={handleLoginClick}>Войти</button>
                </form>
            </div>
            <div class="toggle-container">
                <div class="toggle">
                    <div class="toggle-panel toggle-left">
                        <h1>С возвращением!</h1>
                        <p>Введите свои персональные данные, чтобы пользоваться полным функционалом сайта</p>
                        <button class="hidden" id="login">
                            Войти
                        </button>
                    </div>
                    <div class="toggle-panel toggle-right">
                        <h1>Привет, друг!</h1>
                        <p>Зарегистрируйтесь, введя свои персональные данные</p>
                        <button class="hidden" id="register">
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;