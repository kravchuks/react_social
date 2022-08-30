import { useState } from 'react';
import s from './Paginator.module.css';

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize +1;
    let RightPortionPageNumber = portionNumber * props.portionSize
    return  <div>
        {portionNumber > 1 && 
        <button className={s.submit} onClick={()=>(setPortionNumber(portionNumber - 1))}>PREV</button>}
            {pages
            .filter(p=>p>=leftPortionPageNumber && p<=RightPortionPageNumber)
            .map(p => {
                return <span onClick={() => { props.onPAgeChanged(p) }} key={p}
                className={props.currentPage === p ? s.selctedPage: s.page}>{p}</span>
            })}
        {portionCount > portionNumber  && 
        <button className={s.submit} onClick={()=>(setPortionNumber(portionNumber + 1))}>NEXT</button>}
        </div>
}

export default Paginator;