<script setup>
const scanResult = ref(null)
const isLoading = ref(false)
const error = ref(null)
const fileInput = ref(null)

async function performScan(data) {
  isLoading.value = true
  error.value = null

  try {
    const response = await $fetch('/api/scan', {
      method: 'POST',
      body: { data }
    })

    scanResult.value = response.result
  } catch (err) {
    error.value = err.message || 'Failed to perform scan'
  } finally {
    isLoading.value = false
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    // Pass the file data to performScan
    performScan(e.target.result)
  }
  reader.onerror = () => {
    error.value = 'Failed to read file'
  }
  
  // Read file as data URL
  reader.readAsDataURL(file)
}
</script>

<template>
  <div>
    <div class="upload-container">
      <input 
        type="file" 
        ref="fileInput"
        @change="handleFileUpload" 
        accept="image/*"
        id="file-upload"
        class="hidden-input"
      />
      <label for="file-upload" class="upload-button">
        Upload Document
      </label>
      
      <button @click="performScan('example data')" :disabled="isLoading">
        Scan Example
      </button>
    </div>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="scanResult">
      <!-- Display scan results -->
      <pre>{{ scanResult }}</pre>
    </div>
  </div>
</template>

<style scoped>
.upload-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.hidden-input {
  display: none;
}

.upload-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}

.upload-button:hover {
  background-color: #45a049;
}
</style>
