import React, { useEffect, useRef, useState } from "react";
import './styles/div.css';

type StyleVariables = {
    [key: string]: string | number
}

type DefaultProps = {
    ref?: React.Ref<HTMLDivElement>,
    duration?: number,
    delay?: number,
    triggerAt?: number
    onlyOnce?: boolean,
    function?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'auto'
}

type FadeAnimationProps = {
    type: 'fade' | 'flicker';
};

type ZoomAnimationProps = {
    type: 'zoom';
    initialZoom: number;
    hasBounce?: boolean;
    bounceFactor?: number;
    pivot?: 'center' | 'top' | 'bottom' | 'left' | 'right';
};

type FlipAnimationProps = {
    type: 'flip';
    direction: 'left-right' | 'top-bottom';
};

type SlideAnimationProps = {
    type: 'slide';
    origin: 'left' | 'right' | 'top' | 'bottom';
    distance?: number;
    hasMomentum?: boolean;
};

type BlurAnimationProps = {
    type: 'blur';
    amount: number;
};

type ScaleAnimationProps = {
    type: 'scale';
    initialScale: [x: number, y: number];
};

type RollAnimationProps = {
    type: 'roll',
    direction: 'clock' | 'anti-clock'
};


type AnimationProps =
    | FadeAnimationProps
    | ZoomAnimationProps
    | FlipAnimationProps
    | SlideAnimationProps
    | BlurAnimationProps
    | ScaleAnimationProps
    | RollAnimationProps;

type Props = DefaultProps & AnimationProps & React.HTMLAttributes<HTMLDivElement>;



const Div: React.FC<Props> = (props) => {
    const divContainerRef = useRef<HTMLDivElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const { type, duration = 1000, delay = 100, triggerAt = 0.1 } = props;
    const [animate, setAnimate] = useState(false)
    const [once, setOnce] = useState(false)
    let CLASS_CONFIG = ''

    const styler: StyleVariables = {
        '--duration': `${duration}ms`,
    };

    switch (type) {
        case "fade":
            CLASS_CONFIG = ('fade')
            break;

        case "flicker":
            CLASS_CONFIG = ('flicker')
            break;

        case "zoom": {
            CLASS_CONFIG = props.hasBounce ? 'zoom-bounce' : 'zoom'
            CLASS_CONFIG += (` zoom-${props.pivot ? props.pivot : 'center'}`);
            styler['--zoom'] = props.initialZoom
            const bnc = props.initialZoom <= 1 ? (props.bounceFactor ? props.bounceFactor : 1.1) :
                (props.bounceFactor ? (1 / props.bounceFactor) : 0.9);
            styler['--bounce-factor-up'] = bnc;
            styler['--bounce-factor-down'] = 1 / bnc;
            break;
        }
        case "flip":
            switch (props.direction) {
                case "left-right":
                    CLASS_CONFIG = ('flip-left-right');
                    break;
                case "top-bottom":
                    CLASS_CONFIG = ('flip-top-bottom')
                    break;
                default:
                    break;
            }
            break;

        case "slide":
            CLASS_CONFIG = `slide slide-${props.origin}${props.hasMomentum ? '-skew' : ''}`
            styler['--slide-distance'] = (
                props.origin === 'left' || props.origin === 'top' ?
                    (props.distance ? (`-${props.distance}%`) : '-50%') :
                    (props.distance ? (`${props.distance}%`) : '50%')
            )
            break;

        case "blur":
            CLASS_CONFIG = 'blur';
            styler['--blur-amount'] = props.amount + 'px';
            break;

        case "scale":
            CLASS_CONFIG = 'scale'
            styler['--scale-anim-x'] = props.initialScale[0];
            styler['--scale-anim-y'] = props.initialScale[1];
            break;

        case "roll":
            CLASS_CONFIG = `roll roll-${props.direction}`
            break;

        default:
            break;
    }

    const STYLE = styler as React.CSSProperties;


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
        observer.observe(divContainerRef.current as Element)
        return () => observer.disconnect();
    }, [delay, triggerAt])

    useEffect(() => {
        const config = animate ? CLASS_CONFIG : `scroll-not-in-port`
        if (divContainerRef.current && divRef.current) {
            divRef.current.className = (once ? 'once-only' : config)
        }
        if (props.onlyOnce && animate) setTimeout(() => {
            setOnce(true)
        }, duration);
    }, [animate, CLASS_CONFIG, props.onlyOnce, once, duration])


    return (
        <div ref={divContainerRef} className={'react-scroll-animation-div'} style={STYLE}>
            <div ref={divRef} className={CLASS_CONFIG} >
                {props.children}
            </div>
        </div >
    );
};

export default Div;
