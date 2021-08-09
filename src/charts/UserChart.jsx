import React, {useRef} from 'react';
import Chart from 'chart.js/auto';
import './chart.scss';

const UsersChart = ({userList}) => {
    const chartRef = useRef(null);
    const months = {};

    //fill every month with 0 value
    for (let i = 0; i < 12; i++) {
        months[i] = 0;        
    }

    userList.forEach((user)=> {
        months[new Date(user.dateCreated).getMonth()] += 1;
    });

    const lables = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    if(chartRef.current) {
        new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: lables,
                datasets: [{
                    label: '2021',
                    data: Object.values(months),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor:'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: 'origin'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Users created by month'
                    }
                },               
            }
        });
    }    

    return (
    <div className="chartBox">
        <canvas ref={chartRef}></canvas>
    </div>);
};

export default React.memo(UsersChart);