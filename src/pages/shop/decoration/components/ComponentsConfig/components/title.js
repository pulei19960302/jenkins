const style = {
    color:'#1890FF',
    fontSize:14,
    display:'flex',
    alignItems: 'center'
}
export default function({children}){
    return (
        <div style={style}>{children}</div>
    )
}