<template>
  <div>
    <header>
        <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form v-bind:value="query" v-on:@submit="onSubmit" v-on:@reset="onReset"></search-form>
    </div>
  </div>
</template>

<script>
import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './components/FormComponent.vue'

export default {
  name: 'app',
  data () {
    return {
      query: '',
      submitted: false,
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab: '',
      keywords: [], //추천검색어 데이터
      history: [],
      searchResult: []
    }
  },
  components: {
    'search-form': FormComponent
  },
  methods: {
    onSubmit(query){ //query 는 inputValue 값이다
        this.query = query
        this.search()
    },
    onReset(e){
        this.resetForm()
    },
    onClickTab(tab){
        this.selectedTab = tab
    },
    onClickKeyword(keyword){
        this.query = keyword  //클릭된 item이 입력값으로 바인딩된다
        this.search()
    },
    onClickRemoveHistory(keyword){
        HistoryModel.remove(keyword)
        this.fetchHistory()
    },
    fetchKeyword(){
        KeywordModel.list().then(data => {
            this.keywords = data
        })
    },
    fetchHistory(){
        HistoryModel.list().then(data => {
            this.history = data
        })
    },
    search(){
        SearchModel.list().then(data => {
            this.submitted = true
            this.searchResult = data
        })
        HistoryModel.add(this.query)
        this.fetchHistory()
    },
    resetForm(){
        this.query = '' //this => vue instance
        // todo 검색결과를 숨기는..
        this.submitted = false
        this.searchResult = []
    }
  }
}
</script>
