export const Button = ({content, icon, className, onClick}:{content:string, icon?:React.ReactNode, className?:string, onClick?:() => void}) => {
    return(
        <button className={`govuk-button ${className}`} data-module="govuk-button" onClick={onClick}>
            {content}
            {icon && <span style={{marginLeft: '10px', verticalAlign: "middle"}}>{icon}</span>}
        </button>
    )
}


export const BackLink = ({content, onClick}:{content:string, onClick?:() => void}) => {
    return(
        <button className={`govuk-back-link`} data-module="govuk-button" onClick={onClick} style={{border: 'none', backgroundColor: 'white'}}>
            {content}
        </button>
    )
}

export const ButtonLink = ({content, onClick}:{content:string, icon?:React.ReactNode, onClick?:() => void}) => {
    return(
        <button className="govuk-body govuk-link" data-module="govuk-button" onClick={onClick} style={{border: 'none', backgroundColor: 'white', color: '#1d70b8', textAlign: 'end'}}>
            {content}
        </button>
    )
}