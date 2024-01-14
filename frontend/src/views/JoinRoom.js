import '../App.css';
import { faVk, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { encode } from 'base-64';
import client from '../Url';

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
    
    async function HandleConnectClick() {
        const roomName = connectRoomNameRef.current.value;
        const roomPassword = connectRoomPasswordRef.current.value;
        
        await client.post('v1/rooms/join_room/', {
            name: roomName,
            password: roomPassword
        })
        .then(response => {
            const room_token = response.data.room_token;
            localStorage.setItem('room_access', room_token);
            navigate(`/room/${encode(response.data.name)}`);
            // navigate('/home')
        })
        .catch(e => {
            const exception = e['response']['data']['error'];
            console.log(exception);
            // navigate('/');
        })
    };
    
    async function HandleCreateClick() {
        const roomName = createRoomNameRef.current.value;
        const roomPassword = createRoomPasswordRef.current.value;

        const encodedRoomName = encode(roomName);
        console.log(encodedRoomName);

        await client.post('v1/rooms/create/', {
            name: roomName,
            password: roomPassword
        })
        .then(response => {
            //navigate(`/room/${response.data.name}`)
            const room_token = response.data.room_token
            localStorage.setItem('room_access', room_token)
            navigate(`/room/${encodedRoomName}`);
        })
        .catch(e => {
            const exception = e['response']['data']['error'];
            console.log(exception);
            navigate('/');
        });

    };

    return (
        <div className="container" id="container">
            <div className="form-container sign-up">
                <form>
                    <h1>Создать комнату</h1>
                    <span>
                        придумайте название комнаты и пароль
                    </span>
                    <input type="email" placeholder="Комната" ref={createRoomNameRef}></input>
                    <input type="password" placeholder="Пароль" ref={createRoomPasswordRef}></input>
                    <button type="button" onClick={HandleCreateClick}>Создать</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1>Подключиться к комнате</h1>
                    <span>
                        введите название комнаты и пароль
                    </span>
                    <input type="email" placeholder="Комната" ref={connectRoomNameRef}></input>
                    <input type="password" placeholder="Пароль" ref={connectRoomPasswordRef}></input>
                    <button type="button" onClick={HandleConnectClick}>Подключиться</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>А также можно подключиться к комнате</h1>
                        <button className="hidden" id="login" onClick={SelectConnect}>
                            Войти
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>А также можно создать комнату</h1>
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