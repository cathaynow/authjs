import { register } from "@/action/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getSession();
  const user = session?.user;

  if (user) redirect("/");

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welocome to CathayShop
      </h2>

      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please provide all the necessary infomation
      </p>

      <form className="my-8" action={register}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <div className="flex flex-col">
            <Label htmlFor="firstname" className="mb-2">
              First Name
            </Label>
            <Input
              id="firstname"
              placeholder="Cathay"
              type="text"
              name="firstname"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="lastname" className="mb-2">
              Last Name
            </Label>
            <Input
              id="lastname"
              placeholder="Doc"
              type="text"
              name="lastname"
            />
          </div>
        </div>

        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="testdoc@mail.com"
          type="email"
          name="email"
          className="mb-5"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="********"
          type="password"
          name="password"
          className="mb-5"
        />

        <Button className="w-full mt-4 rounded-md">Sign up</Button>

        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          이미 계정이 있으신가요? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
