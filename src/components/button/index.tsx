const Button = ({content, icon, className, onClick}:{content:string, icon?:React.ReactNode, className?:string, onClick?:() => void}) => {
    return(
        <button className={`govuk-button ${className}`} data-module="govuk-button" onClick={onClick}>
            {content}
            {icon && <span style={{marginLeft: '10px', verticalAlign: "middle"}}>{icon}</span>}
        </button>
    )
}

export default Button