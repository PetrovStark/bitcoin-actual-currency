import Notice from './notice.js';

Notice();

const app = new Vue ({
    el: "#root",
    data() {
        return {
            info: null,
            time: null,
            errored: false,
            show: false,
            loading: true
        }
    },

    filters: {
        currency_decimal ( value ) {
            return value.toFixed(2);
        },
        filter_date ( value ) {
            if ( value ) {
                var months = [
                  "January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November","December"
                ];
                var date = new Date(value),
                day = date.getDate(),
                month = months[date.getMonth()],
                year = date.getFullYear(),
                time = date.getHours() + ":" + date.getMinutes().toFixed(2);

                return month + " " + day + ", " + year + " - " + time;
            }
        }
    },

    //Quando a instância do Vue é estabelecida com êxito, é feita a requisição.
    mounted () {
        axios
            .get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then( response => {
                this.info = response.data.bpi
                this.time = response.data.time.updated
            })
            .catch( error => {
                console.log(error)
                this.errored = true
            })
            .finally( () => {
                this.loading = false
                this.show = true
            })
    }

});
