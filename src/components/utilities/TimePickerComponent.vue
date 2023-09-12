<template>
  <div>
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
</script>

<style lang="scss">
.open-caret {
  transform: rotate(180deg);
  transition: all 0.25s ease-out;
}
.down-caret {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #ffffff transparent transparent transparent;
  display: inline-block;
  margin-left: 6px;
  top: -3px;
  position: relative;
  transform: rotate(0deg);
  transition: all 0.25s ease-in;
}
select {
  border: solid 1px gray;
  /*：將預設的select選擇框樣式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /*在選擇框的最右側中間顯示小箭頭圖片*/
  //
  background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat
    scroll right center transparent; /*為下拉小箭頭留出一點位置，避免被文字覆蓋*/
  // padding-right: 14px;
  padding: 0.5rem 0.875rem 0.5rem 0.5rem;
  // width: 8rem;
  border-radius: 5px;
  color: gray;
  outline: none;

  max-height: 3rem;
  overflow: hidden;
  overflow-y: scroll;

  &:nth-child(2) {
    margin-left: 1rem;
  }
  &:focus {
    border: solid 1px var(--green);
  }
}
</style>
