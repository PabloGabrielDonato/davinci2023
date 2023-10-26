import { useCallback, useState } from 'react'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../services/auth.service'
import { ToastContainer, toast } from 'react-toastify'

function LoginPage(){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const onChangeUserName = useCallback((event)=>{
        setUserName(event.target.value)
    }, [setUserName])

    const onChangePassword = useCallback((event)=>{
        setPassword(event.target.value)
    },[setPassword])

    const onSubmit = useCallback((event) =>{
        event.preventDefault()
        authService.login({userName, password})
        .then((data)=>{
            setError('')
            localStorage.setItem('token', data.token)
            /// LOGIN
            navigate('/', {replace: true})
        })
        .catch(err =>{
            console.log(err.errors);
            err.errors.forEach((error) => {
                console.log(error);
                toast.error(error, {theme:'dark'})
            })
        })
    },[setError, userName, password, navigate])

    return (
        <div className="login-page">
            <ToastContainer />
            <form className="form-login" onSubmit={onSubmit}>
                <h1 className="form-login__title">Inicio de session</h1>
                <label className="form-login__field">
                    Nombre de usuario: 
                    <input className="form-login__username" type="text" onChange={onChangeUserName} value={userName}/>
                </label>
                <label className="form-login__field">
                    Contraseña:
                    <input className="form-login__password" type="password" onChange={onChangePassword} value={password} />
                </label>
                <p>{error}</p>
                <button className="form-login__submit" type="submit">Entrar</button>
                <Link to='/recuperar/password'>Recuperar contraseña</Link>
            </form>
            <Link to={'/register'}>Registrate</Link>
        </div>
    )
}

export default LoginPage