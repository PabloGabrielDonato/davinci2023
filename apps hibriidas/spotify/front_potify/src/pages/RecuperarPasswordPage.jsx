import { useCallback, useState } from 'react'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../services/auth.service'
import { ToastContainer, toast } from 'react-toastify'

function RecuperarPasswordPage(){
    const [userName, setUserName] = useState('')
    const [newPassword, setPassword] = useState('')
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
        authService.recuperarPassword({userName, newPassword})
        .then(()=>{
            setError('')
            toast.success('Contraseña cambiada 👍: redireccionando...', {theme:'dark'})
            setTimeout(()=> {
                navigate('/login', {replace: true})
            }, 3000)
        })
        .catch(err =>{
            console.log(err.error.message);
            toast.error(err.error.message, {theme:'dark'})
            
        })
    },[setError, userName, newPassword, navigate])

    return (
        <div className="login-page">
            <ToastContainer />
            <form className="form-login" onSubmit={onSubmit}>
                <h1 className="form-login__title">Recuperar Contraseña  </h1>
                <label className="form-login__field">
                    Nombre de usuario: 
                    <input className="form-login__username" type="text" onChange={onChangeUserName} value={userName}/>
                </label>
                <label className="form-login__field">
                    nueva Contraseña:
                    <input className="form-login__password" type="password" onChange={onChangePassword} value={newPassword} />
                </label>
                <p>{error}</p>
                <button className="form-login__submit" type="submit">Recuperar</button>
                
            </form>
            <Link to={'/login'}>Iniciar Sesion</Link>
            <Link to={'/register'}>Registrate</Link>
        </div>
    )
}

export default RecuperarPasswordPage