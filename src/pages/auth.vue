<template>
  <div class="flex flex-1 justify-center items-start">
    <Card>
      <template #content>
        {{ errorLabel }}
        <SelectButton v-model="selectedTab" :options="tabs" :allowEmpty="false" class="w-full" option-label="label" option-value="value" />

        <div class="w-full sm:w-[400px] pt-4">
          <Form v-show="selectedTab === 0" v-slot="$form" :initialValues="{ channel: '', username: '' }" :resolver="viewerResolver" @submit="viewerSubmit" class="w-full">
            <div class="flex flex-col justify-center items-center gap-4">
              <div class="flex flex-col gap-1 w-full">
                <FloatLabel variant="in">
                  <IconField>
                    <InputIcon><Icon name="prime:user" class="text-xl" /></InputIcon>
                    <InputText name="username" type="text" class="w-full" />
                  </IconField>
                  <label for="username">Имя пользователя</label>
                </FloatLabel>
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
              </div>
              <Button type="submit" label="Войти" :loading="loading" class="w-full" />
            </div>
          </Form>

          <Form v-show="selectedTab === 1" v-slot="$form" :initialValues="{ channel: '', password: '' }" :resolver="streamerResolver" @submit="streamerSubmit" class="w-full">
            <div class="flex flex-col justify-center items-center gap-4">
              <div class="flex flex-col gap-1 w-full">
                <FloatLabel variant="in">
                  <IconField>
                    <InputIcon><Icon name="prime:users" class="text-xl" /></InputIcon>
                    <InputText name="channel" type="text" class="w-full" />
                  </IconField>
                  <label for="channel">Название канала</label>
                </FloatLabel>
                <Message v-if="$form.channel?.invalid" severity="error" size="small" variant="simple">{{ $form.channel.error.message }}</Message>
              </div>
              <div class="flex flex-col gap-1 w-full">
                <FloatLabel variant="in">
                  <IconField>
                    <InputIcon><Icon name="prime:lock" class="text-xl" /></InputIcon>
                    <Password name="password" toggleMask :feedback="false" fluid class="w-full" />
                  </IconField>
                  <label for="password">Пароль</label>
                </FloatLabel>
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error.message }}</Message>
              </div>
              <Button type="submit" label="Войти" :loading="loading" class="w-full" />
            </div>
          </Form>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'
import { z } from 'zod'

definePageMeta({
  auth: false,
})

const { loginAsStreamer, loginAsViewer } = useAuth()
const toast = useToast()
const loading = ref(false)
const tabs = ref([
  { label: 'Зритель', value: 0 },
  { label: 'Стример', value: 1 },
])
const selectedTab = ref(0)
const errorLabel = ref('')

const viewerResolver = ref(
  zodResolver(
    z.object({
      username: z.string().min(1, { message: 'Имя пользователя обязательно' }),
    }),
  ),
)

const streamerResolver = ref(
  zodResolver(
    z.object({
      channel: z.string().min(1, { message: 'Название канала обязательно' }),
      password: z.string().min(1, { message: 'Пароль обязателен' }),
    }),
  ),
)

const viewerSubmit = async ({ valid, values }) => {
  if (!valid) return

  loading.value = true

  const { error } = await loginAsViewer({
    username: values.username,
    redirectTo: useRoute().query.redirectTo ?? '/',
  })

  if (error) {
    toast.add({ severity: 'error', summary: error, life: 3000 })
  }

  loading.value = false
}

const streamerSubmit = async ({ valid, values }) => {
  if (!valid) return

  loading.value = true

  const { error } = await loginAsStreamer({
    channel: values.channel,
    password: values.password,
    redirectTo: useRoute().query.redirectTo ?? '/',
  })

  if (error) {
    errorLabel.value = error
    console.log(toast)
    console.log(toast.add({ severity: 'error', summary: error, life: 3000 }))
  }

  loading.value = false
}
</script>

<style scoped>
:deep(.p-togglebutton) {
  flex: 1;
}
</style>
