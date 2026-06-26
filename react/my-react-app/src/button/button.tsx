type buttonProps={
    text: string
    message:string
    className:string
   }

export function Button({text,message,className}:buttonProps) {
        return (
        <button className={className} onClick={() => alert(message)}>{text}</button>
    )
}