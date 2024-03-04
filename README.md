> react-scroll-reveal

Elevate your React UI with scroll-reveal-react, a seamless solution for adding stunning scroll animations to elements and text. Effortless integration and lightweight, it transforms static content into engaging, dynamic experiences with every scroll. 🚀

# Instalation

```
npm install scroll-reveal-react
```

# Animations Types

### Div:

-   Fade
-   Flicker
-   Zoom
-   Flip
-   Slide
-   Blur
-   Scale
-   Roll

### Text:

-   Typewriter
-   Fade
-   Random

# Usage Guide

### Default Props

| Props     | Type      | Required | Default Value | Description                                                |
| :-------- | :-------- | :------- | :------------ | :--------------------------------------------------------- |
| type      | `srting`  | yes      | -             | Type of the animation                                      |
| duration  | `number`  | -        | 500           | Duration of the animation                                  |
| delay     | `number`  | -        | 100           | Delay before the animation start                           |
| triggerAt | `number`  | -        | 0.1           | Trigger based on how much part of the animation is visible |
| onlyOnce  | `boolean` | -        | false         | Set animation to occur only once                           |

> NOTE: `duration: number` is not default props for Text Components.

### Example

```javascript
import { Div } from 'scroll-reveal-react';

//...

<Div type='fade' duration={1000}>
  //content
</Div>

//...

<Div type='zoom' initailZoom={0.5} duration={1000}>
  //content
</Div>

```

```javascript
import { Text } from 'scroll-reveal-react';

//...

<Text type='typewriter' latterDelay={100} />

//...

<Text type='random' randoms={3} duration={100} />

```

## End

Thank you for choosing Scroll Reveal React to bring motion and life to your React applications! We hope this simple yet powerful library enhances your user experience, leaving a lasting impact. Happy scrolling! 🌟 #ScrollRevealReact #ReactMagic
