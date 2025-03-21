<template>
  <div class="flex flex-1 justify-center items-start">
    <Card>
      <template #title>
        <span>Смена пароля</span>
      </template>
      <template #content>
        <Form v-slot="$form" :initialValues="{ password: '', repeatPassword: '' }" :resolver="changePasswordResolver" @submit="changePasswordSubmit" class="w-full sm:w-[400px]">
          <div class="flex flex-col justify-center items-center gap-4">
            <div class="flex flex-col gap-1 w-full">
              <FloatLabel variant="in">
                <IconField>
                  <InputIcon><Icon name="prime:lock" class="text-xl" /></InputIcon>
                  <Password name="password" toggleMask :feedback="false" fluid class="w-full" />
                </IconField>
                <label for="password">Новый пароль</label>
              </FloatLabel>
              <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error.message }}</Message>
            </div>
            <div class="flex flex-col gap-1 w-full">
              <FloatLabel variant="in">
                <IconField>
                  <InputIcon><Icon name="prime:lock" class="text-xl" /></InputIcon>
                  <Password name="repeatPassword" toggleMask :feedback="false" fluid class="w-full" />
                </IconField>
                <label for="repeatPassword">Повторите пароль</label>
              </FloatLabel>
              <Message v-if="$form.repeatPassword?.invalid" severity="error" size="small" variant="simple">{{ $form.repeatPassword.error.message }}</Message>
            </div>
            <Button type="submit" label="Сменить пароль" :loading="loading" class="w-full" />
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms/form'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

const toast = useToast()
const loading = ref(false)

const changePasswordResolver = ref(
  zodResolver(
    z
      .object({
        password: z.string().min(1, { message: 'Пароль обязателен' }),
        repeatPassword: z.string().min(1, { message: 'Повторите пароль' }),
      })
      .refine((form) => form.password === form.repeatPassword, {
        message: 'Пароли не совпадают',
        path: ['repeatPassword'],
      }),
  ),
)

const changePasswordSubmit = async ({ valid, values, reset }: FormSubmitEvent) => {
  if (!valid) return

  loading.value = true

  try {
    await $fetch('/api/channel/change-password', {
      method: 'POST',
      body: {
        password: values.password,
        repeatPassword: values.repeatPassword,
      },
    })

    toast.add({ severity: 'success', summary: 'Пароль изменён', life: 3000 })
    reset()
  } catch (error: any) {
    toast.add({ severity: 'error', summary: error.statusMessage, life: 3000 })
  }

  loading.value = false
}
</script>
