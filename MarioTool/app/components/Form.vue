<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const state = reactive({
  content: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.content) errors.push({ name: 'email', message: 'Required' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Content" name="content">
      <UInput v-model="state.content" />
    </UFormField>
    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
