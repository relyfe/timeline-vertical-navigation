import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'timeline-vertical-navigation',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: 'timeline-vertical-navigation',
      proxiesFile: './src/components/timeline-vertical-navigation/timeline-vertical-navigation.tsx',
      includeDefineCustomElements: true,
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
