<template>
  <div class="profile-body tab-timeline">
    <div class="card-block">
      <h1>Последняя трансляция Ron_Tayler была 1 день назад</h1>
      <div class="timeline-btn-box">
        <div class="btn btn-blue" @click="setNowWeek">Сегодня</div>
        <div class="btn btn-light" @click="backWeek">
          <fa-icon icon="chevron-left"></fa-icon>
        </div>
        <div class="btn btn-light" @click="nextWeek">
          <fa-icon icon="chevron-right"></fa-icon>
        </div>
        <div class="dropdown-box" style="display: inline-block">
          <div class="btn btn-light" @click="isDDM = !isDDM">
            <fa-icon icon="calendar-alt"></fa-icon>
          </div>
          <div
            class="dropdown-menu dropdown-right timeline-calendar-box"
            v-if="isDDM"
          >
            <calendar-view @selectDate="selectDate" />
          </div>
        </div>

        <span class="timeline-date-between">{{ between_text }}</span>
      </div>
      <div class="timeline-grid">
        <div class="timeline-timezone">
          <span>{{ gmt }}</span>
        </div>
        <div class="timeline-hours-line">
          <div
            class="hours-box"
            v-for="(hour, i) in timelineHours"
            :key="i"
            :class="{ active: hour.date === hour_active }"
          >
            <span class="hours">{{ hour.name }}</span>
          </div>
        </div>
        <template v-for="(day, i) in timelineDays">
          <div
            class="timeline-day-info"
            :key="i * 2"
            :class="{ active: day.str === day_active }"
          >
            <span>{{ day.name }}</span>
            <span>{{ day.date }}</span>
          </div>
          <div
            class="timeline-day-line"
            :key="i * 2 + 1"
            :class="{ active: day.str === day_active }"
          >
            <transition-group :name="transName">
              <div
                class="timeline-card"
                v-for="card in week_cards[i]"
                :key="card.UTC_timestamp_start"
                :style="getStylePos4time(card)"
              >
                <span class="timeline-card-name">{{ card.name }}</span>
                <span>
                  <span class="timeline-card-category"
                    >{{ card.category }} </span
                  >•
                  <span class="timeline-card-view">
                    {{ card.views }} просмотров</span
                  >
                </span>
                <span class="timeline-card-time">{{ card.time_ago }}</span>
                <div class="timeline-card-img">
                  <img :src="card.img" alt="" />
                </div>
              </div>
            </transition-group>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarView from "@/components/base/CalendarView";

