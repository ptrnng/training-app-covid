import { LitElement, html, css } from 'lit';

export class ContinentFilter extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      continentFilter: { type: Array }
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
    this.data = [];
    this.continentFilter = [];
  }

  render() {
    return html`
      <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="Asia" value="Asia"><label for="Asia">Asia</label>
      <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="Africa" value="Africa"><label for="Africa">Africa</label>
      <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="NorthAmerica" value="North-America"><label for="NorthAmerica">North America</label>
      <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="SouthAmerica" value="South-America"><label for="SouthAmerica">South America</label>
      <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="Europe" value="Europe"><label for="Europe">Europe</label>
      <input type="checkbox" @change=${e=>this._changeContinentFilter(e)} id="Oceania" value="Oceania"><label for="Oceania">Oceania</label><br>
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
