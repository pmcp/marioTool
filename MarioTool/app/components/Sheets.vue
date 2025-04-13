<!-- components/SheetData.vue -->
<template>
  <USelect v-model="value" :items="sheetData" class="w-48" />
</template>

<script setup>
const sheetData = ref([]);
const loading = ref(true);
const error = ref(null);
const value = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/api/sheets');
    const result = await response.json();

    if (result.success) {
      sheetData.value = result.data;
    } else {
      error.value = result.error;
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>
