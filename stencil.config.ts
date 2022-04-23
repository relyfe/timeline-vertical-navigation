import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'timeline-vertical-navigation',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: 'react-timeline-vertical-navigation',
      proxiesFile: '../react-timeline-vertical-navigation/src/index.ts',
    }),
    { type: 'docs-readme' },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
