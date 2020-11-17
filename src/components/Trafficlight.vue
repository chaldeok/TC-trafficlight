<template>
  <div class="container">
    <div class="frame">
      <div class="square red"
           v-bind:class="{'red-turnOn': isActiveRed && !changeColor}"
      >
        <div class="timer redTimer">{{ redTimer }}</div>
      </div>
      <div class="square yellow"
           v-bind:class="{'yellow-turnOn': isActiveYellow && !changeColor}"
      >
        <div class="timer yellowTimer">{{ yellowTimer }}</div>
      </div>
      <div class="square green"
           v-bind:class="{'green-turnOn': isActiveGreen && !changeColor}"
      >
        <div class="timer greenTimer">{{ greenTimer }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Trafficlight',
  data () {
    return {
      redTimer: 0,
      yellowTimer: 0,
      greenTimer: 0,
      changeColor: false
    }
  },

  computed: {
    isActiveRed: function () {
      return this.$route.params.id === 'red' // 1
    },
    isActiveYellow: function () {
      return this.$route.params.id === 'yellow' // 2
    },
    isActiveGreen: function () {
      return this.$route.params.id === 'green' // 2
    }
  },

  methods: {
    redirectByTimeout: function () {
      if (this.$route.params.id === 'red') {
        this.start = 'red'
      }
      if (this.$route.params.id === 'green') {
        this.start = 'green'
      }

      const that = this

      if (that.timerId !== undefined && that.timerId !== null) {
        clearTimeout(that.timerId)
        that.timerId = null
      }

      if (this.$route.params.id === 'red' && this.start === 'red') {
        that.timerId = setTimeout(function () {
          that.$router.push({ name: 'Trafficlight', params: { id: 'yellow' } })
        }, 10000)
      }

      if (this.$route.params.id === 'yellow' && this.start === 'red') {
        that.timerId = setTimeout(function () {
          that.$router.push({ name: 'Trafficlight', params: { id: 'green' } })
        }, 3000)
      }

      if (this.$route.params.id === 'yellow' && this.start === 'green') {
        that.timerId = setTimeout(function () {
          that.$router.push({ name: 'Trafficlight', params: { id: 'red' } })
        }, 3000)
      }

      if (this.$route.params.id === 'green' && this.start === 'green') {
        that.timerId = setTimeout(function () {
          that.$router.push({ name: 'Trafficlight', params: { id: 'yellow' } })
        }, 15000)
      }
    },
    switchTimers: function () {
      const that = this

      clearInterval(this.intervalId)

      if (this.isActiveRed) {
        this.redTimer = 10
        this.intervalId = setInterval(function () {
          that.redTimer--
        }, 1000)
      } else {
        this.redTimer = ''
      }

      if (this.isActiveYellow) {
        this.yellowTimer = 3
        this.intervalId = setInterval(function () {
          that.yellowTimer--
        }, 1000)
      } else {
        this.yellowTimer = ''
      }

      if (this.isActiveGreen) {
        this.greenTimer = 15
        this.intervalId = setInterval(function () {
          that.greenTimer--
        }, 1000)
      } else {
        this.greenTimer = ''
      }
    },
    changeColorsTiming: function () {
      const that = this
      let timeInterval = 0
      clearTimeout(that.changeColorTimeout)
      clearInterval(that.changeColorInterval)

      if (this.$route.params.id === 'red') {
        timeInterval = 7000
      }
      if (this.$route.params.id === 'yellow') {
        timeInterval = 3000
      }
      if (this.$route.params.id === 'green') {
        timeInterval = 12000
      }

      that.changeColorTimeout = setTimeout(function () {
        that.changeColor = true
        that.changeColorInterval = setInterval(function () {
          that.changeColor = that.changeColor !== true
        }, 500)
      }, timeInterval)
    }
  },
  created: function () {
    if (this.$route.params.id === 'yellow') {
      this.start = 'red'
    }
    this.redirectByTimeout()
    this.switchTimers()
    this.changeColorsTiming()
  },
  watch: {
    '$route' () {
      this.redirectByTimeout()
      this.switchTimers()
      this.changeColorsTiming()
    }
  }
}
</script>

<style lang="scss" scoped>
$frameBackgroundColor: #424242;
$frameBorderColor: #212121;
$light-red: #ef9a9a;
$light-yellow: #fff59d;
$light-green: #a5d6a7;
$red: #d32f2f;
$yellow: #fbc02d;
$green: #388e3c;

* {
  box-sizing: border-box;
}
.container {
  position: relative;
  width: 80vw;
  height: 80vh;
  margin: 0 auto;
}

.frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  display: -webkit-flex;
  display: -o-flex;
  display: -moz-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 450px;
  border: 4px solid $frameBorderColor;
  border-radius: 15px;
  background-color: $frameBackgroundColor;
}

.square {
  display: flex;
  display: -webkit-flex;
  display: -o-flex;
  display: -moz-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 3px solid;
  border-radius: 15px;
  margin: 30px 0;

  transition: background-color .3s ease;
}

.timer {
  font-size: 32px;
  color: $frameBackgroundColor;
}

.red {
  background-color: $light-red;
  border-color: $red;
}

.yellow {
  background-color: $light-yellow;
  border-color: $yellow;
}

.green {
  background-color: $light-green;
  border-color: $green;
}

.red-turnOn.red {
  background-color: $red;
}
.yellow-turnOn.yellow {
  background-color: $yellow;
}
.green-turnOn.green {
  background-color: $green;
}
</style>
