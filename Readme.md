# React Swipe Carousel

Browser native swipe friendly carousel.

* Uses browser `overflow:auto` 
* Responsive
* Mobile friendly
* Keyboard support
* Accessible
* Server side friendly
* Requires `requestAnimationFrame` and `Promise` polyfill

Docs & Demo: https://rmdort.github.io/react-swipe-carousel/

## Installation

```
yarn add react-swipe-carousel
```

## Usage

````
const images = [
  'https://placeimg.com/640/480/any',
  'https://placeimg.com/640/480/animals'
];
<Carousel>
  {images.map((img, idx) => <img src={img} key={idx} />)}
</Carousel>
````


## Custom width

````
const images = [
  'https://placeimg.com/100/100/any',
  'https://placeimg.com/100/100/animals',
  'https://placeimg.com/100/100/animals',
  'https://placeimg.com/100/100/animals',
  'https://placeimg.com/100/100/animals',
  'https://placeimg.com/100/100/animals',
  'https://placeimg.com/100/100/animals',
  'https://placeimg.com/100/100/animals',
  'https://placeimg.com/100/100/animals'
];
<Carousel itemWidth={100}>
  {images.map((img, idx) => <img src={img} key={idx} />)}
</Carousel>
````