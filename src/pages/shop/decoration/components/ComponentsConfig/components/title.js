const style = {
    color:'#12C2C2',
    fontSize:14,
    display:'flex',
    alignItems: 'center'
}
export default function({children}){
    return (
        <div style={style}>{children}</div>
    )
}