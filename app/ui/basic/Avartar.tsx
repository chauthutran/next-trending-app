export default function Avartar({name}: {name: string}) {

    return (
        <div className="rounded-full bg-blue-5 w-fit p-2 text-white">{name.substring(0,2).toUpperCase()}</div>
    )
}