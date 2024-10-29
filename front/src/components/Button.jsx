import PropTypes from "prop-types";
const ButtonComponent = ({type, className, navigation, text = ''}) => {
    return (
    <button
    type={type ? type : "button"}
    className={className ? className : ''}
    onClick={navigation}
    >
        {text}
    </button>
)    
};

ButtonComponent.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.string,
    navigation: PropTypes.func
};

export default ButtonComponent;