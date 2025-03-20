<template>
  <div class="flex flex-1 justify-center items-start">
    <Tabs value="0" class="w-full sm:w-[400px]">
      <TabList>
        <Tab value="0">Зритель</Tab>
        <Tab value="1">Стример</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0" class="py-2">
          <Form v-slot="$form" :initialValues="{ channel: '', username: '' }" @submit="viewerSubmit" class="w-full">
            <div class="flex flex-col justify-center items-center gap-4">
              <InputText name="username" type="text" placeholder="Имя пользователя" class="w-full" />
              <Button type="submit" label="Войти" :loading="loading" class="w-full" />
            </div>
          </Form>
        </TabPanel>
        <TabPanel value="1" class="py-2">
          <Form v-slot="$form" :initialValues="{ channel: '', password: '' }" @submit="streamerSubmit" class="w-full">
            <div class="flex flex-col justify-center items-center gap-4">
              <InputText name="channel" type="text" placeholder="Канал" class="w-full" />
              <Password name="password" placeholder="Пароль" toggleMask :feedback="false" fluid class="w-full" />
              <Button type="submit" label="Войти" :loading="loading" class="w-full" />
            </div>
          </Form>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'

definePageMeta({
  auth: false,
})

const toast = useToast()
const { loginAsStreamer, loginAsViewer } = useAuth()
const loading = ref(false)

const streamerSubmit = async ({ values }) => {
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

const viewerSubmit = async ({ values }) => {
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
</script>
