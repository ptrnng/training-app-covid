import { LitElement, html, css } from 'lit';
import '@material/mwc-icon';

export class DataSort extends LitElement {
  static get properties() {
    return {
      ascendingOrder: { type: Boolean },
      sortType: { type: String },
      darkMode: { type: Boolean }
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
      #select-container{
        position: relative;
        width: 46%;
        margin: 0 2% 0 2%;
        padding: 0;
      }
      .sort-icon{
        position: absolute;
        left: 16px;
        top: 4px;
        z-index: 1;
      }
      #sortTypeSelector{
        position: relative;
        text-align: center;
        border-radius: 2px;
        border-style: solid;
        border-width: 0;
        box-sizing: border-box;
        padding: 8px 16px 8px 16px;
        width: 100%;
        box-shadow:0 4px 10px 0 rgba(0,0,0,0.2),0 4px 20px 0 rgba(0,0,0,0.19);
      }
      
      #orderButton{
        position: relative;
        border-radius: 2px;
        border-style: solid;
        border-width: 0;
        box-sizing: border-box;
        padding: 8px 16px 8px 16px;
        width: 46%;
        margin: 0 2% 0 2%;
        box-shadow:0 4px 10px 0 rgba(0,0,0,0.2),0 4px 20px 0 rgba(0,0,0,0.19);
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
        #orderButton, #select-container{
          width: 100%;
        }
      }

      .darkMode #sortTypeSelector{
        background-image: linear-gradient(#292D31, #282C30);
        color: white;
      }
      .darkMode .sortTypeOption{
        background: #292D31;
      }
      .darkMode #orderButton{
        background-image: linear-gradient(#292D31, #282C30);
        color: white;
      }
    `;
  }

  constructor() {
    super();
    this.ascendingOrder = true;
    this.sortType = 'alphabetical';
    this.darkMode = false;
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">
      <div class="sort-container ${this.darkMode? 'darkMode': ''}">
        <div id="select-container">
          <mwc-icon class="sort-icon primary-text">sort</mwc-icon>
          <select id="sortTypeSelector" @change=${e => this._changeSortType()}>
            <option class="sortTypeOption" value="alphabetical">Alphabetical</option>
            <option class="sortTypeOption" value="population">Population</option>
            <option class="sortTypeOption" value="activeCases">Active Cases</option>
            <option class="sortTypeOption" value="totalCases">Total Cases</option>
            <option class="sortTypeOption" value="recovered">Recovered</option>
            <option class="sortTypeOption" value="deaths">Deaths</option>
          </select>
        </div>
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
