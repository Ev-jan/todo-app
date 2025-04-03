import { motion } from "framer-motion"
import { CirclePlus } from "lucide-react"

export const BtnAdd: React.FC = () => {
	return (
		<motion.button
			aria-label="Add task"
			className="text-gray-500 hover:text-accent hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded-full p-1 transition-colors"
			type="submit"
			whileHover={{
				scale: 1.1,
				rotate: 5,
				transition: { type: "spring", stiffness: 400, damping: 10 }
			}}
			whileTap={{ scale: 0.95 }}
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{
				opacity: 0, x: 50, transition: {
					type: "spring",
					stiffness: 300,
					damping: 20,
					velocity: 2
				}
			}}
			transition={{
				type: "spring",
				stiffness: 400,
				damping: 17,
			}}
		>
			<CirclePlus strokeWidth={1} className="size-6" />
		</motion.button>
	)
}