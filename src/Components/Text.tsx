import React, { useRef, useEffect, useState, useCallback } from 'react'
import './styles/text.css'

type DefaultProps = {
    content: string,
    ref?: React.Ref<HTMLHeadingElement>,
    delay?: number,
    triggerAt?: number
}

type TypewriterAnimationProps = {
    type: 'typewriter',
    hideCursor?: boolean,
    latterDelay?: number,
}

type FadeLattersAnimationProps = {
    type: 'fade',
    duration?: number,
}

type RandomLattersAnimationProps = {
    type: 'random',
    alphabetOnly?: boolean,
    numberOnly?: boolean
    duration?: number,
    randoms?: number
}

type AnimationProps =
    TypewriterAnimationProps
    | FadeLattersAnimationProps
    | RandomLattersAnimationProps;

type Props = DefaultProps & AnimationProps & React.HTMLAttributes<HTMLHeadingElement>

const Text: React.FC<Props> = (props) => {
    const { type, delay = 100, triggerAt = 0.1 } = props;

    const textContainerRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    const [content, setContent] = useState<string[]>(props.content.split(''));
    const [animate, setAnimate] = useState(false)
    // const [once, setOnce] = useState(false)


    useEffect(() => {
        if (type === 'typewriter') setContent(c => [...c, ''])
    }, [type])

    const setTypewriterAnimation = useCallback((delay: number, cursor: boolean) => {
        let index = 0;
        const anim = setInterval(() => {
            const ele = document.getElementById(`react-scroll-char-${index}`);
            if (ele) {
                ele.style.animation = `type ${delay}ms steps(2)`;
                ele.classList.add('react-scroll-text-cursor');
                setTimeout(() => {
                    if (ele.id === `react-scroll-char-${content.length - 1}`) {
                        if (cursor) {
                            ele.style.animation = 'none';
                            ele.style.opacity = '0'
                        }
                        ele.style.animation = 'cursor 1.5s steps(1) infinite';
                    }
                    else ele.classList.remove('react-scroll-text-cursor');
                }, delay);
                ele.classList.remove('hide')
            }
            index = index + 1;
            if (index === content.length) {
                if ((props as TypewriterAnimationProps).hideCursor)
                    textRef.current?.classList.remove('react-scroll-text-cursor');
                clearInterval(anim);
            }
        },
            delay)
    }, [props, content.length])

    const setFadeAnimation = useCallback((delay: number) => {
        let index = 0;
        const anim = setInterval(() => {
            const ele = document.getElementById(`react-scroll-char-${index}`);
            if (ele) {
                ele.style.animation = `fade ${delay}ms linear`;
                ele.classList.remove('hide')
            }
            index = index + 1;
            if (index === content.length) {
                clearInterval(anim);
            }
        },
            delay)
    }, [content.length])


    const setRandomAnimation = useCallback((randoms: number, delay: number) => {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const { alphabetOnly, numberOnly } = props as RandomLattersAnimationProps;
        if (alphabetOnly) characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        if (numberOnly) characters = '0123456789';
        const charactersLength = characters.length;
        let index = 0;
        const mainAnim = setInterval(() => {

            let ran = 0;
            const ele = document.getElementById(`react-scroll-char-${index}`);
            if (ele) {
                const temp = ele.innerText;
                if (ele) ele.classList.remove('hide')
                const anim = setInterval(() => {
                    ele.innerText =
                        characters.charAt(Math.floor(Math.random() * charactersLength));
                    ran++;
                    if (ran === randoms) {
                        clearInterval(anim);
                        ele.innerText = temp;
                    }
                }, delay)
            }
            index++;
            if (index === content.length) {
                clearInterval(mainAnim);
            }
        }, delay * randoms)
    }, [content.length, props])

    const resetAnimation = useCallback(() => {
        if (textRef.current)
            Array.from(textRef.current.children).forEach(element => {
                element.classList.add('hide');
                (element as HTMLElement).style.animation = 'none'
            });
    }, [])

    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: triggerAt
        }
        const observer = new IntersectionObserver(([objectDiv]) => {
            setTimeout(() => {
                setAnimate(objectDiv.isIntersecting)
            }, delay);
        }, observerOptions);
        observer.observe(textContainerRef.current as Element)
        return () => observer.disconnect();
    }, [delay, triggerAt])

    useEffect(() => {
        if (!animate) {
            resetAnimation();
            return;
        }
        switch (type) {
            case 'typewriter':
                setTypewriterAnimation(props.latterDelay ? props.latterDelay : 100,
                    props.hideCursor ? props.hideCursor : false);
                break;
            case 'fade':
                setFadeAnimation(props.duration ? props.duration : 500)
                break;
            case 'random':
                setRandomAnimation(props.randoms ? props.randoms : 5,
                    props.duration ? props.duration : 100)
                break;

            default:
                break;
        }
    }, [animate, type,
        setTypewriterAnimation,
        setFadeAnimation,
        setRandomAnimation,
        resetAnimation, props])


    return (
        <>
            <div ref={textContainerRef} className="react-scroll-animation-text">
                <h1 ref={textRef}>
                    {content.map(((char, index) =>
                        <span key={index}
                            id={`react-scroll-char-${index}`}
                            className={`react-scroll-anim-text-char hide`}
                        >
                            {char}
                        </span>
                    ))}
                </h1>
            </div>
        </>
    )
}

export default Text