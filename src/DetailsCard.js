import { LitElement, html, css } from 'lit';

export class DetailsCard extends LitElement {
  static get properties() {
    return {
      details: { type: Object },
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
    // this.details = null;
  }


  render() {
    if(this.details)
      return html`
        ${this.details.country}
      `;
    else
      return html``;
  }
}

