<script setup>
const scanResult = ref(null)
const isLoading = ref(false)
const error = ref(null)

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
</script>

<template>
  <div>
    <button @click="performScan('example data')" :disabled="isLoading">
      Scan
    </button>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="scanResult">
      <!-- Display scan results -->
      <pre>{{ scanResult }}</pre>
    </div>
  </div>
</template>
