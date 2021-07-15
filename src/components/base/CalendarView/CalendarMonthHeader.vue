<template>
  <div class="single-date-picker__calendar-month-header">
    <div
      class="single-date-picker__arrow left"
      @click="toggleMonth(-1)"
    >
      <fa-icon icon="chevron-left"/>
    </div>
    <div class="single-date-picker__year">
      {{ fullMonth }} {{ year }}
    </div>
    <div
      class="single-date-picker__arrow right"
      @click="toggleMonth(1)"
    >
      <fa-icon icon="chevron-right"/>
    </div>
  </div>
</template>

<script>
const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];
export default {
  props: {
    year: {
      type: Number,
      default: () => 1970
    },
    month: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    fullMonth() {
      return MONTHS[this.month];
    }
  },
  methods: {
    toggleMonth(direction) {
      this.$emit('toggleMonth', direction)
    }
  }
};
</script>

<style lang="scss" scoped>
.single-date-picker__calendar-month-header {
  padding: 15px;
  background-image: linear-gradient(to right, #cab7e7, #a373e8, #772ce8);
  display: flex;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  align-items: center;
  color: #3c2a55;

  .single-date-picker__year {
    font-weight: 900;
    font-size: 20px;
    text-transform: capitalize;
    user-select: none;
  }
  .single-date-picker__arrow {
    cursor: pointer;
  }
}
</style>
