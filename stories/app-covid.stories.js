import { html } from 'lit';
import '../src/app-covid.js';

export default {
  title: 'AppCovid',
  component: 'app-covid',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <app-covid
      style="--app-covid-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </app-covid>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
