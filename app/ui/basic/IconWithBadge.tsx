import { IconType } from "react-icons";
import { BiSolidLike } from "react-icons/bi";

export default function IconWithBadge({ Icon, no }: { Icon: IconType, no: number }) {
	return (
		<div className="relative inline-block items-center">
			{/* Icon */}
			<Icon className="text-2xl" />

			{/* Badge */}
			{no > 0 && <span className="absolute top-[-5px] right-[-12px] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
				{no}
			</span>}
		</div>
	)
}