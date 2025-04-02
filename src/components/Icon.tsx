import { iconsSprite, IconName } from '@/assets/icons';

interface IconProps {
	name: IconName;
	className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
	return (
		<svg className={className}>
			<use href={`${iconsSprite}#${name}`} />
		</svg>
	);
};