import React, { useState, useEffect, useCallback } from 'react';
import styles from './MainPage.module.css';
import words from './words.json';

interface KeyProps {
  char: string;
  isActive: boolean;
}

const Key: React.FC<KeyProps> = ({ char, isActive }) => (
  <div 
    className={styles['key-div']}
    style={{ backgroundColor: isActive ? '#d2ccbc' : 'white' }}
  >
    {char}
  </div>
);

export const MainPage = () => {
    const keys1 = 'qwertyuiop';
    const keys2 = 'asdfghjkl';
    const keys3 = 'zxcvbnm';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz ';
    
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [text, setText] = useState('');
    const [correctChars, setCorrectChars] = useState(0);
    const [gameIsStarted, setGameIsStarted] = useState(false);
    const [timerValue, setTimerValue] = useState(0);
    const [backspaceCount, setBackspaceCount] = useState(0);

    const generateText = useCallback((): string => {
        if (!Array.isArray(words) || words.length === 0) {
            console.log('array of words not loaded');
            return '';
        }

        let result = '';
        const maxWords = 30;
        const maxLength = 250;

        while (result.split(' ').length < maxWords && result.length < maxLength) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const word = words[randomIndex];
            
            if (result.length + word.length + 1 <= maxLength) {
                result += (result ? ' ' : '') + word;
            } else {
                break;
            }
        }

        return result;
    }, []);

    const handleKey = useCallback((key: string) => {
        if (key === 'Backspace') {
            setInput(prev => prev.slice(0, -1));
            setCurrentIndex(prev => Math.max(0, prev - 1));
        } else if (alphabet.includes(key.toLowerCase())) {
            setInput(prev => prev + key);
            setCurrentIndex(prev => prev + 1);
            
            if (text[currentIndex] === key) {
                setCorrectChars(prev => prev + 1);
            }
        }
        if(currentIndex > 0 && !gameIsStarted) {
            gameHandler();
        }
        if(currentIndex === text.length - 1){
            gameHandler();
        }
    }, [text, currentIndex, alphabet]);

    const gameHandler = () => {
        setGameIsStarted(!gameIsStarted);
        if(gameIsStarted) {
            setTimerValue(0);
            setText(generateText());
            setInput('');
            setCurrentIndex(0);
            setCorrectChars(0);
            setBackspaceCount(0);
        };
    }
    useEffect(()=>{
        if(gameIsStarted){
            const timer = setInterval(() => {
                setTimerValue(prev =>{
                    const newValue = prev + 0.1;
                    return Math.round(newValue * 100)/100;
                });
                console.log(timerValue)
            }, 100);
            return () =>{ if(timer) clearInterval(timer); }
        }
    }, [gameIsStarted]);

    useEffect(() => {
        setText(generateText());
    }, [generateText]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setActiveKey(e.key);
            handleKey(e.key);
        };

        const handleKeyUp = () => {
            setActiveKey(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKey]);

    
    

    const getCharClass = (index: number) => {
        if (index >= input.length) return '';
        if (index < currentIndex) {
            return text[index] === input[index] 
                ? styles.correct 
                : styles.incorrect;
        }
        if (index === currentIndex) return styles.current;
        return '';
    };

    return (
        <div className={styles['section-card']}>
            <div className={styles.stats}>
                <p>Букв в секунду: {timerValue > 0 ?(input.length / timerValue).toFixed(2): 0}</p>
                <p>Аккуратность: {currentIndex > 0 ?((correctChars - backspaceCount) / currentIndex * 100).toFixed(2) + '%' : 0 + '%'}</p>
                <p>{timerValue} с</p>
            </div>
            <div className={styles['reader-div']}>
                <div className={styles['text-area']}>
                    {text.split('').map((char, index) => (
                        <span 
                            key={index} 
                            className={`${styles.char} ${getCharClass(index)}`}
                        >
                            {index === currentIndex && <span className={styles.cursor}></span>}
                            {char}
                        </span>
                    ))}
                </div>
            </div>
            <button className={styles.button} onClick={gameHandler}>
                {gameIsStarted ? 'Закончить попытку' : 'Начать игру'}
            </button>
            <div className={styles.rows}>
                <div className={`${styles['first-row']} ${styles['key-row']}`}>
                    {[...keys1].map(key => (
                        <Key key={key} char={key} isActive={activeKey === key} />
                    ))}
                </div>
                <div className={`${styles['second-row']} ${styles['key-row']}`}>
                    {[...keys2].map(key => (
                        <Key key={key} char={key} isActive={activeKey === key} />
                    ))}
                </div>
                <div className={`${styles['third-row']} ${styles['key-row']}`}>
                    {[...keys3].map(key => (
                        <Key key={key} char={key} isActive={activeKey === key} />
                    ))}
                </div>
            </div>
            
        </div>
    );
};