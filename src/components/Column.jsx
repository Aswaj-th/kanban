import { useState } from 'react';
import './column.css'
import addIcon from '../icons/add.svg'
import dotsIcon from '../icons/3 dot menu.svg'
import Card from './Card'

const Column = ({content, head, icon, grouping, draggedItem, draggedOverItem, handleDrag}) => {

    return (
        <>
        <div className='col' onDragEnter={() => draggedOverItem.current={status: head}}>
            <div className="col-head">
                <div className="head-left">
                    <img src={icon} alt="" className='imgs'/>
                    <div className="head-head">{head}</div>
                    <div className="length">{content.length}</div>
                </div>
                <div className="head-right">
                    <img src={addIcon} alt="" className='imgs'/>
                    <img src={dotsIcon} alt="" className='imgs'/>
                </div>
            </div>
            <div className="col-content">
                {/* {JSON.stringify(content)} */}
                {content.map((el) => {
                    return (<Card draggedItem={draggedItem} handleDrag={handleDrag} ticket={el} key={el.id} grouping={grouping} />)
                })}
            </div>
        </div>
        </>
    );
};

export default Column;