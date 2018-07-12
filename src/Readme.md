## Auto width
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

## Vertical carousel

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
<Carousel itemWidth={100} direction='vertical' containerHeight={400}>
  {images.map((img, idx) => <img src={img} key={idx} />)}
</Carousel>
````