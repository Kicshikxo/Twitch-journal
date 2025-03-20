<template>
  <div class="card flex justify-center gap-8">
    <Toast />

    <Form v-slot="$form" :initialValues="{ channel: '', password: '' }" @submit="adminSubmit" class="w-full max-w-[320px]">
      <div class="flex flex-col justify-center items-center gap-4">
        <span>Admin login</span>
        <InputText name="channel" type="text" placeholder="channel" class="w-full" />
        <InputText name="password" type="password" placeholder="password" class="w-full" />
        <Button type="submit" severity="secondary" label="Submit" class="w-full" />
      </div>
    </Form>

    <Form v-slot="$form" :initialValues="{ channel: '', username: '' }" @submit="userSubmit" class="w-full max-w-[320px]">
      <div class="flex flex-col justify-center items-center gap-4">
        <span>User login</span>
        <InputText name="channel" type="text" placeholder="channel" class="w-full" />
        <InputText name="username" type="text" placeholder="username" class="w-full" />
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
const { adminLogin, userLogin } = useAuth()

const adminSubmit = async ({ values }) => {
  const { error } = await adminLogin({
    channel: values.channel,
    password: values.password,
    redirectTo: useRoute().query.redirectTo ?? '/',
  })

  if (error) {
    toast.add({ severity: 'error', summary: error, life: 3000 })
  }
}

const userSubmit = async ({ values }) => {
  const { error } = await userLogin({
    channel: values.channel,
    username: values.username,
    redirectTo: useRoute().query.redirectTo ?? '/',
  })

  if (error) {
    toast.add({ severity: 'error', summary: error, life: 3000 })
  }
}
</script>
