import { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { createUser } from "@/api/user/createUser";

const CreateWallet = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mnemonic, setMnemonic] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const walletData = async () => {
    try {
      const response = await fetch("http://localhost:3001/generate-wallet");
      const data = await response.json();
      console.log(data);
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: `https://friendbot.diamcircle.io/?addr=${data.publicKey}`,
        method: "GET",
        headers: headersList,
      };

      let response1 = await axios.request(reqOptions);

      setMnemonic(data.mnemonic);
      setPublicKey(data.publicKey);
      setSecretKey(data.secretKey);
      sessionStorage.setItem("publicKey", data.publicKey);
      sessionStorage.setItem("secretKey", data.secretKey);

      const newUser = await createUser(publicKey, secretKey);
      sessionStorage.setItem("current-user", JSON.stringify(newUser));
    } catch (error) {
      toast.error("Failed to fetch wallet data");
    }
  };

  const onCopyClickMnemonic = async () => {
    await navigator.clipboard.writeText(mnemonic);

    toast.success("Copied to clipboard");
  };
  const onCopyClickPubKey = async () => {
    await navigator.clipboard.writeText(publicKey);

    toast.success("Copied to clipboard");
  };
  const onCopyClickSecKey = async () => {
    await navigator.clipboard.writeText(secretKey);

    toast.success("Copied to clipboard");
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="font-urbanist font-semibold tracking-wider leading-5 text-lg "
      >
        Create Wallet
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="text-white bg-black"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-bold text-3xl font-urbanist">
                Create Wallet
              </ModalHeader>
              <ModalBody>
                <div className="generate_mnemonic_container">
                  <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  <div className="generate_mnemonic_box flex flex-col gap-x-5">
                    <div className="generate_mnemonic_desc">
                      <h1 className="text-red-400">
                        COPY THESE VALUES FOR FUTURE REFERENCE!!! Make sure to
                        copy this mnemonic phrase as it will be used to import
                        the wallet.
                      </h1>
                    </div>
                    <div className="flex flex-col gap-x-5">
                      <div className="generate_mnemonic_content_box">
                        <div className="content_box">
                          <h3 className="text-violet-400 leading-3 tracking-wider mt-5 mb-2">
                            Mnemonic Phrase
                          </h3>
                          <div className="flex justify-between w-full rounded-md border border-[rgba(255,255,255,0.4)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50">
                            <p>{mnemonic}</p>
                            <FaCopy
                              className="font-extrabold cursor-pointer"
                              onClick={onCopyClickMnemonic}
                            />
                          </div>
                        </div>
                        <div className="content_box">
                          <h3 className="text-violet-400 leading-3 tracking-wider mt-5 mb-2">
                            Public Key
                          </h3>
                          <div className="flex justify-between w-full rounded-md border border-[rgba(255,255,255,0.4)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50">
                            <p>
                              {" "}
                              <p>{`${publicKey?.slice(
                                0,
                                15
                              )}...${publicKey?.slice(
                                publicKey.length - 15
                              )}`}</p>
                            </p>
                            <FaCopy
                              className="font-semibold cursor-pointer"
                              onClick={onCopyClickPubKey}
                            />
                          </div>
                        </div>
                        <div className="content_box">
                          <h3 className="text-violet-400 leading-3 tracking-wider mt-5 mb-2">
                            Secret Key
                          </h3>
                          <div className="flex justify-between w-full rounded-md border border-[rgba(255,255,255,0.4)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50">
                            <p>
                              {" "}
                              <p>{`${secretKey.slice(
                                0,
                                15
                              )}...${secretKey.slice(
                                secretKey.length - 15
                              )}`}</p>
                            </p>
                            <FaCopy
                              className="font-semibold cursor-pointer"
                              onClick={onCopyClickSecKey}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button variant="solid" onClick={walletData}>
                  Generate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateWallet;
