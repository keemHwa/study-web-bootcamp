const MyButton = ({ type, text, onClick }) => {

    const btnType = ['positive', 'negative'].includes(type) ? type : 'default';  

    return (
        <button className={['MyButton', `MyButton_${btnType}`].join(" ")} onClick={onClick}>{text}</button>
        // class 명에 MyButton MyButton_positive 이렇게 들어온다. 
    )
}

MyButton.defaultProps = {
    type: 'default'
}
export default MyButton;