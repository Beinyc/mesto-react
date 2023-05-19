import hederLogo from '../images/header/header__logo.svg'

export default function Header () {
    return (
        <header className='header'>
        <img src={hederLogo} alt="логотип хедер" className="header__logo"/>
        </header>
    );
}