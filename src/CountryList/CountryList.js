import { LitElement, html, css } from 'lit';
import { DetailsCard } from './DetailsCard/DetailsCard.js';
import { DataSearch } from './DataSearch/DataSearch.js';
import { ContinentFilter } from './ContinentFilter/ContinentFilter.js';
import { DataSort } from './DataSort/DataSort.js';
import { Loading } from '../common/Loading/Loading.js';

export class CountryList extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      data: { type: Array },
      processedData: { type: Array },
      ascendingOrder: { type: Boolean },
      sortType: { type: String },
      continentFilter: { type: Array },
      searchKey: { type: String },
    };
  }

  static get styles() {
    return css`
      #CovidTracker-app {
        padding-top: 5%;
      }
      @media (prefers-color-scheme: dark) {
        #CovidTracker-app {
          //dark;
          background-image: linear-gradient(45deg, #31363a, #1e1f22);
          color: lightgray;
        }
      }
    `;
  }

  constructor() {
    super();
    this.loading = true;
    this.ascendingOrder = true;
    this.data = null;
    this.processedData = null;
    this.sortType = 'alphabetical';
    this.continentFilter = [];
    this.searchKey = '';
  }

  render() {
    let content;
    if (this.loading) {
      content = html`<loading-gif></loading-gif>`;
      // return html`<img style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" src="../assets/loading-buffering.gif">`;
    } else {
      content = html` <h1 style="text-align: center">Covid Case Tracker</h1>

        <data-search
          @change-search-key="${this._changeSearchKey}"
        ></data-search>

        <continent-filter
          .continentFilter="${this.continentFilter}"
          @change-continent-filter="${this._changeContinentFilter}"
        ></continent-filter>

        <data-sort
          .ascendingOrder="${this.ascendingOrder}"
          .sortType="${this.sortType}"
          @change-order="${this._changeOrder}"
          @change-sort-type="${this._changeSortType}"
        ></data-sort>

        <div style="display: flex;flex-wrap: wrap;">
          ${this.processedData.map(
            item => html` <details-card .details="${item}"></details-card> `
          )}
        </div>`;
    }
    return html`
      <div style="min-height: 100vh" id="CovidTracker-app">${content}</div>
    `;
  }

  _changeSortType(e) {
    this.sortType = e.detail;
    this._applyOptions();
  }

  _changeOrder(e) {
    this.ascendingOrder = e.detail;
    this._applyOptions();
  }

  _changeSearchKey(e) {
    this.searchKey = e.detail;
    this._applyOptions();
  }

  _changeContinentFilter(e) {
    this.continentFilter = e.detail;
    this._applyOptions();
  }

  _applyOptions() {
    this._filterDataByContinent();
    this._filterBySearchKey();
    this._sortData();
  }

  _filterDataByContinent() {
    if (this.continentFilter.length > 0) {
      this.processedData = this.data.filter(country =>
        this.continentFilter.includes(country.continent)
      );
    } else this.processedData = this.data;
  }

  _filterBySearchKey() {
    if (this.searchKey.length > 0)
      this.processedData = this.processedData.filter(c =>
        c.country.toLowerCase().includes(this.searchKey.toLowerCase())
      );
  }

  _sortData() {
    switch (this.sortType) {
      case 'population':
        this.processedData = this.processedData.filter(
          country => country.population
        );
        this.processedData = this.processedData.sort(
          (a, b) => a.population - b.population
        );
        break;
      case 'active':
      case 'total':
      case 'recovered':
        this.processedData = this.processedData.filter(
          country => country.cases[this.sortType]
        );
        this.processedData = this.processedData.sort(
          (a, b) => a.cases[this.sortType] - b.cases[this.sortType]
        );
        break;
      case 'deaths':
        this.processedData = this.processedData.filter(
          country => country.deaths.total
        );
        this.processedData = this.processedData.sort(
          (a, b) => a.deaths.total - b.deaths.total
        );
        break;
      default:
        this.processedData = this.processedData.sort((a, b) =>
          a.country.localeCompare(b.country)
        );
        break;
    }
    // console.log('---------------');
    // this.processedData.map(c => console.log(c.country+' - '+ typeof c.cases.active));
    if (!this.ascendingOrder) this.processedData = this.processedData.reverse();
  }
}

customElements.define('details-card', DetailsCard);
customElements.define('data-search', DataSearch);
customElements.define('continent-filter', ContinentFilter);
customElements.define('data-sort', DataSort);
customElements.define('loading-gif', Loading);
