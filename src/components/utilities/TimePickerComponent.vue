<template>
  <div
    class="timeSelect-group"
    v-for="(timeGroup, index) in selectedTimeGroups"
    :key="index"
  >
    <select v-model="selectedStartTimeIndex">
      <option value="-1" disabled>開始時間</option>
      <option
        class="time"
        v-for="(time, index) in timeOptions"
        :value="index"
        :key="index"
      >
        {{ time.HH }}:{{ time.mm }}
      </option>
    </select>
    <select v-model="selectedEndTimeIndex">
      <option value="-1" disabled>結束時間</option>
      <option
        class="time"
        v-for="(time, index) in timeOptions"
        :value="index"
        :key="index"
        :disabled="isDisabled(index)"
      >
        {{ time.HH }}:{{ time.mm }}
      </option>
    </select>
  </div>
  <div class="add" @click="addTimeGroup">+</div>
</template>

<script setup>
import { ref } from "vue";

const timeOptions = ref([]);
const selectedStartTimeIndex = ref(-1);
const selectedEndTimeIndex = ref(-1);

//Option
for (let hours = 0; hours <= 23; hours++) {
  for (let minutes = 0; minutes < 60; minutes += 30) {
    const HH = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    timeOptions.value.push({ HH, mm });
  }
}

// disabled option
const isDisabled = (endIndex) => {
  if (selectedStartTimeIndex.value === -1 || endIndex === -1) {
    // 如果開始時間未選擇，全部disabled
    return true;
  }
  // 比較兩者
  return selectedStartTimeIndex.value >= endIndex;
};

const selectedTimeGroups = ref([1]);
//新增時間群組
const addTimeGroup = () => {
  const newTimeGroup = {
    selectedStartTimeIndex: -1,
    selectedEndTimeIndex: -1,
  };

  // Push new time group
  selectedTimeGroups.value.push(newTimeGroup);
};
</script>

<style lang="scss">
select {
  border: solid 1px gray;
  /*：將預設的select選擇框樣式清除*/
  appearance: none;

  /*在選擇框的最右側中間顯示小箭頭*/
  //
  background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat
    scroll right center transparent;
  padding-right: 14px;
  padding: 0.5rem 0.875rem 0.5rem 0.5rem;
  border-radius: 5px;
  color: gray;
  outline: none;
  margin-bottom: 1rem;

  &:nth-child(2) {
    margin-left: 1rem;
  }
  &:focus {
    border: solid 1px var(--green);
  }
}
.add {
  width: 100%;
  background-color: var(--green);
  text-align: center;
  color: #ffffff;
  border-radius: 5px;

  font-size: 1.25rem;
}
</style>
