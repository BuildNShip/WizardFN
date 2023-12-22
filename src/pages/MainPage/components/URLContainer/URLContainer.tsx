import React from 'react'
import styles from './URLContainer.module.css'
import { PiFloppyDiskBack } from 'react-icons/pi'

const URLContainer = () => {
    return (
        <div className={styles.urlContainer}>
            <p className={styles.urlLabel}>URL</p>
            <input className={styles.urlInput} placeholder="https://www.example.com" />
            <button className={styles.urlSendButton}>Send</button>
            <button className={styles.urlEditButton}><PiFloppyDiskBack className={styles.saveButton} size={20} />Edit</button>
        </div>
    )
}

export default URLContainer