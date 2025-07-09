import styles from './ProfileOptions.module.css'
interface ProfileOptionsProps {
    userName: string;
}
export const ProfileOptions = ({userName}:ProfileOptionsProps) => {
    return <div className={styles['profile-options']}>
        <p className={styles['login-p']}>Логин:</p>
        <p className={styles['user-name-p']}>{userName}</p>
        <button className=''>
            Log out
        </button>
    </div>
};