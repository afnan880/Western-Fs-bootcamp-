type buttonProps={
    text: string
    message:string
   }

export function Button({text,message}:buttonProps) {
        return (
        <button onClick={() => alert(message)}>{text}</button>
    )
}