import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios from "axios";

const ResaleForm = ({ selectedGame, open, setOpen }) => {
  const form = useForm({
    defaultValues: {
      gameName: selectedGame?.name || "",
      price: "",
    },
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const publicKey = sessionStorage.getItem("publicKey");
  const secretKey = sessionStorage.getItem("secretKey");
  console.log(secretKey);

  useEffect(() => {
    if (selectedGame) {
      setValue("gameName", selectedGame.name);
    }
  }, [selectedGame, setValue]);

  const onSubmit = async (data) => {
    // const resaleData = {
    //   id: selectedGame.id,
    //   cover: selectedGame.cover.url,
    //   name: data.gameName,
    //   price: data.price,
    // };

    // const bodyL = {
    //   assetName: selectedGame.id.toString(),
    //   seller: secretKey,
    // };

    const response = await axios.get(
      `http://localhost:3001/verify?publicKey=${publicKey}&key=cid:${selectedGame.id}`
    );

    // const response1 = await axios
    //   .post("http://localhost:3001/list", bodyL)
    //   .then((result) => {
    //     console.log(result.data);
    //     return result.data;
    //   });
    // console.log(response1);

    console.log(response.data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <section className="py-8 px-3 w-full">
          <div className="flex flex-col justify-start">
            <div className="w-full flex gap-x-24">
              <form
                className="mt-1 flex-1 font-urbanist"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-10">
                  <div className="flex flex-col">
                    <label
                      htmlFor="gameName"
                      className="text-base font-medium text-[rgba(255,255,255,0.67)] text-left"
                    >
                      Game Name
                    </label>
                    <div className="mt-5">
                      <input
                        className="flex w-full h-10 rounded-md border border-[rgba(255,255,255,0.0)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 focus:bg-transparent input:bg-transparent"
                        type="text"
                        placeholder="Game Name"
                        {...register("gameName")}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="price"
                      className="text-base font-medium text-[rgba(255,255,255,0.67)] text-left"
                    >
                      Price
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-[rgba(255,255,255,0.067)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="number"
                        placeholder="Price"
                        {...register("price", {
                          required: "Price is required",
                        })}
                      />
                      <p className="text-[red]">{errors.price?.message}</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex mt-12 w-full items-center justify-center rounded-md bg-[rgba(255,255,255,0.67)] opacity-75 text-black px-3.5 py-2.5 font-semibold leading-7 hover:opacity-100 transition-all ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ResaleForm;
