import { LitElement, html, css } from 'lit';
// import LoadingGIF from '../assets/loading-buffering.gif';

export class Loading extends LitElement {
  static get properties() {
    return {
      darkMode: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host{
        background: transparent;
      }
      img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `;
  }

  constructor() {
    super();
    this.darkMode = false;
  }

  render() {
    return html`<img style="" src='assets/loading-buffering.gif'>`;
  }

}
