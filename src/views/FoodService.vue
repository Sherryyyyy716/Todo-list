<template>
  <div>
    <h1>Food Service</h1>
    <div class="wrapper" v-for="(item, index) in items" :key="index">
      <div>星期{{ item.weekday }}</div>
      <div
        class="toggle-switch"
        @click="toggleSwitch(index)"
        :class="{ on: isOn[index], off: !isOn[index] }"
      >
        <div
          class="switch-content"
          :class="{ on: isOn[index], off: !isOn[index] }"
        >
          {{ isOn[index] ? "V" : "X" }}
        </div>
      </div>
      <div class="serveMode">
        <div v-if="isOn[index]">本日供餐</div>
        <div v-else>本日不供餐</div>
      </div>
      <div class="selector-group" v-if="isOn[index]">
        <TimePickerComponent />
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TimePickerComponent from "@/components/utilities/TimePickerComponent.vue";

const IsOn = computed(() => ({
  on: isOn.value,
  off: !isOn.value,
}));

const isOn = ref(Array(7).fill(false));
const numberOfDays = 7;

const initializeIsOnArray = () => {
  const isOnArray = [];
  for (let i = 0; i < numberOfDays; i++) {
    isOnArray.push(false);
  }
  return isOnArray;
};

const items = [
  { weekday: "一" },
  { weekday: "二" },
  { weekday: "三" },
  { weekday: "四" },
  { weekday: "五" },
  { weekday: "六" },
  { weekday: "日" },
];

const toggleSwitch = (index) => {
  isOn.value[index] = !isOn.value[index];
};
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 1rem;
}
.wrapper {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  font-weight: 600;
}

.toggle-switch {
  border: solid 1px #d3d3d3;
  height: 24px;
  width: 40px;
  display: block;
  border-radius: 24px;
  position: relative;
  text-align: center;
  cursor: pointer;
  transition: left 0.2s ease;
  &.on {
    background: var(--green);
  }
  &.off {
    background: gray;
  }
  & .switch-content {
    height: 1rem;
    width: 1rem;
    font-size: 0.5rem;
    border-radius: 100%;
    color: #fff;
    position: absolute;
    line-height: 14px;
    transition: left 0.2s ease;
    background-color: #fff;

    top: 50%;
    left: 3px;
    left: 3px;
    transform: translate(0, -50%);
    &.on {
      color: var(--green);
      left: 19px;
    }
    &.off {
      color: gray;
      left: 3px;
    }
  }
}
.serveMode {
  div {
    width: 5rem;
  }
}
.line {
  width: 70%;
  position: absolute;
  background-color: #d3d3d3;
  height: 1px;
  bottom: -1rem;
}
</style>
