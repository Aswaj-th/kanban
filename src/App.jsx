import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
	let [data, setData] = useState(null)
	let [grouping, setGrouping] = useState(1);
	let [sort, setSort] = useState(1);
	let groups = [];

	let sample = {
		"id": "CAM-1",
		"title": "Update User Profile Page UI",
		"tag": [
			"Feature request"
		],
		"userId": "usr-1",
		"status": "Todo",
		"priority": 4
	}
	useEffect(() => {
		fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
		.then(res => res.json())
		.then(newres => {
			setData(newres)
			console.log(newres);
		})
		.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		if(!data) return;
		if(grouping == 1) {
			groups = []
			groups.push(data.tickets.filter((el) => {
				return el.status === 'Todo';
			}))
			groups.push(data.tickets.filter((el) => {
				return el.status === 'In progress';
			}))
			groups.push(data.tickets.filter((el) => {
				return el.status === 'Backlog';
			}))
			groups.push(data.tickets.filter((el) => {
				return el.status === 'Cancelled';
			}))
			groups.push(data.tickets.filter((el) => {
				return el.status === 'Done';
			}))
		} else if(grouping == 2) {
			groups = [];
			groups.push(data.tickets.filter((el) => {
				return el.userId === 'usr-1';
			}))
			groups.push(data.tickets.filter((el) => {
				return el.userId === 'usr-2';
			}))
			groups.push(data.tickets.filter((el) => {
				return el.userId === 'usr-3';
			}))
			groups.push(data.tickets.filter((el) => {
				return el.userId === 'usr-4';
			}))
			groups.push(data.tickets.filter((el) => {
				return el.userId === 'usr-5';
			}))
		} else if(grouping == 3) {
			groups = [];
			groups.push(data.tickets.filter((el) => {
				return el.priority === 4;
			}))
			groups.push(data.tickets.filter((el) => {
				return el.priority === 3;
			}))
			groups.push(data.tickets.filter((el) => {
				return el.priority === 2;
			}))
			groups.push(data.tickets.filter((el) => {
				return el.priority === 1;
			}))
			groups.push(data.tickets.filter((el) => {
				return el.priority === 0;
			}))
		}
		console.log(groups)
	}, [data, grouping])

	return (
		<>
		<div className="app">
			{/* {data && data["tickets"].map((el, i) => {
				return (<Card ticket={el} key={i} />)
			})} */}
			{Object.keys(groups).map((el, i) => {
				return (<div>{group[el]} j;=fasd </div>)
			})
			}
			<Card ticket={sample} />
		</div>
		</>
	)
}

export default App
