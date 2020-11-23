import { customElement, html, css, query, LitElement } from 'lit-element';
import '@polymer/paper-slider/paper-slider.js';
import Flickity from 'flickity';

@customElement('test-slider')
export class PaperSlider extends LitElement {
  @query('.carousel')
  carousel: LitElement | undefined;

  constructor() {
    super();
  }

  static get styles() {
    return [
      css`
        .carousel {
          background: #eee;
          margin-bottom: 50px;
        }

        .carousel-cell {
          width: 100%;
          height: 200px;
          margin-right: 10px;
          background: #8c8;
          border-radius: 5px;
          counter-increment: gallery-cell;
        }

        /* cell number */
        .carousel-cell:before {
          display: block;
          text-align: center;
          line-height: 200px;
          font-size: 80px;
          color: white;
        }

        .carousel img {
          display: block;
          height: 200px;
        }

        @media screen and (min-width: 768px) {
          .carousel img {
            height: 400px;
          }
        }
      `,
    ];
  }

  render() {
    return html` <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
      <paper-slider value="21"></paper-slider>
      <paper-slider value="0"></paper-slider>
      <paper-slider value="50" secondary-progress="85"></paper-slider>
      <paper-slider disabled value="33"></paper-slider>
      <div class="carousel">
        <img src="images/projects/dewi/dewi1.png" class="carousel-cell" />
        <img src="images/projects/dewi/dewi2.png" class="carousel-cell" />
      </div>`;
  }

  async firstUpdated() {
    // Give the browser a chance to paint
    await new Promise((r) => setTimeout(r, 0));
    if (this.carousel) {
      console.log(this.carousel);
      const flick = new Flickity(this.carousel, {
        // options, defaults listed

        accessibility: true,
        // enable keyboard navigation, pressing left & right keys

        adaptiveHeight: false,
        // set carousel height to the selected slide

        autoPlay: 3000,
        // advances to the next cell
        // if true, default is 3 seconds
        // or set time between advances in milliseconds
        // i.e. `autoPlay: 1000` will advance every 1 second

        cellAlign: 'center',
        // alignment of cells, 'center', 'left', or 'right'
        // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)

        cellSelector: undefined,
        // specify selector for cell elements

        contain: false,
        // will contain cells to container
        // so no excess scroll at beginning or end
        // has no effect if wrapAround is enabled

        draggable: true,
        // enables dragging & flicking
        // if at least 2 cells

        dragThreshold: 3,
        // number of pixels a user must scroll horizontally to start dragging
        // increase to allow more room for vertical scroll for touch devices

        freeScroll: false,
        // enables content to be freely scrolled and flicked
        // without aligning cells

        friction: 0.2,
        // smaller number = easier to flick farther

        groupCells: false,
        // group cells together in slides

        initialIndex: 0,
        // zero-based index of the initial selected cell

        lazyLoad: true,
        // enable lazy-loading images
        // set img data-flickity-lazyload="src.jpg"
        // set to number to load images adjacent cells

        percentPosition: true,
        // sets positioning in percent values, rather than pixels
        // Enable if items have percent widths
        // Disable if items have pixel widths, like images

        prevNextButtons: true,
        // creates and enables buttons to click to previous & next cells

        pageDots: true,
        // create and enable page dots

        resize: true,
        // listens to window resize events to adjust size & positions

        rightToLeft: false,
        // enables right-to-left layout

        setGallerySize: true,
        // sets the height of gallery
        // disable if gallery already has height set with CSS

        watchCSS: false,
        // watches the content of :after of the element
        // activates if #element:after { content: 'flickity' }

        wrapAround: false,

        imagesLoaded: true,

        // at end of cells, wraps-around to first for infinite scrolling
      });
      console.log(flick);
    }
  }
}
