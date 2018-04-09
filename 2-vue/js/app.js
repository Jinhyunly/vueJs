new Vue({
    el: '#app' ,
    data: {
        query: '',
        searchResert: []
    },
    methods: {
        onSubmit(e){
            
        },
        onKeyup(){
            if(!this.query.length) this.resetForm()
        },
        onReset(){
            this.query = '' //this => vue instance
            // todo 검색결과를 숨기는..
            debugger
        }
    }
})