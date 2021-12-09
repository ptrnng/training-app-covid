import { LitElement, html, css } from 'lit';
// import LoadingGIF from '../assets/loading-buffering.gif';
const LoadingGIF = new URL('./assets/loading-buffering.gif', import.meta.url)
  .href;

export class Loading extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        background: transparent;
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        max-height: 100px;
        transform: translate(-50%, -50%);
      }

      @media screen and (max-width: 640px) {
        img {
          max-height: 50px;
          top: 60%;
        }
      }
    `;
  }

  render() {
    // return html`<img style="" src='assets/loading-buffering.gif'>`;
    return html`<img style="" src=${LoadingGIF} alt="" />`;
  }
}
