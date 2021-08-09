import React , {useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Chart from 'chart.js/auto';
import './chart.scss';

const PostChart = () => {
    const posts = useSelector(state => state.posts.postsList);
    const chartRef = useRef();
    const data = [];
    
    const idToDate = objectId => new Date(parseInt(objectId.substring(0, 8), 16) * 1000);

    posts.forEach((post) => {
        const postDate = idToDate(post._id);
        const month = postDate.getMonth() + 1;
        const day = postDate.getDate();
        const buble = {
            y: month,
            x: day,
            r: 5
        };
        const isExists = data.findIndex((post)=> {
            if(post.y === month && post.x === day) {
                return true;
            }
            return false;
        });
        if(isExists === -1) {
            data.push(buble);                      
        }
        else {
            data[isExists].r += 5; 
        }
    });

    useEffect(()=> {
        let myChart;
        if(chartRef.current) {
            myChart = new Chart(chartRef.current, {
                type: 'bubble',
                data: {
                    datasets: [{
                        label: '2021',
                        data: data,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor:'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: 'origin'
                    }]
                },
                options: {
                    scales: {
                        x: {
                            min: 1,
                            max: 31
                        },
                        y: {
                            min: 1,
                            max: 12,
                        },                    
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Posts created by date'
                        }
                    },                
                }
            });
        }
        return ()=>{
            if(myChart) {
                myChart.destroy();
            }
        }
    }, [data]);

    if(!posts.length) {
        return null;
    }

    return (
        <div className="chartBox">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default React.memo(PostChart);