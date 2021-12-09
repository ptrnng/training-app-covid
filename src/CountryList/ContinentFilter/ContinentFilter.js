import { LitElement, html, css } from 'lit';

export class ContinentFilter extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      continentFilter: { type: Array },
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
      .filter-icon {
        position: absolute;
        left: 26px;
        top: 16px;
      }
      .filter-container div {
        width: 30%;
      }
      input[type='checkbox'] {
        background: red;
      }
      label {
        box-sizing: border-box;
        margin: 0 30px 0 0;
      }
      @media screen and (max-width: 1007px) {
        .filter-container div {
          width: 50%;
        }
        .filter-container {
          margin-left: 10%;
          width: 80%;
        }
      }
      @media screen and (max-width: 640px) {
        .filter-container div {
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
  }

  render() {
    const continents = [
      'Asia',
      'Africa',
      'North-America',
      'South-America',
      'Europe',
      'Oceania',
    ];
    return html`
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons%26display=block"
        rel="stylesheet"
      />
      <div class="filter-container">
        <mwc-icon class="filter-icon primary-text">filter_alt</mwc-icon>
        ${continents.map(
          continent => html`
            <div>
              <input
                type="checkbox"
                @change=${e => this._changeContinentFilter(e)}
                id="${continent}"
                .value="${continent}"
              />
              <label for="${continent}">${continent}</label>
            </div>
          `
        )}
      </div>
    `;
  }

  _changeContinentFilter(e) {
    if (e.target.checked) this.continentFilter.push(e.target.value);
    else
      this.continentFilter = this.continentFilter.filter(
        continent => continent !== e.target.value
      );

    this.dispatchEvent(
      new CustomEvent('change-continent-filter', {
        detail: this.continentFilter,
      })
    );
  }
}
