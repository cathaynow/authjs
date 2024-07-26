import { login } from "@/action/user";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/getSession";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getSession();

  const user = session?.user;

  if (user) redirect("/");

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadown-input bg-white border border-[#121212] dark:bg-black">
      <form className="my-8" action={login}>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="text" placeholder="Enter Email" name="email" />

        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter Password"
          name="password"
          className="mb-5"
        />
        <Button className="w-full">Login &rarr;</Button>

        <p className="mt-4 text-right tgext-neutral-600 text-sm max-w-sm dark:text-neutral-300">
          계정이 없으십니까? <Link href="/register">Register</Link>
        </p>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>

      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button type="submit" className="white">
          <IconBrandGithub className="w-4 h-4  dark:text-neutral-300 text-white" />
          <span className=" dark:text-neutral-300 text-sm text-white pl-2">
            Github
          </span>
        </Button>
      </form>

      <form
        className="mt-2"
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button type="submit" className="white">
          <IconBrandGoogle className="w-4 h-4  dark:text-neutral-300 text-white" />
          <span className="text-white dark:text-neutral-300 text-sm  pl-2">
            Google
          </span>
        </Button>
      </form>
    </div>
  );
};

export default Login;
