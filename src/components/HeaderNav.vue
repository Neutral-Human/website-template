<script setup lang="ts">
import { ref, watch } from "vue"
import ToggleSwitch from 'primevue/toggleswitch'
import Drawer from 'primevue/drawer';
import Config from '../config'

const menuOpen = ref(false)
const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const darkToggle = ref(localStorage.getItem('theme') === 'dark' ||
    (localStorage.getItem('theme') === null && preferDark))

document.documentElement.classList.toggle('dark', darkToggle.value)

watch(darkToggle, (val) => {
    document.documentElement.classList.toggle('dark', val)
    localStorage.setItem('theme', val ? 'dark' : 'light')
})
</script>
<template>
    <header :class="$style.site_header">
        <div class="logo-container"><RouterLink to="/">{{ Config.websiteTitle }}</RouterLink></div>
        <div :class="$style.link_container">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/links">Links</RouterLink>
            <RouterLink to="/info">Info</RouterLink>
            <div :class="$style.dark_container">
                <div :class="[$style.light, $style.icon]"></div><ToggleSwitch v-model="darkToggle" /><div :class="[$style.dark, $style.icon]"></div>
            </div>
        </div>
        <button :class="[$style.hamburger, $style.icon]" @click="menuOpen = !menuOpen">
            <!--<img :src="menuOpen ? '/icons/close.svg' : '/icons/menu.svg'" alt="menu icon" :class="[$style.menu_toggle, $style.icon]" />-->
        </button>
        <Drawer header="Navigation Menu" v-model:visible="menuOpen" position="right">
            <RouterLink to="/" @click="menuOpen = false">Home</RouterLink><br>
            <RouterLink to="/about" @click="menuOpen = false">About</RouterLink><br>
            <RouterLink to="/links" @click="menuOpen = false">Links</RouterLink><br>
            <RouterLink to="/info" @click="menuOpen = false">Info</RouterLink><br>
            <div :class="$style.dark_container">
                <div :class="[$style.light, $style.icon]"></div><ToggleSwitch v-model="darkToggle" /><div :class="[$style.dark, $style.icon]"></div>
            </div>
        </Drawer>
    </header>
</template>

<style module>
.site_header {
  box-shadow: 0 0px 48px 0 rgba(0, 0, 0, .1);
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--primary-color);
  color: var(--sub-color);
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  z-index: 1000;
  justify-content: space-between;
}

.link_container {
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 1rem;
}
    
.dark_container {
  font-family: "Material Symbols Outlined";
  display: flex;
  align-items: center;
  gap: 0.25rem;
  -webkit-user-select: none; /* Safari */
  user-select: none;
  color: var(--text-color);
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  mask-image: url("/icons/menu/menu.svg");
  -webkit-mask-image: url("/icons/menu/menu.svg");
}

.icon {
  width: 24px;
  height: 24px;
  background-color: var(--sub-color);

  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;

  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
}

.dark {
  mask-image: url("/icons/menu/dark.svg");
  -webkit-mask-image: url("/icons/menu/dark.svg");
}

.light {
  mask-image: url("/icons/manu/light.svg");
  -webkit-mask-image: url("/icons/menu/light.svg");
}

@media (max-width: 768px) {
  .link_container {
    display: none;
  }
  .hamburger {
    display: block;
  }
}
</style>
