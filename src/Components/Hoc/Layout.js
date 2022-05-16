import './Layout.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = props => {
    return (
        <>
          <Header isAuth={props.isAuth} cartCount={props.cartCount} />
            <div className='Content'>{props.children}
            </div>
            <Footer/>
        </>
    );
};

export default Layout;
