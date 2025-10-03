# carousel

To view and test the carousel, please visit:
https://abemo.github.io/carousel/
The carousel is fully responsive, so please re-size the page and see how it responds.

To view and interact with a mobile version of the site on desktop:

1. visit the above site
2. right-click and inspect the page
3. change the device type to mobile (cmd+shft+m on chrome, or cmd+opt+m on firefox)
4. enable touch simulation and interact with the page

I didn't use any external libraries, and instead relied on css flex, and vanilla js.

To develop the carousel I created a check-list of features from the spec (including the bonus auto rotate feature). I first created the basic carousel using placeholder images and minimal styles. I then had the idea of creating a rotating carousel of some of my favorite records. As a fun extra feature I added a small song snippet from each record which can be played using the audio controls.

- [x] create basic web carousel functionality
- [x] make carousel auto rotate (use set interval?)
- [x] remove all console.logs
- [x] add title, favicon
- [x] make carousel size responsive
- [x] center image should be 50%, left/right 25%
- [x] add swipe/touch functionality touchstart, touchmove, touchend
- [x] add sound play/stop button for each album
- [x] come up with theme/style
- [x] optimize mobile styles
- [x] add nice animated transition
- [x] clean up code
- [x] write Readme with instructions for running, my thoughts, dev process

The most difficult step was adding smooth transitions. I tried a number of different approaches including attempting to manually calculate translations for each item in the carousel. I finally settled on using keyframes to uniformly animated each item.
