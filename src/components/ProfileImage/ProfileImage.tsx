import styles from './ProfileImage.module.css'

interface ProfileImageProps {
    url: string;
    altName: string
}

export const ProfileImage = ({url, altName}: ProfileImageProps) => {
    return (
        <div className={styles['profile-image-div']}>
            <img src={url} alt={altName}></img>
        </div>
    )
};