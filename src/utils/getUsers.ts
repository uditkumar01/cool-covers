import JSSoup from 'jssoup';
import getImagesFromLink from './getImagesFromLink';

export interface IFollower {
	avatar_url: string;
	login: string;
}

const getUsers = async (html: any, limit: number) => {
	let soup = new JSSoup(html);
	const imgTags = soup.findAll('img') || [];
	const data: IFollower[] = [];

	for (let i = 0; data.length < limit && i < imgTags.length; i++) {
		const attrs = imgTags[i].attrs;
    console.log(new URL(attrs.src).hostname)
		if (
			attrs.src &&
			attrs.alt &&
			attrs.height === '65' &&
			attrs.width === '65'
		) {
			const imageSource = attrs.src.replace('s=100&amp;', '');
			const login = attrs.alt.split('@')[1];
			const imgBuf = (await getImagesFromLink(imageSource)) || '';
			data.push({
				avatar_url: imageSource ? imgBuf : '',
				login,
			});
		}
	}

	return { followers: data };
};

export default getUsers;
