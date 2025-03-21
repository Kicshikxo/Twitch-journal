<template>
  <div class="flex flex-1 justify-center items-start">
    <Card>
      <template #content>
        <SelectButton v-model="selectedTab" :options="tabs" :allowEmpty="false" class="w-full" option-label="label" option-value="value" />

        <div class="w-full sm:w-[400px] pt-4">
          <Form v-if="selectedTab === 0" v-slot="$form" :initialValues="{ channel: '', username: '' }" :resolver="viewerResolver" @submit="viewerSubmit" class="w-full">
            <div class="flex flex-col justify-center items-center gap-4">
              <div class="flex flex-col gap-1 w-full">
                <InputText name="username" type="text" placeholder="Имя пользователя" class="w-full" />
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
              </div>
              <Button type="submit" label="Войти" :loading="loading" class="w-full">
                <template #icon>
                  <Icon name="prime:sign-in" class="text-xl" />
                </template>
              </Button>
            </div>
          </Form>

          <Form v-else-if="selectedTab === 1" v-slot="$form" :initialValues="{ channel: '', password: '' }" :resolver="streamerResolver" @submit="streamerSubmit" class="w-full">
            <div class="flex flex-col justify-center items-center gap-4">
              <div class="flex flex-col gap-1 w-full">
                <InputText name="channel" type="text" placeholder="Канал" class="w-full" />
                <Message v-if="$form.channel?.invalid" severity="error" size="small" variant="simple">{{ $form.channel.error.message }}</Message>
              </div>
              <div class="flex flex-col gap-1 w-full">
                <Password name="password" placeholder="Пароль" toggleMask :feedback="false" fluid class="w-full" />
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error.message }}</Message>
              </div>
              <Button type="submit" label="Войти" :loading="loading" class="w-full">
                <template #icon>
                  <Icon name="prime:sign-in" class="text-xl" />
                </template>
              </Button>
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
      channel: z.string().min(1, { message: 'Канал обязателен' }),
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
    toast.add({ severity: 'error', summary: error, life: 3000 })
  }

  loading.value = false
}
</script>

<style scoped>
:deep(.p-togglebutton) {
  flex: 1;
}
</style>
