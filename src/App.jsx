import { useState, useEffect, useRef } from 'react'
import './App.css'
import Column from './components/Column'
import highPriority from './icons/Img - High Priority.svg'
import lowPriority from './icons/Img - Low Priority.svg'
import medPriority from './icons/Img - Medium Priority.svg'
import urgPriorityOr from './icons/SVG - Urgent Priority colour.svg'
import noPriority from './icons/No-priority.svg'
import todo from './icons/To-do.svg'
import inProgress from './icons/in-progress.svg'
import done from './icons/Done.svg'
import cancelled from './icons/Cancelled.svg'
import Backlog from './icons/Backlog.svg'
import down from './icons/down.svg'
import display from './icons/Display.svg'

const getGrouping = () => {
	const res = localStorage.getItem('grouping');
	return res ? parseInt(JSON.parse(res)) : 1;
}

const getOrdering = () => {
	const res = localStorage.getItem('ordering');
	return res ? parseInt(JSON.parse(res)) : 1;
}

function App() {
	const [grouping, setGrouping] = useState(getGrouping);
	const [ordering, setOrdering] = useState(getOrdering);
	const [groups, setGroups] = useState(null);
	const [showOptions, setShowOptions] = useState(false);
	let headings = [['Todo', 'In Progress', 'Backlog', 'Cancelled', 'Done'], ['usr-1', 'usr-2', 'usr-3', 'usr-4', 'usr-5'], ['Urgent', 'High Priority', 'Medium Priority', 'Low priority', 'No priorirty']];
	let icons = [[todo, inProgress, Backlog, cancelled, done], [], [urgPriorityOr, highPriority, medPriority, lowPriority, noPriority]]
	let temp;

	const draggedItem = useRef({});
	const draggedOverItem = useRef({});

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
			if(grouping === 1) {
				temp = []
				temp.push(newres.tickets.filter((el) => {
					return el.status === 'Todo';
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.status === 'In progress';
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.status === 'Backlog';
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.status === 'Cancelled';
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.status === 'Done';
				}))
			} else if(grouping === 2) {
				temp = [];
				temp.push(newres.tickets.filter((el) => {
					return el.userId === 'usr-1';
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.userId === 'usr-2';
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.userId === 'usr-3';
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.userId === 'usr-4';
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.userId === 'usr-5';
				}))
			} else if(grouping === 3) {
				temp = [];
				temp.push(newres.tickets.filter((el) => {
					return el.priority === 4;
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.priority === 3;
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.priority === 2;
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.priority === 1;
				}))
				temp.push(newres.tickets.filter((el) => {
					return el.priority === 0;
				}))
			}
			console.log(temp);
			setGroups(temp);
		})
		.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		if(!groups) return;
		let data = [...groups[0], ...groups[1], ...groups[2], ...groups[3], ...groups[4]];
		if(grouping === 1) {
			temp = []
			temp.push(data.filter((el) => {
				return el.status === 'Todo';
			}))
			temp.push(data.filter((el) => {
				return el.status === 'In progress';
			}))
			temp.push(data.filter((el) => {
				return el.status === 'Backlog';
			}))
			temp.push(data.filter((el) => {
				return el.status === 'Cancelled';
			}))
			temp.push(data.filter((el) => {
				return el.status === 'Done';
		}))
		} else if(grouping === 2) {
			temp = [];
			temp.push(data.filter((el) => {
				return el.userId === 'usr-1';
			}))
			temp.push(data.filter((el) => {
				return el.userId === 'usr-2';
			}))
			temp.push(data.filter((el) => {
				return el.userId === 'usr-3';
			}))
			temp.push(data.filter((el) => {
				return el.userId === 'usr-4';
			}))
			temp.push(data.filter((el) => {
				return el.userId === 'usr-5';
			}))
		} else if(grouping === 3) {
			temp = [];
			temp.push(data.filter((el) => {
				return el.priority === 4;
			}))
			temp.push(data.filter((el) => {
				return el.priority === 3;
			}))
			temp.push(data.filter((el) => {
				return el.priority === 2;
			}))
			temp.push(data.filter((el) => {
				return el.priority === 1;
			}))
			temp.push(data.filter((el) => {
				return el.priority === 0;
			}))
		}
		let temp2 = [];
		if(ordering === 1) {
			for(let i = 0; i < temp.length; i++) {
				let temp3 = temp[i];
				temp3.sort((a, b) => {
					if(a.priority > b.priority) return -1;
					if(a.priority < b.priority) return 1;
					return 0;
				})
				temp2.push(temp3);
			}
		} else if(ordering === 2) {
			for(let i = 0; i < temp.length; i++) {
				let temp3 = temp[i];
				temp[i].sort((a, b) => a.title.localeCompare(b.title))
				temp2.push(temp3);
			}
		}
		console.log(temp2);
		setGroups(temp2);
	}, [grouping, ordering])

	const handleDrag = () => {
		if(draggedItem.current.status === draggedOverItem.current.status) return;
		temp = [...groups];
		let item;
		for(let i = 0; i < 5; i++) {
			if(draggedItem.current.status === headings[0][i]) {
				for(let j = 0; j < temp[i].length; j++) {
					if(draggedItem.current.id === temp[i][j].id) {
						item = {...temp[i][j]};
					}
				}
				temp[i] = temp[i].filter((el) => {
					return el.id != draggedItem.current.id;
				})
			}
		}
		for(let i = 0; i < 5; i++) {
			if(draggedOverItem.current.status === headings[0][i]) {
				temp[i].push({...item, status: draggedOverItem.current.status});
			}
		}
		setGroups(temp);
	}

	return (
		<>
		<div className="app">
			<div className="display">
				<div className="show" onClick={() => setShowOptions((el) => !el)}>
					<img src={display} alt="" />
					<span style={{"padding": "5px", "color": "black", "fontWeight": "500", "fontSize": "14px"}}>Display</span>
					<img src={down} alt="" />
				</div>
			</div>
			{showOptions &&
				<div className="selectionBox">
					<div className="grouping">
						<span>Grouping</span>
						<select id="grouping" value={grouping} onChange={(e) => {
							setGrouping(parseInt(e.target.value));
							localStorage.setItem('grouping', parseInt(e.target.value));
							setShowOptions(false);
						}}> 
							<option value={1}>Status</option>
							<option value={2}>User</option>
							<option value={3}>Priority</option>
						</select>
					</div>
					<div className="ordering">
						<span>Ordering</span>
						<select id="ordering" value={ordering} onChange={(e) => {
							setOrdering(parseInt(e.target.value))
							localStorage.setItem('ordering', parseInt(e.target.value));
							setShowOptions(false);
						}}> 
							<option value={1}>Priority</option>
							<option value={2}>Title</option>
						</select>
					</div>
				</div>
			}
			<div className="cols">
				{groups && groups.map((el, i) => {
					return (<Column key={headings[grouping-1][i]} handleDrag={handleDrag} draggedItem={draggedItem} draggedOverItem={draggedOverItem} content={el} head={headings[grouping-1][i]} icon={icons[grouping-1][i]} grouping={grouping}/>)
				})}	
			</div>
		</div>
		</>
	)
}

export default App
