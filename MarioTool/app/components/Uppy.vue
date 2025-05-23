<template>
  <div>
    <div id="dashboard-container"></div>
    <!-- Display selected files -->
    <div v-if="files.length">
      <h3>Selected Files:</h3>
      <ul>
        <li v-for="file in files" :key="file.id">
          {{ file.name }} ({{ formatSize(file.size) }})
        </li>
      </ul>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()
const uppy = ref(null)
const files = ref([])


const props = defineProps({
  docId: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'photos'
  }
});

// Format file size to human readable format
const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' bytes'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else return (bytes / 1048576).toFixed(1) + ' MB'
}


const emit = defineEmits(['upload-success']);


onMounted(() => {
  // Create and configure Uppy instance
  uppy.value = nuxtApp.$uppy({
    core: {
      autoProceed: false,
      restrictions: {
        maxFileSize: 10000000, // 10MB
        maxNumberOfFiles: 5,
        allowedFileTypes: ['image/*', '.pdf', '.docx']
      }
    },
    dashboard: {
      target: '#dashboard-container',
      height: 400,
      proudlyDisplayPoweredByUppy: false
    },
    endpoint: '/api/upload',
    fields: {
      docId: props.docId,
      finalise: (props.type === 'photos')
    },
  })

  // Listen for file selection
  uppy.value.on('file-added', (file) => {
    files.value.push({
      id: file.id,
      name: file.name,
      size: file.size,
      type: file.type
    })
  })

  // Listen for file removal
  uppy.value.on('file-removed', (file) => {
    const index = files.value.findIndex(f => f.id === file.id)
    if (index !== -1) {
      files.value.splice(index, 1)
    }
  })

  // Listen for successful upload
  uppy.value.on('upload-success', (file, response) => {
    // add an emit to parent component
    console.log('Upload successful', file.name, response);
    emit('upload-success', file.name, response, props.type);

  })
})

// Clean up Uppy instance when component is destroyed
// onBeforeUnmount(() => {
//   if (uppy.value) {
//     uppy.value.close()
//   }
// })
</script>
