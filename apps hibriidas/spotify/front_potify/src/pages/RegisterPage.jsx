import { useCallback, useState } from 'react'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../services/auth.service'
import { ToastContainer, toast } from 'react-toastify'

function RegisterPage(){
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
        console.table({userName, password})
        authService.register({userName, password})
        .then(()=>{
            setError('')
            authService.login({userName, newPassword: password})
                .then(dataLogin => {
                    localStorage.setItem('token', dataLogin.token)
                    /// LOGIN
                    navigate('/', {replace: true})
                })
        })
        .catch(err =>{
            err.errors.forEach((error) => {
                toast.error(error, {theme:'dark'})
            })
        })

    },[setError, userName, password, navigate])

    return (
        <div className="login-page">
            <ToastContainer />
            <form className="form-login" onSubmit={onSubmit}>
                <h1 className="form-login__title">Registro de Usuario</h1>
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
            </form>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}

export default RegisterPage