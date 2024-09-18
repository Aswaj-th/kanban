import { useState } from 'react';
import './card.css'
import highPriority from '../icons/Img - High Priority.svg'
import lowPriority from '../icons/Img - Low Priority.svg'
import medPriority from '../icons/Img - Medium Priority.svg'
import urgPriorityOr from '../icons/SVG - Urgent Priority colour.svg'
import urgPriority from '../icons/SVG - Urgent Priority grey.svg'
import noPriority from '../icons/No-priority.svg'
import todo from '../icons/To-do.svg'
import inProgress from '../icons/in-progress.svg'
import done from '../icons/Done.svg'
import cancelled from '../icons/Cancelled.svg'
import Backlog from '../icons/Backlog.svg'

const Card = ({ticket}) => {

    let statusLogo;
    if(ticket.status === 'Todo') statusLogo = todo
    else if(ticket.status === 'In progress') statusLogo = inProgress
    else if(ticket.status === 'Backlog') statusLogo = Backlog
    else if(ticket.status === 'Cancelled') statusLogo = cancelled
    else if(ticket.status === 'Done') statusLogo = done

    let prioritylogo;
    if(ticket.priority === 4) prioritylogo = urgPriority
    else if(ticket.status === 3) prioritylogo = highPriority
    else if(ticket.status === 2) prioritylogo = medPriority
    else if(ticket.status === 1) prioritylogo = lowPriority
    else if(ticket.status === 0) prioritylogo = noPriority

    return (
        <>
        <div className='card'>
            <div className="head">
                <div className="id">
                    {ticket.id}
                </div>
                <div className="prof">
                    
                </div>
            </div>
            <div className="title">
                <div className="statuslogo">
                    <img src={statusLogo} alt="" />
                </div>
                {ticket.title}
            </div>
            <div className="tags">
                <div className="prioritylogo">
                    <img src={prioritylogo} alt="" />
                </div>
                {ticket.tag.map(el => <div className="tag" key={el}>{el} jdf;s</div>)}
            </div>
        </div>
        </>
    );
};

export default Card;