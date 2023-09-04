function configs(labels, data, backgroundColors) {
    return {
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: backgroundColors,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "right",
                },
            },
        },
    };
}

export default configs;
