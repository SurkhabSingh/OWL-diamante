import { useForm } from "react-hook-form";
import { Multiselect } from "multiselect-react-dropdown";
import { loginValidation } from "@/validations/loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { genres } from "@/utils/dummydata/genreData";
import { useEffect, useRef, useState } from "react";
import DragnDrop from "./DragnDrop";

import sendFileToIPFS from "@/utils/sendFilestoIpfs";
import { useFormStore } from "@/store/store";
import { updateUser } from "@/api/user/updateUser";

export default function Onboarding() {
  const multiselectRef = useRef(null);

  const { Form, setForm }: any = useFormStore();

  const [selected, setSelected] = useState([]);
  const address = sessionStorage.getItem("publicKey");

  const form = useForm({
    defaultValues: {
      ID: "",
      username: Form?.username || " ",
      email: Form?.email || " ",
      bio: Form?.bio || " ",
      picture: Form?.picture || "",
      tags: Form?.tags || [],
      walletAddress: address,
      CreatedAt: " ",
      DeletedAt: "",
      UpdatedAt: "",
      gamesOwned: [],
    },
  });

  const { register, handleSubmit, formState, trigger } = form;

  const { errors } = formState;

  useEffect(() => {
    return setSelected(multiselectRef.current.getSelectedItems());
  }, [multiselectRef]);

  const onSubmit = async (data: any) => {
    form.setValue("tags", selected);
    console.log(selected);

    await sendFileToIPFS(form.getValues("picture"))
      .then((result) => {
        data.picture = result;
      })
      .catch((err) => console.log(err));

    const userInfo = JSON.parse(sessionStorage.getItem("current-user"));
    if (userInfo !== undefined) {
      await updateUser(data, userInfo?.ID);
    }

    setForm({ ...Form, ["ID"]: userInfo?.ID });

    console.log(Form);
    console.log(data);
    

  };

  return (
    <section className="py-8 px-3 w-full">
      <div className="flex flex-col  justify-start  ">
        <h2 className="text-center font-urbanist text-5xl  leading-tight text-white font-extrabold tracking-tight mb-2 ">
          Tell us more about you...
        </h2>
        <div className=" w-full flex gap-x-24 ">
          <form
            action=""
            method="POST"
            className="mt-1 flex-1 font-urbanist"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-10">
              <div className="flex flex-col">
                <label
                  htmlFor=""
                  className="text-base font-medium text-[rgba(255,255,255,0.67)] text-left "
                >
                  {" "}
                  Username{" "}
                </label>
                <div className="mt-5">
                  <input
                    className="flex  w-full h-10 rounded-md border border-[rgba(255,255,255,0.0)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400  disabled:cursor-not-allowed disabled:opacity-50 focus:bg-transparent input:bg-transparent"
                    type="text"
                    placeholder="How should we know you?"
                    {...register("username")}
                  ></input>
                  <p className="text-[red]">{errors.username?.message}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor=""
                  className=" text-base font-medium text-[rgba(255,255,255,0.67)] text-left "
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-[rgba(255,255,255,0.067)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  ></input>
                  <p className="text-[red]">{errors.email?.message}</p>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor=""
                  className=" text-base font-medium text-[rgba(255,255,255,0.67)] text-left "
                >
                  Bio
                </label>
                <div className="mt-2">
                  <textarea
                    className="flex  w-full h-[200px] rounded-md border border-[rgba(255,255,255,0.0)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400  disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe yourself.."
                    {...register("bio")}
                  />
                  <p className="text-[red]">{errors.bio?.message}</p>
                </div>
              </div>

              <div className="grid w-full  items-center gap-1.5">
                <label className="text-sm font-medium leading-none  text-[rgba(255,255,255,0.67)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Choose Tag(s):
                </label>

                <Multiselect
                  isObject={false}
                  options={genres}
                  className="text-white bg-[rgba(255,255,255,0.067)]"
                  ref={multiselectRef}
                  onSelect={function noRefCheck() {}}
                  onRemove={function noRefCheck() {}}
                  displayValue="Tags"
                  style={{
                    chips: {
                      background: "red",
                    },
                    multiselectContainer: {
                      color: "red",
                    },
                    searchBox: {
                      border: "none",
                      borderRadius: "1px solid blue",
                    },
                    option: {
                      backgroundColor: "rgba(255,255,255,0.12)",
                      hover: {
                        backgroundColor: "rgba(255,255,255,0.3)",
                      },
                    },
                  }}
                />
                <p className="text-[red]">{errors.tags?.message}</p>
              </div>

              <button
                type="submit"
                onClick={() => {
                  trigger();
                }}
                className="inline-flex  mt-12 w-full items-center justify-center rounded-md bg-[rgba(255,255,255,0.67)] opacity-75 text-black px-3.5 py-2.5 font-semibold leading-7 hover:opacity-100 transition-all ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="flex-1/3">
            <DragnDrop form={form} />
          </div>
        </div>
      </div>
    </section>
  );
}
