<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

// Everything to get the sheet data
const sheetData = ref([]);
const loading = ref(true);
const error = ref(null);


// Get the sheet data
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


const state = useState('form', () => ({
  content: undefined,
  name: undefined,
  project: undefined,
}))

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ name: 'name', message: 'Required' })
  if (!state.project) errors.push({ name: 'project', message: 'Required' })
  return errors
}

const emit = defineEmits(['submit'])
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  emit('submit', event.data)
}



</script>

<template>
  <div v-if="loading">
    LOADING
  </div>
  <UForm v-else :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <USelect v-model="state.project" :items="sheetData" class="w-48" />
    <UFormField label="Content" name="content">
      <UInput v-model="state.content" />
    </UFormField>
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormField>
    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
