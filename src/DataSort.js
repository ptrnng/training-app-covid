import { LitElement, html, css } from 'lit';
import '@material/mwc-icon';

export class DataSort extends LitElement {
  static get properties() {
    return {
      ascendingOrder: { type: Boolean },
      sortType: { type: String },
    };
  }

  static get styles() {
    return css`
      .sort-container {
        display: flex;
        flex-wrap: wrap;
        margin-left: 15%;
        box-sizing: border-box;
        position: relative;
        padding: 10px 20px 10px 20px;
        width: 70%;
      }
      .sort-icon{
        position: absolute;
        left: 36px;
        top: 16px;
      }
      #sortTypeSelector{
        text-align: center;
        border-radius: 2px;
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        padding: 8px 16px 8px 16px;
        width: 50%;
      }
      #orderButton{
        position: relative;
        border-radius: 2px;
        border-style: solid;
        border-width: 1px;
        box-sizing: border-box;
        padding: 8px 16px 8px 16px;
        width: 50%;
      }
      .order-icon{
        position: absolute;
        left: 16px;
        top: 4px;
      }

      @media screen and (max-width: 800px) {
        .sort-container {
          margin-left: 10%;
          width: 80%;
        }
      }
      @media screen and (max-width: 400px) {
        .sort-container {
          margin-left: 0;
          width: 100%;
        }
        #sortTypeSelector, #orderButton{
          width: 100%;
        }
      }
    `;
  }

  constructor() {
    super();
    this.ascendingOrder = true;
    this.sortType = 'alphabetical';
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">
      <div class="sort-container">
        <mwc-icon class="sort-icon primary-text">sort</mwc-icon>
        <select id="sortTypeSelector" @change=${e => this._changeSortType()}>
          <option value="alphabetical">Alphabetical</option>
          <option value="population">Population</option>
          <option value="activeCases">Active Cases</option>
          <option value="totalCases">Total Cases</option>
          <option value="recovered">Recovered</option>
          <option value="deaths">Deaths</option>
        </select>
        <button id='orderButton' @click=${() => this._changeOrder()}>
          <mwc-icon class="order-icon">${this.ascendingOrder? 'north' : 'south'}</mwc-icon>
          ${this.ascendingOrder? `Ascending` : `Descending`}
        </button>
      </div>
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
