<script>
  import { Pie } from 'vue-chartjs'

  export default {
    extends: Pie,
    data () {
      return {
        chartData: {
          labels: ["Siswa", "Guru", "Tamu"],
          datasets: [{
              borderWidth: 1,
              borderColor: [
              '#34626c',
              '#839b97',
              '#cfd3ce)'          
              ],
              backgroundColor: [
              '#34626c',
              '#839b97',
              '#cfd3ce)'                
              ],
              data: [1000,	500,	1500]
            }]
        },
        options: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>