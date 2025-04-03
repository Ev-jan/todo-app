import { Trash } from "lucide-react"

type BtnDeleteProps = {
	onClick: () => void
}
export const BtnDelete: React.FC<BtnDeleteProps> = ({ onClick }) => {
	return (
		<button
			title='Delete task'
			aria-label="Delete task"
			onClick={onClick}
			className="size-8 text-gray-300 hover:text-accent hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded-full p-1 transition-colors">
			<Trash strokeWidth={1} />
		</button>
	)
}