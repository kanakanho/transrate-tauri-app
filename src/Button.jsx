export const Button = (props) => {
    const { onClick, children } = props;

    return (
        <div className="Button" onClick={onClick} style={props.style}>
            {children}
        </div>
    );
};
