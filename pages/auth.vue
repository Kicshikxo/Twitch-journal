<template>
  <div class="card flex justify-center">
    <Toast />

    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="w-full">
      <div class="flex flex-col justify-center items-center gap-4">
        <InputText name="password" type="text" placeholder="password" class="w-full" />
        <Button type="submit" severity="secondary" label="Submit" class="w-full" />
      </div>
    </Form>
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'

definePageMeta({
  auth: false,
})

const toast = useToast()
const { login } = useAuth()

const initialValues = ref({
  password: '',
})

const resolver = ({ values }) => {
  const errors = { password: [] }

  if (!values.password) {
    errors.password.push({ type: 'required', message: 'password is required.' })
  }

  if (values.password?.length < 3) {
    errors.password.push({ type: 'minimum', message: 'password must be at least 3 characters long.' })
  }

  return {
    values,
    errors,
  }
}

const onFormSubmit = async ({ valid, values }) => {
  if (valid) {
    const {error} = await login({ password: values.password, redirectTo: useRoute().query.redirectTo ?? '/' })
    console.log(error)
    if (error) {
      toast.add({ severity: 'error', summary: error, life: 3000 })
    }
  }
}
</script>
