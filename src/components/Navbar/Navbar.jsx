import './Navbar.scss';
import logo from '../../assets/logo.png';
import arrowIcon from '../../assets/arrow_icon.png';
import { useContext } from 'react';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
import { CURRENCY_TYPES } from '../../utils/navOptions';

const Navbar = () => {
    const { setCurrency } = useContext(CoinContext);

    const currencyHandler = event => {
        switch (event.target.value) {
            case 'usd':
                {
                    setCurrency({ name: 'usd', symbol: '$' });
                }
                break;
            case 'eur':
                {
                    setCurrency({ name: 'eur', symbol: '€' });
                }
                break;
            case 'try':
                {
                    setCurrency({ name: 'try', symbol: '₺' });
                }
                break;

            default:
                {
                    setCurrency({ name: 'usd', symbol: '$' });
                }
                break;
        }
    };

    return (
        <nav className='navbar'>
            <Link to={'/'}>
                <img src={logo} className='logo' alt='Logo' />
            </Link>
            <ul>
                <Link to={'/'}>
                    <li>HOME</li>
                </Link>
                <li>FEATURES</li>
                <li>PRICING</li>
                <li>BLOG</li>
            </ul>
            <div className='nav-right'>
                <select onChange={currencyHandler}>
                    {CURRENCY_TYPES.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <button>
                    Sign up <img src={arrowIcon} alt='Arrow icon ' />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
