
import { useState } from 'react'
import styles from './ResponseContainer.module.css'
import { Editor } from "json5-editor"

const ResponseContainer = () => {
    const [jsonData, setJsonData] = useState(`
    {
        "characters": [
          {
            "name": "Alice",
            "age": 25,
            "gender": "female",
            "occupation": "software engineer",
            "hobbies": ["reading", "coding", "hiking"]
          },
          {
            "name": "Bob",
            "age": 30,
            "gender": "male",
            "occupation": "graphic designer",
            "hobbies": ["drawing", "gaming", "traveling"]
          },
          {
            "name": "Charlie",
            "age": 22,
            "gender": "non-binary",
            "occupation": "student",
            "hobbies": ["writing", "playing music", "photography"]
          },
          {
            "name": "Diana",
            "age": 35,
            "gender": "female",
            "occupation": "doctor",
            "hobbies": ["running", "cooking", "volunteering"]
          },
          {
            "name": "Ethan",
            "age": 28,
            "gender": "male",
            "occupation": "entrepreneur",
            "hobbies": ["business strategy", "fitness", "surfing"]
          }
        ]
      }
      `)
    return (
        <div className={styles.response}>
            <div className={styles.responseTopBar}>
                <div className={styles.responseTopBarButtons}>
                    <div>
                        <img src="/assets/close.png" alt="" className={styles.responseTopBarButton} />
                        <img src="/assets/maxmize.png" alt="" className={styles.responseTopBarButton} />
                    </div>
                    <div>
                        <div className={styles.responseActive}>
                            <div className={styles.responseActiveDot}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.responseTopBarBButtons}>
                    <div className={styles.row}>
                        <select className={styles.selectButton} name="" id="">
                            <option value="">Type 1</option>
                            <option value="">Type 2</option>
                            <option value="">Type 3</option>
                        </select>
                        <div className={styles.responseTopBarButton}>View Desc</div>
                    </div>
                    <button className={styles.responseDeleteButton}>Delete</button>
                </div>
            </div>
            <Editor showLineNumber style={{
                backgroundColor: "#1e1e1e",
            }} value={jsonData} onChange={setJsonData} />
            <textarea className={styles.responseTextArea} placeholder="Response" />
        </div>
    )
}

export default ResponseContainer