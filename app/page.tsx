"use client";

import { formAuth, formState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState = {
	status: 403,
	formInput: { email: '', password: '' },
};

export default function Auth() {
	const router = useRouter();
	const [state, formAction, loading] = useActionState<formState, FormData>(formAuth, initialState);
	const { status, formInput } = state;

	useEffect(() => {
		if (status == 200) router.push("/home")
	}, [status, router]);


	return (
		<main className="bg-login flex min-h-svh w-full items-center justify-center p-6 md:p-10">
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
							<form action={formAction}>
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input id="email" name="email" type="email" defaultValue={formInput?.email} placeholder="ex: admin@mail.com" required />
									</Field>
									<Field>
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<Input id="password" name="password" type="password" placeholder="••••••••" required />
									</Field>
									{status == 401 && <FieldDescription className="text-red-400 lh-none">Incorrect email or password</FieldDescription>}
									<Field>
										<Button type="submit" disabled={loading} className="w-full text-[#FFFFFF] font-bold bg-[#663100] hover:text-[#663100]">
											Login
										</Button>
									</Field>
									<Separator />
									<FieldDescription className="text-center">
										Demo Credentials:
										<br />
										admin@mail.com | admin123
										<br /> or <br />
										Directly to <Link className="text-blue-400 font-semibold" href="/home" aria-disabled="true">Home</Link>
									</FieldDescription>
								</FieldGroup>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
