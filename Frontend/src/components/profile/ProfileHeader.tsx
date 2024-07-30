import { useFormStore } from "@/store/store";
import { Button } from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Onboarding from "../forms/Onboarding";
import { DialogClose } from "@radix-ui/react-dialog";

export default function ProfileHeader() {
  const { Form, setForm }: any = useFormStore();

  const userInfo = JSON.parse(sessionStorage.getItem("current-user"));
  const userID = userInfo?.ID;
  const address = sessionStorage.getItem("publicKey");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUserData = () => {
      if (userInfo !== undefined) {
        setForm(userInfo);
      }
      console.log(Form);
    };
    getUserData();
  }, []);

  return (
    <section className=" bg-[rgba(255,255,255,0.056)] p-14 dark:bg-gray-900 dark:text-gray-100 mb-20 rounded-lg">
      <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
        <img
          src={`${userInfo?.picture}`}
          alt="pfp"
          className=" object-cover self-center flex-shrink-0 w-60 h-60 border rounded-sm md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
        />
        <div className="flex flex-col mx-12 w-full">
          <div className="flex justify-between mb-4">
            <h4 className="text-3xl mt-10 font-semibold  font-urbanist text-left  md:text-left">
              Welcome! 🖐️{" "}
              <span className="text-violet-400">
                {userInfo?.username ? userInfo?.username : address}
              </span>
            </h4>
          </div>
          <p className="dark:text-gray-400 font-urbanist text-md pr-12 text-left mb-4">
            <span className="text-violet-400 flex flex-col">
              <span className="mb-8 text-gray-200/[0.8]"> {userInfo?.bio}</span>
              {userInfo?.username ? (
                <span className="text-[gray] font-bold tracking-wide">
                  Wallet Address :{" "}
                  <span className="text-white"> {address}</span>
                </span>
              ) : (
                ""
              )}
            </span>
          </p>
          <span className="flex gap-x-12">
            {userInfo?.tags?.map(
              (
                tag: string | number | boolean | undefined,
                id: Key | null | undefined
              ) => (
                <span
                  key={id}
                  className="text-black font-extrabold tracking-tighter text-xl font-jura py-1 px-3 bg-red-400  border-1 rounded-xl"
                >
                  {tag}
                </span>
              )
            )}
          </span>
        </div>
      </div>
      <div className="flex pt-4 space-x-4 align-center justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="text-sm font-semibold p-4 " variant="faded">
              Edit Profile
            </Button>
          </DialogTrigger>
          <section className="flex flex-col justify-center ">
            <DialogContent className="flex flex-col justify-center items-center max-w-[1000px] max-h-[900px]">
              <Onboarding />
              <DialogFooter className="pt-2">
                <DialogClose asChild>
                  <Button variant="flat">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </section>
        </Dialog>
      </div>
    </section>
  );
}
