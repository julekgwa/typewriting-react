import PropTypes from 'prop-types';

import React, {
  useEffect,
  useState
} from 'react';

import {
  TypewriterContainer
} from '../elements/TypewriterContainer';

export function Typewriter({ words, className, cursorClassName, cursorStyle, loop, typingSpeed, erasingSpeed, nextWordDelay , onWordFinishTyping, onFinished , }) {

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentTypedWord, setCurrentTypedWord] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {

    const type = () => {

      if (!isTyping) {

        return;

      }

      const typed = words[currentWordIndex].substr(0, currentTypedWord.length + 1);
      const typing = typed.length < words[currentWordIndex].length;
      setCurrentTypedWord(typed);

      if (!typing) {

        setIsTyping(false);
        typeof onWordFinishTyping === 'function' && onWordFinishTyping(currentWordIndex);
        setTimeout(() => {

          setIsDeleting(!typing);

        }, nextWordDelay);

      }

    };

    setTimeout(() => {

      type();

    }, typingSpeed);

  }, [isTyping, currentWordIndex, currentTypedWord]);

  useEffect(() => {

    let timer;

    const erase = () => {

      if (!isDeleting) {

        return;

      }

      const erased = currentTypedWord.slice(0, -1);
      const deleting = !erased.length;
      setCurrentTypedWord(erased);

      if (deleting) {

        const nextWordIndex = currentWordIndex + 1;

        setIsDeleting(false);
        setCurrentWordIndex(nextWordIndex < words.length ? nextWordIndex : 0);
        setIsTyping(currentWordIndex === (words.length - 1) && !loop ? false : deleting);

        if (currentWordIndex === (words.length - 1)) {

          typeof onFinished === 'function' && onFinished();

        }

      }

    };

    timer = setTimeout(() => {

      erase();

    }, erasingSpeed);

    return () => clearTimeout(timer);

  }, [isDeleting, currentWordIndex, currentTypedWord]);

  return (
    <TypewriterContainer>
      <span className={className}>{currentTypedWord}</span>
      {currentTypedWord && <span className={`${cursorClassName ? cursorClassName : 'cursor-type'}`} style={cursorStyle}>&nbsp;</span>}
    </TypewriterContainer>
  );

}

Typewriter.propTypes = {
  words: PropTypes.array.isRequired,
  loop: PropTypes.bool,
  typingSpeed: PropTypes.number,
  erasingSpeed: PropTypes.number,
  nextWordDelay: PropTypes.number,
  onWordFinishTyping: PropTypes.func,
  onFinished: PropTypes.func,
  cursorStyle: PropTypes.object,
  cursorClassName: PropTypes.string,
  className: PropTypes.string,
};

Typewriter.defaultProps = {
  typingSpeed: 50,
  erasingSpeed: 100,
  nextWordDelay: 2000,
  loop: true,
  cursorClassName: '',
  onWordFinishTyping: () => {},
  onFinished: () => {},
  className: '',
  cursorStyle: {
  },
}
