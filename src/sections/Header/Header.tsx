import styles from './Header.module.css';
import { ProfileImage } from '../../components/ProfileImage/ProfileImage';
import { useState } from 'react';
import { ProfileOptions } from '../../components/ProfileOptions/ProfileOptions';

const Header = () => {
  const [isProfileInfoOpen, setIsProfileInfoOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleProfileInfoClick = () => {
    setIsProfileInfoOpen(prev => !prev);
    setIsMenuOpen(false); // Закрываем меню при открытии профиля
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    setIsProfileInfoOpen(false); // Закрываем профиль при открытии меню
  };

  return (
    <div className={styles['header-div']}>
      <div className={styles['profile-info']} onClick={handleProfileInfoClick}>
        <ProfileImage 
          url='https://media.istockphoto.com/id/459898185/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%BD%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D1%85%D0%B5%D0%BC%D0%B0.jpg?s=2048x2048&w=is&k=20&c=Gc0vp4PVFsQ-pmXC2i1QVyLtY-e9y6imgkQB2JGSOiI=' 
          altName='profile image'
        />
        {isProfileInfoOpen && <ProfileOptions userName='user' />}
      </div>
      
      <nav className={`${styles['header-buttons']} ${isMenuOpen ? styles.active : ''}`}>
        <button>Section 1</button>
        <button>Section 2</button>
        <button>Section 3</button>
        <button>Section 4</button>
      </nav>
      
      <button 
        onClick={toggleMenu} 
        className={styles['menu-toggle']}
        aria-label="Toggle menu"
      >
        ☰ 
      </button>
    </div>
  );
};

export default Header;