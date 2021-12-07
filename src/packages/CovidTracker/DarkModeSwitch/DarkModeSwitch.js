import { LitElement, html, css } from 'lit';

export class DarkModeSwitch extends LitElement {
  static get properties() {
    return {
      darkMode: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .darkModeSwitch {
        margin-left: 20px;
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }

      .darkModeSwitch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc; //off
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      .slider:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      input:checked + .slider {
        background-color: #fa6840;
      }

      input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    `;
  }

  constructor() {
    super();
    this.darkMode = false;
  }

  render() {
    return html`
      <label class="darkModeSwitch">
        <input
          @change="${this._toggleCheckbox}"
          type="checkbox"
          ${this.darkMode ? 'checked' : ''}
        />
        <span class="slider"></span>
      </label>
    `;
  }

  _toggleCheckbox(e) {
    this.dispatchEvent(
      new CustomEvent('toggle-switch', { detail: e.target.checked })
    );
  }
}
