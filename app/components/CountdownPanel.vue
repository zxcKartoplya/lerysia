<script setup lang="ts">
const props = defineProps<{
  date: string
  label: string
  pastLabel: string
}>()

const parts = ref({
  days: '00',
  hours: '00',
  minutes: '00',
})

const hasInvalidDate = ref(false)
const hasPassed = ref(false)

let timer: ReturnType<typeof setInterval> | undefined

const updateCountdown = () => {
  const target = Date.parse(props.date)

  if (Number.isNaN(target)) {
    hasInvalidDate.value = true
    return
  }

  hasInvalidDate.value = false

  const difference = target - Date.now()

  if (difference <= 0) {
    hasPassed.value = true
    parts.value = {
      days: '00',
      hours: '00',
      minutes: '00',
    }
    return
  }

  hasPassed.value = false

  const totalMinutes = Math.floor(difference / 1000 / 60)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  parts.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
  }
}

onMounted(() => {
  updateCountdown()
  timer = window.setInterval(updateCountdown, 30000)
})

watch(() => props.date, updateCountdown)

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})
</script>

<template>
  <section class="panel section-panel countdown-panel">
    <div class="section-heading">
      <p class="section-kicker">Отсчет</p>
      <h2>{{ hasPassed ? pastLabel : label }}</h2>
    </div>

    <p
      v-if="hasInvalidDate"
      class="body-copy"
    >
      Укажи корректную дату в `app/app.config.ts`, чтобы показать таймер.
    </p>

    <div
      v-else
      class="countdown-grid"
    >
      <article class="countdown-card">
        <span class="countdown-value">{{ parts.days }}</span>
        <span class="countdown-label">дней</span>
      </article>

      <article class="countdown-card">
        <span class="countdown-value">{{ parts.hours }}</span>
        <span class="countdown-label">часов</span>
      </article>

      <article class="countdown-card">
        <span class="countdown-value">{{ parts.minutes }}</span>
        <span class="countdown-label">минут</span>
      </article>
    </div>
  </section>
</template>
