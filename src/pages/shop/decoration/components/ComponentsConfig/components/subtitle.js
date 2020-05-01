const baseStyle = {
    display:'flex',
    alignItems:'center',
    color:'rgba(0,0,0,0.65)',
    fontSize:12,
    minHeight:24,
    fontWeight:500
}
export default function({title,children,style,spanStyle,className,onClick}){
    return (
        <div onClick={(e)=>{onClick && onClick(e)}} className={className} style={{...baseStyle,...style}}>
            <span style={{marginRight:16,...spanStyle}}>{title}</span>
            {children}
       </div>
    )
}