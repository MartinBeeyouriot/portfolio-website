import { css, customElement, html, LitElement, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import '@polymer/iron-icon/iron-icon.js';
import '@vaadin/vaadin-grid/all-imports.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-lumo-styles/all-imports.js';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout.js';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout.js';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-date-picker';
import Flickity from 'flickity';
import { render, TemplateResult } from 'lit-html';
import { Project } from './project';
import { router } from '../../index';

/**
 * The portfolio Project detail view.
 */
@customElement('details-view')
export class DetailsView extends LitElement {
  @property({ type: Boolean })
  opened = false;

  @property({ type: Object })
  location = router.location;

  // our main project
  @property({ type: Object })
  project: Project | undefined;

  @property({ type: Array, reflect: true })
  images: string[] | undefined;

  private flick: Flickity | undefined;

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  /**
   * Default constructor
   * We are binding the dialogRenderer to this so inside this dialogRenderer
   * this is our actual class and not the dialog box.
   *
   * @param boundDialogRenderer
   */
  constructor(private boundDialogRenderer: (root: HTMLElement) => void) {
    super();
    this.boundDialogRenderer = this.dialogRenderer.bind(this);
  }

  /**
   * Render the dialog
   * @param root
   */
  private dialogRenderer(root: HTMLElement) {
    render(
      html`
        <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
        <style>
          .footer {
            margin-top: calc(var(--lumo-space-s));
            margin-bottom: calc(var(--lumo-space-s) * -1);
            margin-left: auto;
            margin-right: auto;
          }
          .hello {
            font-size: var(--lumo-font-size-xs);
          }

          .carousel {
            background: #eee;
            margin-bottom: 50px;
            width: 80vh;
          }

          .carousel-cell {
            width: 100%;
            height: 400px;
            margin-right: 10px;
            background: #ffffff;
            border-radius: 5px;
            counter-increment: gallery-cell;
          }

          /* cell number */
          .carousel-cell:before {
            display: block;
            text-align: center;
            font-size: 80px;
            color: white;
          }

          .carousel img {
            display: block;
            width: 600px;
            object-fit: cover;
          }

          .title {
            white-space: normal;
            margin-bottom: var(--lumo-space-s);
            font-size: var(--lumo-font-size-l);
            font-weight: bold;
            margin-left: auto;
            margin-right: auto;
          }

          .screenshot {
            margin-left: auto;
            margin-right: auto;
            font-size: var(--lumo-font-size-s);
            margin-bottom: var(--lumo-space-s);
          }

          .goal {
            font-size: var(--lumo-font-size-s);
            text-align: justify;
          }

          .check {
            width: 18px;
            margin-top: auto;
            margin-bottom: auto;
            display: table;
          }

          .description {
            padding-left: var(--lumo-space-l);
            font-size: var(--lumo-font-size-s);
            text-align: justify;
          }

          .card-goal {
            background-color: #ffffff;
            border-radius: var(--lumo-border-radius);
            box-shadow: var(--lumo-box-shadow-xs);
            padding: calc(var(--lumo-space-s) * 1.5) var(--lumo-space-m);
            width: 756px;
            margin-bottom: 20px;
          }

          @media screen and (max-width: 840px) {
            .carousel-cell {
              height: 450px;
            }

            .carousel,
            .card-goal,
            .carousel img {
              width: 600px;
            }
          }

          @media screen and (max-width: 670px) {
            .carousel-cell {
              height: 300px;
            }

            .carousel,
            .card-goal,
            .carousel img {
              width: 450px;
            }
          }

          @media screen and (max-width: 520px) {
            .carousel-cell {
              height: 250px;
            }

            .carousel,
            .card-goal,
            .carousel img {
              width: 340px;
            }
          }

          @media screen and (max-width: 400px) {
            .carousel-cell {
              height: 200px;
            }

            .carousel,
            .card-goal,
            .carousel img {
              width: 300px;
            }
          }
        </style>
        <vaadin-vertical-layout>
          <span class="title">${this.project?.title}</span>
          <vaadin-horizontal-layout>
            <vaadin-vertical-layout>
              <vaadin-horizontal-layout class="card-goal goal"><iron-icon icon="vaadin:check" class="check"></iron-icon>${unsafeHTML(this.project?.goal)}</vaadin-horizontal-layout>
              <vaadin-horizontal-layout class="card-goal"><iron-icon icon="vaadin:comment-o" class="check"></iron-icon><span class="description">${unsafeHTML(this.project?.description)}</span></vaadin-horizontal-layout>
            </vaadin-vertical-layout>
          </vaadin-horizontal-layout>
          <span class="screenshot">${this.project?.images ? html`Project screenshots:` : html`No project screenshots.`}</span>
        </vaadin-vertical-layout>
        ${this.images ? html`<div class="carousel">${this.images.map((item) => html`<img src="${item}" class="carousel-cell" />`)}</div>` : html``}

        <vaadin-vertical-layout>
          <vaadin-horizontal-layout class="footer">
            <vaadin-button theme="secondary" style="cursor: pointer;" @click="${this.close.bind(this)}"> <iron-icon icon="vaadin:close-small" slot="prefix"></iron-icon>Close</vaadin-button>
          </vaadin-horizontal-layout>
        </vaadin-vertical-layout>
      `,
      root,
      { eventContext: this } // bind event listener properly
    );
  }

  async performUpdate() {
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    super.performUpdate();
  }

  private close(): void {
    this.opened = false;
  }

  /**
   * Render()
   */
  render(): TemplateResult {
    return html` <vaadin-dialog id="details-dialog" theme="my-theme" .opened=${this.opened} .renderer=${this.boundDialogRenderer} @opened-changed="${this.onOpenedChanged}"></vaadin-dialog>`;
  }

  /**
   * opened Dialog Box changed.
   */
  private async onOpenedChanged(e: CustomEvent): Promise<void> {
    if (!e.detail.value && this.project) {
      console.log(this.location.params.project);
      if (this.location.params.project) {
        await new Promise((r) => setTimeout(r, 10));
        this.flick?.destroy();
        history.pushState(history.state, '', `/portfolio`);
      }
      this.project = undefined;
    }
    this.opened = e.detail.value;

    if (this.opened) {
      await this.showCarousel();
    }
  }

  private async showCarousel(): Promise<void> {
    await new Promise((r) => setTimeout(r, 0));

    if (this.flick) this.flick.destroy();
    await new Promise((r) => setTimeout(r, 10));
    // DOM is not updated because of that dialog box.
    // We delete all the element that stayed ourselves and readd them
    if (this.project?.images) {
      this.images = [...this.project?.images];
      const elem = document.querySelector('.carousel');
      if (elem) {
        while (elem.firstChild) {
          if (elem.lastChild) elem.removeChild(elem.lastChild);
        }
        this.images.forEach((item) => {
          const img = document.createElement('img');
          img.setAttribute('src', item);
          img.setAttribute('class', 'carousel-cell');
          elem.appendChild(img);
        });
      }
    }

    // Update for the overlay
    const overlay = document.getElementById('overlay');
    const elem1 = document.createElement('style');
    elem1.innerHTML = ':host([theme~="my-theme"]) [part="overlay"] {background-color: #E7EBEE; }';
    overlay?.shadowRoot?.appendChild(elem1);

    const elem = document.querySelector('.carousel');
    if (elem) {
      this.flick = new Flickity('.carousel', {
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
    }
  }
}
