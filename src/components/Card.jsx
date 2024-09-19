import { useState } from 'react';
import './card.css'
import highPriority from '../icons/Img - High Priority.svg'
import lowPriority from '../icons/Img - Low Priority.svg'
import medPriority from '../icons/Img - Medium Priority.svg'
import urgPriority from '../icons/SVG - Urgent Priority grey.svg'
import noPriority from '../icons/No-priority.svg'
import todo from '../icons/To-do.svg'
import inProgress from '../icons/in-progress.svg'
import done from '../icons/Done.svg'
import cancelled from '../icons/Cancelled.svg'
import Backlog from '../icons/Backlog.svg'

const Card = ({ticket, grouping, draggedItem, handleDrag}) => {

    let statusLogo;
    if(ticket.status === 'Todo') statusLogo = todo
    else if(ticket.status === 'In progress') statusLogo = inProgress
    else if(ticket.status === 'Backlog') statusLogo = Backlog
    else if(ticket.status === 'Cancelled') statusLogo = cancelled
    else if(ticket.status === 'Done') statusLogo = done

    let prioritylogo;
    if(ticket.priority === 4) prioritylogo = urgPriority
    else if(ticket.priority === 3) prioritylogo = highPriority
    else if(ticket.priority === 2) prioritylogo = medPriority
    else if(ticket.priority === 1) prioritylogo = lowPriority
    else if(ticket.priority === 0) prioritylogo = noPriority

    return (
        <>
        <div className='card' draggable={grouping === 1} onDragStart={() => draggedItem.current = {id: ticket.id, status: ticket.status}} onDragEnd={handleDrag}>
            <div className="head">
                <div className="id">
                    {ticket.id}
                </div>
                {grouping !== 2 && 
                    <div className="prof">
                    
                    </div>
                }   
            </div>
            <div className="title">
                {grouping !== 1 &&
                    <div className="statuslogo">
                        <img src={statusLogo} alt="" />
                    </div>
                }
                {ticket.title}
            </div>
            <div className="tags">
                {grouping !== 3 &&
                    <div className="prioritylogo">
                        <img src={prioritylogo} alt="" />
                    </div>
                }
                {ticket.tag.map(el => <div className="tag" key={el}>{el}</div>)}
            </div>
        </div>
        </>
    );
};

export default Card;