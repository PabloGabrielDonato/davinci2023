import MainNav from "./MainNav";
import './MainHeader.css'
import logo from '../../assets/logo.png'

function MainHeader(){
    return (
        <>
            <header className="main-header">
                <img src={logo} height={100} width={100} alt="logo de la empresa" />
                <h1>Spotify</h1>
            </header>
                <MainNav />
        </>
    )}

export default MainHeader