/*!
   @description: Configure the portion accuracy doughnut chart
   @params:
   @return:
   @Comments
   @Coders: GoldyLuck
*/
const PortionDoughnutChartConfig = (labels, datasets, backgroundColors) => {
    return {
        data: {
            labels: labels,
            datasets: [
                {
                    data: datasets.data,
                    backgroundColor: backgroundColors,
                },
            ],
        },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    };
};

export default PortionDoughnutChartConfig;