export default {
  name: "timeline",
  WEEKDAYS: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  MONTH: {
    en: [
      "jan.",
      "feb.",
      "mar.",
      "apr.",
      "may.",
      "jun.",
      "jul.",
      "aug.",
      "sep.",
      "oct.",
      "nov.",
      "dec.",
    ],
    ru: [
      "янв.",
      "фев.",
      "мар.",
      "арп.",
      "май.",
      "июн.",
      "июл.",
      "авг.",
      "сен.",
      "окт.",
      "ноя.",
      "дек.",
    ],
  },
  props: ["user_id"],
  components: { CalendarView },
  data: () => ({
    timeline_start: 12,
    timeline_finish: 18,
    week_cards: Array(7),
    week_start: null,
    day_active: null,
    hour_active: null,

    gmt: "",
    transName: "timeline-card-next",

    isDDM: false,

    handle_interval: null,
  }),
  computed: {
    between_text() {
      let week_start = new Date(this.week_start);
      let week_finish = new Date(this.week_start + 6 * 24 * 60 * 60 * 1000);
      return (
        week_start.getDate() +
        " " +
        this.$options.MONTH[this.$store.getters.getLang][
          week_start.getMonth()
        ] +
        " " +
        week_start.getFullYear() +
        "г. - " +
        week_finish.getDate() +
        " " +
        this.$options.MONTH[this.$store.getters.getLang][
          week_finish.getMonth()
        ] +
        " " +
        week_finish.getFullYear() +
        "г."
      );
    },
    timelineHours() {
      let arr = Array(this.timeline_finish - this.timeline_start + 1);
      for (let i = 0; i < this.timeline_finish - this.timeline_start + 1; i++) {
        let hour = this.timeline_start + i;
        arr[i] = {
          name: hour < 10 ? "0" + hour : hour,
          date: hour,
        };
      }
      return arr;
    },
    timelineDays() {
      let arr = Array(7);
      for (let i = 0; i < 7; i++) {
        let day = new Date(this.week_start);
        day.setDate(day.getDate() + i);
        arr[i] = {
          name: this.$options.WEEKDAYS[day.getDay()],
          date:
            (day.getDate() < 10 ? "0" : "") +
            day.getDate() +
            "." +
            (day.getMonth() + 1 < 10 ? "0" : "") +
            (day.getMonth() + 1),
          str: day.toDateString(),
        };
      }
      return arr;
    },
  },
  methods: {
    getStylePos4time(card) {
      let dateStart = new Date(card.UTC_timestamp_start);
      let dateFinish = new Date(
        card.UTC_timestamp_start + card.length_seconds * 1000
      );
      let el_s = { h: dateStart.getHours(), m: dateStart.getMinutes() };
      let el_f = { h: dateFinish.getHours(), m: dateFinish.getMinutes() };
      let tl_s = this.timeline_start;
      let tl_f = this.timeline_finish;
      let count_h = tl_f - tl_s + 1;
      let left =
        (100 / count_h) * (el_s.h - tl_s) + (100 / count_h / 60) * el_s.m;
      let right =
        100 - (100 / count_h) * (el_f.h - tl_s) - (100 / count_h / 60) * el_f.m;
      left = Math.max(left, 0);
      right = Math.max(right, 0);
      return {
        left: left + "%",
        right: right + "%",
        "border-top-left-radius": left === 0 ? "0" : "5px",
        "border-bottom-left-radius": left === 0 ? "0" : "5px",
        "border-top-right-radius": right === 0 ? "0" : "5px",
        "border-bottom-right-radius": right === 0 ? "0" : "5px",
      };
    },
    windowResize() {
      // TODO Сделать ширину карточек по правилу пикселей и повесить событие на WindowResize
    },
    getTimezone4offset(offset) {
      let gmt_h = Math.abs((offset - (offset % 60)) / 60);
      let gmt_m = Math.abs(offset % 60);
      return offset === 0
        ? "GMT"
        : (offset > 0 ? "GMT+" : "GMT-") +
            gmt_h +
            (gmt_m === 0 ? "" : ":" + (gmt_m < 10 ? "0" + gmt_m : gmt_m));
    },
    setActiveHour8Day() {
      let now = new Date();
      this.hour_active = now.getHours();
      this.day_active = now.toDateString();
    },
    setWeek(date) {
      this.week_start = new Date(
        date.valueOf() - (date.getDay() - 1) * 24 * 60 * 60 * 1000
      ).valueOf();
    },
    setNowWeek() {
      let now = new Date();
      now.setDate(now.getDate() - now.getDay() + 1);
      now.setHours(0, 0, 0, 0);
      this.week_start = now.valueOf();
    },
    nextWeek() {
      this.week_start += 7 * 24 * 60 * 60 * 1000;
    },
    backWeek() {
      this.week_start -= 7 * 24 * 60 * 60 * 1000;
    },
    selectDate(date) {
      let day = new Date(date.year, date.month, date.date);
      this.setWeek(day);
      this.isDDM = false;
    },
  },
  watch: {
    week_start(week_start, old) {
      if (week_start > old) {
        this.transName = "timeline-card-next";
      } else {
        this.transName = "timeline-card-back";
      }

      this.week_cards = Array(7);
      let week_finish = week_start + 7 * 24 * 60 * 60 * 1000;
      let streams = this.$store.getters.getUser4id(this.user_id).streams;
      let filteredStreams = streams.filter((stream) => {
        return (
          stream.UTC_timestamp_start > week_start &&
          stream.UTC_timestamp_start < week_finish
        );
      });
      for (let weekDay = 0; weekDay < 7; weekDay++) {
        this.week_cards[weekDay] = filteredStreams.filter((stream) => {
          return (
            stream.UTC_timestamp_start >
              week_start + weekDay * 24 * 60 * 60 * 1000 &&
            stream.UTC_timestamp_start <
              week_start + (weekDay + 1) * 24 * 60 * 60 * 1000
          );
        });
      }
    },
  },
  mounted() {
    this.gmt = this.getTimezone4offset(new Date().getTimezoneOffset() * -1);
    this.setActiveHour8Day();
    this.handle_interval = setInterval(this.setActiveHour8Day, 60 * 1000);
    this.setNowWeek();
  },
  destroyed() {
    clearInterval(this.handle_interval);
  },
};
</script>
<style lang="scss" src="./timeline.scss"/>
