"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

// dummy credentials
const DUMMY_CREDENTIALS = {
	email: 'admin@mail.com',
	password: 'admin123',
}

export default function Auth() {
	const router = useRouter();
	const [msg, setMsg] = useState("");
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		
		if (formData.email === DUMMY_CREDENTIALS.email && formData.password === DUMMY_CREDENTIALS.password) {
			router.push("/home");
		} else {
			setMsg("Invalid credentials");
		}

	};

	return (
		<div className="bg-login flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className={cn("flex flex-col gap-6")}>
					<Card>
						<CardHeader>
							<CardTitle>Login to your account</CardTitle>
							<CardDescription>
								Enter your email below to login to your account
							</CardDescription>
						</CardHeader>

						<CardContent>
							<form onSubmit={handleSubmit}>
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input id="email" type="email" placeholder="m@example.com" required value={formData.email} onChange={handleInputChange} />
										{msg && <small className="text-red-500 text-sm">{msg}</small>}
									</Field>
									<Field>
										<div className="flex items-center">
											<FieldLabel htmlFor="password">Password</FieldLabel>
										</div>
										<Input id="password" type="password" required value={formData.password} onChange={handleInputChange} />
									</Field>
									<Field>
										<Button type="submit" className="w-full text-white font-bold">
											Login
										</Button>
									</Field>

									<FieldDescription>
										Demo Credentials: admin@mail.com / admin123
									</FieldDescription>
								</FieldGroup>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
