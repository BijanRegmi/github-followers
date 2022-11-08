"use client"
import { GhUser, UserObj } from "../../index.interface"
import { useQuery } from "react-query"

const fetchData = async (user: String) => {
	const followers: GhUser[] = await fetch(
		`https://api.github.com/users/${user}/followers`
	).then(res => res.json())

	const following: GhUser[] = await fetch(
		`https://api.github.com/users/${user}/following`
	).then(res => res.json())

	var userObj: UserObj = {}
	followers.forEach(
		value =>
		(userObj[value.id] = {
			...userObj[value.id],
			...value,
			them: true,
			login: value.login,
		})
	)
	following.forEach(
		value =>
		(userObj[value.id] = {
			...userObj[value.id],
			...value,
			you: true,
			login: value.login,
		})
	)
	return Object.keys(userObj).map(user => userObj[user])
}

const user = ({ params: { user } }: { params: { user: String } }) => {
	const query = useQuery("data", () => fetchData(user))

	return (
		<div className="h-[75vh] w-[50vw] rounded-lg border-2 border-white p-2 flex flex-col text-white">
			<div className="flex flex-row h-1/8 justify-around gap-4 px-2 border-b border-blue-400">
				<div className="w-full">Name</div>
				<div className="w-1/6">You</div>
				<div className="w-1/6">Them</div>
			</div>
			<div className="overflow-scroll h-full no-scrollbar">
				{query.data?.map(user => (
					<div className="flex flex-row justify-around gap-4 px-2 border-b border-white mb-2 p-2">
						<div className="w-full">{user.login}</div>
						<div className="w-1/6">
							{user.you ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							)}
						</div>
						<div className="w-1/6">
							{user.them ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default user
