// plugins/uppy.client.js

import { defineNuxtPlugin } from '#app'
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Transloadit from '@uppy/transloadit';
import ImageEditor from '@uppy/image-editor';


export default defineNuxtPlugin((nuxtApp) => {
  // Create a function that returns a configured Uppy instance
  const createUppy = (options = {}) => {


    const uppy = new Uppy(options.core || {})
      .use(Dashboard, {
        inline: true,
        target: options.target || '#uppy-dashboard',
        showProgressDetails: true,
        ...options.dashboard
      })
      .use(Transloadit, {
        assemblyOptions: {
          params: {
            auth: {key: '8294df4e720bf5f0eed647e7108a7912'},
            template_id: '2865864e2d44437ba853e4080c94d459',
          },
          fields: {
            ...options.fields
          },
        },
      })
    .use(ImageEditor);


    uppy.on('transloadit:assembly-created', (assembly, fileIDs) => {});
    uppy.on('transloadit:upload', (file, assembly) => {});
    uppy.on('transloadit:assembly-executing', (assembly) => {});
    uppy.on('transloadit:result', (stepName, result, assembly) => {});
    uppy.on('transloadit:complete', (assembly) => {});



    return uppy
  }

  // Make it available throughout your app
  nuxtApp.provide('uppy', createUppy)
})
