import { LitElement, html, css } from 'lit';
// import LoadingGIF from '../assets/loading-buffering.gif';

export class Loading extends LitElement {
  static get properties() {
    return {
    };
  }

  static get styles() {
    return css`
      img{
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`<img style="" src='assets/loading-buffering.gif'>`;
  }

}
