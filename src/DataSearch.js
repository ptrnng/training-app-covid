import { LitElement, html, css } from 'lit';
import '@material/mwc-icon';

var debouncer;


export class DataSearch extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      darkMode: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      .searchBox-container {
        margin-left: 15%;
        box-sizing: border-box;
        position: relative;
        padding: 10px 20px 10px 20px;
        width: 70%;
      }
      .search-icon{
        position: absolute;
        left: 36px;
        top: 16px;
      }
      #searchBox{
        border-radius: 2px;
        border-style: solid;
        border-width: 0;
        box-sizing: border-box;
        padding: 8px 16px 8px 52px;
        width: 100%;
        box-shadow:0 4px 10px 0 rgba(0,0,0,0.2),0 4px 20px 0 rgba(0,0,0,0.19);
      }
      @media screen and (max-width: 800px) {
        .searchBox-container {
          margin-left: 10%;
          width: 80%;
        }
      }
      @media screen and (max-width: 400px) {
        .searchBox-container {
          margin-left: 0;
          width: 100%;
        }
      }

      .darkMode #searchBox{
        background-image: linear-gradient(#292D31, #282C30);
      }

    `;
  }

  constructor() {
    super();
    this.data = [];
    this.darkMode = false;
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">
      <div class="searchBox-container ${this.darkMode? 'darkMode': ''}">
        <mwc-icon class="search-icon primary-text">search</mwc-icon>
        <input type="input" id="searchBox" value="" @keyup="${()=>this._onKeyPress()}" placeholder="Search Countries"><br>
      </div>
    `;
  }

  _changeSearchKey(){
    this.dispatchEvent(new CustomEvent('change-search-key', { detail: this.shadowRoot.getElementById('searchBox').value}));
  }

  _onKeyPress(){
    clearTimeout(debouncer);
    debouncer = setTimeout(()=> this._changeSearchKey(), 500);
  }
  
}
