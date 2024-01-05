import '../App.css';
import { faVk, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function onLoginClick() {
    const container = document.getElementById('container');
    const loginBtn = document.getElementById('login');
    container.classList.remove("active");
};

function onRegisterClick() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    container.classList.add("active");
};

function Auth() {
    return(
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
                    <input type="text" placeholder="Имя"></input>
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Пароль"></input>
                    <button>Создать</button>
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
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Пароль"></input>
                    <a href="#">Забыли пароль?</a>
                    <button>Войти</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>С возвращением!</h1>
                        <p>Введите свои персональные данные, чтобы пользоваться полным функционалом сайта</p>
                        <button className="hidden" id="login" onClick={onLoginClick}>
                            Войти
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Привет, друг!</h1>
                        <p>Зарегистрируйтесь, введя свои персональные данные</p>
                        <button className="hidden" id="register" onClick={onRegisterClick}>
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;