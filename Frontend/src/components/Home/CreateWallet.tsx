import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createWallet, encrypt } from "../../utils/utils";
import { FaCopy } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const CreateWallet = ({ walletData, setWalletData }: any) => {
  const navigateTo = useNavigate();

  const [mpinVal, setMpinVal] = useState("");
  const [confirmMpinVal, setConfirmMpinVal] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(true);
  const [loader, setLoader] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const onCopyClick = async () => {
    await navigator.clipboard.writeText(walletData.public_key);
    await navigator.clipboard.writeText(walletData.secret_key);
    toast.success("Copied to clipboard");
  };

  const toggleSecretKey = () => {
    setShowSecretKey(!showSecretKey);
  };

  const createWalletClick = async () => {
    setLoader(true);
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: `https://friendbot.diamcircle.io/?addr=${walletData.public_key}`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    if (response.status === 200) {
      console.log(walletData, mpinVal);
      sessionStorage.setItem("current-user", JSON.stringify(walletData));
      setMpinVal("");
      setConfirmMpinVal("");
    } else {
      setLoader(false);
      toast.error("Something went wrong while creating wallet");
    }
  };

  const handleNewWalletClick = () => {
    const keypair = createWallet();
    setWalletData(keypair);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="font-urbanist font-semibold tracking-wider leading-5"
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
                <div className="create_wallet_container">
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
                  <div className="create_wallet_box flex flex-col gap-x-5">
                    <div className="create_wallet_desc">
                      <h1 className="text-red-400">
                        REMEMBER TO COPY THESE VALUES FOR FUTURE REFERENCE!!!
                      </h1>
                    </div>
                    <div className="flex flex-col gap-x-5">
                      <div className="create_wallet_content_box">
                        <div className="content_box_split_top">
                          <div className="content_box_left">
                            <div className="create_wallet_pub_key_sec">
                              <h3 className="text-violet-400 leading-3 tracking-wider mt-5 mb-2">
                                Public key
                              </h3>
                              <div className="flex justify-between  w-full  rounded-md  border border-[rgba(255,255,255,0.4)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400  disabled:cursor-not-allowed disabled:opacity-50">
                                <p>{`${walletData?.public_key?.slice(
                                  0,
                                  15
                                )}...${walletData?.public_key?.slice(
                                  walletData.public_key.length - 15
                                )}`}</p>

                                <FaCopy
                                  className="font-semibold cursor-pointer"
                                  onClick={onCopyClick}
                                />
                              </div>
                            </div>
                            <div className="create_wallet_pub_key_sec">
                              <h3 className="text-violet-400 leading-3 tracking-wider mt-5 mb-2">
                                Secret key
                              </h3>
                              <div className="flex justify-between w-full rounded-md border border-[rgba(255,255,255,0.4)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50">
                                {showSecretKey ? (
                                  <p>{`${walletData?.secret_key?.slice(
                                    0,
                                    15
                                  )}...${walletData?.secret_key?.slice(
                                    walletData.secret_key.length - 15
                                  )}`}</p>
                                ) : (
                                  <p>
                                    ********************************************
                                  </p>
                                )}
                                <FaCopy
                                  className="font-semibold cursor-pointer"
                                  onClick={onCopyClick}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="content_box_right">
                            <div className="create_wallet_pub_key_sec">
                              <h3 className="text-violet-400 leading-3 tracking-wider mt-5 mb-2">
                                {" "}
                                Password
                              </h3>
                              <div className="create_wallet_input_container"></div>
                            </div>
                            <div className="create_wallet_pub_key_sec">
                              <h3 className="text-violet-400 leading-3 tracking-wider mt-5 mb-2">
                                Confirm Password
                              </h3>
                              <div className="create_wallet_input_container">
                                <input
                                  type="password"
                                  className="flex  w-full  rounded-md border border-[rgba(255,255,255,0.4)] bg-transparent px-3 py-2 text-sm placeholder:text-gray-400  disabled:cursor-not-allowed disabled:opacity-50"
                                  maxLength={20}
                                  minLength={6}
                                  onChange={(e) =>
                                    setConfirmMpinVal(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div> */}
                        </div>
                        <div className="content_box_split_bottom">
                          <button
                            className="create_wallet_button"
                            onClick={createWalletClick}
                            disabled={
                              !mpinVal ||
                              !confirmMpinVal ||
                              mpinVal !== confirmMpinVal
                            }
                          ></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="solid">
                  <p onClick={handleNewWalletClick}>Generate Key Pair!</p>
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button variant="solid">
                  <p onClick={createWalletClick}>Create Wallet</p>
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
