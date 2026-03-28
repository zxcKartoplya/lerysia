<script setup lang="ts">
defineProps<{
  title: string
  buttonLabel: string
  paragraphs: string[]
}>()

const isOpen = ref(false)
</script>

<template>
  <section class="panel section-panel reveal-panel">
    <div class="section-heading">
      <p class="section-kicker">Еще кое-что</p>
      <h2>{{ title }}</h2>
    </div>

    <button
      type="button"
      class="button button-primary button-full"
      @click="isOpen = !isOpen"
    >
      {{ buttonLabel }}
    </button>

    <Transition name="fade-slide">
      <div
        v-if="isOpen"
        class="reveal-content"
      >
        <p
          v-for="paragraph in paragraphs"
          :key="paragraph"
        >
          {{ paragraph }}
        </p>
      </div>
    </Transition>
  </section>
</template>
