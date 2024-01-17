import '../App.css';
import { faVk, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { enc } from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import createClient from '../Url';


const JoinRoom = () => {
    const [roomName, setRoomName] = useState(''); 
    const [roomPass, setRoomPass] = useState('');

    const navigate = useNavigate();
    
    function SelectConnect() {
        const container = document.getElementById('container');
        container.classList.remove("active");
    };
    
    function SelectCreate() {
        const container = document.getElementById('container');
        container.classList.add("active");
    };
    
    const HandleConnectClick = async (e) => {
        e.preventDefault();
        const encodedRoomName = Base64.stringify(enc.Utf8.parse(roomName));
        const client = createClient();
        
        const response = await client.post('v1/rooms/join_room/', {
            name: roomName,
            password: roomPass
        }).then(response => {
            const room_token = response.data.room_token;
            sessionStorage.setItem('room_access', room_token);
            console.log(`current room token: ${room_token}`);
            navigate(`/room/${encodedRoomName}`);
            // navigate('/home')
        }).catch(e => {
            const exception = e['response']['data']['error'];
            console.log(exception);
            // navigate('/');
        })
    };
    
    const HandleCreateClick = async (e) => {
        e.preventDefault();
        const encodedRoomName = Base64.stringify(enc.Utf8.parse(roomName));
        console.log(encodedRoomName);
        const client = createClient();

        const response = await client.post('v1/rooms/create/', {
            name: roomName,
            password: roomPass
        }).then(response => {
            //navigate(`/room/${response.data.name}`)
            const room_token = response.data.room_token
            sessionStorage.setItem('room_access', room_token)
            console.log(`current room token: ${room_token}`);
            navigate(`/room/${encodedRoomName}`);
        }).catch(e => {
            const exception = e['response']['data']['error'];
            console.log(exception);
            navigate('/');
        });
    };

    return (
        <body style={{backgroundColor: '#e2e2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh'}}>
            <div className="container" id="container">
                <div className="form-container sign-up">
                    <form onSubmit={HandleCreateClick}>
                        <h1>Создать комнату</h1>
                        <span>
                            придумайте название комнаты и пароль
                        </span>
                        <input type="text" placeholder="Комната" onChange={(e) => setRoomName(e.target.value)} />
                        <input type="password" placeholder="Пароль" onChange={(e) => setRoomPass(e.target.value)} />
                        <button>Создать</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={HandleConnectClick}>
                        <h1>Подключиться к комнате</h1>
                        <span>
                            введите название комнаты и пароль
                        </span>
                        <input type="name" placeholder="Комната" onChange={(e) => setRoomName(e.target.value)} />
                        <input type="password" placeholder="Пароль" onChange={(e) => setRoomPass(e.target.value)} />
                        <button>Подключиться</button>
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
        </body>
    );
}

export default JoinRoom;