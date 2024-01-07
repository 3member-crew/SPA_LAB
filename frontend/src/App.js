import './App.css';
import Auth from './views/Auth';
import Home from './views/Home';
import JoinRoom from './views/JoinRoom';
import Room from './views/Room';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';



// class App extends Component {
//     state = {
//         isLoggedIn: false,
//         messages: [],
//         value: '',
//         name: '',
//         room: 'test',
//     }

//     client = new W3CWebSocket('ws://django-chat-app.herokuapp.com/ws/chat/' + this.state.room + '/');

//     componentDidMount() {
//         this.client.onopen = () => {
//             console.log('WebSocket Client Connected');
//         };
//         this.client.onmessage = (message) => {
//             const dataFromServer = JSON.parse(message.data);
//             console.log('got reply! ', dataFromServer.type);
//             if (dataFromServer) {
//                 this.setState((state) =>
//                 ({
//                     messages: [...state.messages,
//                     {
//                         msg: dataFromServer.message,
//                         name: dataFromServer.name,
//                     }]
//                 })
//                 );
//             }
//         };
//     }


//     requireAuth(nextState, replace, next) {
//         if (!localStorage.getItem('token')) {
//             replace({
//                 pathname: "/login",
//                 state: { nextPathname: nextState.location.pathname }
//             })
//         }

//         next();
//     }

//     render() {
//         return (
//             <>
//                 <BrowserRouter>
//                     <Routes>
//                         <Route index element={<Home />} />
//                         <Route exact path="/auth" element={<Auth />} />
//                         <Route exact path="/home" element={<JoinRoom />} />
//                         <Route exact path="/room" element={<Room />} />
//                     </Routes>
//                 </BrowserRouter>
//             </>
//         )
//     }
// }

function App() {
    function requireAuth(nextState, replace, next) {
        if (!localStorage.getItem('token')) {
            replace({
                pathname: "/login",
                state: { nextPathname: nextState.location.pathname }
            })
        }

        next();
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route exact path="/auth" element={<Auth />} />
                    <Route exact path="/home" element={<JoinRoom />} />
                    <Route exact path="/room" element={<Room />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

// class App_t extends Component {

//     state = {
//         isLoggedIn: false,
//         messages: [],
//         value: '',
//         name: '',
//         room: 'test',
//     }

//     client = new W3CWebSocket('ws://django-chat-app.herokuapp.com/ws/chat/' + this.state.room + '/');

//     onButtonClicked = (e) => {
//         this.client.send(JSON.stringify({
//             type: "message",
//             message: this.state.value,
//             name: this.state.name
//         }));
//         this.state.value = ''
//         e.preventDefault();
//     }

//     componentDidMount() {
//         this.client.onopen = () => {
//             console.log('WebSocket Client Connected');
//         };
//         this.client.onmessage = (message) => {
//             const dataFromServer = JSON.parse(message.data);
//             console.log('got reply! ', dataFromServer.type);
//             if (dataFromServer) {
//                 this.setState((state) =>
//                 ({
//                     messages: [...state.messages,
//                     {
//                         msg: dataFromServer.message,
//                         name: dataFromServer.name,
//                     }]
//                 })
//                 );
//             }
//         };
//     }

//     render() {
//         const { classes } = this.props;
//         return (
//             <Container component="main" maxWidth="xs">
//                 {this.state.isLoggedIn ?
//                     <div style={{ marginTop: 50, }}>
//                         Room Name: {this.state.room}
//                         <Paper style={{ height: 500, maxHeight: 500, overflow: 'auto', boxShadow: 'none', }}>
//                             {this.state.messages.map(message => <>
//                                 <Card className={classes.root}>
//                                     <CardHeader
//                                         avatar={
//                                             <Avatar className={classes.avatar}>
//                                                 R
//                                             </Avatar>
//                                         }
//                                         title={message.name}
//                                         subheader={message.msg}
//                                     />
//                                 </Card>
//                             </>)}
//                         </Paper>

//                         <form className={classes.form} noValidate onSubmit={this.onButtonClicked}>
//                             <TextField
//                                 id="outlined-helperText"
//                                 label="Make a comment"
//                                 defaultValue="Default Value"
//                                 variant="outlined"
//                                 value={this.state.value}
//                                 fullWidth
//                                 onChange={e => {
//                                     this.setState({ value: e.target.value });
//                                     this.value = this.state.value;
//                                 }}
//                             />
//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 color="primary"
//                                 className={classes.submit}
//                             >
//                                 Start Chatting
//                             </Button>
//                         </form>
//                     </div>
//                     :
//                     <div>
//                         <CssBaseline />
//                         <div className={classes.paper}>
//                             <Typography component="h1" variant="h5">
//                                 ChattyRooms
//                             </Typography>
//                             <form className={classes.form} noValidate onSubmit={value => this.setState({ isLoggedIn: true })}>
//                                 <TextField
//                                     variant="outlined"
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="email"
//                                     label="Chatroom Name"
//                                     name="Chatroom Name"
//                                     autoFocus
//                                     value={this.state.room}
//                                     onChange={e => {
//                                         this.setState({ room: e.target.value });
//                                         this.value = this.state.room;
//                                     }}
//                                 />
//                                 <TextField
//                                     variant="outlined"
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     name="Username"
//                                     label="Username"
//                                     type="Username"
//                                     id="Username"
//                                     value={this.state.name}
//                                     onChange={e => {
//                                         this.setState({ name: e.target.value });
//                                         this.value = this.state.name;
//                                     }}
//                                 />
//                                 <Button
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     color="primary"
//                                     className={classes.submit}
//                                 >
//                                     Start Chatting
//                                 </Button>
//                                 <Grid container>
//                                     <Grid item xs>
//                                         <Link href="#" variant="body2">
//                                             Forgot password?
//                                         </Link>
//                                     </Grid>
//                                     <Grid item>
//                                         <Link href="#" variant="body2">
//                                             {"Don't have an account? Sign Up"}
//                                         </Link>
//                                     </Grid>
//                                 </Grid>
//                             </form>
//                         </div>
//                     </div>}
//             </Container>
//         )

//     }
// }

// export default withStyles(useStyles)(App);
// export default withStyles(useStyles)(App_t);