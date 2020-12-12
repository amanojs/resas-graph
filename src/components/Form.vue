<template>
  <div class="Form">
    <form class="search_box">
      <input type="text" class="pref_search" placeholder="都道府県名を入力" />
      <button type="submit">検索</button>
    </form>
    <ul>
      <li v-for="box in boxes" :key="box.code">
        <input
          type="checkbox"
          name="pref"
          v-model="box.checked"
          :id="`pref${box.prefCode}`"
        />
        <label class="prefs" @click="checked(box)">{{ box.prefName }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    boxes: [],
  }),
  mounted() {
    this.getPrefs()
  },
  methods: {
    checked(box) {
      box.checked = !box.checked
    },
    async getPrefs() {
      const RESAS_KEY = process.env.VUE_APP_RESAS_KEY
      if (RESAS_KEY === 'undefind') {
        alert('システムに問題が発生しました')
        console.error('環境変数が読み込めません')
      }
      const { data } = await axios
        .get(process.env.VUE_APP_RESAS_END + '/api/v1/prefectures', {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': RESAS_KEY,
          },
        })
        .catch(error => {
          if (error.response) {
            console.error(error.status + error.response.statusText)
          }
        })
      const prefs = data.result
      for (const pref of prefs) {
        pref.checked = false
        this.boxes = [...this.boxes, pref]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.Form {
  margin: 0 auto;
  width: 100%;
}
.search_box {
  width: 100%;
  margin: 0 0 15px 0;
  padding: 0 0 0 4%;
  text-align: left;
  box-sizing: border-box;

  input[type='text'] {
    width: 20%;
    height: 30px;
    padding: 0 0 0 10px;
    color: #444;
    border: 1px solid #ccc;
    border-right: 0px solid #ccc;
    border-radius: 2px 0 0 2px;
    background-color: #f9f9f9;
    outline: 0;
    box-sizing: border-box;
  }

  button {
    width: 100px;
    height: 30px;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: #16a085;
    border: 1px solid #16a085;
    border-radius: 0 2px 2px 0;
    outline: 0;
    cursor: pointer;
  }
}
.Form ul {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 0 0 2%;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    min-width: 120px;
    height: 35px;
    margin: 5px 2%;
    cursor: pointer;
    background-color: #fff;
    box-shadow: 0 0 8px #eee;

    input[type='checkbox'] {
      display: none;
    }
    .prefs {
      display: inline-block;
      width: auto;
      padding: 5px 30px;
      position: relative;
      box-sizing: border-box;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
    }
    .prefs::before {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 3px;
      content: '';
      display: block;
      height: 16px;
      left: 5px;
      margin-top: -8px;
      position: absolute;
      top: 50%;
      width: 16px;
    }
    .prefs::after {
      border-right: 6px solid #1abc9c;
      border-bottom: 3px solid #1abc9c;
      content: '';
      display: block;
      height: 20px;
      left: 7px;
      margin-top: -16px;
      opacity: 0;
      position: absolute;
      top: 50%;
      transform: rotate(45deg);
      width: 9px;
    }
    input[type='checkbox']:checked + .prefs::before {
      border-color: #666;
    }
    input[type='checkbox']:checked + .prefs::after {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 640px) {
  .search_box {
    padding: 0 4% 0 4%;

    input[type='text'] {
      width: 80%;
      height: 40px;
    }
    button {
      width: 20%;
      height: 40px;
    }
  }
}

@media screen and (max-width: 420px) {
  .search_box {
    padding: 0 2% 0 2%;
  }
  .Form ul {
    justify-content: space-between;
    padding: 0 2% 0 2%;

    li {
      width: 48%;
      margin: 0 0 20px 0;
    }
  }
}
</style>
