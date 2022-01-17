import Image from 'next/image';
import { ImgLoader } from '../utils/customLoaders';
import { HeartIcon } from '@heroicons/react/outline';
import Dialog from './Dialog';
import { show, hide } from '../store/dialog';
import { useDispatch } from 'react-redux';
import QRCodeGenerator from '../packages/miscellaneous/QRCodeGenerator';
import { useRef } from 'react';

export default function ListItem(props) {
	const dispatch = useDispatch();
	const qrcode = useRef(null);

	const handleCancel = () => {
		console.log('cancel');
		dispatch(hide());
	};
	const handleConfirm = () => {
		qrcode.current.download();
	};

	return (
		<>
			{props.data.map((item) => {
				return (
					<div
						className='tools-item'
						key={item.title}
						onClick={() => dispatch(show(item))}
					>
						<div className='tools-item-image'>
							<Image
								loader={ImgLoader}
								src={item.imageUrl}
								width={36}
								height={36}
								alt={item.title}
							/>
						</div>
						<div className='tools-item-title'>{item.title}</div>
						<div className='tools-item-description'>{item.description}</div>
						<div className='tools-item-like'>
							<HeartIcon className='icon' />
						</div>
					</div>
				);
			})}
			<Dialog confirmEvt={handleConfirm} confirmTxt='Download QR Code'>
				<QRCodeGenerator ref={qrcode} />
			</Dialog>
		</>
	);
}