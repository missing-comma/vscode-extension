import { Fakeable } from '../../entities';

export const pipeTransform = <RorP extends Fakeable>(transform: Array<(initial: RorP) => RorP>) => {
	return (raw: RorP) => {
		return transform.reduce((acc, fn) => fn(acc), raw);
	};
};
