import { LitElement, html, css } from 'lit';

export class DataSort extends LitElement {
  static get properties() {
    return {
      ascendingOrder: { type: Boolean },
      sortType: { type: String },
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
    this.ascendingOrder = true;
    this.sortType = 'alphabetical';
  }

  render() {
    return html`
      <select id="sortTypeSelector" @change=${e => this._changeSortType()}>
        <option value="alphabetical">Alphabetical</option>
        <option value="population">Population</option>
        <option value="activeCases">Active Cases</option>
        <option value="totalCases">Total Cases</option>
        <option value="recovered">Recovered</option>
        <option value="deaths">Deaths</option>
      </select>
      <button @click=${() => this._changeOrder()}>${this.ascendingOrder? 'Ascending' : 'Descending'}</button><br>
    `;
  }

  _changeSortType(e){
    this.sortType = this.shadowRoot.getElementById('sortTypeSelector').value;
    this.dispatchEvent(new CustomEvent('change-sort-type', { detail: this.sortType}));
  }

  _changeOrder(e){
    this.ascendingOrder = !this.ascendingOrder;
    this.dispatchEvent(new CustomEvent('change-order', { detail: this.ascendingOrder}));
  }
  
}
