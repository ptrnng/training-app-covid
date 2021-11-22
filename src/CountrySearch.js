import { LitElement, html, css } from 'lit';

export class CountrySearch extends LitElement {
  static get properties() {
    return {
      data: { type: Array }
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
    this.data = [];
  }

  render() {
    return html`
      <input type="input" id="searchBox" value="" @keyup=${()=>this._changeSearchKey()} placeholder="Search Countries"><br>
    `;
  }

  _changeSearchKey(){
    this.dispatchEvent(new CustomEvent('change-search-key', { detail: this.shadowRoot.getElementById('searchBox').value}));
  }
  
}
