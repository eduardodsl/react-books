export const BasicButton = (props) => {

    if(props.href){
        return <a {...props}>{ props.children }</a>
    }else{
        return <button {...props}>{ props.children }</button>
    }

}