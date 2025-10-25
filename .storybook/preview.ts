import type { Preview } from '@storybook/angular';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@angular/localize/init';
import { setCompodocJson } from '@storybook/addon-docs/angular'; 
import docJson from '../documentation.json';


setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'app background',
      values: [
        { name: 'app background', value: '#000000' }
      ],
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        laptop: {
          name: 'Laptop (1024px)',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        mobile: {
          name: 'Mobile (375px)',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
      },
      defaultViewport: 'responsive',
    },
  },
};

export default preview;
