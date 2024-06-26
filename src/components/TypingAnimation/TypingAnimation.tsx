'use client';
import { useState, useEffect } from 'react';

const TypingAnimation = ({ texts = [] as string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 1000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout | undefined = undefined;

    if (!isDeleting && currentText.length < texts[currentIndex].length) {
      // Typing
      typingTimeout = setTimeout(() => {
        setCurrentText(texts[currentIndex].substring(0, currentText.length + 1));
        setTypingSpeedState(typingSpeed);
      }, typingSpeedState);
    } else if (isDeleting && currentText.length > 0) {
      // Deleting
      typingTimeout = setTimeout(() => {
        setCurrentText(texts[currentIndex].substring(0, currentText.length - 1));
        setTypingSpeedState(deletingSpeed);
      }, typingSpeedState);
    } else if (!isDeleting && currentText.length === texts[currentIndex].length) {
      // Pause before start deleting
      typingTimeout = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeedState(deletingSpeed);
      }, pauseTime);
    } else if (isDeleting && currentText.length === 0) {
      // Move to next text
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      setLoopNum(loopNum + 1);
      setTypingSpeedState(typingSpeed);
    }

    return () => clearTimeout(typingTimeout);
  }, [currentText, isDeleting, texts, currentIndex, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <div>
      <span>{currentText}</span>
    </div>
  );
};

export default TypingAnimation;
