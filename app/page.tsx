"use client"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

const Home = () => {
	const router = useRouter()

	const search = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		router.push(`/${user}`)
	}

	const [user, setUser] = useState("")

	return (
		<form className="flex flex-row gap-2" onSubmit={search}>
			<input
				type="text"
				className="p-3 rounded-md focus:outline-none"
				value={user}
				onChange={e => setUser(e.target.value)}
				placeholder="Github username"
			/>
			<button
				className="text-white bg-green-900 rounded-md p-3"
				type="submit"
			>
				Search
			</button>
		</form>
	)
}

export default Home
