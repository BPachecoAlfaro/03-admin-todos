import React from 'react'
import { SidebardItem } from './SidebardItem';
import Link from 'next/link';
import Image from 'next/image';
import { IoCalendarOutline, IoCheckboxOutline, IoCodeOutline, IoListOutline, IoPerson, IoPersonOutline, IoStorefront } from 'react-icons/io5';
import { auth } from '@/auth';
import { LogoutButton } from './LogoutButton';

const menuItems = [
	{
		icon: <IoCalendarOutline size={30} />,
		title: "Dashboard",
		path: "/dashboard",
	},
	{
		icon: <IoCheckboxOutline size={30} />,
		title: "Rest todos",
		path: "/dashboard/rest-todos",
	},
	{
		icon: <IoListOutline size={30} />,
		title: "Server Actions",
		path: "/dashboard/server-todos",
	},
	{
		icon: <IoCodeOutline size={30} />,
		title: "Cookies",
		path: "/dashboard/cookies",
	},
	{
		icon: <IoStorefront size={30} />,
		title: "Products",
		path: "/dashboard/products",
	},
	{
		icon: <IoPersonOutline size={30} />,
		title: "Perfil",
		path: "/dashboard/profile",
	},
]

export const Sidebar = async () => {

	const session = await auth();



	const avatarUrl = (session?.user?.image) ? session.user.image : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'
	const userName = session?.user?.name ?? 'No name'
	const userRole = session?.user?.roles ?? ['client']


	return (
		<aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
			<div>
				<div className="-mx-6 px-6 py-4">
					<Link href="/dashboard">
						<Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
							className=""
							alt="tailus logo"
							width={150}
							height={150}
						/>
					</Link>
				</div>

				<div className="mt-8 text-center">
					<Image src={avatarUrl}
						className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
						alt="Github avatar"
						width={150}
						height={150}
					/>
					<h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
					<span className="hidden text-gray-400 lg:block">
						{userRole.join(',')}
					</span>
				</div>

				<ul className="space-y-2 tracking-wide mt-8">
					{
						menuItems.map(item => (
							<SidebardItem key={item.path} {...item} />
						))
					}

				</ul>
			</div>

			<div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
				<LogoutButton />
			</div>
		</aside>
	)
}
