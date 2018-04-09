import SearchModel from './models/SearchModel.js'

new Vue({
    el: '#app' ,
    data: {
        query: '',
        submitted: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab: '',
        searchResult: []
    },
    created() {
        this.selectedTab = this.tabs[0]
    },
    methods: {
        onSubmit(e){
            this.search()
        },
        onKeyup(e){
            if(!this.query.length) this.resetForm()
        },
        onReset(e){
            this.resetForm()
        },
        onClickTab(tab){
            this.selectedTab = tab
        },
        search(){
            SearchModel.list().then(data => {
                this.submitted = true
                this.searchResult = data
            })
        },
        resetForm(){
            this.query = '' //this => vue instance
            // todo 검색결과를 숨기는..
            this.submitted = false
            this.searchResult = []
        }
    }
})