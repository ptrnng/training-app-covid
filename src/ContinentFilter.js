import { LitElement, html, css } from 'lit';

export class ContinentFilter extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      continentFilter: { type: Array },
      darkMode: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      .filter-container {
        margin-left: 15%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        padding: 10px 60px 10px 60px;
        width: 70%;
      }
      .filter-icon{
        position: absolute;
        left: 26px;
        top: 16px;
      }
      .filter-container div{
        width: 30%;
      }
      input[type=checkbox]{
        background: red;
      }
      label{
        box-sizing: border-box;
        margin: 0 30px 0 0;
      }
      @media screen and (max-width: 800px) {
        .filter-container div{
          width: 50%;
        }
        .filter-container {
          margin-left: 10%;
          width: 80%;
        }
      }
      @media screen and (max-width: 400px) {
        .filter-container div{
          width: 100%;
        }
        .filter-container {
          margin-left: 0;
          width: 100%;
        }
      }

      
    `;
  }

  constructor() {
    super();
    this.data = [];
    this.continentFilter = [];
    this.darkMode = false;
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">
      <div class="filter-container">
        <mwc-icon class="filter-icon primary-text">filter_alt</mwc-icon>
        <div>
          <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="Asia" value="Asia">
          <label for="Asia">Asia</label>
        </div>
        <div>
          <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="Africa" value="Africa">
          <label for="Africa">Africa</label>
        </div>
        <div>
          <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="NorthAmerica" value="North-America">
          <label for="NorthAmerica">North America</label>
        </div>
        <div>
          <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="SouthAmerica" value="South-America">
          <label for="SouthAmerica">South America</label>
        </div>
        <div>
          <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="Europe" value="Europe">
          <label for="Europe">Europe</label>
        </div>
        <div>
          <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="Oceania" value="Oceania">
          <label for="Oceania">Oceania</label><br>
        </div>
      </div>
    `;
  }

  _changeContinentFilter(e){
    if(e.target.checked)
      this.continentFilter.push(e.target.value);
    else
      this.continentFilter = this.continentFilter.filter(continent => continent !== e.target.value);

    this.dispatchEvent(new CustomEvent('change-continent-filter', { detail: this.continentFilter}));
  }
  
}
