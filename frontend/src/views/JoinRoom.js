import '../App.css';
import { faVk, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';

function JoinRoom() {
    const createRoomNameRef = useRef(null);
    const createRoomPasswordRef = useRef(null);

    const connectRoomNameRef = useRef(null);
    const connectRoomPasswordRef = useRef(null);

    const navigate = useNavigate();
    
    function SelectConnect() {
        const container = document.getElementById('container');
        container.classList.remove("active");
    };
    
    function SelectCreate() {
        const container = document.getElementById('container');
        container.classList.add("active");
    };
    
    function HandleConnectClick() {
        const roomName = connectRoomNameRef.current.value;
        const roomPassword = connectRoomPasswordRef.current.value;

        navigate('/room');
    };
    
    function HandleCreateClick() {
        const roomName = createRoomNameRef.current.value;
        const roomPassword = createRoomPasswordRef.current.value;

        navigate('/room');
    };

    return (
        <div className="container" id="container">
            <div className="form-container sign-up">
                <form>
                    <h1>Создать комнату</h1>
                    <span>
                        придумайте название комнаты и пароль
                    </span>
                    <input type="text" placeholder="Комната" ref={createRoomNameRef}></input>
                    <input type="password" placeholder="Пароль" ref={createRoomPasswordRef}></input>
                    <button onClick={HandleCreateClick}>Создать</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1>Подключиться к комнате</h1>
                    <span>
                        введите название комнаты и пароль
                    </span>
                    <input type="text" placeholder="Комната" ref={connectRoomNameRef}></input>
                    <input type="password" placeholder="Пароль" ref={connectRoomPasswordRef}></input>
                    <button onClick={HandleConnectClick}>Подключиться</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>_ ___________</h1>
                        <p>_______ ____ __________ ______, _____ ____________ ______ ______ _________ _____</p>
                        <button className="hidden" id="login" onClick={SelectConnect}>
                            Войти
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>______, ____</h1>
                        <p>_________________, _____ ____ ___________ ______</p>
                        <button className="hidden" id="register" onClick={SelectCreate}>
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinRoom;