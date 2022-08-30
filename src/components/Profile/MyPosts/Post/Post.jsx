  import s from './Post.module.css';

const Post = (props) => {
    return <div className={s.item}>
                <img src={props.image}></img>
                {props.message}
                <div>
                    <span>likes : {props.like_count}</span>
                </div>
            </div>
}

export default Post